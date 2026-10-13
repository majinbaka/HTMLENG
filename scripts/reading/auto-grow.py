#!/usr/bin/env python3
"""Cron entry point: one validated, built and committed batch every 30 minutes."""
import fcntl
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import time

ROOT = Path(__file__).resolve().parents[2]
STATE_DIR = ROOT / '.reading-automation'
STATE_DIR.mkdir(exist_ok=True)
STATE_FILE = STATE_DIR / 'state.json'
MARKER = '# speaksprint-reading-300'
INTERVAL = 30 * 60

def run(args, cwd=ROOT, **kwargs):
    return subprocess.run(args, cwd=cwd, check=True, text=True, **kwargs)

def output(args):
    return run(args, stdout=subprocess.PIPE).stdout.strip()

def bank():
    return [lesson for file in sorted((ROOT / 'src/content/readings').glob('*.json')) for lesson in json.loads(file.read_text())]

def save(state):
    temporary = STATE_FILE.with_suffix('.tmp')
    temporary.write_text(json.dumps(state, indent=2) + '\n')
    temporary.replace(STATE_FILE)

def log(message):
    print(time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()), message, flush=True)

def stop_schedule():
    current = subprocess.run(['crontab', '-l'], text=True, capture_output=True)
    if current.returncode == 0:
        run(['crontab', '-'], input='\n'.join(line for line in current.stdout.splitlines() if MARKER not in line) + '\n')

