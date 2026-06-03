# 钟祥莫愁帮 - 本地社交互助闲置平台

## 项目简介

**钟祥莫愁帮**是钟祥市域专属的本地综合服务社交平台，聚合三大核心刚需场景：同城陌生人聊天交友、邻里便民互助服务、本地闲置物品交易。

### Slogan
- 钟祥本地人，就近聊天、就近帮忙、就近换物

### 核心功能
1. **同城陌生人聊天交友** - 基于GPS精准属地锁定，仅展示钟祥市全域乡镇本地实名用户
2. **邻里便民互助服务** - 维修帮扶、咨询解答、事务劳办、技术帮扶
3. **同城闲置物品交易** - 专属钟祥本地二手循环交易，就近自提、零物流纠纷

## 技术栈

| 模块 | 技术 | 说明 |
|------|------|------|
| 前端 | React + Vite | 现代化前端框架，快速构建 |
| 后端 | Python FastAPI | 高性能异步API，AI集成方便 |
| 数据库 | MySQL | 关系型数据库，稳定可靠 |
| 部署 | Vercel + Railway | 前端Vercel，后端Railway |

## 项目结构

```
zhongxiang-mochoubang/
├── frontend/          # 前端项目 (React + Vite)
├── backend/           # 后端项目 (Python FastAPI)
├── docs/              # 项目文档
└── README.md
```

## 快速开始

### 前端
```bash
cd frontend
pnpm install
pnpm dev
```

### 后端
```bash
cd backend
uv venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
uv sync
uv run uvicorn app.main:app --reload
```

## 开发指南

详见 [AGENTS.md](AGENTS.md)

---

## 部署指南

### Cloudflare Pages 部署（推荐）

#### 方式一：手动部署

1. 登录 [Cloudflare Pages](https://pages.cloudflare.com)
2. 创建项目，选择 `zxmcb` 仓库
3. 配置构建：
   - Build command: `cd frontend && npm install && npm run build`
   - Build output directory: `frontend/dist`
4. 部署完成，访问 `https://zxmcb.pages.dev`

#### 方式二：自动部署（CI/CD）

1. 获取 Cloudflare API Token
   - 登录 Cloudflare Dashboard
   - 进入 Profile → API Tokens
   - 创建 Custom Token，权限选择 "Account:Cloudflare Pages:Edit"

2. 在 GitHub 仓库 Settings → Secrets 中添加：
   - `CLOUDFLARE_API_TOKEN`: 您的API Token
   - `CLOUDFLARE_ACCOUNT_ID`: 您的Account ID

3. 每次推送到 main 分支将自动部署

#### 绑定自定义域名

1. 在 Cloudflare Pages 项目设置中添加自定义域名
2. 在域名服务商添加 DNS CNAME 记录指向 `zxmcb.pages.dev`
# 20260603095741
