import { useState, useEffect } from 'react'
import { Tag, Grid, Toast, ProgressBar } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import styles from './MyPage.module.css'

interface UserInfo {
  id: number
  nickname: string
  phone: string
  gender: string
  avatar: string
  level: string
  star: string
  points: number
  is_verified: boolean
  bio?: string
  region?: string
  joinTime?: string
}

interface UserStats {
  posts: number
  helps: number
  deals: number
  followers: number
  following: number
  favorites: number
  visits: number
}

export default function MyPage() {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserInfo()
  }, [])

  const loadUserInfo = async () => {
    try {
      const data: any = await api.getUserInfo()
      setUserInfo(data)
      // 模拟用户统计数据
      setUserStats({
        posts: 12,
        helps: 5,
        deals: 8,
        followers: 23,
        following: 45,
        favorites: 15,
        visits: 156
      })
    } catch (error) {
      console.error('加载用户信息失败', error)
    } finally {
      setLoading(false)
    }
  }

  const getStarText = (star: string) => {
    const starMap: Record<string, string> = {
      '1': '一星用户',
      '2': '二星用户',
      '3': '三星用户',
      '4': '四星用户',
      '5': '五星精英',
    }
    return starMap[star] || '二星用户'
  }

  const getLevelText = (level: string) => {
    const levelMap: Record<string, string> = {
      'newbie': '新锐用户',
      'excellent': '优秀用户',
      'elite': '精英用户',
    }
    return levelMap[level] || '新锐用户'
  }

  const getLevelProgress = (points: number) => {
    // 每100积分升一级
    const level = Math.floor(points / 100)
    const progress = (points % 100)
    return { level, progress }
  }

  const menuItems = [
    { key: 'dashboard', title: '数据看板', icon: '📊', desc: '查看数据统计' },
    { key: 'publish', title: '我的发布', icon: '📝', desc: '管理发布内容' },
    { key: 'favorite', title: '我的收藏', icon: '❤️', desc: '收藏的内容' },
    { key: 'transaction', title: '交易记录', icon: '💰', desc: '查看交易明细' },
    { key: 'help', title: '互助记录', icon: '🤝', desc: '互助帮助记录' },
    { key: 'points', title: '积分中心', icon: '💎', desc: '积分明细兑换' },
    { key: 'evaluation', title: '评价中心', icon: '⭐', desc: '查看收到的评价' },
    { key: 'follow', title: '关注列表', icon: '👥', desc: '我的关注和粉丝' },
    { key: 'settings', title: '设置', icon: '⚙️', desc: '账号设置' },
  ]

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>加载中...</div>
      </div>
    )
  }

  if (!userInfo) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>请先登录</div>
        <button className={styles.loginBtn} onClick={() => navigate('/login')}>
          去登录
        </button>
      </div>
    )
  }

  const levelInfo = getLevelProgress(userInfo.points)

  return (
    <div className={styles.container}>
      {/* 用户信息卡片 */}
      <div className={styles.profileCard}>
        <div className={styles.avatarSection}>
          <img 
            src={userInfo.avatar || 'https://via.placeholder.com/80'} 
            alt="头像" 
            className={styles.avatar}
          />
          <div className={styles.userInfo}>
            <h3>{userInfo.nickname}</h3>
            <p>{userInfo.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</p>
            {userInfo.bio && <p className={styles.bio}>{userInfo.bio}</p>}
            <div className={styles.tags}>
              <Tag color="blue">{getLevelText(userInfo.level)}</Tag>
              <Tag color="green">{getStarText(userInfo.star)}</Tag>
              {userInfo.is_verified && <Tag color="primary">已实名</Tag>}
              {!userInfo.is_verified && (
                <Tag color="warning" onClick={() => navigate('/verification')}>去实名</Tag>
              )}
            </div>
          </div>
        </div>
        
        {/* 积分进度 */}
        <div className={styles.pointsSection}>
          <div className={styles.pointsHeader}>
            <span className={styles.pointsLabel}>积分等级</span>
            <span className={styles.pointsValue}>{userInfo.points} 积分</span>
          </div>
          <ProgressBar 
            percent={levelInfo.progress} 
          />
          <div className={styles.levelHint}>
            再 {100 - levelInfo.progress} 积分升级到 Lv.{levelInfo.level + 1}
          </div>
        </div>
        
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{userStats?.posts || 0}</span>
            <span className={styles.statLabel}>发布</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{userStats?.helps || 0}</span>
            <span className={styles.statLabel}>互助</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{userStats?.deals || 0}</span>
            <span className={styles.statLabel}>交易</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{userStats?.followers || 0}</span>
            <span className={styles.statLabel}>粉丝</span>
          </div>
          <div className={styles.editBtn} onClick={() => navigate('/edit-profile')}>
            编辑资料
          </div>
        </div>
      </div>

      {/* 附加信息 */}
      <div className={styles.infoCard}>
        <div className={styles.infoItem}>
          <span className={styles.infoIcon}>📍</span>
          <span>{userInfo.region || '钟祥市'}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoIcon}>📅</span>
          <span>加入于 {userInfo.joinTime || '2024年'}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoIcon}>👁️</span>
          <span>个人主页被浏览 {userStats?.visits || 0} 次</span>
        </div>
      </div>

      {/* 功能菜单 */}
      <div className={styles.menuSection}>
        <Grid columns={3} gap={8}>
          {menuItems.map(item => (
            <Grid.Item key={item.key}>
              <div className={styles.menuItem} onClick={() => {
                if (item.key === 'points') navigate('/points')
                else if (item.key === 'dashboard') navigate('/dashboard')
                else if (item.key === 'favorite') navigate('/favorites')
                else if (item.key === 'settings') navigate('/settings')
                else Toast.show(`${item.title}功能开发中`)
              }}>
                <span className={styles.menuIcon}>{item.icon}</span>
                <span className={styles.menuTitle}>{item.title}</span>
              </div>
            </Grid.Item>
          ))}
        </Grid>
      </div>
    </div>
  )
}
