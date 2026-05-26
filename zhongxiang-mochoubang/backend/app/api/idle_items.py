"""
闲置物品相关API
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.core import get_db
from app.models import IdleItem, User
from app.api.auth import get_current_user

router = APIRouter()


class IdleItemCreate(BaseModel):
    title: str
    description: str
    category: str
    price: float | None = None
    condition: int = 100
    images: list[str] = []
    exchange_type: str = "sell"  # sell, exchange, free


class IdleItemUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    condition: Optional[int] = None
    images: Optional[list[str]] = None
    status: Optional[str] = None


@router.get("/")
def get_idle_items(
    category: Optional[str] = None,
    sort: str = "latest",  # latest, price_asc, price_desc, hot
    page: int = 1,
    page_size: int = 20,
    db: Session = Depends(get_db),
):
    """获取闲置物品列表"""
    query = db.query(IdleItem).filter(IdleItem.status == "active")
    
    if category:
        query = query.filter(IdleItem.category == category)
    
    if sort == "latest":
        query = query.order_by(IdleItem.created_at.desc())
    elif sort == "price_asc":
        query = query.order_by(IdleItem.price.asc())
    elif sort == "price_desc":
        query = query.order_by(IdleItem.price.desc())
    elif sort == "hot":
        query = query.order_by(IdleItem.view_count.desc())
    
    total = query.count()
    items = query.offset((page - 1) * page_size).limit(page_size).all()
    
    return {
        "total": total,
        "page": page,
        "page_size": page_size,
        "items": [
            {
                "id": item.id,
                "title": item.title,
                "price": item.price,
                "category": item.category,
                "condition": item.condition,
                "image": item.images[0] if item.images else None,
                "view_count": item.view_count,
                "created_at": item.created_at.isoformat(),
                "seller": {
                    "id": item.seller.id,
                    "nickname": item.seller.nickname,
                    "avatar": item.seller.avatar,
                    "star": item.seller.star.value,
                }
            }
            for item in items
        ]
    }


@router.get("/{item_id}")
def get_idle_item_detail(item_id: int, db: Session = Depends(get_db)):
    """获取闲置物品详情"""
    item = db.query(IdleItem).filter(IdleItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="物品不存在")
    
    # 增加浏览次数
    item.view_count += 1
    db.commit()
    
    return {
        "id": item.id,
        "title": item.title,
        "description": item.description,
        "category": item.category,
        "price": item.price,
        "condition": item.condition,
        "images": item.images,
        "exchange_type": item.exchange_type,
        "view_count": item.view_count,
        "status": item.status,
        "created_at": item.created_at.isoformat(),
        "seller": {
            "id": item.seller.id,
            "nickname": item.seller.nickname,
            "avatar": item.seller.avatar,
            "star": item.seller.star.value,
            "town": item.seller.town,
        }
    }


@router.post("/")
def create_idle_item(
    item: IdleItemCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """发布闲置物品"""
    new_item = IdleItem(
        title=item.title,
        description=item.description,
        category=item.category,
        price=item.price,
        condition=item.condition,
        images=item.images,
        exchange_type=item.exchange_type,
        seller_id=current_user.id,
        status="active"
    )
    db.add(new_item)
    
    # 增加用户积分
    current_user.points += 5
    
    db.commit()
    db.refresh(new_item)
    
    return {"id": new_item.id, "message": "发布成功"}


@router.put("/{item_id}")
def update_idle_item(
    item_id: int,
    item_update: IdleItemUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """更新闲置物品"""
    item = db.query(IdleItem).filter(IdleItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="物品不存在")
    
    if item.seller_id != current_user.id:
        raise HTTPException(status_code=403, detail="无权修改")
    
    for key, value in item_update.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    
    db.commit()
    return {"message": "更新成功"}


@router.delete("/{item_id}")
def delete_idle_item(
    item_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """删除闲置物品"""
    item = db.query(IdleItem).filter(IdleItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="物品不存在")
    
    if item.seller_id != current_user.id:
        raise HTTPException(status_code=403, detail="无权删除")
    
    item.status = "deleted"
    db.commit()
    return {"message": "删除成功"}
