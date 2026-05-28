from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
from app.api import auth, users, idle_items, help_requests, messages

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="钟祥莫愁帮 - 本地社交互助闲置平台API",
)

# CORS配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境应限制
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(auth.router, prefix="/api/auth", tags=["认证"])
app.include_router(users.router, prefix="/api/users", tags=["用户"])
app.include_router(idle_items.router, prefix="/api/idle-items", tags=["闲置物品"])
app.include_router(help_requests.router, prefix="/api/help-requests", tags=["互助请求"])
app.include_router(messages.router, prefix="/api/messages", tags=["消息"])


@app.get("/")
async def root():
    return {"message": "欢迎使用钟祥莫愁帮API", "version": settings.app_version}


@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}
