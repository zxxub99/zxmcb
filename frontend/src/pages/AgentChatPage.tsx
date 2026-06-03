import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, Button, Toast } from 'antd-mobile'
import {
  LeftOutline,
  SendOutline,
  SmileOutline,
} from 'antd-mobile-icons'
import styles from './AgentChatPage.module.css'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

// 智能体配置 - 钟祥居保与许可的农家小院
const AGENT_CONFIG = {
  name: '农家小院',
  fullName: '钟祥居保与许可的农家小院',
  avatar: '🏡',
  description: '您的专属农家生活顾问，了解钟祥本地风土人情、农家美食、乡村体验',
  welcomeMessage: '您好！欢迎来到钟祥居保与许可的农家小院！我是您的专属管家，可以为您介绍：\n\n🏠 农家住宿体验\n🍲 地道农家美食\n🌾 乡村农耕活动\n🎯 本地旅游攻略\n\n请问有什么可以帮助您的？',
  quickReplies: [
    '介绍一下农家小院',
    '有哪些特色美食？',
    '如何预约住宿？',
    '周边有什么好玩的地方？',
    '农家乐价格怎么样？',
  ],
}

// 模拟智能体回复（实际部署时可对接Coze API）
const getAgentResponse = (message: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const msg = message.toLowerCase()
      
      if (msg.includes('介绍') || msg.includes('是什么') || msg.includes('关于')) {
        resolve(`🏡 **钟祥居保与许可的农家小院**

位于湖北省钟祥市郊区的精品农家乐，占地面积约3000平方米，集餐饮、住宿、休闲、娱乐为一体。

**📍 地址**：钟祥市XX镇XX村（距市区15分钟车程）

**🕐 营业时间**：全年无休 9:00-22:00

**📞 预约热线**：138-XXXX-XXXX

我们期待您的光临！`)
      } else if (msg.includes('美食') || msg.includes('吃') || msg.includes('菜')) {
        resolve(`🍲 **农家特色美食**

我们的菜品坚持"从田间到餐桌"的理念：

🥘 **招牌推荐**
• 盘龙菜（蒸肉糕）- 钟祥非遗美食
• 米茶 - 世界长寿之乡秘诀
• 农家土鸡煲 - 散养土鸡，现杀现做
• 清蒸水库鱼 - 当日新鲜捕捞

🥬 **时令蔬菜**
全部来自自家菜园，绿色有机无农药

🍚 **主食**
• 柴火饭 • 手擀面 • 锅巴粥

人均消费：¥50-80元`)
      } else if (msg.includes('住宿') || msg.includes('房间') || msg.includes('住') || msg.includes('预约') || msg.includes('预订')) {
        resolve(`🛏️ **住宿预订指南**

**房间类型**
| 房型 | 价格 | 设施 |
|------|------|------|
| 标准间 | ¥168/晚 | 空调/WiFi/独卫 |
| 大床房 | ¥198/晚 | 空调/WiFi/独卫/阳台 |
| 家庭套房 | ¥288/晚 | 两室一厅/厨房 |
| 窑洞房 | ¥238/晚 | 特色窑洞体验 |

**预订方式**
1️⃣ 电话预约：138-XXXX-XXXX
2️⃣ 微信预约：添加客服微信
3️⃣ 现场预订：直接到店

**优惠政策**
• 连住2晚以上享8折
• 10人以上团队享套餐价
• 儿童不占床免费`)
      } else if (msg.includes('玩') || msg.includes('景点') || msg.includes('旅游') || msg.includes('周边') || msg.includes('好玩')) {
        resolve(`🎯 **周边游玩推荐**

**🏛️ 文化景点**
• 明显陵 - 世界文化遗产（车程20分钟）
• 莫愁村 - 古村落风情街（车程10分钟）
• 莫愁湖国家湿地公园（车程15分钟）

**🌿 自然风光**
• 大洪山风景区（车程40分钟）
• 黄仙洞景区（车程30分钟）
• 温峡湖水库（车程25分钟）

**🎮 休闲娱乐**
• 采摘园（草莓/葡萄/桃子，季节性）
• 钓鱼场（免费提供渔具）
• 烧烤区（可租用）

我们可以安排专车接送或提供导游服务哦~`)
      } else if (msg.includes('价格') || msg.includes('多少钱') || msg.includes('收费')) {
        resolve(`💰 **价格参考**

**餐饮**
• 早餐：¥15/人（自助）
• 午餐/晚餐：人均¥50-80
• 包桌套餐：¥388/588/888元

**住宿**
• 标准间：¥168起
• 家庭套房：¥288起

**娱乐项目**
• 采摘：按季节定价（¥30-80/人）
• 钓鱼：自带竿免费，租竿¥20/天
• 烧烤：炉具租赁¥50 + 食材另计

**特别说明**
• 儿童身高1.2m以下用餐半价
• 65岁以上老人用餐8折
• 团队(10人以上)可定制优惠方案`)
      } else if (msg.includes('你好') || msg.includes('嗨') || msg.includes('hi') || msg.includes('hello')) {
        resolve(`您好！欢迎来到农家小院！👋\n\n我是您的专属助手，可以帮您了解：\n\n✨ 农家小院介绍\n🍲 特色美食推荐\n🛏️ 住宿预订\n🎯 周边旅游攻略\n💰 价格信息\n\n请选择上方快捷问题，或直接输入您想了解的内容~`)
      } else if (msg.includes('谢谢') || msg.includes('感谢') || msg.contains?.('再见') || msg.includes('拜拜')) {
        resolve(`不客气！😊\n\n如有其他问题随时问我，期待在农家小院见到您！🏡\n\n**预约电话：138-XXXX-XXXX**`)
      } else {
        resolve(`感谢您的提问！关于"${message}"，我建议您：\n\n1️⃣ 直接拨打我们的服务热线 **138-XXXX-XXXX**\n2️⃣ 添加微信客服详细咨询\n3️⃣ 或者告诉我您想了解的具体方面（美食/住宿/游玩/价格）\n\n我会为您提供更详细的信息！`)
      }
    }, 800 + Math.random() * 1200) // 模拟思考延迟
  })
}

