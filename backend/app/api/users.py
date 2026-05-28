"""
用户相关API
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from app.core import get_db
from app.models import User

router = APIRouter()


class ProfileUpdate(BaseModel):
    nickname: Optional[str] = None
    avatar: Optional[str] = None
    bio: Optional[str] = None
    gender: Optional[str] = None
    town: Optional[str] = None


@router.get("/nearby")
def get_nearby_users(
    lat: float | None = None,
    lng: float | None = None,
    db: Session = Depends(get_db),
):
    """获取附近用户"""
    # TODO: 实现基于地理位置的附近用户查询
    # 暂时返回模拟数据
    return [
        {
            "id": 1,
            "nickname": "张大哥",
            "gender": "male",
            "avatar": None,
            "town": "郢中街道",
            "level": "excellent",
            "star": "4",
            "interests": ["维修", "摄影"],
            "lastActive": "刚刚",
        },
        {
            "id": 2,
            "nickname": "李阿姨",
            "gender": "female",
            "avatar": None,
            "town": "皇城社区",
            "level": "elite",
            "star": "5",
            "interests": ["家政", "园艺"],
            "lastActive": "5分钟前",
        },
        {
            "id": 3,
            "nickname": "王师傅",
            "gender": "male",
            "avatar": None,
            "town": "磷矿镇",
            "level": "excellent",
            "star": "4",
            "interests": ["维修", "数码"],
            "lastActive": "1小时前",
        },
    ]


@router.get("/{user_id}")
def get_user_profile(user_id: int, db: Session = Depends(get_db)):
    """获取用户详情"""
    # 简化实现
    return {
        "id": user_id,
        "nickname": "张大哥",
        "gender": "male",
        "avatar": None,
        "town": "郢中街道",
        "level": "excellent",
        "star": "4",
    }


@router.put("/profile")
def update_profile(
    profile: ProfileUpdate,
    db: Session = Depends(get_db),
):
    """更新个人资料"""
    # 简化实现
    return {"message": "资料更新成功"}


@router.get("/{user_id}/detail")
def get_user_detail(user_id: int, db: Session = Depends(get_db)):
    """获取用户完整详情"""
    # 简化实现
    return {
        "id": user_id,
        "nickname": "张大哥",
        "avatar": None,
        "gender": "male",
        "age": 45,
        "town": "郢中街道",
        "village": "皇城社区",
        "level": "excellent",
        "star": "4",
        "bio": "热爱生活，乐于助人。擅长维修家电。",
        "interests": ["维修", "摄影", "园艺"],
        "creditScore": 680,
        "transactionCount": 15,
        "helpCount": 28,
        "goodReviewRate": 0.96,
        "lastActive": "刚刚",
        "distance": 1.2,
    }
