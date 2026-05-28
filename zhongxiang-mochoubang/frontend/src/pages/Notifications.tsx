import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Tabs, Empty } from 'antd-mobile'
import { MessageOutline, BellOutline, HeartOutline } from 'antd-mobile-icons'
import styles from './Notifications.module.css'

interface Notification {
  id: string
  type: 'system' | 'like' | 'comment' | 'transaction' | 'help'
  title: string
  content: string
  createdAt: string
  read: boolean
  link?: string
}

export default function Notifications() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadNotifications()
  }, [activeTab])

  const loadNotifications = async () => {
    setLoading(true)
    // 模拟加载通知
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'transaction',
        title: '交易提醒',
        content: '您的闲置物品"九成新电动车"有新用户想要购买',
        createdAt: '10分钟前',
        read: false,
        link: '/idle/1'
      },
      {
        id: '2',
        type: 'help',
        title: '互助响应',
        content: '张大哥响应了您的"水管漏水需要维修"请求',
        createdAt: '30分钟前',
        read: false,
        link: '/help/1'
      },
      {
        id: '3',
        type: 'like',
        title: '收藏提醒',
        content: '您收藏的"品牌洗衣机"已降价100元',
        createdAt: '1小时前',
        read: true,
        link: '/idle/2'
      },
      {
        id: '4',
        type: 'comment',
        title: '新评价',
        content: '李阿姨对您完成的服务给出了5星好评',
        createdAt: '2小时前',
        read: true,
      },
      {
        id: '5',
        type: 'system',
        title: '积分变动',
        content: '您完成了实名认证，获得+20积分',
        createdAt: '1天前',
        read: true,
        link: '/points'
      },
      {
        id: '6',
        type: 'system',
        title: '系统通知',
        content: '欢迎使用钟祥莫愁帮，祝您生活愉快！',
        createdAt: '3天前',
        read: true,
      },
    ]
    
    setNotifications(mockNotifications)
    setLoading(false)
  }

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'system':
        return <BellOutline className={styles.iconSystem} />
      case 'like':
        return <HeartOutline className={styles.iconLike} />
      case 'comment':
        return <HeartOutline className={styles.iconComment} />
      case 'transaction':
        return <MessageOutline className={styles.iconTransaction} />
      case 'help':
        return <MessageOutline className={styles.iconHelp} />
      default:
        return <BellOutline />
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length
  const allCount = notifications.length

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : activeTab === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === activeTab)

  const handleNotificationClick = (notification: Notification) => {
    // 标记为已读
    if (!notification.read) {
      setNotifications(notifications.map(n => 
        n.id === notification.id ? { ...n, read: true } : n
      ))
    }
    // 跳转到相关页面
    if (notification.link) {
      navigate(notification.link)
    }
  }

  return (
    <div className={styles.container}>
      <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
        <Tabs.Tab title={`全部 ${allCount}`} key='all' />
        <Tabs.Tab 
          title={
            unreadCount > 0 ? (
              <Badge content={unreadCount}>
                未读
              </Badge>
            ) : '未读'
          } 
          key='unread' 
        />
        <Tabs.Tab title='交易' key='transaction' />
        <Tabs.Tab title='互助' key='help' />
      </Tabs>

      <div className={styles.list}>
        {loading ? (
          <div className={styles.loading}>加载中...</div>
        ) : filteredNotifications.length === 0 ? (
          <Empty description="暂无通知" />
        ) : (
          filteredNotifications.map(notification => (
            <div 
              key={notification.id}
              className={`${styles.item} ${!notification.read ? styles.unread : ''}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className={styles.iconWrapper}>
                {getNotificationIcon(notification.type)}
              </div>
              <div className={styles.content}>
                <div className={styles.header}>
                  <span className={styles.title}>{notification.title}</span>
                  <span className={styles.time}>{notification.createdAt}</span>
                </div>
                <p className={styles.description}>{notification.content}</p>
              </div>
              {!notification.read && <span className={styles.dot} />}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
