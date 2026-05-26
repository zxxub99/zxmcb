import { useState, useEffect } from 'react'
import { Tag, Grid } from 'antd-mobile'
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
}

export default function MyPage() {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserInfo()
  }, [])

  const loadUserInfo = async () => {
    try {
      const data: any = await api.getUserInfo()
      setUserInfo(data)
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

  const menuItems = [
    { key: 'publish', title: '我的发布', icon: '📝' },
    { key: 'favorite', title: '我的收藏', icon: '❤️' },
    { key: 'transaction', title: '交易记录', icon: '💰' },
    { key: 'help', title: '互助记录', icon: '🤝' },
    { key: 'evaluation', title: '评价中心', icon: '⭐' },
    { key: 'settings', title: '设置', icon: '⚙️' },
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
            <div className={styles.tags}>
              <Tag color="blue">{getLevelText(userInfo.level)}</Tag>
              <Tag color="green">{getStarText(userInfo.star)}</Tag>
              {userInfo.is_verified && <Tag color="primary">已实名</Tag>}
            </div>
          </div>
        </div>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{userInfo.points}</span>
            <span className={styles.statLabel}>积分</span>
          </div>
        </div>
      </div>

      {/* 功能菜单 */}
      <div className={styles.menuSection}>
        <Grid columns={3} gap={8}>
          {menuItems.map(item => (
            <Grid.Item key={item.key}>
              <div className={styles.menuItem}>
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
