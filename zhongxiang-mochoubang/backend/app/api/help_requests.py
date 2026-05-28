"""
互助请求相关API
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.core import get_db
from app.models import HelpRequest, User
from app.api.auth import get_current_user

router = APIRouter()


class HelpRequestCreate(BaseModel):
    title: str
    description: str
    help_type: str  # repair, consult, errand, technical
    urgent: bool = False
    reward: int = 0
    location: Optional[str] = None


class HelpRequestUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    urgent: Optional[bool] = None
    reward: Optional[int] = None
    status: Optional[str] = None


class HelpResponseCreate(BaseModel):
    message: str


@router.get("/")
def get_help_requests(
    help_type: Optional[str] = None,
    urgent_only: bool = False,
    sort: str = "latest",  # latest, reward, urgent
    page: int = 1,
    page_size: int = 20,
    db: Session = Depends(get_db),
):
    """获取互助请求列表"""
    query = db.query(HelpRequest).filter(HelpRequest.status == "open")
    
    if help_type:
        query = query.filter(HelpRequest.help_type == help_type)
    
    if urgent_only:
        query = query.filter(HelpRequest.urgent == True)
    
    if sort == "latest":
        query = query.order_by(HelpRequest.created_at.desc())
    elif sort == "reward":
        query = query.order_by(HelpRequest.reward.desc())
    elif sort == "urgent":
        query = query.order_by(HelpRequest.urgent.desc())
    
    total = query.count()
    requests = query.offset((page - 1) * page_size).limit(page_size).all()
    
    return {
        "total": total,
        "page": page,
        "page_size": page_size,
        "items": [
            {
                "id": req.id,
                "title": req.title,
                "help_type": req.help_type,
                "urgent": req.urgent,
                "reward": req.reward,
                "location": req.location,
                "created_at": req.created_at.isoformat(),
                "publisher": {
                    "id": req.publisher.id,
                    "nickname": req.publisher.nickname,
                    "avatar": req.publisher.avatar,
                    "star": req.publisher.star.value,
                }
            }
            for req in requests
        ]
    }


@router.get("/{request_id}")
def get_help_request_detail(request_id: int, db: Session = Depends(get_db)):
    """获取互助请求详情"""
    req = db.query(HelpRequest).filter(HelpRequest.id == request_id).first()
    if not req:
        raise HTTPException(status_code=404, detail="请求不存在")
    
    # 增加浏览次数
    req.view_count += 1
    db.commit()
    
    return {
        "id": req.id,
        "title": req.title,
        "description": req.description,
        "help_type": req.help_type,
        "urgent": req.urgent,
        "reward": req.reward,
        "location": req.location,
        "view_count": req.view_count,
        "status": req.status,
        "created_at": req.created_at.isoformat(),
        "publisher": {
            "id": req.publisher.id,
            "nickname": req.publisher.nickname,
            "avatar": req.publisher.avatar,
            "star": req.publisher.star.value,
            "town": req.publisher.town,
        }
    }


@router.post("/")
def create_help_request(
    request_data: HelpRequestCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """发布互助请求"""
    new_request = HelpRequest(
        title=request_data.title,
        description=request_data.description,
        help_type=request_data.help_type,
        urgent=request_data.urgent,
        reward=request_data.reward,
        location=request_data.location,
        publisher_id=current_user.id,
        status="open"
    )
    db.add(new_request)
    
    # 增加用户积分
    current_user.points += 5
    
    db.commit()
    db.refresh(new_request)
    
    return {"id": new_request.id, "message": "发布成功"}


@router.post("/{request_id}/respond")
def respond_to_help_request(
    request_id: int,
    response: HelpResponseCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """响应互助请求"""
    req = db.query(HelpRequest).filter(HelpRequest.id == request_id).first()
    if not req:
        raise HTTPException(status_code=404, detail="请求不存在")
    
    if req.publisher_id == current_user.id:
        raise HTTPException(status_code=400, detail="不能响应自己的请求")
    
    if req.status != "open":
        raise HTTPException(status_code=400, detail="该请求已关闭")
    
    # TODO: 创建响应记录
    # 这里简化处理，实际应创建HelpResponse记录
    
    return {
        "message": "响应成功",
        "helper_id": current_user.id,
        "helper_nickname": current_user.nickname
    }


@router.put("/{request_id}/complete")
def complete_help_request(
    request_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """完成互助请求"""
    req = db.query(HelpRequest).filter(HelpRequest.id == request_id).first()
    if not req:
        raise HTTPException(status_code=404, detail="请求不存在")
    
    if req.publisher_id != current_user.id:
        raise HTTPException(status_code=403, detail="只有发布者可以标记完成")
    
    req.status = "completed"
    
    # TODO: 奖励帮助者积分
    # TODO: 双方互评
    
    db.commit()
    return {"message": "已标记完成"}


@router.delete("/{request_id}")
def delete_help_request(
    request_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """删除互助请求"""
    req = db.query(HelpRequest).filter(HelpRequest.id == request_id).first()
    if not req:
        raise HTTPException(status_code=404, detail="请求不存在")
    
    if req.publisher_id != current_user.id:
        raise HTTPException(status_code=403, detail="无权删除")
    
    req.status = "deleted"
    db.commit()
    return {"message": "删除成功"}
