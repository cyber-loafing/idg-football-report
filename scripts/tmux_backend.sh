#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SESSION_NAME="${TMUX_SESSION_NAME:-cfa-monitor}"
VENV_BIN="$ROOT_DIR/.venv/bin"
START_CMD="cd '$ROOT_DIR' && '$VENV_BIN/cfa-mirror-site' && exec '$VENV_BIN/cfa-monitor'"

usage() {
  cat <<'EOF'
Usage: scripts/tmux_backend.sh <start|stop|restart|status|logs>
EOF
}

start_session() {
  if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
    echo "tmux session '$SESSION_NAME' is already running"
    return 0
  fi
  tmux new-session -d -s "$SESSION_NAME" "$START_CMD"
  echo "started tmux session '$SESSION_NAME'"
}

stop_session() {
  if ! tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
    echo "tmux session '$SESSION_NAME' is not running"
    return 0
  fi
  tmux kill-session -t "$SESSION_NAME"
  echo "stopped tmux session '$SESSION_NAME'"
}

show_status() {
  if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
    tmux list-sessions | grep "^${SESSION_NAME}:"
  else
    echo "tmux session '$SESSION_NAME' is not running"
  fi
}

show_logs() {
  if ! tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
    echo "tmux session '$SESSION_NAME' is not running"
    return 1
  fi
  tmux capture-pane -pt "$SESSION_NAME" -S -200
}

case "${1:-}" in
  start)
    start_session
    ;;
  stop)
    stop_session
    ;;
  restart)
    stop_session
    start_session
    ;;
  status)
    show_status
    ;;
  logs)
    show_logs
    ;;
  *)
    usage
    exit 1
    ;;
esac
