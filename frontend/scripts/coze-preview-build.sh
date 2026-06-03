#!/usr/bin/env bash
set -euo pipefail

# 基于脚本位置定位项目根目录
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_DIR"

echo "安装前端依赖..."
pnpm install

echo "执行 Vite 构建..."
pnpm run build

# 用纯静态首页覆盖（解决JS白屏问题）
if [ -f "public/index.html" ]; then
  cp public/index.html dist/index.html
  echo "✅ 已用纯静态首页覆盖 dist/index.html"
fi

echo "构建完成 ✅"
