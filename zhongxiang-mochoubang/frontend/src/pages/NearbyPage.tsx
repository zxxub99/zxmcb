import { useState, useEffect } from 'react'
import { List, Avatar, Tag, Empty } from 'antd-mobile'
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
      const data = await api.getNearbyUsers()
      setUsers(data)
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

      <List>
        {users.length > 0 ? (
          users.map(user => (
            <List.Item
              key={user.id}
              prefix={
                <Avatar src={user.avatar || 'https://via.placeholder.com/48'} style={{ borderRadius: '50%' }} />
              }
              description={
                <div className={styles.userInfo}>
                  <Tag color={user.gender === 'male' ? 'blue' : 'pink'}>{getGenderText(user.gender)}</Tag>
                  <Tag color="green">{getStarText(user.star)}</Tag>
                  {user.town && <span className={styles.town}>{user.town}</span>}
                </div>
              }
            >
              {user.nickname}
            </List.Item>
          ))
        ) : (
          <Empty description="附近暂无用户" />
        )}
      </List>
    </div>
  )
}
