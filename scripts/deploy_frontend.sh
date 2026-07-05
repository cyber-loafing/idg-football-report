#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"
NGINX_DIST_DIR="${NGINX_DIST_DIR:-/var/www/idg-football-report/frontend/dist}"
export npm_config_cache="$ROOT_DIR/.cache/npm"
export CFA_PUBLIC_PREFIX="${CFA_PUBLIC_PREFIX:-/idg-football-report}"
export VITE_PUBLIC_BASE="${VITE_PUBLIC_BASE:-$CFA_PUBLIC_PREFIX/ui/}"
export VITE_API_BASE_URL="${VITE_API_BASE_URL:-$CFA_PUBLIC_PREFIX/api}"
export VITE_BS_API_BASE_URL="${VITE_BS_API_BASE_URL:-$CFA_PUBLIC_PREFIX/bsApi}"

cd "$FRONTEND_DIR"
if ! npm ci; then
  npm install --package-lock=false --registry=https://registry.npmjs.org/
fi
npm run build

if [[ -n "$NGINX_DIST_DIR" ]]; then
  sudo mkdir -p "$NGINX_DIST_DIR"
  sudo find "$NGINX_DIST_DIR" -mindepth 1 -delete
  sudo cp -a "$FRONTEND_DIR/dist/." "$NGINX_DIST_DIR/"
  sudo find "$NGINX_DIST_DIR" -type d -exec chmod 755 {} +
  sudo find "$NGINX_DIST_DIR" -type f -exec chmod 644 {} +
fi
