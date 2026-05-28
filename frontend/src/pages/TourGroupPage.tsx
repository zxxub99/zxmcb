import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchBar } from 'antd-mobile'
import {
  MessageOutline,
  UserOutline,
  CompassOutline,
  CameraOutline,
  ShopbagOutline,
  UnorderedListOutline,
  GiftOutline,
  FrownOutline,
} from 'antd-mobile-icons'
import styles from './TourGroupPage.module.css'

// 旅游群组数据
const tourGroups = [
  {
    id: 1,
    name: '明显陵探秘小队',
    category: '古迹探访',
    icon: <CompassOutline />,
    color: '#ff6b6b',
    members: 156,
    posts: 89,
    description: '探索明显陵的历史秘密，分享摄影作品',
    cover: 'https://picsum.photos/200/150?random=60',
    activity: '每周六组织探访活动',
    tag: '热门',
  },
  {
    id: 2,
    name: '莫愁村美食团',
    category: '美食探索',
    icon: <UnorderedListOutline />,
    color: '#ffa500',
    members: 234,
    posts: 156,
    description: '发现莫愁村地道美食，分享吃货心得',
    cover: 'https://picsum.photos/200/150?random=61',
    activity: '定期组织美食探店',
    tag: '美食',
  },
  {
    id: 3,
    name: '黄仙洞探险队',
    category: '自然探险',
    icon: <CameraOutline />,
    color: '#4ecdc4',
    members: 98,
    posts: 67,
    description: '溶洞探险、摄影交流、户外徒步',
    cover: 'https://picsum.photos/200/150?random=62',
    activity: '春秋季节组织探险',
    tag: '',
  },
  {
    id: 4,
    name: '钟祥自驾游联盟',
    category: '自驾出行',
    icon: <ShopbagOutline />,
    color: '#3498db',
    members: 312,
    posts: 245,
    description: '自驾路线分享、拼车同行、旅途故事',
    cover: 'https://picsum.photos/200/150?random=63',
    activity: '周末短线自驾组织',
    tag: '活跃',
  },
  {
    id: 5,
    name: '大口森林公园露营会',
    category: '户外露营',
    icon: <GiftOutline />,
    color: '#27ae60',
    members: 87,
    posts: 54,
    description: '森林露营、烧烤BBQ、星空观赏',
    cover: 'https://picsum.photos/200/150?random=64',
    activity: '每月组织露营活动',
    tag: '',
  },
  {
    id: 6,
    name: '钟祥伴手礼交流',
    category: '购物精选',
    icon: <FrownOutline />,
    color: '#9b59b6',
    members: 145,
    posts: 98,
    description: '推荐钟祥特产、伴手礼选购攻略',
    cover: 'https://picsum.photos/200/150?random=65',
    activity: '分享本地好物',
    tag: '',
  },
  {
    id: 7,
    name: '摄影爱好者联盟',
    category: '摄影交流',
    icon: <CameraOutline />,
    color: '#e91e63',
    members: 198,
    posts: 167,
    description: '钟祥风光摄影、作品交流、技巧分享',
    cover: 'https://picsum.photos/200/150?random=66',
    activity: '定期外拍活动',
    tag: '摄影',
  },
  {
    id: 8,
    name: '养生温泉之旅',
    category: '康养休闲',
    icon: <GiftOutline />,
    color: '#00bcd4',
    members: 112,
    posts: 76,
    description: '温泉养生、度假休闲、康养交流',
    cover: 'https://picsum.photos/200/150?random=67',
    activity: '温泉季组织康养之旅',
    tag: '',
  },
]

const categories = [
  { key: 'all', label: '全部' },
  { key: '古迹探访', label: '古迹探访' },
  { key: '美食探索', label: '美食探索' },
  { key: '自然探险', label: '自然探险' },
  { key: '自驾出行', label: '自驾出行' },
  { key: '户外露营', label: '户外露营' },
  { key: '摄影交流', label: '摄影交流' },
]

export default function TourGroupPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [searchValue, setSearchValue] = useState('')
  const [joinedGroups, setJoinedGroups] = useState<number[]>([1, 4])

  const filteredGroups = tourGroups.filter(group => {
    const matchCategory = activeTab === 'all' || group.category === activeTab
    const matchSearch = group.name.includes(searchValue) || group.description.includes(searchValue)
    return matchCategory && matchSearch
  })

  const handleJoinGroup = (groupId: number) => {
    if (joinedGroups.includes(groupId)) {
      setJoinedGroups(joinedGroups.filter(id => id !== groupId))
    } else {
      setJoinedGroups([...joinedGroups, groupId])
    }
  }

  return (
    <div className={styles.container}>
      {/* 顶部标题 */}
      <div className={styles.header}>
        <h1 className={styles.title}>乐聚团</h1>
        <p className={styles.subtitle}>探索莫愁故里 · 结识旅友</p>
      </div>

      {/* 搜索栏 */}
      <div className={styles.searchSection}>
        <SearchBar
          placeholder="搜索乐聚团"
          value={searchValue}
          onChange={setSearchValue}
        />
      </div>

      {/* 分类标签 */}
      <div className={styles.categorySection}>
        <div className={styles.categoryTabs}>
          {categories.map(cat => (
            <button
              key={cat.key}
              className={`${styles.tabBtn} ${activeTab === cat.key ? styles.active : ''}`}
              onClick={() => setActiveTab(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 群组列表 */}
      <div className={styles.groupList}>
        {filteredGroups.map(group => (
          <div 
            key={group.id} 
            className={styles.groupCard}
            onClick={() => navigate(`/tour-group/${group.id}`)}
          >
            <div className={styles.groupCover}>
              <img src={group.cover} alt={group.name} />
              <div className={styles.groupIcon} style={{ background: group.color }}>
                {group.icon}
              </div>
              {group.tag && <div className={styles.groupTag}>{group.tag}</div>}
            </div>
            <div className={styles.groupInfo}>
              <div className={styles.groupName}>{group.name}</div>
              <div className={styles.groupDesc}>{group.description}</div>
              <div className={styles.groupActivity}>
                <span>📅 {group.activity}</span>
              </div>
              <div className={styles.groupStats}>
                <span><UserOutline /> {group.members}人</span>
                <span><MessageOutline /> {group.posts}帖</span>
                <span className={styles.categoryTag}>{group.category}</span>
              </div>
            </div>
            <div className={styles.groupAction}>
              <button 
                className={`${styles.joinBtn} ${joinedGroups.includes(group.id) ? styles.joined : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  handleJoinGroup(group.id)
                }}
              >
                {joinedGroups.includes(group.id) ? '已加入' : '加入'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 空状态 */}
      {filteredGroups.length === 0 && (
        <div className={styles.emptyState}>
          <CompassOutline style={{ fontSize: 48, color: '#ccc' }} />
          <p>暂无符合条件的乐聚团</p>
        </div>
      )}

      {/* 底部导航 */}
      <div className={styles.bottomNav}>
        <div className={styles.navItem} onClick={() => navigate('/')}>
          <span className={styles.navIcon}>🏠</span>
          <span>首页</span>
        </div>
        <div className={`${styles.navItem} ${styles.active}`}>
          <span className={styles.navIcon}>👥</span>
          <span>乐聚团</span>
        </div>
        <div className={styles.navItem} onClick={() => navigate('/tourism')}>
          <span className={styles.navIcon}>🏞️</span>
          <span>景点</span>
        </div>
        <div className={styles.navItem} onClick={() => navigate('/my')}>
          <span className={styles.navIcon}>👤</span>
          <span>我的</span>
        </div>
      </div>
    </div>
  )
}
