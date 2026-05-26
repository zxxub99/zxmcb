# 钟祥莫愁帮 - 开发规范与经验

## 项目概述

钟祥莫愁帮是钟祥市域专属的本地综合服务社交平台，聚合三大核心功能：同城交友、邻里互助、闲置交易。

## 技术栈

| 模块 | 技术 | 版本 |
|------|------|------|
| 前端框架 | React | 18.x |
| 构建工具 | Vite | 5.x |
| 后端框架 | FastAPI | 0.109+ |
| 数据库 | MySQL | 8.x |
| ORM | SQLAlchemy | 2.x |
| 包管理(前端) | pnpm | - |
| 包管理(后端) | uv | - |

## 目录结构

```
zhongxiang-mochoubang/
├── frontend/                    # 前端项目
│   ├── src/
│   │   ├── components/          # 公共组件
│   │   ├── pages/               # 页面组件
│   │   ├── hooks/               # 自定义Hooks
│   │   ├── services/            # API服务
│   │   ├── stores/              # 状态管理
│   │   ├── types/               # TypeScript类型
│   │   └── utils/                # 工具函数
│   ├── public/                  # 静态资源
│   └── package.json
├── backend/                     # 后端项目
│   ├── app/
│   │   ├── api/                 # API路由
│   │   ├── models/              # 数据模型
│   │   ├── schemas/             # Pydantic模型
│   │   ├── services/            # 业务逻辑
│   │   ├── core/                # 核心配置
│   │   └── main.py              # 应用入口
│   ├── pyproject.toml
│   └── requirements.txt
└── docs/                        # 文档
```

## 核心规则

### 用户准入体系
1. **属地锁定** - 手机号注册，强制锁定钟祥市域范围
2. **AI实名认证** - 身份证核验
3. **个人档案完善** - 常驻乡镇、兴趣、技能等

### 用户分区
- **普通用户**：点赞解密，3天延迟匹配，3星上限
- **高阶用户**：积分送礼解密，实时匹配，5星权限

### 积分体系
- 积分永久不清零
- 通过活跃、互助、交易、文明社交获取
- 用于升级、解锁特权

### 信用星级
- 5星梯度：1星(失信) → 5星(精英)
- 综合评分 = 双向评价70% + 平台活跃30%

### 匹配算法
```
匹配优先级权重 = 信用星级50% + 同城距离30% + 需求适配度20%
```

## 开发规范

### API设计
- RESTful风格
- 统一响应格式：`{code, message, data}`
- 错误码规范：1xxx(参数) 2xxx(业务) 5xxx(系统)

### 数据库设计
- 使用SQLAlchemy ORM
- 所有表必须有created_at, updated_at
- 敏感数据需加密存储

### 安全要求
- 用户实名信息全程脱敏加密
- 聊天记录、交易记录全程留痕
- 严格敏感词过滤

## 预览链路

### 预览配置
- **端口**: 5000 (必须)
- **绑定地址**: 0.0.0.0 (IPv4全接口)
- **技术栈**: React + Vite

### 预览命令
```bash
cd frontend && pnpm exec vite --host 0.0.0.0 --port 5000
```

### .coze配置
- 根`.coze`: `/workspace/projects/.coze`
- 子项目`.coze`: `/workspace/projects/zhongxiang-mochoubang/.coze`
- 预览脚本: `zhongxiang-mochoubang/frontend/scripts/coze-preview-run.sh`

### 常见问题
- 端口被占用：使用 `fuser -k 5000/tcp` 清理
- 预览打不开：确认通过Coze平台预览功能访问

## 常见问题

### 中老年用户体验
- 界面简洁，字体适中
- 操作流程简化
- 关键功能有引导提示

### 隐私保护
- 用户主页默认仅显示性别
- 其他信息需解锁查看
- 权限严格管控

## 外部依赖

### 数据库服务
- 开发环境：PlanetScale (MySQL)
- 账户凭据：见环境变量

### 部署平台
- 前端：Vercel
- 后端：Railway
