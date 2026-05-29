# 钟祥莫愁帮 - LeanCloud 部署指南

## 一、LeanCloud 创建（国内服务器，速度更快）

### 1.1 注册 LeanCloud

1. 访问 https://leancloud.app
2. 点击 "注册"
3. 使用手机号注册（国内直接访问，无需翻墙）
4. 完成验证

### 1.2 创建应用

1. 登录后，点击 "创建应用"
2. 填写应用名称：`zhongxiang-mochoubang`
3. 选择版本：**开发版**（免费）
4. 点击创建

### 1.3 获取 App ID 和 App Key

1. 进入应用后，点击 "设置"
2. 点击 "应用凭证"
3. 复制以下两个值：
   - **App ID**
   - **App Key**

### 1.4 开启服务

在 LeanCloud 控制台中，确保以下服务已开启：
- **结构化存储**（数据表）
- **用户」**（登录注册）
- **文件存储**（图片上传）

---

## 二、前端配置

### 2.1 创建环境变量文件

在 `frontend` 目录创建 `.env` 文件：

```env
VITE_LEANCLOUD_APP_ID=您的AppID
VITE_LEANCLOUD_APP_KEY=您的AppKey
```

### 2.2 安装 LeanCloud SDK

```bash
cd frontend
pnpm add leancloud-storage
```

---

## 三、数据表创建

### 3.1 需要创建的数据表

在 LeanCloud 控制台 → 存储 → 创建以下表：

#### 1. Profile（用户资料）
| 字段名 | 类型 | 说明 |
|--------|------|------|
| objectId | String | 系统自动生成 |
| nickname | String | 昵称 |
| avatar | String | 头像URL |
| phone | String | 手机号 |
| bio | String | 个人简介 |
| location | String | 所在地 |
| createdAt | Date | 创建时间 |

#### 2. DatingPost（交友帖子）
| 字段名 | 类型 | 说明 |
|--------|------|------|
| objectId | String | 系统自动生成 |
| user | Pointer<_User> | 发布者 |
| title | String | 标题 |
| content | String | 内容 |
| images | Array | 图片列表 |
| gender | String | 性别 |
| location | String | 位置 |
| views | Number | 浏览量 |
| likes | Number | 点赞数 |

#### 3. Article（资讯文章）
| 字段名 | 类型 | 说明 |
|--------|------|------|
| objectId | String | 系统自动生成 |
| user | Pointer<_User> | 发布者 |
| title | String | 标题 |
| content | String | 内容 |
| coverImage | String | 封面图 |
| category | String | 分类 |
| views | Number | 浏览量 |

#### 4. SecondhandItem（二手商品）
| 字段名 | 类型 | 说明 |
|--------|------|------|
| objectId | String | 系统自动生成 |
| user | Pointer<_User> | 发布者 |
| title | String | 标题 |
| description | String | 描述 |
| price | Number | 价格 |
| images | Array | 图片 |
| category | String | 分类 |
| condition | String | 成色 |
| location | String | 位置 |
| isSold | Boolean | 是否已售 |

#### 5. TourismProduct（旅游商品）
| 字段名 | 类型 | 说明 |
|--------|------|------|
| objectId | String | 系统自动生成 |
| name | String | 名称 |
| description | String | 描述 |
| price | Number | 价格 |
| images | Array | 图片 |
| category | String | 分类 |
| location | String | 位置 |
| duration | String | 时长 |

#### 6. Order（订单）
| 字段名 | 类型 | 说明 |
|--------|------|------|
| objectId | String | 系统自动生成 |
| user | Pointer<_User> | 用户 |
| productId | String | 商品ID |
| productType | String | 商品类型 |
| totalAmount | Number | 总金额 |
| status | String | 状态 |
| contactPhone | String | 联系电话 |
| contactName | String | 联系人 |

#### 7. Favorite（收藏）
| 字段名 | 类型 | 说明 |
|--------|------|------|
| objectId | String | 系统自动生成 |
| user | Pointer<_User> | 用户 |
| itemId | String | 商品ID |
| itemType | String | 商品类型 |

---

## 四、Vercel 部署

### 4.1 连接 GitHub

1. 访问 https://vercel.com
2. 点击 "Add New" → "Project"
3. 导入 `zxxub99/zxmcb` 仓库

### 4.2 配置构建

| 设置项 | 值 |
|--------|-----|
| Framework Preset | Vite |
| Root Directory | `./` |
| Build Command | `pnpm install && cd frontend && pnpm install && pnpm run build` |
| Output Directory | `frontend/dist` |

### 4.3 添加环境变量

| Key | Value |
|-----|-------|
| `VITE_LEANCLOUD_APP_ID` | 您的 App ID |
| `VITE_LEANCLOUD_APP_KEY` | 您的 App Key |

### 4.4 部署

点击 "Deploy" 开始部署。

---

## 五、LeanCloud 权限设置

### 5.1 设置数据权限

在 LeanCloud 控制台 → 存储 → 选择表 → 权限设置：

#### _User 表（用户）
- 创建：登录用户
- 读取：所有人
- 更新：用户本人
- 删除：禁止

#### 数据表（如 DatingPost）
- 创建：登录用户
- 读取：所有人
- 更新：用户本人
- 删除：用户本人

---

## 六、成本

| 服务 | 免费额度 | 超出费用 |
|------|----------|----------|
| LeanCloud | 1GB 存储，100GB 流量 | 按量付费 |
| Vercel | 100GB 带宽 | 按量付费 |

**对于个人项目，免费的 LeanCloud + Vercel 组合完全够用！**

---

## 七、优势

| 对比 | Supabase | LeanCloud |
|------|----------|-----------|
| 服务器位置 | 日本/新加坡 | **上海/北京** |
| 国内访问速度 | 一般 | **极快** |
| 注册方式 | 需翻墙 | **国内手机号** |
| 文档语言 | 英文 | **中文** |
| 客服支持 | 社区 | **中文客服** |
