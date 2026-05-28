from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.core import get_db
from app.models import Message, User
from app.api.auth import get_current_user

router = APIRouter()


class MessageCreate(BaseModel):
    to_user_id: int
    content: str
    message_type: str = "text"


class MessageResponse(BaseModel):
    id: int
    from_user_id: int
    to_user_id: int
    content: str
    message_type: str
    is_read: bool
    created_at: str

    class Config:
        from_attributes = True


@router.get("/conversations")
def get_conversations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """获取会话列表"""
    # 获取与当前用户相关的最新消息
    subquery = db.query(
        Message.to_user_id,
        Message.from_user_id
    ).filter(
        (Message.to_user_id == current_user.id) | (Message.from_user_id == current_user.id)
    ).distinct()
    
    # 获取所有对话用户
    user_ids = set()
    for msg in db.query(Message).filter(
        (Message.to_user_id == current_user.id) | (Message.from_user_id == current_user.id)
    ).all():
        user_ids.add(msg.to_user_id if msg.from_user_id == current_user.id else msg.from_user_id)
    
    conversations = []
    for user_id in user_ids:
        user = db.query(User).filter(User.id == user_id).first()
        if user:
            last_msg = db.query(Message).filter(
                ((Message.from_user_id == current_user.id) & (Message.to_user_id == user_id)) |
                ((Message.from_user_id == user_id) & (Message.to_user_id == current_user.id))
            ).order_by(Message.created_at.desc()).first()
            
            unread_count = db.query(Message).filter(
                Message.from_user_id == user_id,
                Message.to_user_id == current_user.id,
                Message.is_read == False
            ).count()
            
            conversations.append({
                "user_id": user.id,
                "nickname": user.nickname,
                "avatar": user.avatar,
                "last_message": last_msg.content if last_msg else "",
                "last_time": str(last_msg.created_at) if last_msg else "",
                "unread_count": unread_count,
            })
    
    return sorted(conversations, key=lambda x: x["last_time"], reverse=True)


@router.get("/{user_id}")
def get_messages(
    user_id: int,
    limit: int = Query(default=50, le=100),
    offset: int = 0,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """获取与某用户的聊天记录"""
    messages = db.query(Message).filter(
        ((Message.from_user_id == current_user.id) & (Message.to_user_id == user_id)) |
        ((Message.from_user_id == user_id) & (Message.to_user_id == current_user.id))
    ).order_by(Message.created_at.desc()).offset(offset).limit(limit).all()
    
    # 标记已读
    db.query(Message).filter(
        Message.from_user_id == user_id,
        Message.to_user_id == current_user.id,
        Message.is_read == False
    ).update({"is_read": True})
    db.commit()
    
    return [MessageResponse.model_validate(msg) for msg in reversed(messages)]


@router.post("/")
def send_message(
    message_data: MessageCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """发送消息"""
    # 验证接收者存在
    target_user = db.query(User).filter(User.id == message_data.to_user_id).first()
    if not target_user:
        raise HTTPException(status_code=404, detail="用户不存在")
    
    message = Message(
        from_user_id=current_user.id,
        to_user_id=message_data.to_user_id,
        content=message_data.content,
        message_type=message_data.message_type,
    )
    db.add(message)
    db.commit()
    db.refresh(message)
    
    return {"message": "发送成功", "msg_id": message.id}