export default function AgentChatPage() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 初始化欢迎消息
  useEffect(() => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: AGENT_CONFIG.welcomeMessage,
      timestamp: Date.now(),
    }])
  }, [])

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // 发送消息
  const handleSend = async () => {
    const text = inputText.trim()
    if (!text || sending) return

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    }

    setMessages(prev => [...prev, userMsg])
    setInputText('')
    setSending(true)

    try {
      const reply = await getAgentResponse(text)
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: Date.now(),
      }
      setMessages(prev => [...prev, botMsg])
    } catch {
      Toast.show({ icon: 'fail', content: '回复失败，请重试' })
    } finally {
      setSending(false)
    }
  }

  // 快捷回复点击
  const handleQuickReply = (text: string) => {
    setInputText(text)
    setTimeout(() => {
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text,
        timestamp: Date.now(),
      }
      setMessages(prev => [...prev, userMsg])
      setSending(true)

      getAgentResponse(text).then(reply => {
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: reply,
          timestamp: Date.now(),
        }
        setMessages(prev => [...prev, botMsg])
        setSending(false)
      }).catch(() => {
        setSending(false)
        Toast.show({ icon: 'fail', content: '回复失败' })
      })
    }, 100)
  }

  return (
    <div className={styles.container}>
      {/* 顶部导航 */}
      <div className={styles.header}>
        <div className={styles.headerLeft} onClick={() => navigate(-1)}>
          <LeftOutline fontSize={20} />
        </div>
        <div className={styles.headerCenter}>
          <span className={styles.headerAvatar}>{AGENT_CONFIG.avatar}</span>
          <div className={styles.headerInfo}>
            <span className={styles.headerName}>{AGENT_CONFIG.fullName}</span>
            <span className={styles.headerStatus}>
              <span className={styles.statusDot}></span>
              在线服务
            </span>
          </div>
        </div>
        <div className={styles.headerRight}></div>
      </div>

      {/* 消息区域 */}
      <div className={styles.messagesArea}>
        {messages.map(msg => (
          <div key={msg.id} className={`${styles.messageRow} ${styles[msg.role]}`}>
            {msg.role === 'assistant' && (
              <div className={styles.avatar}>{AGENT_CONFIG.avatar}</div>
            )}
            <div className={`${styles.messageBubble} ${styles[msg.role]}`}>
              <div className={styles.messageContent}>{msg.content}</div>
              <div className={styles.messageTime}>
                {new Date(msg.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            {msg.role === 'user' && (
              <div className={styles.avatarUser}>我</div>
            )}
          </div>
        ))}
        {sending && (
          <div className={`${styles.messageRow} ${styles.assistant}`}>
            <div className={styles.avatar}>{AGENT_CONFIG.avatar}</div>
            <div className={`${styles.messageBubble} ${styles.assistant}`}>
              <div className={styles.typingIndicator}>
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 快捷回复 */}
      {!messages.some(m => m.id !== 'welcome') && (
        <div className={styles.quickReplies}>
          {AGENT_CONFIG.quickReplies.map((reply, idx) => (
            <button key={idx} className={styles.quickReplyBtn} onClick={() => handleQuickReply(reply)}>
              {reply}
            </button>
          ))}
        </div>
      )}

      {/* 输入区域 */}
      <div className={styles.inputArea}>
        <div className={styles.inputWrapper}>
          <Input
            className={styles.input}
            placeholder="输入您的问题..."
            value={inputText}
            onChange={val => setInputText(val)}
            onEnterPress={handleSend}
            maxLength={500}
          />
          <Button
            className={styles.sendBtn}
            color="primary"
            size="small"
            disabled={!inputText.trim() || sending}
            onClick={handleSend}
          >
            <SendOutline fontSize={18} />
          </Button>
        </div>
        <div className={styles.inputTip}>Powered by 钟祥居保与许可的农家小院</div>
      </div>
    </div>
  )
}
