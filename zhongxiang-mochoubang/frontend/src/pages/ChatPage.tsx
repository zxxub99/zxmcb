import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Input, Button } from 'antd-mobile'
import { 
  SmileOutline, 
  PictureOutline, 
  MoreOutline,
  ExclamationOutline,
  LeftOutline
} from 'antd-mobile-icons'
import { api } from '../services/api'
import { sendToBot, getBotInfo, quickQuestions } from '../services/chatbot'
import styles from './ChatPage.module.css'

interface Message {
  id: number
  from_user_id: number | string
  to_user_id: number | string
  content: string
  message_type: 'text' | 'image' | 'emoji' | 'voice'
  is_read: boolean
  created_at: string
  status?: 'sending' | 'sent' | 'failed'
  isBot?: boolean
}

interface UserInfo {
  id: number | string
  nickname: string
  avatar: string
  signature?: string
  isBot?: boolean
}

// 快捷回复（根据对话对象调整）
const getQuickReplies = (isBot: boolean) => {
  if (isBot) {
    return quickQuestions
  }
  return [
    '你好，很高兴认识你！',
    '可以，具体说说吗？',
    '价格可以商量吗？',
    '在哪里交易方便？',
    '好的，我考虑一下',
    '谢谢你的帮助！'
  ]
}

// 常用表情
const EMOJIS = ['😀', '😂', '😍', '🥰', '👍', '❤️', '🎉', '😊', '🤔', '😢', '😡', '🤝']

