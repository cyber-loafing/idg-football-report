#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"
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
