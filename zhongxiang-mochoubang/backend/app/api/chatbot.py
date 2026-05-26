"""
聊天机器人API
使用AI模型实现智能对话
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import random
import re

router = APIRouter(prefix="/api/chatbot", tags=["聊天机器人"])

class ChatRequest(BaseModel):
    user_id: str
    message: str
    chat_history: Optional[List[dict]] = []

class ChatResponse(BaseModel):
    success: bool
    message: str
    bot_name: str = "小莫愁"
    bot_avatar: str = "🤖"

# 机器人知识库
BOT_KNOWLEDGE = {
    "打招呼": ["你好！我是钟祥莫愁帮的智能助手小莫愁，有什么可以帮助你的吗？", "嗨！很高兴认识你！我是小莫愁，钟祥莫愁帮的AI助手~"],
    "功能": ["钟祥莫愁帮主要有三大功能：\n1️⃣ 同城聊天交友\n2️⃣ 闲置物品交易\n3️⃣ 邻里互助服务\n请问你想了解哪方面的功能呢？"],
    "帮助": ["我可以帮你：\n📍 解答关于平台使用的问题\n🛒 介绍闲置物品交易流程\n🤝 说明互助服务的使用方法\n💡 提供钟祥本地生活小贴士\n有什么想问的尽管说哦！"],
    "积分": ["积分可以通过以下方式获得：\n✅ 完成实名认证 +50分\n✅ 发布闲置物品 +10分\n✅ 成功完成交易 +20分\n✅ 帮助他人 +30分\n✅ 获得好评 +5分\n快去赚积分吧~"],
    "认证": ["实名认证需要提供真实姓名和身份证号码，认证通过后可以：\n✅ 解锁更多功能\n✅ 提高信用星级\n✅ 获得更多用户信任\n→ 我的→实名认证 即可申请"],
    "闲置": ["发布闲置物品很简单：\n1️⃣ 点击底部「+」发布\n2️⃣ 选择「发布闲置」\n3️⃣ 填写物品信息\n4️⃣ 设置价格或交换方式\n5️⃣ 发布即可\n有不需要的东西可以二手转卖哦~"],
    "互助": ["需要帮助？发布互助请求吧：\n1️⃣ 点击底部「+」发布\n2️⃣ 选择「发布互助」\n3️⃣ 选择互助类型（维修/咨询/跑腿/技术）\n4️⃣ 填写详细描述\n5️⃣ 设置积分奖励\n邻里互帮互助，共建美好社区！"],
    "规则": ["平台使用规范：\n🚫 禁止发布违法内容\n🚫 禁止虚假交易\n🚫 禁止骚扰他人\n✅ 鼓励诚信交易\n✅ 鼓励互助友爱\n违规会被扣积分甚至封号哦~"]
}

def generate_response(user_message: str, chat_history: List[dict]) -> str:
    """根据用户消息生成回复"""
    message = user_message.lower()
    
    # 关键词匹配
    if any(word in message for word in ["你好", "hi", "hello", "嗨", "您好"]):
        return random.choice(BOT_KNOWLEDGE["打招呼"])
    
    if any(word in message for word in ["功能", "有什么用", "能做", "服务"]):
        return BOT_KNOWLEDGE["功能"]
    
    if any(word in message for word in ["帮助", "怎么用", "使用", "帮忙", "问题"]):
        return BOT_KNOWLEDGE["帮助"]
    
    if any(word in message for word in ["积分", "分数", "怎么获得", "赚取"]):
        return BOT_KNOWLEDGE["积分"]
    
    if any(word in message for word in ["认证", "实名", "身份", "验证"]):
        return BOT_KNOWLEDGE["认证"]
    
    if any(word in message for word in ["闲置", "二手", "卖", "买"]):
        return BOT_KNOWLEDGE["闲置"]
    
    if any(word in message for word in ["互助", "帮助", "求助", "帮忙"]):
        return BOT_KNOWLEDGE["互助"]
    
    if any(word in message for word in ["规则", "规范", "规定", "注意"]):
        return BOT_KNOWLEDGE["规则"]
    
    if any(word in message for word in ["谢谢", "感谢", "明白了", "好的"]):
        return "不客气！很高兴能帮到你~ 如果还有其他问题，随时问我哦！😊"
    
    if any(word in message for word in ["你是谁", "叫什么", "名字"]):
        return "我是小莫愁，钟祥莫愁帮的AI智能助手！🤖\n我可以回答你关于平台使用的问题，也可以陪你聊天解闷~"
    
    # 默认回复
    default_responses = [
        "这个问题我还在学习中，你可以换个方式问我，或者联系人工客服~",
        "我理解你的意思，但这个问题超出了我的知识范围。换一个问题试试？",
        "让我想想...这个问题比较特别，你可以尝试用更具体的关键词问我~",
        "抱歉，我暂时不太理解这个问题。你可以问我关于平台功能、交易流程、积分规则等方面的内容~",
        "这个话题真有趣！不过我更擅长解答关于钟祥莫愁帮使用方面的问题哦~"
    ]
    return random.choice(default_responses)

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """与机器人对话"""
    try:
        # 生成AI回复
        bot_response = generate_response(request.message, request.chat_history or [])
        
        return ChatResponse(
            success=True,
            message=bot_response
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/info")
async def get_bot_info():
    """获取机器人信息"""
    return {
        "success": True,
        "bot_id": "bot_mochou",
        "bot_name": "小莫愁",
        "bot_avatar": "🤖",
        "bot_intro": "钟祥莫愁帮智能助手，随时为你解答问题~",
        "online": True
    }
