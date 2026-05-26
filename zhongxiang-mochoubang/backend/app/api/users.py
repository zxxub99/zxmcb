from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core import get_db
from app.models import User
from app.api.auth import get_current_user

router = APIRouter()


@router.get("/nearby")
def get_nearby_users(
    lat: float | None = None,
    lng: float | None = None,
    db: Session = Depends(get_db),
):
    """获取附近用户"""
    # TODO: 实现基于地理位置的附近用户查询
    users = db.query(User).filter(User.is_active == True).limit(20).all()
    return [
        {
            "id": u.id,
            "nickname": u.nickname,
            "gender": u.gender,
            "avatar": u.avatar,
            "town": u.town,
            "level": u.level.value,
            "star": u.star.value,
        }
        for u in users
    ]


@router.get("/{user_id}")
def get_user_profile(user_id: int, db: Session = Depends(get_db)):
    """获取用户详情（简化版，真实实现需要权限校验）"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")
    
    # 默认只显示性别，其他信息需要解锁
    return {
        "id": user.id,
        "nickname": user.nickname,
        "gender": user.gender,
        "avatar": user.avatar,
    }


@router.put("/profile")
def update_profile(
    nickname: str | None = None,
    avatar: str | None = None,
    bio: str | None = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """更新个人资料"""
    if nickname:
        current_user.nickname = nickname
    if avatar:
        current_user.avatar = avatar
    if bio:
        current_user.bio = bio
    
    db.commit()
    return {"message": "资料更新成功"}


@router.get("/{user_id}/unlock")
def unlock_user_info(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """解锁用户完整信息（点赞或送礼）"""
    target_user = db.query(User).filter(User.id == user_id).first()
    if not target_user:
        raise HTTPException(status_code=404, detail="用户不存在")
    
    # TODO: 实现点赞/送礼逻辑
    # 根据用户zone决定解密方式
    if current_user.zone.value == "normal":
        # 普通用户：点赞解锁
        pass
    else:
        # 高阶用户：积分送礼解锁
        pass
    
    return {
        "id": target_user.id,
        "nickname": target_user.nickname,
        "gender": target_user.gender,
        "avatar": target_user.avatar,
        "bio": target_user.bio,
        "town": target_user.town,
        "level": target_user.level.value,
        "star": target_user.star.value,
    }
