from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """应用配置"""

    # 应用信息
    app_name: str = "钟祥莫愁帮"
    app_version: str = "0.1.0"
    debug: bool = True

    # 数据库配置
    database_url: str = "mysql+pymysql://user:password@localhost:3306/zhongxiang_mochoubang"

    # JWT配置
    secret_key: str = "your-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24 * 7  # 7天

    # 地理配置
    zhongxiang_lat: float = 31.1675  # 钟祥市纬度
    zhongxiang_lng: float = 112.5833  # 钟祥市经度
    zhongxiang_radius_km: float = 100  # 允许范围(公里)

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
