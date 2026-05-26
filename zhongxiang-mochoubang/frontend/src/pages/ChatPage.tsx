import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Input, Button } from 'antd-mobile'
import { api } from '../services/api'
import styles from './ChatPage.module.css'

interface Message {
  id: number
  from_user_id: number
  to_user_id: number
  content: string
  message_type: string
  is_read: boolean
  created_at: string
}

interface UserInfo {
  id: number
  nickname: string
  avatar: string
}

export default function ChatPage() {
  const { userId } = useParams<{ userId: string }>()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [sending, setSending] = useState(false)
  const [otherUser, setOtherUser] = useState<UserInfo | null>(null)
  const [currentUserId, setCurrentUserId] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadData()
    // 定时刷新消息
    const interval = setInterval(loadMessages, 3000)
    return () => clearInterval(interval)
  }, [userId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadData = async () => {
    if (!userId) return
    try {
      // 获取对方用户信息
      const userData: any = await api.getUserProfile(parseInt(userId))
      setOtherUser(userData)
      
      // 获取当前用户信息
      try {
        const meData: any = await api.getUserInfo()
        setCurrentUserId(meData.id)
      } catch (e) {
        console.log('未登录')
      }
      
      await loadMessages()
    } catch (error) {
      console.error('加载失败', error)
    }
  }

  const loadMessages = async () => {
    if (!userId) return
    try {
      const data = await api.getMessages(parseInt(userId)) as unknown as any[]
      setMessages(data as any[])
    } catch (error) {
      console.error('加载消息失败', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSend = async () => {
    if (!inputText.trim() || !userId) return
    
    setSending(true)
    try {
      await api.sendMessage(parseInt(userId), inputText.trim())
      setInputText('')
      await loadMessages()
    } catch (error) {
      console.error('发送失败', error)
    } finally {
      setSending(false)
    }
  }

  const formatTime = (timeStr: string) => {
    const date = new Date(timeStr)
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }

  const isMyMessage = (msg: Message) => {
    return currentUserId && msg.from_user_id === currentUserId
  }

  return (
    <div className={styles.container}>
      {/* 聊天头部 */}
      <div className={styles.header}>
        <span className={styles.nickname}>{otherUser?.nickname || '用户'}</span>
      </div>

      {/* 消息列表 */}
      <div className={styles.messageList}>
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={`${styles.messageItem} ${isMyMessage(msg) ? styles.myMessage : styles.otherMessage}`}
          >
            <div className={styles.messageContent}>
              <p>{msg.content}</p>
              <span className={styles.time}>{formatTime(msg.created_at)}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className={styles.inputArea}>
        <Input
          className={styles.input}
          placeholder="输入消息..."
          value={inputText}
          onChange={setInputText}
          onEnterPress={handleSend}
        />
        <Button 
          color="primary" 
          size="small" 
          disabled={!inputText.trim() || sending}
          loading={sending}
          onClick={handleSend}
        >
          发送
        </Button>
      </div>
    </div>
  )
}
