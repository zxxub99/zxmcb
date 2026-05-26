import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, TabBar, Badge } from 'antd-mobile'
import { 
  EnvironmentOutline, 
  MessageOutline, 
  UserOutline,
  HeartOutline,
  ShopbagOutline,
} from 'antd-mobile-icons'
import styles from './HomePage.module.css'

export default function HomePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('home')

  const tabs = [
    { key: 'home', title: '附近', icon: <EnvironmentOutline /> },
    { key: 'square', title: '广场', icon: <MessageOutline /> },
    { key: 'messages', title: '消息', icon: <HeartOutline />, badge: 5 },
    { key: 'my', title: '我的', icon: <UserOutline /> },
  ]

  return (
    <div className={styles.container}>
      {/* 顶部搜索栏 */}
      <div className={styles.header}>
        <div className={styles.logo}>钟祥莫愁帮</div>
        <div className={styles.searchBar} onClick={() => navigate('/search')}>
          <span className={styles.searchPlaceholder}>搜索附近的用户、服务、闲置...</span>
        </div>
      </div>

      {/* 快捷入口 */}
      <div className={styles.quickEntry}>
        <div className={styles.entryItem} onClick={() => navigate('/nearby')}>
          <div className={styles.entryIcon} style={{background: '#1890ff'}}>
            <EnvironmentOutline />
          </div>
          <span>附近的人</span>
        </div>
        <div className={styles.entryItem} onClick={() => navigate('/idle')}>
          <div className={styles.entryIcon} style={{background: '#52c41a'}}>
            <ShopbagOutline />
          </div>
          <span>闲置好物</span>
        </div>
        <div className={styles.entryItem} onClick={() => navigate('/help')}>
          <div className={styles.entryIcon} style={{background: '#faad14'}}>
            <UserOutline />
          </div>
          <span>邻里互助</span>
        </div>
      </div>

      {/* 推荐内容区 */}
      <div className={styles.content}>
        <h3 className={styles.sectionTitle}>同城动态</h3>
        <Card>
          <Card.Header
            title="用户昵称"
            thumb="https://via.placeholder.com/40"
            extra={<span className={styles.tag}>交友</span>}
          />
          <Card.Body>
            <p>这是一条同城动态内容...</p>
          </Card.Body>
        </Card>
      </div>

      {/* 底部导航 */}
      <TabBar activeKey={activeTab} onChange={setActiveTab as any}>
        {tabs.map(tab => (
          <TabBar.Item key={tab.key} icon={tab.icon} title={tab.title} badge={tab.badge} />
        ))}
      </TabBar>
    </div>
  )
}
