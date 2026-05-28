#!/usr/bin/env bash
set -euo pipefail

# 基于脚本位置定位项目根目录
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_DIR"

# 显式声明关键环境变量
export PORT=5000

# 清理5000端口残留进程（幂等性）
fuser -k 5000/tcp 2>/dev/null || true
sleep 1

echo "启动前端预览服务..."
exec pnpm exec vite --host 0.0.0.0 --port 5000
