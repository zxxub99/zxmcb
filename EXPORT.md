# 钟祥莫愁帮 - 项目完整导出文档

> 生成时间：2025年5月29日
> GitHub 仓库：https://github.com/zxxub99/zxmcb

---

## 目录

1. [项目概述](#1-项目概述)
2. [技术架构](#2-技术架构)
3. [功能模块](#3-功能模块)
4. [数据库结构](#4-数据库结构)
5. [页面清单](#5-页面清单)
6. [核心内容](#6-核心内容)
7. [部署指南](#7-部署指南)

---

## 1. 项目概述

### 项目名称
**钟祥莫愁帮** - 本地社交互助平台

### 定位
- 世界长寿之乡的本地生活服务平台
- 社交+电商闭环运营
- 差异化定位："不是卖货，是卖钟祥的生活方式"

### 商业模式
```
交友（拉新）→ 二手（活跃）→ 旅游/特产（变现）
```

### 核心特色
- 长寿之乡 IP
- 邻里信任体系
- 真实邻居推荐
- 八大长寿风物

---

## 2. 技术架构

### 前端技术栈
| 技术 | 用途 |
|------|------|
| React 18 | UI 框架 |
| TypeScript | 类型安全 |
| Vite | 构建工具 |
| React Router | 路由管理 |
| Ant Design Mobile | UI 组件库 |
| Supabase | 后端数据库 |

### 后端技术栈
| 技术 | 用途 |
|------|------|
| Supabase | 认证、数据库、存储 |
| PostgreSQL | 关系型数据库 |
| Row Level Security | 数据访问控制 |

### 部署平台
| 平台 | 用途 |
|------|------|
| Vercel | 前端托管 |
| Supabase | 后端服务 |

---

## 3. 功能模块

### 3.1 社交模块
- 交友帖子发布/浏览
- 即时聊天
- 附近的人
- 兴趣小组

### 3.2 二手交易模块
- 商品发布/浏览
- 商品详情
- 收藏/购买
- 订单管理

### 3.3 资讯模块
- 本地资讯
- 旅游攻略
- 商家推荐

### 3.4 长寿风物模块
- 八大长寿特产专题
- 评论区互动
- 购买链接

### 3.5 用户模块
- 手机号登录/注册
- 个人资料
- 收藏管理
- 订单管理

---

## 4. 数据库结构

### 表清单

```sql
-- 用户资料表
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  nickname VARCHAR(50) NOT NULL,
  avatar TEXT,
  phone VARCHAR(20),
  bio TEXT,
  location VARCHAR(100),
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- 交友帖子表
CREATE TABLE dating_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  images JSONB DEFAULT '[]',
  gender VARCHAR(10),
  age_range VARCHAR(20),
  location VARCHAR(100),
  tags JSONB DEFAULT '[]',
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- 资讯文章表
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  category VARCHAR(50),
  tags JSONB DEFAULT '[]',
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- 二手商品表
CREATE TABLE secondhand_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER,
  images JSONB DEFAULT '[]',
  category VARCHAR(50),
  condition VARCHAR(20),
  location VARCHAR(100),
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  is_sold BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- 旅游商品表
CREATE TABLE tourism_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER,
  images JSONB DEFAULT '[]',
  category VARCHAR(50),
  location VARCHAR(100),
  duration VARCHAR(50),
  features JSONB DEFAULT '[]',
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  stock INTEGER DEFAULT 99,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- 订单表
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  product_id UUID NOT NULL,
  product_type VARCHAR(20) NOT NULL,
  quantity INTEGER DEFAULT 1,
  total_amount INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  contact_phone VARCHAR(20),
  contact_name VARCHAR(50),
  remark TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- 收藏表
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  item_id UUID NOT NULL,
  item_type VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 5. 页面清单

### 5.1 首页相关
| 页面 | 路由 | 说明 |
|------|------|------|
| 首页 | `/` | Banner、专区入口、导航 |
| 长寿故事 | `/longevity-stories` | 八大长寿风物专题 |
| 邻居推荐 | `/neighbor-recommendations` | 达人邻居严选 |
| 特产专区 | `/specialty` | 长寿特产展示 |
| 旅游服务 | `/tourism` | 旅游产品 |
| 平台规则 | `/rules` | 用户协议 |

### 5.2 社交模块
| 页面 | 路由 | 说明 |
|------|------|------|
| 交友广场 | `/dating` | 交友帖子列表 |
| 发布交友 | `/dating/publish` | 发布交友信息 |
| 资讯列表 | `/articles` | 资讯文章列表 |
| 文章详情 | `/articles/:id` | 文章详情 |

### 5.3 二手交易
| 页面 | 路由 | 说明 |
|------|------|------|
| 二手市场 | `/secondhand` | 商品列表 |
| 商品详情 | `/secondhand/:id` | 商品详情 |
| 发布商品 | `/secondhand/publish` | 发布二手商品 |

### 5.4 用户模块
| 页面 | 路由 | 说明 |
|------|------|------|
| 登录 | `/login` | 手机号登录 |
| 注册 | `/register` | 用户注册 |
| 个人中心 | `/profile` | 用户信息 |
| 编辑资料 | `/profile/edit` | 修改资料 |
| 我的收藏 | `/favorites` | 收藏列表 |
| 我的订单 | `/orders` | 订单管理 |

---

## 6. 核心内容

### 6.1 八大长寿风物

#### 1. 钟祥米茶
**定位**：明代御饮·六百年长寿密码

**传奇由来**：
- 宋元时期农耕智慧
- 明代明显陵工地风物
- 皇家文脉深度绑定

**特色**：无茶之名、有茶之韵，不添糖、不加料

**长寿价值**：健脾消食、清热祛湿、调和气血

---

#### 2. 钟祥盘龙菜
**定位**：嘉靖御赐·无宴不成席

**传奇由来**：
- 一波三折的帝王故事
- 绝境临身→行路困局→绝境逢生
- 助嘉靖帝登基

**特色**：古法蒸制、清润为本、荤素相融

**长寿价值**：温和养胃、补益气血、固本培元

---

#### 3. 丰乐河包子
**定位**：陀螺藏古味，御包润千秋

**传奇由来**：
- 宋代王府御用点心
- 嘉靖帝北上御封
- 黄酒老面自然发酵

**特色**：形似陀螺、色白如雪、松软清甜

---

#### 4. 转斗湾老酒
**定位**：汉江码头酿，纯粮养流年

**传奇由来**：
- 春秋郢州春酒古法
- 码头早酒养生民俗
- 纯粮固态发酵

**特色**：粮香醇厚、绵甜爽净、不上头

---

#### 5. 张集酥饼
**定位**：楚酥承军韵，一脆养烟火

**传奇由来**：
- 楚庄王北伐军粮
- 嘉靖帝御封长寿茶点
- 土缸倒挂烤制

**特色**：层层起酥、酥而不燥、油而不腻

---

#### 6. 石牌豆腐
**定位**：一方白玉豆香，千年温润长寿

**传奇由来**：
- 汉代先民开创
- 明代兴王府贡品
- 嘉靖帝白玉珍馐

**特色**：白嫩如玉、豆香纯粹、久煮不烂

---

#### 7. 葛根粉羹
**定位**：清热解毒、延年益寿

**特色**：野生葛根、古法制作、清热降火

---

#### 8. 长寿香米
**定位**：富硒土壤、粒粒精华

**特色**：世界长寿之乡核心产出

---

### 6.2 长寿故事文章

1. 《一陵千年文脉，一碗米香长寿》
2. 《钟祥米茶：明代御用的长寿秘密》
3. 《一波三折帝王路，一盘御味养流年》
4. 《盘龙菜：见证嘉靖登基的传奇御膳》
5. 《丰乐河包子：千年陀螺非遗烟火》
6. 《转斗湾老酒：汉江码头的早酒民俗》
7. 《张集酥饼：楚庄王军粮的千年传承》
8. 《石牌豆腐：白玉珍馐的养生智慧》

---

## 7. 部署指南

### 7.1 Supabase 配置

1. 创建 Supabase 项目
2. 获取 Project URL 和 anon key
3. 在 SQL Editor 执行数据库建表脚本
4. 配置 RLS 访问策略

### 7.2 Vercel 部署

1. 连接 GitHub 仓库
2. 配置构建命令
3. 添加环境变量
4. 部署上线

### 7.3 环境变量

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## 附录

### 联系方式
- GitHub：https://github.com/zxxub99/zxmcb

### 参考文档
- [部署指南](./DEPLOY_GUIDE.md)
- [Supabase 部署文档](./SUPABASE_DEPLOY.md)
- [Cloudflare Pages 部署](./CLOUDFLARE_PAGES.md)

---

*钟祥莫愁帮 - 让世界了解钟祥，让钟祥连接世界*
