#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PORT="${1:-8000}"

if ! command -v python3 >/dev/null 2>&1; then
  echo "Lỗi: máy chưa cài python3."
  exit 1
fi

if [[ ! "$PORT" =~ ^[0-9]+$ ]] || (( PORT < 1 || PORT > 65535 )); then
  echo "Lỗi: cổng phải là một số từ 1 đến 65535."
  echo "Ví dụ: ./start-server.sh 8000"
  exit 1
fi

LOCAL_IP="$(hostname -I 2>/dev/null | awk '{print $1}')"

echo "SpeakSprint đang chạy."
echo "Trên máy này: http://localhost:${PORT}"
if [[ -n "$LOCAL_IP" ]]; then
  echo "Máy khác cùng mạng: http://${LOCAL_IP}:${PORT}"
else
  echo "Không tự xác định được IP. Hãy chạy: hostname -I"
fi
echo "Nhấn Ctrl+C để dừng server."
echo

cd "$SCRIPT_DIR"
exec python3 -m http.server "$PORT" --bind 0.0.0.0
