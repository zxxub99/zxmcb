"""
认证相关API
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.core import get_db
from app.core.security import create_access_token
from app.models import User

router = APIRouter()


def get_current_user(
    authorization: str | None = None,
    db: Session = Depends(get_db)
) -> User:
    """获取当前登录用户"""
    # 模拟实现，实际应从security模块导入
    if not authorization:
        raise HTTPException(status_code=401, detail="未授权")
    
    # 简化的模拟用户获取
    # 实际应验证token并查询数据库
    return None


class RegisterRequest(BaseModel):
    phone: str
    password: str
    nickname: str | None = None


class LoginRequest(BaseModel):
    phone: str
    password: str


class AuthResponse(BaseModel):
    access_token: str
    token_type: str
    user_id: int
    nickname: str


@router.post("/register", response_model=AuthResponse)
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    """用户注册"""
    # 检查手机号是否已注册
    existing = db.query(User).filter(User.phone == request.phone).first()
    if existing:
        raise HTTPException(status_code=400, detail="手机号已注册")
    
    # 创建新用户
    user = User(
        phone=request.phone,
        password_hash=request.password,  # 简化，实际应加密
        nickname=request.nickname or f"用户{request.phone[-4:]}",
        level="newbie",
        star="2"
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    token = create_access_token(user.id)
    return AuthResponse(
        access_token=token,
        token_type="bearer",
        user_id=user.id,
        nickname=user.nickname
    )


@router.post("/login", response_model=AuthResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    """用户登录"""
    user = db.query(User).filter(User.phone == request.phone).first()
    if not user:
        raise HTTPException(status_code=401, detail="手机号或密码错误")
    
    # 简化密码校验
    if user.password_hash != request.password:
        raise HTTPException(status_code=401, detail="手机号或密码错误")
    
    token = create_access_token(user.id)
    return AuthResponse(
        access_token=token,
        token_type="bearer",
        user_id=user.id,
        nickname=user.nickname
    )


@router.get("/me")
def get_current_user_info(
    db: Session = Depends(get_db),
    auth: str | None = None
):
    """获取当前用户信息"""
    # 模拟实现
    return {
        "id": 1,
        "nickname": "测试用户",
        "phone": "138****8888",
        "avatar": None,
        "gender": "保密",
        "level": "newbie",
        "star": "2",
        "points": 50,
        "is_verified": False,
        "bio": "这个人很懒，什么都没写",
        "town": "郢中街道",
        "village": None,
    }


@router.post("/logout")
def logout():
    """退出登录"""
    return {"message": "退出成功"}
