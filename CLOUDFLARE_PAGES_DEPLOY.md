# Cloudflare Pages 部署指南

## 访问 Cloudflare Pages

打开浏览器访问：**https://pages.cloudflare.com**

---

## 详细部署步骤

### 第一步：创建项目

1. 点击页面上的 **"Create a project"** 蓝色按钮

2. 选择 **"Connect to GitHub"**（或 "Continue with GitHub"）

3. 授权 GitHub 账号访问

---

### 第二步：选择仓库

在 GitHub 仓库列表中找到 **`zxxub99/zxmcb`**

点击旁边的 **"Select"** 或 **"Add"** 按钮

---

### 第三步：配置项目设置

在设置页面填写以下信息：

```
Project name（项目名称）: zxmcb

Production branch（生产分支）: main

Framework preset（框架预设）: None

Build command（构建命令）:
cd frontend && pnpm install && pnpm run build

Build output directory（构建输出目录）:
frontend/dist

Root directory（根目录）: /
```

---

### 第四步：添加环境变量（重要！）

在同一个页面，找到 **"Environment Variables"** 部分

点击 **"Add variable"**，添加两个变量：

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://hascvymcsgnccejyhhca.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhc2N2eW1jc2duY2NlanloaGNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMjU4OTUsImV4cCI6MjA5NTYwMTg5NX0.x0gMJM-y9IYGYH48xgEFLQRwxEYd0XKBq_wqOnH9PAE` |

---

### 第五步：开始部署

滚动到页面底部，点击 **"Save and Deploy"** 按钮

---

### 第六步：等待构建

页面会显示构建进度：

```
Cloning repository...     ✓
Installing dependencies... ⏳
Building application...   ⏳
Deploying to network...   ⏳
```

等待时间约 **2-5 分钟**

---

### 第七步：部署成功

看到 **"Success!"** 或 **"Your project is deployed"** 表示成功！

---

## 访问您的网站

部署成功后，您的网站将上线：

```
🌐 https://zxmcb.pages.dev
```

您也可以绑定自定义域名：

1. 进入项目 **Settings**
2. 点击 **"Custom domains"**
3. 添加您的域名

---

## 常见问题

### 构建失败？
- 检查 Build command 是否正确
- 检查环境变量是否添加
- 查看构建日志排查错误

### 环境变量没生效？
- 确保添加到了 **Production** 环境
- 重新部署一次

### 想更新网站？
- 只需推送代码到 GitHub，Cloudflare 会自动重新部署

---

## 快速检查清单

- [ ] 点击了 "Create a project"
- [ ] 连接了 GitHub
- [ ] 选择了 zxxub99/zxmcb 仓库
- [ ] Build command 填写正确
- [ ] Build output directory 填写正确
- [ ] 添加了环境变量
- [ ] 点击了 "Save and Deploy"
