"""
AI润色服务API
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import os

router = APIRouter(prefix="/api/ai", tags=["AI"])

class PolishRequest(BaseModel):
    text: str
    type: str = "general"  # general, title, description

class PolishResponse(BaseModel):
    original: str
    polished: str
    suggestions: Optional[list] = None

@router.post("/polish", response_model=PolishResponse)
async def polish_text(request: PolishRequest):
    """
    AI文本润色API
    - 将用户输入的文本进行AI润色
    - 支持标题、描述等不同类型的内容润色
    """
    if not request.text or len(request.text.strip()) < 2:
        raise HTTPException(status_code=400, detail="文本内容太短，无法润色")
    
    if len(request.text) > 2000:
        raise HTTPException(status_code=400, detail="文本内容过长，请控制在2000字以内")
    
    # 在实际部署时，这里会调用LLM API进行润色
    # 目前返回模拟的润色结果
    polished_text = request.text
    
    # 模拟润色处理
    # 移除多余的空格
    polished_text = ' '.join(polished_text.split())
    
    # 简单的润色规则（实际使用时替换为LLM调用）
    if request.type == "title":
        # 标题润色：保持简短，突出重点
        if not polished_text.endswith(('!', '?', '。')):
            if len(polished_text) > 20:
                polished_text = polished_text[:18] + "..."
    elif request.type == "description":
        # 描述润色：补充完整句子
        if not polished_text.endswith(('!', '?', '。', ',', '，', '、')):
            polished_text = polished_text + "。"
    else:
        # 通用润色：确保首字母大写，标点完整
        if polished_text and polished_text[0].islower():
            polished_text = polished_text[0].upper() + polished_text[1:]
    
    return PolishResponse(
        original=request.text,
        polished=polished_text,
        suggestions=None
    )
