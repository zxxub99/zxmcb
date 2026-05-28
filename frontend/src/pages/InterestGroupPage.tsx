import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchBar, Tabs } from 'antd-mobile'
import {
  MessageOutline,
  UserOutline,
  StarOutline,
  FileOutline,
  SoundOutline,
  ClockCircleOutline,
  AaOutline,
  HeartOutline,
  CameraOutline,
} from 'antd-mobile-icons'
import styles from './InterestGroupPage.module.css'

// 兴趣群组数据
const interestGroups = [
  {
    id: 1,
    name: '钟祥旅游交流群',
    category: '旅游',
    icon: <StarOutline />,
    color: '#ff6b6b',
    members: 328,
    posts: 156,
    description: '分享钟祥美景，交流旅行心得',
    cover: 'https://picsum.photos/200/150?random=20',
  },
  {
    id: 2,
    name: '美食探店分享群',
    category: '美食',
    icon: <FileOutline />,
    color: '#ffa500',
    members: 456,
    posts: 289,
    description: '发现钟祥美食，分享吃货心得',
    cover: 'https://picsum.photos/200/150?random=21',
  },
  {
    id: 3,
    name: '健康运动打卡群',
    category: '运动',
    icon: <ClockCircleOutline />,
    color: '#4ecdc4',
    members: 267,
    posts: 198,
    description: '运动健身，互相监督打卡',
    cover: 'https://picsum.photos/200/150?random=22',
  },
  {
    id: 4,
    name: '音乐爱好者俱乐部',
    category: '音乐',
    icon: <SoundOutline />,
    color: '#9b59b6',
    members: 189,
    posts: 134,
    description: '音乐交流，分享好歌',
    cover: 'https://picsum.photos/200/150?random=23',
  },
  {
    id: 5,
    name: '手机摄影交流群',
    category: '摄影',
    icon: <CameraOutline />,
    color: '#3498db',
    members: 234,
    posts: 167,
    description: '手机摄影技巧交流，作品分享',
    cover: 'https://picsum.photos/200/150?random=24',
  },
  {
    id: 6,
    name: '养宠交流分享群',
    category: '宠物',
    icon: <HeartOutline />,
    color: '#e91e63',
    members: 312,
    posts: 245,
    description: '宠物养护经验分享，萌宠照片',
    cover: 'https://picsum.photos/200/150?random=25',
  },
  {
    id: 7,
    name: '棋牌休闲娱乐群',
    category: '游戏',
    icon: <AaOutline />,
    color: '#27ae60',
    members: 198,
    posts: 123,
    description: '棋牌游戏组队，休闲娱乐',
    cover: 'https://picsum.photos/200/150?random=26',
  },
  {
    id: 8,
    name: '广场舞交流群',
    category: '舞蹈',
    icon: <MessageOutline />,
    color: '#f39c12',
    members: 156,
    posts: 89,
    description: '广场舞教学分享，健康生活',
    cover: 'https://picsum.photos/200/150?random=27',
  },
  {
    id: 9,
    name: '读书分享会',
    category: '阅读',
    icon: <FileOutline />,
    color: '#16a085',
    members: 145,
    posts: 98,
    description: '好书推荐，读书心得交流',
    cover: 'https://picsum.photos/200/150?random=28',
  },
  {
    id: 10,
    name: '养生保健交流群',
    category: '养生',
    icon: <HeartOutline />,
    color: '#e74c3c',
    members: 289,
    posts: 178,
    description: '养生知识分享，健康生活',
    cover: 'https://picsum.photos/200/150?random=29',
  },
]

export default function InterestGroupPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')
  const [searchValue, setSearchValue] = useState('')
  const [joinedGroups, setJoinedGroups] = useState<number[]>([1, 3]) // 已加入的群组

  const filteredGroups = interestGroups.filter(group => {
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
        <p className={styles.subtitle}>发现志同道合的伙伴</p>
      </div>

      {/* 搜索栏 */}
      <div className={styles.searchSection}>
        <SearchBar
          placeholder="搜索兴趣群组"
          value={searchValue}
          onChange={setSearchValue}
        />
      </div>

      {/* 分类标签 */}
      <div className={styles.categorySection}>
        <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
          <Tabs.Tab title="全部" key="all" />
          <Tabs.Tab title="旅游" key="旅游" />
          <Tabs.Tab title="美食" key="美食" />
          <Tabs.Tab title="运动" key="运动" />
          <Tabs.Tab title="音乐" key="音乐" />
          <Tabs.Tab title="摄影" key="摄影" />
          <Tabs.Tab title="宠物" key="宠物" />
          <Tabs.Tab title="游戏" key="游戏" />
        </Tabs>
      </div>

      {/* 群组列表 */}
      <div className={styles.groupList}>
        {filteredGroups.map(group => (
          <div 
            key={group.id} 
            className={styles.groupCard}
            onClick={() => navigate(`/interest-group/${group.id}`)}
          >
            <div className={styles.groupCover}>
              <img src={group.cover} alt={group.name} />
              <div className={styles.groupIcon} style={{ background: group.color }}>
                {group.icon}
              </div>
            </div>
            <div className={styles.groupInfo}>
              <div className={styles.groupName}>{group.name}</div>
              <div className={styles.groupDesc}>{group.description}</div>
              <div className={styles.groupStats}>
                <span><UserOutline /> {group.members}</span>
                <span><MessageOutline /> {group.posts}</span>
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

      {/* 空状态提示 */}
      {filteredGroups.length === 0 && (
        <div className={styles.emptyState}>
          <MessageOutline style={{ fontSize: 48, color: '#ccc' }} />
          <p>暂无符合条件的群组</p>
        </div>
      )}

      {/* 底部导航 */}
      <div className={styles.bottomNav}>
        <div className={styles.navItem} onClick={() => navigate('/')}>
          <span className={styles.navIcon}>🏠</span>
          <span>首页</span>
        </div>
        <div className={`${styles.navItem} ${styles.active}`}>
          <span className={styles.navIcon}>💬</span>
          <span>兴趣团</span>
        </div>
        <div className={styles.navItem} onClick={() => navigate('/square')}>
          <span className={styles.navIcon}>📍</span>
          <span>广场</span>
        </div>
        <div className={styles.navItem} onClick={() => navigate('/my')}>
          <span className={styles.navIcon}>👤</span>
          <span>我的</span>
        </div>
      </div>
    </div>
  )
}
