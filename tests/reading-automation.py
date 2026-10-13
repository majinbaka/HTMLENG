"""Exercise scheduler recovery in an isolated Git fixture without model calls."""
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import time

SOURCE = Path(__file__).resolve().parents[1]

def run(args, root, env):
    result = subprocess.run(args, cwd=root, env=env, text=True, capture_output=True)
    if result.returncode:
        raise RuntimeError(result.stdout + result.stderr)
    return result

with tempfile.TemporaryDirectory(prefix='reading-scheduler-test-') as directory:
    root = Path(directory) / 'repo'; root.mkdir()
    scripts = root / 'scripts/reading'; scripts.mkdir(parents=True)
    for name in ('auto-grow.py', 'validate.mjs'):
        shutil.copy(SOURCE / 'scripts/reading' / name, scripts / name)
    content = root / 'src/content/readings'; content.mkdir(parents=True)
    lessons = [l for f in sorted((SOURCE / 'src/content/readings').glob('*.json')) for l in json.loads(f.read_text())][:10]
    (content / 'initial.json').write_text(json.dumps(lessons))
    (root / '.gitignore').write_text('.reading-automation/\nnode_modules/\n')
    binaries = Path(directory) / 'bin'; binaries.mkdir()
    fake_npm = binaries / 'npm'
    fake_npm.write_text('''#!/usr/bin/env python3
import os,subprocess
from pathlib import Path
if 'build' in __import__('sys').argv:
 Path('index.html').write_text('entry');Path('.nojekyll').touch()
 p=Path('out/reading');p.mkdir(parents=True,exist_ok=True);(p/'index.html').write_text('built reading export')
 hook=Path(os.environ['SCHEDULER_FIXTURE_ROOT'])/'.reading-automation/advance-once'
 if hook.exists():
  hook.unlink();root=hook.parents[1];(root/'user-note.txt').write_text('user change must survive')
  subprocess.run(['git','add','user-note.txt'],cwd=root,check=True)
  subprocess.run(['git','commit','-m','user work during batch build'],cwd=root,check=True)
'''); fake_npm.chmod(0o755)
    fake_cron = binaries / 'crontab'
    fake_cron.write_text('''#!/usr/bin/env python3
import os,sys
from pathlib import Path
p=Path(os.environ['SCHEDULER_FIXTURE_ROOT'])/'.reading-automation/crontab.txt'
if '-l' in sys.argv: print(p.read_text(),end='')
else: p.write_text(sys.stdin.read())
'''); fake_cron.chmod(0o755)
    env = {**os.environ, 'PATH':str(binaries)+':'+os.environ['PATH'], 'SCHEDULER_FIXTURE_ROOT':str(root)}
    for command in (['git','init','-b','main'], ['git','config','user.name','Scheduler Test'], ['git','config','user.email','test@example.invalid'], ['git','add','.'], ['git','commit','-m','fixture']):run(command,root,env)
    state_dir = root / '.reading-automation'; state_dir.mkdir()
    state_file = state_dir / 'state.json'
    state = {'targetBranch':'main','nextDue':int(time.time())+1800,'codexBinary':'unused'}
    state_file.write_text(json.dumps(state))
    run(['python3','scripts/reading/auto-grow.py'],root,env)
    assert len(list(content.glob('*.json'))) == 1, 'No generation before 30-minute due time'
    state['nextDue'] = 0; state['targetBranch']='another-branch'; state_file.write_text(json.dumps(state))
    run(['python3','scripts/reading/auto-grow.py'],root,env)
    assert len(list(content.glob('*.json'))) == 1, 'Wrong checkout branch must wait'
    state['targetBranch']='main';state_file.write_text(json.dumps(state))
    generated = json.loads(json.dumps(lessons))
    for i,l in enumerate(generated,11):
        l['id']=f'reading-{i:03}';l['title']+=' — second scenario'
        l['paragraphs'][-1]['text']+=' The next review will cover another practical situation.'
    (state_dir / 'batch-011-020.json').write_text(json.dumps({'lessons':generated}))
    (state_dir / 'advance-once').touch()
    run(['python3','scripts/reading/auto-grow.py'],root,env)
    assert json.loads(state_file.read_text()).get('pendingBranch'), 'Concurrent commit keeps built batch pending'
    run(['python3','scripts/reading/auto-grow.py'],root,env)
    state=json.loads(state_file.read_text())
    assert 'pendingBranch' not in state, 'Diverged checkout must rebuild and finish'
    assert len([l for f in content.glob('*.json') for l in json.loads(f.read_text())])==20
    assert (root/'user-note.txt').read_text()=='user change must survive'
    assert not run(['git','status','--porcelain'],root,env).stdout.strip(), 'Merged checkout remains clean'
    assert state['nextDue']-state['lastSuccess']==1800, 'Next success interval is 30 minutes'
    # Threshold stop should preserve unrelated cron jobs.
    expanded=[]
    for i in range(1,301):
        lesson=json.loads(json.dumps(lessons[(i-1)%10]));lesson['id']=f'reading-{i:03}';expanded.append(lesson)
    for f in content.glob('*.json'):f.unlink()
    (content/'complete.json').write_text(json.dumps(expanded))
    (state_dir/'crontab.txt').write_text('0 1 * * * unrelated-job\n* * * * * reading-job # speaksprint-reading-300\n')
    run(['python3','scripts/reading/auto-grow.py'],root,env)
    assert json.loads(state_file.read_text())['complete']
    assert (state_dir/'crontab.txt').read_text()=='0 1 * * * unrelated-job\n'
    print('Scheduler: 30-minute gating, branch isolation, concurrent commit recovery, safe merge, and automatic stop at 300 passed.')
