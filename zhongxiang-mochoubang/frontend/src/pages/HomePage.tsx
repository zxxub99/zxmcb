import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import { 
  EnvironmentOutline, 
  MessageOutline, 
  UserOutline,
  HeartOutline,
  GiftOutline,
  AntOutline,
  EditFill,
} from 'antd-mobile-icons'
import styles from './HomePage.module.css'

// Banner数据
const banners = [
  { id: 1, image: 'https://picsum.photos/750/300?random=1', title: '欢迎使用钟祥莫愁帮' },
  { id: 2, image: 'https://picsum.photos/750/300?random=2', title: '闲置物品换起来' },
  { id: 3, image: 'https://picsum.photos/750/300?random=3', title: '邻里互助暖人心' },
]

// 活动数据
const activities = [
  { id: 1, icon: <GiftOutline />, title: '新人礼包', desc: '注册送积分', color: '#ff6b6b' },
  { id: 2, icon: <AntOutline />, title: '以物换物', desc: '闲置换好物', color: '#4ecdc4' },
  { id: 3, icon: <EditFill />, title: '免费维修', desc: '每周六公益', color: '#ffe66d' },
  { id: 4, icon: <GiftOutline />, title: '扫码签到', desc: '连续签到奖励', color: '#95e1d3' },
]

// 推荐闲置物品
const recommendedItems = [
  { id: 1, title: '九成新自行车', price: '¥180', image: 'https://picsum.photos/200/200?random=10', distance: '1.2km' },
  { id: 2, title: '二手冰箱转让', price: '¥450', image: 'https://picsum.photos/200/200?random=11', distance: '2.5km' },
  { id: 3, title: '儿童玩具套装', price: '¥50', image: 'https://picsum.photos/200/200?random=12', distance: '800m' },
]

// 推荐互助
const recommendedHelps = [
  { id: 1, title: '需要帮忙搬家', type: '跑腿', time: '今天', reward: '50积分' },
  { id: 2, title: '空调不制冷了', type: '维修', time: '尽快', reward: '80积分' },
  { id: 3, title: '教老人用手机', type: '咨询', time: '周末', reward: '30积分' },
]

export default function HomePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('home')
  const [location] = useState('钟祥市')

  const tabs = [
    { key: 'home', title: '首页', icon: <EnvironmentOutline /> },
    { key: 'nearby', title: '附近', icon: <EnvironmentOutline /> },
    { key: 'square', title: '广场', icon: <MessageOutline /> },
    { key: 'messages', title: '消息', icon: <HeartOutline />, badge: 3 },
    { key: 'my', title: '我的', icon: <UserOutline /> },
  ]

  return (
    <div className={styles.container}>
      {/* 顶部区域 */}
      <div className={styles.header}>
        <div className={styles.locationBar} onClick={() => navigate('/location')}>
          <span className={styles.locationIcon}><EnvironmentOutline /></span>
          <span className={styles.locationText}>{location}</span>
          <span className={styles.locationArrow}>▼</span>
        </div>
      </div>

      {/* 搜索栏 */}
      <div className={styles.searchSection}>
        <div className={styles.searchBar} onClick={() => navigate('/search')}>
          <span className={styles.searchPlaceholder}>搜索用户、服务、闲置物品...</span>
        </div>
      </div>

      {/* Banner轮播 */}
      <div className={styles.bannerSection}>
        <div className={styles.bannerScroll}>
          {banners.map(banner => (
            <div key={banner.id} className={styles.bannerItem}>
              <img src={banner.image} alt={banner.title} className={styles.bannerImage} />
              <div className={styles.bannerOverlay}>
                <span className={styles.bannerTitle}>{banner.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 快捷入口 */}
      <div className={styles.quickEntry}>
        {activities.map(activity => (
          <div 
            key={activity.id} 
            className={styles.entryItem}
            onClick={() => navigate(`/activity/${activity.id}`)}
          >
            <div className={styles.entryIcon} style={{background: activity.color}}>
              {activity.icon}
            </div>
            <span className={styles.entryTitle}>{activity.title}</span>
            <span className={styles.entryDesc}>{activity.desc}</span>
          </div>
        ))}
      </div>

      {/* 热门闲置 */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.titleIcon}>🔥</span>
            热门闲置
          </h3>
          <span className={styles.moreLink} onClick={() => navigate('/idle')}>
            查看更多 {'>'}
          </span>
        </div>
        <div className={styles.itemGrid}>
          {recommendedItems.map(item => (
            <div 
              key={item.id} 
              className={styles.itemCard}
              onClick={() => navigate(`/idle/${item.id}`)}
            >
              <img src={item.image} alt={item.title} className={styles.itemImage} />
              <div className={styles.itemInfo}>
                <span className={styles.itemTitle}>{item.title}</span>
                <span className={styles.itemPrice}>{item.price}</span>
                <span className={styles.itemDistance}>{item.distance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 紧急互助 */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.titleIcon}>🆘</span>
            紧急求助
          </h3>
          <span className={styles.moreLink} onClick={() => navigate('/help')}>
            查看更多 {'>'}
          </span>
        </div>
        <div className={styles.helpList}>
          {recommendedHelps.map(help => (
            <div 
              key={help.id} 
              className={styles.helpItem}
              onClick={() => navigate(`/help/${help.id}`)}
            >
              <div className={styles.helpHeader}>
                <span className={styles.urgentBadge}>急</span>
                <span className={styles.helpTitle}>{help.title}</span>
              </div>
              <div className={styles.helpMeta}>
                <span className={styles.helpType}>{help.type}</span>
                <span className={styles.helpTime}>{help.time}</span>
                <span className={styles.helpReward}>{help.reward}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 附近推荐 */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.titleIcon}>👥</span>
            附近的人
          </h3>
          <span className={styles.moreLink} onClick={() => navigate('/nearby')}>
            查看更多 {'>'}
          </span>
        </div>
        <div className={styles.userList}>
          <div className={styles.userCard} onClick={() => navigate('/user/1')}>
            <div className={styles.userAvatar}>😊</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>张阿姨</span>
              <span className={styles.userTags}>
                <span className={styles.tag}>广场舞</span>
                <span className={styles.tag}>美食</span>
              </span>
            </div>
            <span className={styles.userDistance}>500m</span>
          </div>
          <div className={styles.userCard} onClick={() => navigate('/user/2')}>
            <div className={styles.userAvatar}>😎</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>王师傅</span>
              <span className={styles.userTags}>
                <span className={styles.tag}>维修</span>
                <span className={styles.tag}>电工</span>
              </span>
            </div>
            <span className={styles.userDistance}>800m</span>
          </div>
        </div>
      </div>

      {/* 底部间距 */}
      <div className={styles.bottomSpace}></div>

      {/* 底部导航 */}
      <TabBar activeKey={activeTab} onChange={(key) => {
        setActiveTab(key)
        if (key === 'nearby') navigate('/nearby')
        if (key === 'square') navigate('/square')
        if (key === 'messages') navigate('/messages')
        if (key === 'my') navigate('/my')
      }}>
        {tabs.map(tab => (
          <TabBar.Item 
            key={tab.key} 
            icon={tab.icon} 
            title={tab.title}
            badge={tab.badge}
          />
        ))}
      </TabBar>
    </div>
  )
}
