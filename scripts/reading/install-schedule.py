#!/usr/bin/env python3
"""Install an idempotent local cron schedule, preserving existing cron jobs."""
import json
from pathlib import Path
import shlex
import shutil
import subprocess
import time
ROOT = Path(__file__).resolve().parents[2]
STATE = ROOT / '.reading-automation'
STATE.mkdir(exist_ok=True)
state_file = STATE / 'state.json'
codex = shutil.which('codex')
if not codex:
    raise SystemExit('Codex CLI is not installed.')
subprocess.run([codex, 'login', 'status'], check=True)
state = json.loads(state_file.read_text()) if state_file.exists() else {'nextDue': int(time.time()) + 18000}
branch = subprocess.run(['git', 'branch', '--show-current'], cwd=ROOT, capture_output=True, text=True, check=True).stdout.strip()
if not branch:
    raise SystemExit('Check out a named branch before installing the schedule.')
state.setdefault('targetBranch', branch)
state['codexBinary'] = codex
state_file.write_text(json.dumps(state, indent=2) + '\n')
marker = '# speaksprint-reading-300'
existing = subprocess.run(['crontab', '-l'], capture_output=True, text=True)
if existing.returncode and 'no crontab' not in existing.stderr:
    raise SystemExit(existing.stderr)
lines = [line for line in existing.stdout.splitlines() if marker not in line]
# Cron checks once a minute; nextDue enforces a full 5-hour interval, including midnight.
# A */5 hour cron expression would leave a four-hour gap across midnight.
node_binary = subprocess.run(['node', '-p', 'process.execPath'], text=True, capture_output=True, check=True).stdout.strip()
cron_path = ':'.join([str(Path(node_binary).parent), str(Path(codex).parent), '/usr/local/bin', '/usr/bin', '/bin'])
job = '* * * * * PATH=' + shlex.quote(cron_path) + ' /usr/bin/python3 ' + shlex.quote(str(ROOT / 'scripts/reading/auto-grow.py')) + ' >> ' + shlex.quote(str(STATE / 'cron.log')) + ' 2>&1 ' + marker
subprocess.run(['crontab', '-'], input='\n'.join(lines + [job]) + '\n', text=True, check=True)
print('Installed: next batch at', time.strftime('%Y-%m-%d %H:%M:%S UTC', time.gmtime(state['nextDue'])))
