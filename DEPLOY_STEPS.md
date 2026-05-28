# 钟祥莫愁帮 - Cloudflare Pages 部署详细步骤（图解）

## 步骤 1：访问 Cloudflare Pages

在浏览器中打开：
```
https://pages.cloudflare.com
```

---

## 步骤 2：登录

1. 点击右上角 **"Log in"** 按钮
2. 选择登录方式：
   - **GitHub**（推荐）- 点击 "Continue with GitHub"
   - Google 账号
   - Email 邮箱

3. 如果选择 GitHub：
   - 授权页面点击 **"Authorize cloudflare"**
   - 授权成功会自动跳转

---

## 步骤 3：创建项目

登录后页面会显示 "Create a project" 按钮

**如果没看到，查找位置：**
```
Cloudflare Dashboard
    ↓
左侧菜单: Workers & Pages
    ↓
点击 "Create application"
    ↓
选择 "Pages" 标签
    ↓
点击 "Create a project"
```

---

## 步骤 4：连接 GitHub

1. 点击 **"Connect to GitHub"**
2. 在弹出窗口中：
   - 选择账号
   - 选择仓库：`zxmcb`
   - 点击 **"Install & Authorize"**

3. 或者手动选择：
   - 找到 `zxxub99/zxmcb`
   - 点击旁边的 **"Configure"**
   - 选择 `main` 分支
   - 点击 **"Begin setup"**

---

## 步骤 5：配置构建设置

在设置页面填写以下内容：

```
┌─────────────────────────────────────────────────┐
│ Project name            │ zxmcb                  │
├─────────────────────────────────────────────────┤
│ Production branch       │ main                   │
├─────────────────────────────────────────────────┤
│ Build command           │ cd frontend && npm install && npm run build │
├─────────────────────────────────────────────────┤
│ Build output directory  │ frontend/dist           │
└─────────────────────────────────────────────────┘
```

**重要提醒：**
- ✅ Build command: `cd frontend && npm install && npm run build`
- ✅ Build output directory: `frontend/dist`
- ❌ 不要填写 Deploy command（留空）
- ❌ Root directory: `/`（保持默认）

---

## 步骤 6：保存并部署

1. 滚动到页面底部
2. 点击 **"Save and Deploy"** 按钮

---

## 步骤 7：等待构建

构建过程会显示进度：

```
[1/4] Initializing build environment     ✅
[2/4] Cloning git repository            ✅
[3/4] Installing tools and dependencies ✅
[4/4] Building application              ⏳ 进行中...
```

等待 1-3 分钟，直到显示 ✅

---

## 步骤 8：访问网站

构建成功后！

您的网站地址：
```
https://zxmcb.pages.dev
```

可以在页面顶部看到预览链接。

---

## 步骤 9：绑定自定义域名（可选）

如果需要绑定自己的域名：

1. 点击 **"Domains"** 标签
2. 点击 **"Set up a domain"**
3. 输入您的域名：`mochouju.coze.site`
4. 点击 **"Check DNS records"**
5. 在您的域名服务商添加 DNS 记录：
   - 类型：CNAME
   - 名称：www（或 @）
   - 目标：zxmcb.pages.dev

---

## 常见问题

### Q: Build command 是必填吗？
A: 是的，必须填写：`cd frontend && npm install && npm run build`

### Q: Deploy command 怎么填？
A: 留空，不需要填写

### Q: 构建失败怎么办？
A: 检查 Build command 和 Build output directory 是否正确

### Q: 页面显示空白？
A: 检查 Build output directory 是否设置为 `frontend/dist`

---

## 成功标志

部署成功后页面会显示：
- ✅ "Success! Your project has been deployed"
- 🎉 预览链接：https://zxmcb.pages.dev
