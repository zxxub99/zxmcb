"""
安全相关工具函数
"""
from fastapi import HTTPException, Depends, Header
from sqlalchemy.orm import Session
from app.core import get_db
from app.models import User

# 简化的模拟用户存储（生产环境应使用真实数据库和JWT）
_mock_tokens = {}


def create_access_token(user_id: int) -> str:
    """创建访问令牌"""
    import secrets
    token = f"token_{user_id}_{secrets.token_hex(16)}"
    _mock_tokens[token] = user_id
    return token


def verify_token(token: str) -> int | None:
    """验证令牌并返回用户ID"""
    return _mock_tokens.get(token)
