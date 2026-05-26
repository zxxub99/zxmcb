import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Input, Button } from 'antd-mobile'
import { 
  SmileOutline, 
  PictureOutline, 
  MoreOutline,
  CheckOutline
} from 'antd-mobile-icons'
import { api } from '../services/api'
import styles from './ChatPage.module.css'

interface Message {
  id: number
  from_user_id: number
  to_user_id: number
  content: string
  message_type: 'text' | 'image' | 'emoji' | 'voice'
  is_read: boolean
  created_at: string
  status?: 'sending' | 'sent' | 'failed'
}

interface UserInfo {
  id: number
  nickname: string
  avatar: string
  signature?: string
}

// 快捷回复
const QUICK_REPLIES = [
  '你好，很高兴认识你！',
  '可以，具体说说吗？',
  '价格可以商量吗？',
  '在哪里交易方便？',
  '好的，我考虑一下',
  '谢谢你的帮助！'
]

// 常用表情
const EMOJIS = ['😀', '😂', '😍', '🥰', '👍', '❤️', '🎉', '😊', '🤔', '😢', '😡', '🤝']

export default function ChatPage() {
  const { userId } = useParams<{ userId: string }>()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [sending, setSending] = useState(false)
  const [otherUser, setOtherUser] = useState<UserInfo | null>(null)
  const [currentUserId, setCurrentUserId] = useState<number | null>(null)
  const [showEmoji, setShowEmoji] = useState(false)
  const [showQuickReply, setShowQuickReply] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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
      const data = await api.getMessages(parseInt(userId)) as unknown as Message[]
      // 标记为已读
      const unreadIds = data
        .filter(m => !m.is_read && m.from_user_id !== currentUserId)
        .map(m => m.id)
      if (unreadIds.length > 0) {
        api.markAsRead(unreadIds).catch(console.error)
      }
      setMessages(data.map(m => ({ ...m, status: 'sent' as const })))
    } catch (error) {
      console.error('加载消息失败', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSend = async () => {
    if (!inputText.trim() || !userId) return
    
    // 添加临时消息
    const tempId = Date.now()
    const tempMessage: Message = {
      id: tempId,
      from_user_id: currentUserId || 0,
      to_user_id: parseInt(userId),
      content: inputText.trim(),
      message_type: 'text',
      is_read: false,
      created_at: new Date().toISOString(),
      status: 'sending'
    }
    
    setMessages(prev => [...prev, tempMessage])
    setInputText('')
    setSending(true)
    setShowEmoji(false)
    setShowQuickReply(false)
    
    try {
      await api.sendMessage(parseInt(userId), inputText.trim())
      // 更新消息状态为已发送
      setMessages(prev => 
        prev.map(m => m.id === tempId ? { ...m, status: 'sent' as const } : m)
      )
      await loadMessages()
    } catch (error) {
      console.error('发送失败', error)
      // 更新消息状态为失败
      setMessages(prev => 
        prev.map(m => m.id === tempId ? { ...m, status: 'failed' as const } : m)
      )
    } finally {
      setSending(false)
    }
  }

  const handleQuickReply = (text: string) => {
    setInputText(text)
    setShowQuickReply(false)
    inputRef.current?.focus()
  }

  const handleEmojiClick = (emoji: string) => {
    setInputText(prev => prev + emoji)
    inputRef.current?.focus()
  }

  const handleRetry = (msg: Message) => {
    // 删除失败消息并重新发送
    setMessages(prev => prev.filter(m => m.id !== msg.id))
    setInputText(msg.content)
    handleSend()
  }

  const formatTime = (timeStr: string) => {
    const date = new Date(timeStr)
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }

  const formatDate = (timeStr: string) => {
    const date = new Date(timeStr)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (date.toDateString() === today.toDateString()) {
      return '今天'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return '昨天'
    } else {
      return `${date.getMonth() + 1}月${date.getDate()}日`
    }
  }

  const isMyMessage = (msg: Message) => {
    return currentUserId && msg.from_user_id === currentUserId
  }

  // 判断是否显示日期分隔
  const shouldShowDateDivider = (index: number) => {
    if (index === 0) return true
    const currentDate = formatDate(messages[index].created_at)
    const prevDate = formatDate(messages[index - 1].created_at)
    return currentDate !== prevDate
  }

  return (
    <div className={styles.container}>
      {/* 聊天头部 */}
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <span className={styles.nickname}>{otherUser?.nickname || '用户'}</span>
          {otherUser?.signature && (
            <span className={styles.signature}>{otherUser.signature}</span>
          )}
        </div>
        <Button 
          fill="none" 
          onClick={() => setShowMenu(!showMenu)}
        >
          <MoreOutline />
        </Button>
      </div>

      {/* 操作菜单 */}
      {showMenu && (
        <div className={styles.menuOverlay} onClick={() => setShowMenu(false)}>
          <div className={styles.menu} onClick={e => e.stopPropagation()}>
            <div className={styles.menuItem}>查看个人资料</div>
            <div className={styles.menuItem}>举报</div>
            <div className={styles.menuItem}>加入黑名单</div>
          </div>
        </div>
      )}

      {/* 消息列表 */}
      <div className={styles.messageList}>
        {messages.length === 0 && (
          <div className={styles.emptyState}>
            <p>暂无消息</p>
            <span>开始和对方聊天吧</span>
          </div>
        )}
        
        {messages.map((msg, index) => (
          <div key={msg.id}>
            {/* 日期分隔 */}
            {shouldShowDateDivider(index) && (
              <div className={styles.dateDivider}>
                <span>{formatDate(msg.created_at)}</span>
              </div>
            )}
            
            <div 
              className={`${styles.messageItem} ${isMyMessage(msg) ? styles.myMessage : styles.otherMessage}`}
            >
              {/* 头像 */}
              <div className={styles.avatar}>
                {isMyMessage(msg) ? '我' : (otherUser?.nickname?.[0] || 'U')}
              </div>
              
              <div className={styles.messageContent}>
                {/* 消息内容 */}
                {msg.message_type === 'text' && <p>{msg.content}</p>}
                {msg.message_type === 'image' && (
                  <div className={styles.imageMessage}>
                    <img src={msg.content} alt="图片" />
                  </div>
                )}
                {msg.message_type === 'emoji' && (
                  <span className={styles.emojiMessage}>{msg.content}</span>
                )}
                
                {/* 时间和状态 */}
                <div className={styles.messageFooter}>
                  <span className={styles.time}>{formatTime(msg.created_at)}</span>
                  {isMyMessage(msg) && (
                    <span className={styles.status}>
                      {msg.status === 'sending' && <span className={styles.sending}>发送中</span>}
                      {msg.status === 'sent' && <CheckOutline />}
                      {msg.status === 'failed' && (
                        <span 
                          className={styles.retryBtn}
                          onClick={() => handleRetry(msg)}
                        >
                          重试
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 快捷回复 */}
      {showQuickReply && (
        <div className={styles.quickReply}>
          {QUICK_REPLIES.map((text, index) => (
            <div 
              key={index} 
              className={styles.quickReplyItem}
              onClick={() => handleQuickReply(text)}
            >
              {text}
            </div>
          ))}
        </div>
      )}

      {/* 表情选择器 */}
      {showEmoji && (
        <div className={styles.emojiPicker}>
          {EMOJIS.map((emoji, index) => (
            <span 
              key={index} 
              className={styles.emojiItem}
              onClick={() => handleEmojiClick(emoji)}
            >
              {emoji}
            </span>
          ))}
        </div>
      )}

      {/* 输入区域 */}
      <div className={styles.inputArea}>
        <div className={styles.inputTools}>
          <span 
            className={styles.toolBtn}
            onClick={() => {
              setShowEmoji(!showEmoji)
              setShowQuickReply(false)
            }}
          >
            <SmileOutline />
          </span>
          <span 
            className={styles.toolBtn}
            onClick={() => {
              setShowQuickReply(!showQuickReply)
              setShowEmoji(false)
            }}
          >
            快捷回复
          </span>
          <span className={styles.toolBtn}>
            <PictureOutline />
          </span>
        </div>
        
        <div className={styles.inputRow}>
          <Input
            ref={inputRef as any}
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
    </div>
  )
}
