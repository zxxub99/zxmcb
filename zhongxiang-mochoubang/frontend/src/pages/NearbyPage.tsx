import { useState, useEffect } from 'react'
import { Avatar, Tag, Segmented, Badge } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { 
  generateMockRecommendations, 
  generateMatchReason,
  calculateMatchScore,
  calculateDistanceScore,
  calculateInterestScore,
  calculateStarScore
} from '../services/match'
import styles from './NearbyPage.module.css'

interface User {
  id: number
  nickname: string
  gender: string
  avatar: string
  town: string
  level: string
  star: string
  interests?: string[]
  lastActive?: string
  distance?: number
  matchScore?: number
  matchReason?: string
}

// 当前用户模拟数据
const CURRENT_USER = {
  id: 0,
  interests: ['维修', '美食', '摄影'],
  latitude: 31.7751,
  longitude: 112.5893
}

export default function NearbyPage() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [sortType, setSortType] = useState<'match' | 'distance' | 'star'>('match')

  useEffect(() => {
    loadUsers()
  }, [sortType])

  const loadUsers = async () => {
    try {
      setLoading(true)
      // 模拟API调用获取附近用户
      await api.getNearbyUsers()
      const mockUsers = generateMockRecommendations('users', 10) as unknown as User[]
      
      // 计算匹配分数
      const usersWithScore = mockUsers.map(user => {
        const randomDistance = Math.random() * 5 + 0.5
        const matchScore = calculateMatchScore({
          distance: calculateDistanceScore(
            CURRENT_USER.latitude, 
            CURRENT_USER.longitude,
            31.7751 + Math.random() * 0.1, 
            112.5893 + Math.random() * 0.1
          ),
          interest: calculateInterestScore(
            CURRENT_USER.interests,
            user.interests || ['维修', '美食']
          ),
          star: calculateStarScore(parseInt(user.star) || 3),
          recentActivity: user.lastActive === '刚刚' ? 100 : 
                         user.lastActive?.includes('分钟') ? 80 : 
                         user.lastActive?.includes('小时') ? 60 : 40
        })
        
        return {
          ...user,
          distance: randomDistance,
          matchScore,
          matchReason: generateMatchReason(matchScore, 'user')
        }
      })

      // 根据排序类型排序
      let sortedUsers = [...usersWithScore]
      if (sortType === 'distance') {
        sortedUsers.sort((a, b) => (a.distance || 0) - (b.distance || 0))
      } else if (sortType === 'star') {
        sortedUsers.sort((a, b) => parseInt(b.star || '0') - parseInt(a.star || '0'))
      } else {
        sortedUsers.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
      }

      setUsers(sortedUsers)
    } catch (error) {
      console.error('加载附近用户失败', error)
    } finally {
      setLoading(false)
    }
  }

  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'male': return '男'
      case 'female': return '女'
      default: return '保密'
    }
  }

  const getStarText = (star: string) => {
    const starMap: Record<string, string> = {
      '1': '一星',
      '2': '二星',
      '3': '三星',
      '4': '四星',
      '5': '五星',
    }
    return starMap[star] || '二星'
  }

  const getStarColor = (star: string) => {
    const colors: Record<string, string> = {
      '1': 'default',
      '2': 'default',
      '3': 'green',
      '4': 'blue',
      '5': 'gold',
    }
    return colors[star] || 'default'
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>附近的人</h2>
        <span className={styles.subtitle}>发现身边的钟祥邻居</span>
      </div>

      <div className={styles.sortBar}>
        <span className={styles.sortLabel}>排序：</span>
        <Segmented
          value={sortType}
          onChange={(value) => setSortType(value as typeof sortType)}
          options={[
            { label: '智能推荐', value: 'match' },
            { label: '距离最近', value: 'distance' },
            { label: '信用最高', value: 'star' },
          ]}
        />
      </div>

      {sortType === 'match' && (
        <div className={styles.matchTip}>
          <span>🤖 智能推荐根据距离、兴趣、信用综合计算</span>
        </div>
      )}

      <div className={styles.list}>
        {loading ? (
          <div className={styles.loading}>加载中...</div>
        ) : users.length > 0 ? (
          users.map(user => (
            <div key={user.id} className={styles.userItem} onClick={() => navigate(`/user/${user.id}`)}>
              <div className={styles.avatarWrapper}>
                <Avatar src={user.avatar || 'https://via.placeholder.com/48'} className={styles.avatar} />
                {sortType === 'match' && user.matchScore && user.matchScore >= 70 && (
                  <Badge content="推荐" className={styles.badge} />
                )}
              </div>
              <div className={styles.userInfo}>
                <div className={styles.userName}>
                  {user.nickname}
                  {user.lastActive && (
                    <span className={styles.activeTime}>{user.lastActive}</span>
                  )}
                </div>
                <div className={styles.userTags}>
                  <Tag color={user.gender === 'male' ? 'blue' : 'pink'}>{getGenderText(user.gender)}</Tag>
                  <Tag color={getStarColor(user.star)}>{getStarText(user.star)}</Tag>
                  {user.town && <Tag color="default">{user.town}</Tag>}
                </div>
                {user.interests && user.interests.length > 0 && (
                  <div className={styles.interests}>
                    {user.interests.slice(0, 3).map(tag => (
                      <span key={tag} className={styles.interestTag}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles.rightInfo}>
                {sortType === 'match' && user.matchScore && (
                  <div className={styles.matchScore}>
                    <span className={styles.scoreValue}>{user.matchScore}</span>
                    <span className={styles.scoreLabel}>匹配度</span>
                  </div>
                )}
                {sortType === 'distance' && user.distance && (
                  <div className={styles.distance}>
                    <span>{user.distance.toFixed(1)}</span>
                    <span className={styles.unit}>km</span>
                  </div>
                )}
                {user.matchReason && sortType === 'match' && (
                  <div className={styles.matchReason}>{user.matchReason}</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className={styles.empty}>
            <p>附近暂无用户</p>
            <p className={styles.emptyTip}>试试扩大搜索范围</p>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <p>已显示 {users.length} 位附近用户</p>
      </div>
    </div>
  )
}