with (STATE_DIR / 'run.lock').open('w') as lock:
    try:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        sys.exit(0)
    state = json.loads(STATE_FILE.read_text()) if STATE_FILE.exists() else {'nextDue': int(time.time()) + INTERVAL}
    try:
        if '--status' in sys.argv:
            print(json.dumps({**state, 'lessonCount': len(bank())}, indent=2)); sys.exit(0)
        target_branch = state.get('targetBranch')
        if not target_branch or output(['git', 'branch', '--show-current']) != target_branch:
            log('Waiting: checkout is not the scheduled target branch.'); sys.exit(0)
        if time.time() < state.get('retryAfter', 0):
            sys.exit(0)
        # A successfully built branch is kept for a safe retry if the learner is editing.
        if state.get('pendingBranch'):
            if output(['git', 'status', '--porcelain']):
                log('Waiting: working tree has local changes.'); sys.exit(0)
            branch = state['pendingBranch']
            already_merged = subprocess.run(['git', 'merge-base', '--is-ancestor', branch, 'HEAD'], cwd=ROOT).returncode == 0
            fast_forward = subprocess.run(['git', 'merge-base', '--is-ancestor', 'HEAD', branch], cwd=ROOT).returncode == 0
            if already_merged or fast_forward:
                if not already_merged:
                    run(['git', 'merge', '--ff-only', branch])
                state.pop('pendingBranch', None)
                state['lastSuccess'] = int(time.time())
                state['nextDue'] = state['lastSuccess'] + INTERVAL
                for field in ('lastError', 'retryAfter', 'failures'):
                    state.pop(field, None)
                save(state)  # Record completion before deleting the branch (crash-safe).
                subprocess.run(['git', 'branch', '-d', branch], cwd=ROOT)
                log(f'Committed batch; library now has {len(bank())} lessons.')
            else:
                # User commits have moved HEAD: keep the cached candidate, rebuild it
                # against current HEAD below instead of retrying a impossible ff merge.
                state.pop('pendingBranch', None)
                save(state)
                run(['git', 'branch', '-D', branch])
                log('Checkout advanced; rebuilding the cached batch against current HEAD.')
        lessons = bank()
        if len(lessons) >= 300:
            state['complete'] = True; save(state); stop_schedule(); log('300 lessons reached; schedule removed.'); sys.exit(0)
        if time.time() < state['nextDue']:
            sys.exit(0)
        if output(['git', 'status', '--porcelain']):
            log('Waiting: working tree has local changes.'); sys.exit(0)
        run(['node', 'scripts/reading/validate.mjs'])
        count = min(10, 300 - len(lessons))
        first = len(lessons) + 1
        expected = [f'reading-{i:03}' for i in range(first, first + count)]
        batch_name = f'batch-{first:03}-{first + count - 1:03}.json'
        candidate = STATE_DIR / batch_name
        if not candidate.exists():
            prompt = (ROOT / 'scripts/reading/generate-prompt.txt').read_text()
            prompt += '\nCreate exactly these IDs: ' + ', '.join(expected)
            prompt += '\nExisting titles to avoid: ' + json.dumps([l['title'] for l in lessons], ensure_ascii=False)
            binary = state['codexBinary']
            run([binary, 'exec', '--sandbox', 'read-only', '--ephemeral', '--output-schema', str(ROOT / 'scripts/reading/schema.json'), '-o', str(candidate), '-'], input=prompt, timeout=5400)
        try:
            generated = json.loads(candidate.read_text())['lessons']
            if [l['id'] for l in generated] != expected:
                raise ValueError('Generated batch has incorrect lesson IDs/count')
            run(['node', 'scripts/reading/validate.mjs', str(candidate)])
            # Validate uniqueness against the entire bank too.
            combined = STATE_DIR / 'combined.json'
            combined.write_text(json.dumps({'lessons': lessons + generated}, ensure_ascii=False))
            run(['node', 'scripts/reading/validate.mjs', str(combined)])
        except Exception:
            candidate.rename(candidate.with_suffix(f'.invalid-{int(time.time())}.json'))
            raise
        head = output(['git', 'rev-parse', 'HEAD'])
        branch = f'speaksprint-reading-{first:03}-{first + count - 1:03}'
        work = Path(tempfile.mkdtemp(prefix='speaksprint-reading-'))
        registered = False
        committed = False
        try:
            run(['git', 'worktree', 'add', '-b', branch, str(work), head]); registered = True
            target = work / 'src/content/readings' / batch_name
            target.write_text(json.dumps(generated, ensure_ascii=False, indent=2) + '\n')
            run(['npm', 'ci', '--no-audit', '--no-fund'], cwd=work, timeout=600)
            run(['npm', 'run', 'build'], cwd=work, timeout=900)
            run(['node', 'scripts/reading/validate.mjs'], cwd=work)
            if not (work / 'out/reading/index.html').is_file():
                raise ValueError('Reading export missing')
            run(['git', 'add', 'src/content/readings/' + batch_name, 'out', 'index.html', '.nojekyll'], cwd=work)
            run(['git', 'commit', '-m', f'feat(reading): add lessons {first:03}–{first + count - 1:03} ({len(lessons) + count}/300)'], cwd=work)
            committed = True
            state['pendingBranch'] = branch; save(state)
        finally:
            if registered:
                run(['git', 'worktree', 'remove', '--force', str(work)])
            else:
                shutil.rmtree(work, ignore_errors=True)
            if not committed:
                subprocess.run(['git', 'branch', '-D', branch], cwd=ROOT, text=True)
        if output(['git', 'branch', '--show-current']) != target_branch or output(['git', 'status', '--porcelain']) or output(['git', 'rev-parse', 'HEAD']) != head:
            log(f'Built batch on {branch}; waiting for clean, unchanged checkout before merging.'); sys.exit(0)
        run(['git', 'merge', '--ff-only', branch])
        state.pop('pendingBranch', None)
        state['lastSuccess'] = int(time.time()); state['nextDue'] = state['lastSuccess'] + INTERVAL
        for field in ('lastError', 'retryAfter', 'failures'):
            state.pop(field, None)
        save(state)
        run(['git', 'branch', '-d', branch])
        candidate.unlink(missing_ok=True)
        log(f'Committed {len(bank())}/300 lessons.')
        if len(bank()) >= 300:
            state['complete'] = True; save(state); stop_schedule(); log('Target reached; schedule removed.')
    except Exception as error:
        state['lastError'] = str(error); state['lastFailure'] = int(time.time())
        state['failures'] = state.get('failures', 0) + 1
        state['retryAfter'] = int(time.time()) + min(3600, 300 * 2 ** min(state['failures'] - 1, 4))
        save(state)
        log(f'FAILED (retry with 5–60 minute backoff): {error}')
        sys.exit(1)
