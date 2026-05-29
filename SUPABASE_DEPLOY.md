# 钟祥莫愁帮 - Supabase + Vercel 部署指南

## 一、Supabase 配置（后端数据库）

### 1.1 创建 Supabase 项目

1. 访问 https://supabase.com
2. 点击 "New Project"
3. 填写项目信息：
   - **Organization**: 选择或创建组织
   - **Name**: `zhongxiang-mochoubang`
   - **Database Password**: 设置强密码（记住！）
   - **Region**: 选择 `Northeast Asia`（日本）或 `Southeast Asia`（新加坡）
4. 点击 "Create new project"
5. 等待项目创建完成（约2分钟）

### 1.2 获取 API 密钥

1. 进入项目后，点击左侧 **"Settings"** → **"API"**
2. 复制以下信息：

```
Project URL: https://xxxxxxxxxxxx.supabase.co
anon public: eyJhbGc...（以 eyJ 开头）
service_role: eyJhbGc...（以 eyJ 开头）
```

### 1.3 配置认证方式

1. 进入 **"Authentication"** → **"Providers"**
2. 启用 **Phone** 提供商（用于手机号登录）：
   - 开启 `Enable Phone`
   - 如果需要短信验证码，配置短信服务商

### 1.4 配置存储桶

1. 进入 **"Storage"** → **"New Bucket"**
2. 创建以下存储桶：

| Bucket Name | Public | 用途 |
|-------------|--------|------|
| `avatars` | ✅ | 用户头像 |
| `images` | ✅ | 商品图片 |
| `covers` | ✅ | 文章封面 |

## 二、前端配置

### 2.1 创建 .env 文件

在 `frontend` 目录下创建 `.env` 文件：

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...（anon public 密钥）
```

### 2.2 更新 GitHub Secrets（可选）

如果使用 Vercel 部署，在 Vercel 项目设置中添加环境变量。

## 三、Vercel 部署

### 3.1 连接 GitHub

1. 访问 https://vercel.com
2. 点击 "Add New" → "Project"
3. 选择 "Import Git Repository"
4. 选择 `zxxub99/zxmcb` 仓库

### 3.2 配置构建

| 设置项 | 值 |
|--------|-----|
| Framework Preset | Vite |
| Root Directory | `./` |
| Build Command | `pnpm install && cd frontend && pnpm install && pnpm run build` |
| Output Directory | `frontend/dist` |

### 3.3 添加环境变量

在 Vercel 项目设置中添加：

| Key | Value |
|-----|-------|
| `VITE_SUPABASE_URL` | `https://xxxxxxxxxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGc...` |

### 3.4 部署

点击 "Deploy" 开始部署。

## 四、验证部署

部署完成后，访问您的 Vercel 域名（如 `zxmcb.vercel.app`）：

1. 首页应该正常显示
2. 点击登录/注册应该能正常使用
3. 可以测试发布交友帖子、二手商品等

## 五、域名绑定（可选）

### 5.1 Vercel 绑定自定义域名

1. 进入 Vercel 项目设置 → **Domains**
2. 添加您的域名（如 `mochoubang.com`）
3. 按照提示配置 DNS 记录

### 5.2 Cloudflare 加速（推荐）

1. 将域名托管到 Cloudflare
2. 在 Cloudflare DNS 中添加 CNAME 记录指向 Vercel

## 六、数据库表说明

| 表名 | 用途 |
|------|------|
| `profiles` | 用户资料 |
| `dating_posts` | 交友帖子 |
| `articles` | 资讯文章 |
| `secondhand_items` | 二手商品 |
| `tourism_products` | 旅游商品 |
| `orders` | 订单 |
| `favorites` | 收藏 |

## 七、常见问题

### Q: 部署后无法登录？
A: 检查 Supabase 的环境变量是否正确配置，特别是 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`。

### Q: 数据库表没有创建？
A: 运行 `coze-coding-ai db upgrade` 命令同步表结构。

### Q: 忘记 Supabase 数据库密码？
A: 在 Supabase 设置中可以重置数据库密码。

## 八、成本

| 服务 | 免费额度 | 超出费用 |
|------|----------|----------|
| Supabase | 500MB 数据库，1GB 存储 | 按量付费 |
| Vercel | 100GB 带宽，100 个函数 | 按量付费 |
| Cloudflare | 免费 CDN | 可选付费套餐 |

**对于个人项目，基本免费够用！**
