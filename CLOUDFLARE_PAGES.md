# Cloudflare Pages 配置

## 部署设置

### 在 Cloudflare Pages 中配置：

**Project settings:**
- Project name: `zxmcb`
- Production branch: `main`

**Build settings:**
- Build command: `cd frontend && npm install && npm run build`
- Build output directory: `frontend/dist`
- Root directory: `/`

### 或者使用 Wrangler CLI 部署：

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录
wrangler login

# 部署
cd /workspace/projects/zhongxiang-mochoubang
wrangler pages deploy frontend/dist --project-name=zxmcb
```

## 自定义域名绑定

1. 在 Cloudflare Pages 项目设置中点击 "Custom domains"
2. 添加您的域名：`mochouju.coze.site`
3. 在域名服务商添加 DNS 记录：
   - 类型：CNAME
   - 名称：`mochouju.coze.site`
   - 目标：`zxmcb.pages.dev`
   - 代理状态：已代理

## 访问地址

- 免费域名：`https://zxmcb.pages.dev`
- 自定义域名：`https://mochouju.coze.site`
