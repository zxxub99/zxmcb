import { useState, useEffect } from 'react'
import { Avatar, Tag } from 'antd-mobile'
import { api } from '../services/api'
import styles from './NearbyPage.module.css'

interface User {
  id: number
  nickname: string
  gender: string
  avatar: string
  town: string
  level: string
  star: string
}

export default function NearbyPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const data: any = await api.getNearbyUsers()
      setUsers(data || [])
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>附近的人</h2>
        <span className={styles.subtitle}>发现身边的钟祥邻居</span>
      </div>

      <div className={styles.list}>
        {loading ? (
          <div className={styles.loading}>加载中...</div>
        ) : users.length > 0 ? (
          users.map(user => (
            <div key={user.id} className={styles.userItem}>
              <Avatar src={user.avatar || 'https://via.placeholder.com/48'} />
              <div className={styles.userInfo}>
                <div className={styles.userName}>{user.nickname}</div>
                <div className={styles.userTags}>
                  <Tag color={user.gender === 'male' ? 'blue' : 'pink'}>{getGenderText(user.gender)}</Tag>
                  <Tag color="green">{getStarText(user.star)}</Tag>
                  {user.town && <span className={styles.town}>{user.town}</span>}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.empty}>附近暂无用户</div>
        )}
      </div>
    </div>
  )
}
