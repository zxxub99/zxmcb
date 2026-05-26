from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.core import get_db
from app.models import IdleItem, User
from app.api.auth import get_current_user

router = APIRouter()


class IdleItemCreate(BaseModel):
    title: str
    description: str = ""
    category: str
    price: float = 0
    images: list[str] = []
    exchange_enabled: bool = True
    delivery_enabled: bool = False


class IdleItemResponse(BaseModel):
    id: int
    user_id: int
    title: str
    description: str
    category: str
    price: float
    images: list[str]
    exchange_enabled: bool
    delivery_enabled: bool
    status: str
    view_count: int
    favorite_count: int
    created_at: str

    class Config:
        from_attributes = True


@router.get("/")
def list_idle_items(
    category: str | None = None,
    status: str = "active",
    db: Session = Depends(get_db),
):
    """获取闲置物品列表"""
    query = db.query(IdleItem).filter(IdleItem.status == status)
    if category:
        query = query.filter(IdleItem.category == category)
    
    items = query.order_by(IdleItem.created_at.desc()).limit(50).all()
    return [IdleItemResponse.model_validate(item) for item in items]


@router.post("/")
def create_idle_item(
    item: IdleItemCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """发布闲置物品"""
    new_item = IdleItem(
        user_id=current_user.id,
        title=item.title,
        description=item.description,
        category=item.category,
        price=item.price,
        images=str(item.images),
        exchange_enabled=item.exchange_enabled,
        delivery_enabled=item.delivery_enabled,
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return {"message": "发布成功", "item_id": new_item.id}


@router.get("/{item_id}")
def get_idle_item(item_id: int, db: Session = Depends(get_db)):
    """获取闲置物品详情"""
    item = db.query(IdleItem).filter(IdleItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="物品不存在")
    
    # 增加浏览量
    item.view_count += 1
    db.commit()
    
    return IdleItemResponse.model_validate(item)


@router.put("/{item_id}/status")
def update_item_status(
    item_id: int,
    status: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """更新物品状态"""
    item = db.query(IdleItem).filter(IdleItem.id == item_id, IdleItem.user_id == current_user.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="物品不存在或无权限")
    
    item.status = status
    db.commit()
    return {"message": "状态更新成功"}
