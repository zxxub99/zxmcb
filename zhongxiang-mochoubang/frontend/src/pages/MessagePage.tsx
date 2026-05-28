import { useState, useEffect } from 'react'
import { Avatar } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { getBotInfo } from '../services/chatbot'
import styles from './MessagePage.module.css'

interface Conversation {
  user_id: number
  nickname: string
  avatar: string
  last_message: string
  last_time: string
  unread_count: number
  is_bot?: boolean
}

interface BotData {
  bot_id: string
  bot_name: string
  bot_avatar: string
  bot_intro: string
}

export default function MessagePage() {
  const navigate = useNavigate()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [botInfo, setBotInfo] = useState<BotData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      // 加载机器人信息
      const bot = await getBotInfo()
      setBotInfo(bot)
      
      // 加载会话列表
      const data: any = await api.getConversations()
      setConversations(data || [])
    } catch (error) {
      console.error('加载数据失败', error)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (time: string) => {
    if (!time) return ''
    const date = new Date(time)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    if (diff < 60000) return '刚刚'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
    return `${Math.floor(diff / 86400000)}天前`
  }

  // 进入与机器人的对话
  const enterBotChat = () => {
    if (botInfo) {
      navigate(`/chat/bot_${botInfo.bot_id}`)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>消息中心</h2>
        <span className={styles.notifBtn} onClick={() => navigate('/notifications')}>
          🔔 通知
        </span>
      </div>

      {/* 聊天机器人入口 */}
      {botInfo && (
        <div className={styles.botSection} onClick={enterBotChat}>
          <div className={styles.botAvatar}>
            <span className={styles.botEmoji}>🤖</span>
            <span className={styles.botOnline}></span>
          </div>
          <div className={styles.botInfo}>
            <div className={styles.botName}>
              {botInfo.bot_name}
              <span className={styles.botTag}>AI助手</span>
            </div>
            <div className={styles.botIntro}>{botInfo.bot_intro}</div>
          </div>
          <span className={styles.botArrow}>›</span>
        </div>
      )}

      <div className={styles.listTitle}>我的会话</div>
      
      <div className={styles.list}>
        {loading ? (
          <div className={styles.loading}>加载中...</div>
        ) : conversations.length > 0 ? (
          conversations.map(conv => (
            <div 
              key={conv.user_id} 
              className={styles.convItem}
              onClick={() => navigate(`/chat/${conv.user_id}`)}
            >
              <div className={styles.avatarWrapper}>
                <Avatar src={conv.avatar || 'https://via.placeholder.com/48'} />
                {conv.unread_count > 0 && (
                  <span className={styles.badge}>{conv.unread_count}</span>
                )}
              </div>
              <div className={styles.convInfo}>
                <div className={styles.convHeader}>
                  <span className={styles.nickname}>{conv.nickname}</span>
                  <span className={styles.time}>{formatTime(conv.last_time)}</span>
                </div>
                <div className={styles.lastMessage}>{conv.last_message || '暂无消息'}</div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.empty}>暂无其他会话</div>
        )}
      </div>
    </div>
  )
}
