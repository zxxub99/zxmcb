from sqlalchemy import Column, Integer, String, Text, Float, DateTime, Boolean, Enum as SQLEnum
from sqlalchemy.sql import func
from app.core.database import Base
import enum


class UserLevel(str, enum.Enum):
    """用户等级"""
    NEWBIE = "newbie"      # 新锐用户 Lv1
    EXCELLENT = "excellent"  # 优秀用户 Lv2
    ELITE = "elite"        # 精英用户 Lv3


class UserStar(str, enum.Enum):
    """信用星级"""
    ONE = "1"   # 失信/新手
    TWO = "2"   # 普通基础
    THREE = "3" # 优质普通
    FOUR = "4"  # 优秀高阶
    FIVE = "5"  # 精英顶级


class UserZone(str, enum.Enum):
    """用户分区"""
    NORMAL = "normal"  # 普通用户
    ADVANCED = "advanced"  # 高阶用户


class User(Base):
    """用户模型"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    
    # 账户信息
    phone = Column(String(11), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    
    # 实名信息 (加密存储)
    real_name_encrypted = Column(String(512), nullable=True)
    id_card_encrypted = Column(String(512), nullable=True)
    
    # 基础资料
    nickname = Column(String(50), nullable=False)
    avatar = Column(String(500), default="")
    gender = Column(String(10), nullable=False)  # male/female/secret
    bio = Column(Text, default="")
    
    # 属地信息
    town = Column(String(100), nullable=True)  # 乡镇
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    
    # 权限与等级
    level = Column(SQLEnum(UserLevel), default=UserLevel.NEWBIE)
    star = Column(SQLEnum(UserStar), default=UserStar.TWO)
    zone = Column(SQLEnum(UserZone), default=UserZone.NORMAL)
    
    # 积分
    points = Column(Integer, default=0)
    
    # 认证状态
    is_verified = Column(Boolean, default=False)  # 实名认证
    is_location_locked = Column(Boolean, default=False)  # 属地锁定
    
    # 统计
    login_count = Column(Integer, default=0)
    last_login_at = Column(DateTime(timezone=True), nullable=True)
    
    # 状态
    is_active = Column(Boolean, default=True)
    is_banned = Column(Boolean, default=False)
    
    # 时间戳
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class IdleItem(Base):
    """闲置物品模型"""
    __tablename__ = "idle_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    
    # 物品信息
    title = Column(String(200), nullable=False)
    description = Column(Text, default="")
    category = Column(String(50), nullable=False)  # 品类分类
    price = Column(Float, default=0)  # 0表示免费赠送
    images = Column(Text, default="[]")  # JSON数组
    
    # 交易偏好
    exchange_enabled = Column(Boolean, default=True)  # 允许交换
    delivery_enabled = Column(Boolean, default=False)  # 支持配送
    
    # 状态
    status = Column(String(20), default="active")  # active/sold/deleted
    
    # 统计
    view_count = Column(Integer, default=0)
    favorite_count = Column(Integer, default=0)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class HelpRequest(Base):
    """互助请求模型"""
    __tablename__ = "help_requests"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    
    # 请求信息
    title = Column(String(200), nullable=False)
    description = Column(Text, default="")
    category = Column(String(50), nullable=False)  # 维修/咨询/劳办/技术
    urgent = Column(Boolean, default=False)
    
    # 状态
    status = Column(String(20), default="open")  # open/accepted/completed/cancelled
    
    # 接单者
    helper_id = Column(Integer, nullable=True)
    
    # 评价
    rating = Column(Integer, nullable=True)  # 1-5
    comment = Column(Text, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class Message(Base):
    """消息模型"""
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    from_user_id = Column(Integer, nullable=False, index=True)
    to_user_id = Column(Integer, nullable=False, index=True)
    
    content = Column(Text, nullable=False)
    message_type = Column(String(20), default="text")  # text/image/system
    
    is_read = Column(Boolean, default=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Evaluation(Base):
    """评价模型"""
    __tablename__ = "evaluations"

    id = Column(Integer, primary_key=True, index=True)
    
    # 评价者
    from_user_id = Column(Integer, nullable=False)
    # 被评价者
    to_user_id = Column(Integer, nullable=False)
    
    # 关联业务
    business_type = Column(String(20), nullable=False)  # help/idle/friend
    business_id = Column(Integer, nullable=False)
    
    # 评分
    rating = Column(Integer, nullable=False)  # 1-5
    comment = Column(Text, default="")
    
    # 标签
    tags = Column(String(500), default="[]")  # JSON数组
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
