# 钟祥莫愁帮 - Cloudflare Pages 部署指南

## 详细步骤

### 1. 访问 Cloudflare Pages
打开浏览器访问：
```
https://pages.cloudflare.com
```

### 2. 登录
- 点击右上角 **"Log in"**
- 使用 GitHub 账号登录（推荐）
- 授权 Cloudflare 访问您的 GitHub 仓库

### 3. 创建项目
1. 登录后点击 **"Create a project"**
2. 选择 **"Import from GitHub"**
3. 在列表中找到并选择 `zxxub99/zxmcb` 仓库
4. 点击 **"Begin setup"**

### 4. 配置构建设置
在设置页面填写：

| 设置项 | 值 |
|--------|-----|
| **Project name** | `zxmcb` |
| **Production branch** | `main` |
| **Build command** | `cd frontend && npm install && npm run build` |
| **Build output directory** | `frontend/dist` |

### 5. 完成部署
1. 点击 **"Save and Deploy"**
2. 等待构建完成（通常需要 1-3 分钟）
3. 构建成功后，访问：`https://zxmcb.pages.dev`

### 6. 绑定自定义域名（可选）
1. 点击 **"Domains"** 标签
2. 点击 **"Set up a domain"**
3. 输入您的域名：`mochouju.coze.site`
4. 按照提示在您的域名服务商添加 DNS 记录
5. 添加 CNAME 记录指向：`zxmcb.pages.dev`

## 故障排除

### 构建失败
如果构建失败，检查：
- Build command 是否正确：`cd frontend && npm install && npm run build`
- Build output directory 是否正确：`frontend/dist`

### 页面空白
如果页面显示空白，检查：
- 确保 Build output directory 设置为 `frontend/dist`
- 确保没有 Deploy command（留空）

## 访问地址
- Cloudflare Pages: `https://zxmcb.pages.dev`
- GitHub 仓库: `https://github.com/zxxub99/zxmcb`
