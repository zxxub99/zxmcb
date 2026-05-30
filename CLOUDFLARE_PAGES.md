# Cloudflare Pages 部署指南

## 快速部署步骤

### 1. 访问 Cloudflare Dashboard
打开浏览器访问：https://dash.cloudflare.com

### 2. 进入 Pages
- 点击左侧菜单 **Workers & Pages**
- 点击 **Create application**
- 选择 **Pages** 标签
- 点击 **Connect to Git**

### 3. 连接 GitHub 仓库
- 在 "Connect a Git repository" 页面
- 选择 `zxxub99` 账户
- 选择仓库 `zxmcb`
- 点击 **Begin setup**

### 4. 配置构建设置

**Project configuration:**
- Project name: `zxmcb`
- Production branch: `main`

**Build settings:**
- Framework preset: `Vite` (或选择 `None`)
- Build command: `cd frontend && pnpm install && pnpm run build`
  - 如果没有 pnpm，选择 `None`，然后手动输入：`cd frontend && npm install && npm run build`
- Build output directory: `frontend/dist`
- Root directory: `/` (根目录)

### 5. 触发部署
- 点击 **Save and Deploy**
- 等待构建完成

### 6. 访问网站
部署成功后，访问：`https://zxmcb.pages.dev`

---

## 常见问题

### Q: Build command 怎么填？
```
cd frontend && npm install && npm run build
```

### Q: Build output directory 怎么填？
```
frontend/dist
```

### Q: Deploy command 必填吗？
是的，在页面底部需要填写 Deploy command，可以填：
```
echo "Deployment complete"
```

### Q: 构建失败怎么办？
检查错误日志，常见问题：
1. Node 版本问题 - 确保使用 Node 18+
2. 依赖安装失败 - 检查网络连接
3. 构建命令错误 - 确认命令格式正确

---

## 自定义域名（可选）

1. 在 Cloudflare Pages 项目设置中点击 **Custom domains**
2. 添加您的域名
3. 在域名服务商添加 DNS 记录

---

## 项目仓库信息

- **GitHub**: https://github.com/zxxub99/zxmcb
- **前端代码**: `/frontend` 目录
- **构建输出**: `/frontend/dist` 目录
