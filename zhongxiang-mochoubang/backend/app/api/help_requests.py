from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.core import get_db
from app.models import HelpRequest, User
from app.api.auth import get_current_user

router = APIRouter()


class HelpRequestCreate(BaseModel):
    title: str
    description: str = ""
    category: str  # 维修/咨询/劳办/技术
    urgent: bool = False


class HelpRequestResponse(BaseModel):
    id: int
    user_id: int
    title: str
    description: str
    category: str
    urgent: bool
    status: str
    helper_id: int | None
    created_at: str

    class Config:
        from_attributes = True


@router.get("/")
def list_help_requests(
    category: str | None = None,
    status: str = "open",
    db: Session = Depends(get_db),
):
    """获取互助请求列表"""
    query = db.query(HelpRequest).filter(HelpRequest.status == status)
    if category:
        query = query.filter(HelpRequest.category == category)
    
    requests = query.order_by(HelpRequest.created_at.desc()).limit(50).all()
    return [HelpRequestResponse.model_validate(req) for req in requests]


@router.post("/")
def create_help_request(
    request_data: HelpRequestCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """发布互助请求"""
    new_request = HelpRequest(
        user_id=current_user.id,
        title=request_data.title,
        description=request_data.description,
        category=request_data.category,
        urgent=request_data.urgent,
    )
    db.add(new_request)
    db.commit()
    db.refresh(new_request)
    return {"message": "发布成功", "request_id": new_request.id}


@router.get("/{request_id}")
def get_help_request(request_id: int, db: Session = Depends(get_db)):
    """获取互助请求详情"""
    request = db.query(HelpRequest).filter(HelpRequest.id == request_id).first()
    if not request:
        raise HTTPException(status_code=404, detail="请求不存在")
    return HelpRequestResponse.model_validate(request)


@router.post("/{request_id}/accept")
def accept_help_request(
    request_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """接受互助请求（接单）"""
    request = db.query(HelpRequest).filter(HelpRequest.id == request_id, HelpRequest.status == "open").first()
    if not request:
        raise HTTPException(status_code=404, detail="请求不存在或已被接单")
    
    if request.user_id == current_user.id:
        raise HTTPException(status_code=400, detail="不能接自己的请求")
    
    request.helper_id = current_user.id
    request.status = "accepted"
    db.commit()
    return {"message": "接单成功"}


@router.post("/{request_id}/complete")
def complete_help_request(
    request_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """完成互助请求"""
    request = db.query(HelpRequest).filter(
        HelpRequest.id == request_id,
        HelpRequest.helper_id == current_user.id
    ).first()
    if not request:
        raise HTTPException(status_code=404, detail="请求不存在或无权操作")
    
    request.status = "completed"
    db.commit()
    return {"message": "请求已完成"}
