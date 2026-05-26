#!/usr/bin/env bash
set -euo pipefail

# 定位到 frontend 项目根目录
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_DIR"

echo "安装依赖..."
pnpm install

echo "构建前端..."
pnpm run build