export default function ChatPage() {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [sending, setSending] = useState(false)
  const [otherUser, setOtherUser] = useState<UserInfo | null>(null)
  const [currentUserId, setCurrentUserId] = useState<number | null>(null)
  const [showEmoji, setShowEmoji] = useState(false)
  const [showQuickReply, setShowQuickReply] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [isBotChat, setIsBotChat] = useState(false)
  const [botTyping, setBotTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // 判断是否是机器人对话
  const checkIsBotChat = () => {
    if (userId && userId.startsWith('bot_')) {
      setIsBotChat(true)
      return true
    }
    return false
  }

  useEffect(() => {
    loadData()
    // 定时刷新消息（非机器人对话）
    const interval = setInterval(() => {
      if (!isBotChat) {
        loadMessages()
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [userId, isBotChat])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadData = async () => {
    if (!userId) return
    
    const isBot = checkIsBotChat()
    
    try {
      if (isBot) {
        // 加载机器人信息
        const botData = await getBotInfo()
        setOtherUser({
          id: 'bot_mochou',
          nickname: botData.bot_name,
          avatar: botData.bot_avatar,
          signature: botData.bot_intro,
          isBot: true
        })
        
        // 添加欢迎消息
        const welcomeMsg: Message = {
          id: Date.now(),
          from_user_id: 'bot_mochou',
          to_user_id: 0,
          content: `你好！我是${botData.bot_name}，${botData.bot_intro}\n\n你可以问我以下问题：\n• 如何使用平台？\n• 如何获得积分？\n• 如何发布闲置物品？\n• 互助服务怎么用？\n• 实名认证有什么好处？\n\n或者直接告诉我你想了解什么~`,
          message_type: 'text',
          is_read: true,
          created_at: new Date().toISOString(),
          status: 'sent',
          isBot: true
        }
        setMessages([welcomeMsg])
      } else {
        // 获取对方用户信息
        const userData: any = await api.getUserProfile(parseInt(userId))
        setOtherUser(userData)
      }
      
      // 获取当前用户信息
      try {
        const meData: any = await api.getUserInfo()
        setCurrentUserId(meData.id)
      } catch (e) {
        console.log('未登录')
      }
      
      // 加载消息历史
      loadMessages()
    } catch (error) {
      console.error('加载数据失败', error)
    }
  }

  const loadMessages = async () => {
    if (!userId) return
    try {
      const data: any = await api.getMessages(parseInt(userId))
      if (data && data.messages) {
        setMessages(prev => {
          const existingIds = prev.map(m => m.id)
          const newMsgs = data.messages.filter((m: Message) => !existingIds.includes(m.id))
          return [...prev, ...newMsgs]
        })
      }
    } catch (error) {
      console.error('加载消息失败', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSend = async () => {
    if (!inputText.trim() || sending) return
    
    const text = inputText.trim()
    setInputText('')
    setSending(true)
    
    // 添加用户消息
    const userMsg: Message = {
      id: Date.now(),
      from_user_id: currentUserId || 0,
      to_user_id: userId || 'unknown',
      content: text,
      message_type: 'text',
      is_read: false,
      created_at: new Date().toISOString(),
      status: 'sent'
    }
    setMessages(prev => [...prev, userMsg])
    
    if (isBotChat) {
      // 机器人对话
      setBotTyping(true)
      try {
        const response = await sendToBot(
          currentUserId?.toString() || 'guest',
          text,
          messages.slice(-10).map(m => ({
            role: m.from_user_id === 'bot_mochou' || m.isBot ? 'bot' : 'user',
            content: m.content,
            timestamp: new Date(m.created_at).getTime()
          }))
        )
        
        const botMsg: Message = {
          id: Date.now() + 1,
          from_user_id: 'bot_mochou',
          to_user_id: currentUserId || 0,
          content: response,
          message_type: 'text',
          is_read: true,
          created_at: new Date().toISOString(),
          status: 'sent',
          isBot: true
        }
        setMessages(prev => [...prev, botMsg])
      } catch (error) {
        console.error('机器人回复失败', error)
      } finally {
        setBotTyping(false)
      }
    } else {
      // 普通用户对话
      try {
        await api.sendMessage(parseInt(userId || '0'), text)
      } catch (error) {
        console.error('发送消息失败', error)
        // 标记发送失败
        setMessages(prev => prev.map(m => 
          m.id === userMsg.id ? { ...m, status: 'failed' as const } : m
        ))
      }
    }
    
    setSending(false)
  }

  const handleQuickReply = (text: string) => {
    setInputText(text)
    setShowQuickReply(false)
    inputRef.current?.focus()
  }

  const handleEmojiSelect = (emoji: string) => {
    setInputText(prev => prev + emoji)
  }

  const getQuickRepliesList = () => getQuickReplies(isBotChat)

  return (
    <div className={styles.container}>
      {/* 顶部导航 */}
      <div className={styles.header}>
        <div className={styles.headerLeft} onClick={() => navigate(-1)}>
          <LeftOutline />
        </div>
        <div className={styles.headerCenter}>
          <span className={styles.nickname}>
            {otherUser?.nickname || '聊天'}
            {isBotChat && <span className={styles.botTag}>AI</span>}
          </span>
          {!isBotChat && otherUser?.signature && (
            <span className={styles.signature}>{otherUser.signature}</span>
          )}
          {isBotChat && (
            <span className={styles.signature}>在线为你服务</span>
          )}
        </div>
        <div className={styles.headerRight} onClick={() => setShowMenu(!showMenu)}>
          <MoreOutline />
        </div>
      </div>

      {/* 消息列表 */}
      <div className={styles.messageList}>
        {messages.map((msg) => {
          const isMe = msg.from_user_id === currentUserId || 
                       (typeof msg.from_user_id === 'string' && msg.from_user_id.startsWith('user_') && msg.from_user_id.includes(currentUserId?.toString() || ''))
          const isBot = msg.isBot || msg.from_user_id === 'bot_mochou'
          
          return (
            <div 
              key={msg.id} 
              className={`${styles.messageItem} ${isMe ? styles.myMessage : styles.otherMessage}`}
            >
              {!isMe && (
                <div className={styles.avatar}>
                  {isBot ? '🤖' : (otherUser?.avatar || '👤')}
                </div>
              )}
              <div className={styles.messageContent}>
                <div className={`${styles.bubble} ${isMe ? styles.myBubble : styles.otherBubble}`}>
                  {msg.content}
                </div>
                {msg.status && msg.status !== 'sent' && (
                  <div className={styles.messageStatus}>
                    {msg.status === 'sending' && '发送中...'}
                    {msg.status === 'failed' && (
                      <span className={styles.retry} onClick={() => handleSend()}>
                        <ExclamationOutline /> 重试
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
        
        {/* 机器人正在输入 */}
        {botTyping && (
          <div className={`${styles.messageItem} ${styles.otherMessage}`}>
            <div className={styles.avatar}>🤖</div>
            <div className={styles.messageContent}>
              <div className={`${styles.bubble} ${styles.otherBubble} ${styles.typing}`}>
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className={styles.inputArea}>
        <div className={styles.inputTools}>
          <span className={styles.toolBtn} onClick={() => { setShowEmoji(!showEmoji); setShowQuickReply(false); }}>
            <SmileOutline />
          </span>
          <span className={styles.toolBtn} onClick={() => { setShowQuickReply(!showQuickReply); setShowEmoji(false); }}>
            <PictureOutline />
          </span>
        </div>
        
        <div className={styles.inputWrapper}>
          <Input
            ref={inputRef as any}
            value={inputText}
            onChange={setInputText}
            placeholder={isBotChat ? "输入问题，小莫愁为你解答..." : "输入消息..."}
            onEnterPress={handleSend}
            className={styles.input}
          />
        </div>
        
        <Button 
          size='small' 
          color='primary'
          onClick={handleSend}
          disabled={!inputText.trim() || sending}
          className={styles.sendBtn}
        >
          发送
        </Button>
      </div>

      {/* 表情选择器 */}
      {showEmoji && (
        <div className={styles.emojiPicker}>
          {EMOJIS.map((emoji, i) => (
            <span key={i} className={styles.emojiItem} onClick={() => handleEmojiSelect(emoji)}>
              {emoji}
            </span>
          ))}
        </div>
      )}

      {/* 快捷回复 */}
      {showQuickReply && (
        <div className={styles.quickReply}>
          <div className={styles.quickReplyTitle}>
            {isBotChat ? '常见问题' : '快捷回复'}
          </div>
          <div className={styles.quickReplyList}>
            {getQuickRepliesList().map((text, i) => (
              <span 
                key={i} 
                className={styles.quickReplyItem}
                onClick={() => handleQuickReply(text)}
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
