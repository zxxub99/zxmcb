import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Avatar, Tag, Button, Divider, Card, Toast } from 'antd-mobile'
import { 
  MessageFill, 
  StarFill, 
  LocationFill
} from 'antd-mobile-icons'
import { LEVEL_CONFIG } from '../services/points'
import styles from './UserDetail.module.css'

interface UserDetail {
  id: number
  nickname: string
  avatar: string
  gender: string
  age: number
  town: string
  village: string
  level: string
  star: string
  bio: string
  interests: string[]
  creditScore: number
  transactionCount: number
  helpCount: number
  goodReviewRate: number
  lastActive: string
  distance: number
}

export default function UserDetail() {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const [user, setUser] = useState<UserDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserDetail()
  }, [userId])

  const loadUserDetail = async () => {
    try {
      setLoading(true)
      // 模拟加载用户详情
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // 模拟用户数据
      const mockUser: UserDetail = {
        id: parseInt(userId || '1'),
        nickname: '张大哥',
        avatar: 'https://via.placeholder.com/100',
        gender: 'male',
        age: 45,
        town: '郢中街道',
        village: '皇城社区',
        level: 'excellent',
        star: '4',
        bio: '热爱生活，乐于助人。擅长维修家电，有多年实践经验。希望结交更多志同道合的朋友。',
        interests: ['维修', '摄影', '园艺'],
        creditScore: 680,
        transactionCount: 15,
        helpCount: 28,
        goodReviewRate: 0.96,
        lastActive: '刚刚',
        distance: 1.2
      }
      
      setUser(mockUser)
    } catch (error) {
      console.error('加载用户详情失败', error)
      Toast.show('加载失败')
    } finally {
      setLoading(false)
    }
  }

  const getGenderText = (gender: string) => {
    return gender === 'male' ? '男' : gender === 'female' ? '女' : '保密'
  }

  const getStarText = (star: string) => {
    const stars = ['一星', '二星', '三星', '四星', '五星']
    return stars[parseInt(star) - 1] || '二星'
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>加载中...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>用户不存在</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* 头部信息 */}
      <div className={styles.header}>
        <div className={styles.avatarSection}>
          <Avatar src={user.avatar} className={styles.avatar} />
          {user.lastActive === '刚刚' && (
            <span className={styles.onlineBadge}>在线</span>
          )}
        </div>
        <div className={styles.basicInfo}>
          <h2 className={styles.nickname}>{user.nickname}</h2>
          <div className={styles.tags}>
            <Tag color={user.gender === 'male' ? 'blue' : 'pink'}>
              {getGenderText(user.gender)} · {user.age}岁
            </Tag>
            <Tag color="orange">
              <StarFill /> {getStarText(user.star)}
            </Tag>
          </div>
          <div className={styles.location}>
            <LocationFill /> {user.town} · {user.village}
          </div>
        </div>
        <div className={styles.distanceInfo}>
          <span className={styles.distance}>{user.distance.toFixed(1)}</span>
          <span className={styles.distanceUnit}>公里</span>
        </div>
      </div>

      {/* 信用信息卡片 */}
      <Card className={styles.creditCard}>
        <div className={styles.creditHeader}>
          <span className={styles.creditTitle}>信用档案</span>
          <span className={styles.levelBadge}>
            {LEVEL_CONFIG[user.level as keyof typeof LEVEL_CONFIG]?.icon}
            {LEVEL_CONFIG[user.level as keyof typeof LEVEL_CONFIG]?.name}
          </span>
        </div>
        <div className={styles.creditScore}>
          <span className={styles.scoreValue}>{user.creditScore}</span>
          <span className={styles.scoreLabel}>信用分</span>
        </div>
        <Divider />
        <div className={styles.creditStats}>
          <div className={styles.creditStat}>
            <span className={styles.statValue}>{user.transactionCount}</span>
            <span className={styles.statLabel}>交易次数</span>
          </div>
          <div className={styles.creditStat}>
            <span className={styles.statValue}>{user.helpCount}</span>
            <span className={styles.statLabel}>互助次数</span>
          </div>
          <div className={styles.creditStat}>
            <span className={styles.statValue}>{Math.round(user.goodReviewRate * 100)}%</span>
            <span className={styles.statLabel}>好评率</span>
          </div>
        </div>
      </Card>

      {/* 个人介绍 */}
      <Card className={styles.bioCard}>
        <div className={styles.cardHeader}>
          个人介绍
        </div>
        <p className={styles.bio}>{user.bio}</p>
      </Card>

      {/* 兴趣标签 */}
      <Card className={styles.interestsCard}>
        <div className={styles.cardHeader}>
          兴趣标签
        </div>
        <div className={styles.interests}>
          {user.interests.map(tag => (
            <Tag key={tag} color='primary' className={styles.interestTag}>
              {tag}
            </Tag>
          ))}
        </div>
      </Card>

      {/* 操作按钮 */}
      <div className={styles.actions}>
        <Button 
          block 
          color='primary' 
          size='large'
          onClick={() => navigate(`/chat/${user.id}`)}
        >
          <MessageFill /> 发送消息
        </Button>
      </div>
    </div>
  )
}
