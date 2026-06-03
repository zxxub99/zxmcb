#!/bin/bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_DIR"

echo "Installing dependencies..."
cd frontend && pnpm install --prefer-offline

echo "Building frontend with Vite..."
pnpm run build
