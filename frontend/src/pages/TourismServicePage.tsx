import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import { EnvironmentOutline, MessageOutline, UserOutline, HeartOutline, SearchOutline, LeftOutline, PhonebookOutline } from 'antd-mobile-icons'
import styles from './TourismServicePage.module.css'

// 旅游服务分类
const categories = [
  { id: 'all', name: '全部', icon: '🏨' },
  { id: 'hotel', name: '民宿酒店', icon: '🏠' },
  { id: 'farm', name: '农家乐', icon: '🍽️' },
  { id: 'ticket', name: '景区门票', icon: '🎫' },
  { id: 'guide', name: '旅游咨询', icon: '📞' },
  { id: 'food', name: '特色美食', icon: '🍜' },
]

// 旅游服务商品数据
const services = [
  {
    id: 1,
    name: '莫愁村民宿·静雅居',
    subtitle: '湖北旅游名街·明清风格',
    price: '¥288',
    unit: '起/晚',
    seller: '莫愁村民宿联盟',
    rating: 4.9,
    sales: 456,
    images: ['https://picsum.photos/400/300?random=301', 'https://picsum.photos/400/300?random=302'],
    tags: ['含早餐', '免费停车', '近景区'],
    category: 'hotel',
    features: ['独立庭院', '古风装修', '24h热水'],
  },
  {
    id: 2,
    name: '长寿山庄农家乐',
    subtitle: '采摘体验·垂钓休闲',
    price: '¥68',
    unit: '起/人',
    seller: '长寿山庄农家乐',
    rating: 4.8,
    sales: 892,
    images: ['https://picsum.photos/400/300?random=303', 'https://picsum.photos/400/300?random=304'],
    tags: ['农家菜', '采摘', '垂钓'],
    category: 'farm',
    features: ['土灶菜', '果园', '鱼塘'],
  },
  {
    id: 3,
    name: '明显陵门票',
    subtitle: '世界文化遗产·国家5A景区',
    price: '¥50',
    unit: '张',
    seller: '明显陵景区',
    rating: 4.7,
    sales: 2341,
    images: ['https://picsum.photos/400/300?random=305', 'https://picsum.photos/400/300?random=306'],
    tags: ['电子票', '随买随用'],
    category: 'ticket',
    features: ['世界遗产', '明代皇陵', '摄影胜地'],
  },
  {
    id: 4,
    name: '黄仙洞门票',
    subtitle: '亚洲单体最大溶洞',
    price: '¥70',
    unit: '张',
    seller: '黄仙洞景区',
    rating: 4.6,
    sales: 1567,
    images: ['https://picsum.photos/400/300?random=307', 'https://picsum.photos/400/300?random=308'],
    tags: ['电子票', '奇观'],
    category: 'ticket',
    features: ['喀斯特地貌', '地质奇观', '避暑胜地'],
  },
  {
    id: 5,
    name: '温峡漂流·激情夏日',
    subtitle: '原生态峡谷漂流',
    price: '¥128',
    unit: '人',
    seller: '温峡漂流基地',
    rating: 4.8,
    sales: 678,
    images: ['https://picsum.photos/400/300?random=309', 'https://picsum.photos/400/300?random=310'],
    tags: ['含保险', '装备全'],
    category: 'guide',
    features: ['全长5km', '落差大', '刺激安全'],
  },
  {
    id: 6,
    name: '钟祥本地导游服务',
    subtitle: '深度讲解·专属定制',
    price: '¥200',
    unit: '天',
    seller: '钟祥导游联盟',
    rating: 4.9,
    sales: 234,
    images: ['https://picsum.photos/400/300?random=311', 'https://picsum.photos/400/300?random=312'],
    tags: ['讲解', '包车'],
    category: 'guide',
    features: ['全程陪同', '专业讲解', '行程定制'],
  },
  {
    id: 7,
    name: '大口森林公园民宿',
    subtitle: '森林氧吧·康养圣地',
    price: '¥218',
    unit: '起/晚',
    seller: '大口森林公园',
    rating: 4.7,
    sales: 345,
    images: ['https://picsum.photos/400/300?random=313', 'https://picsum.photos/400/300?random=314'],
    tags: ['森林', '康养'],
    category: 'hotel',
    features: ['负氧离子高', '原生态', '静谧'],
  },
  {
    id: 8,
    name: '钟祥蟠龙菜·宫廷宴',
    subtitle: '明代宫廷御膳·非遗美食',
    price: '¥188',
    unit: '桌',
    seller: '正宗农家小院',
    rating: 4.9,
    sales: 567,
    images: ['https://picsum.photos/400/300?random=315', 'https://picsum.photos/400/300?random=316'],
    tags: ['预定', '送餐'],
    category: 'food',
    features: ['非遗美食', '可外送', '团队餐'],
  },
  // 新增更多旅游服务
  {
    id: 9,
    name: '莫愁湖度假村',
    subtitle: '湖景别墅·休闲垂钓',
    price: '¥388',
    unit: '起/晚',
    seller: '莫愁湖度假村',
    rating: 4.8,
    sales: 234,
    images: ['https://picsum.photos/400/300?random=317', 'https://picsum.photos/400/300?random=318'],
    tags: ['湖景', '垂钓'],
    category: 'hotel',
    features: ['湖景别墅', '私人码头', '游船'],
  },
  {
    id: 10,
    name: '文峰塔景区门票',
    subtitle: '钟祥标志性古建筑',
    price: '¥30',
    unit: '张',
    seller: '文峰塔景区',
    rating: 4.5,
    sales: 876,
    images: ['https://picsum.photos/400/300?random=319', 'https://picsum.photos/400/300?random=320'],
    tags: ['古建筑', '夜景'],
    category: 'ticket',
    features: ['历史文化', '登高望远', '夜景璀璨'],
  },
  {
    id: 11,
    name: '元祐温泉度假村',
    subtitle: '天然温泉·康养理疗',
    price: '¥128',
    unit: '人',
    seller: '元祐温泉',
    rating: 4.9,
    sales: 456,
    images: ['https://picsum.photos/400/300?random=321', 'https://picsum.photos/400/300?random=322'],
    tags: ['温泉', '康养'],
    category: 'hotel',
    features: ['天然温泉', 'SPA理疗', '康养胜地'],
  },
  {
    id: 12,
    name: '客店生态农庄',
    subtitle: '山野趣味·采摘体验',
    price: '¥88',
    unit: '起/人',
    seller: '客店生态农庄',
    rating: 4.7,
    sales: 345,
    images: ['https://picsum.photos/400/300?random=323', 'https://picsum.photos/400/300?random=324'],
    tags: ['采摘', '农家菜'],
    category: 'farm',
    features: ['山野趣味', '有机蔬菜', '亲子乐园'],
  },
  {
    id: 13,
    name: '钟祥米茶体验馆',
    subtitle: '亲手制作·非遗传承',
    price: '¥58',
    unit: '人',
    seller: '钟祥非遗体验馆',
    rating: 4.8,
    sales: 123,
    images: ['https://picsum.photos/400/300?random=325', 'https://picsum.photos/400/300?random=326'],
    tags: ['DIY', '非遗'],
    category: 'guide',
    features: ['亲手制作', '非遗传承', '伴手礼'],
  },
  {
    id: 14,
    name: '明显陵深度讲解游',
    subtitle: '专业导游·历史探秘',
    price: '¥150',
    unit: '人',
    seller: '钟祥导游联盟',
    rating: 4.9,
    sales: 567,
    images: ['https://picsum.photos/400/300?random=327', 'https://picsum.photos/400/300?random=328'],
    tags: ['深度讲解', '历史'],
    category: 'guide',
    features: ['专业讲解', '历史探秘', '摄影指导'],
  },
  {
    id: 15,
    name: '盘龙宴·长寿美食',
    subtitle: '明代宫廷御膳·长寿宴席',
    price: '¥288',
    unit: '桌',
    seller: '莫愁村美食街',
    rating: 4.9,
    sales: 234,
    images: ['https://picsum.photos/400/300?random=329', 'https://picsum.photos/400/300?random=330'],
    tags: ['长寿宴', '宫廷菜'],
    category: 'food',
    features: ['非遗美食', '养生佳肴', '团体预定'],
  },
]

// 精选景点
const featuredSpots = [
  { id: 1, name: '明显陵', desc: '世界文化遗产', img: '/banner1.png' },
  { id: 2, name: '莫愁村', desc: '湖北旅游名街', img: '/banner5.png' },
  { id: 3, name: '黄仙洞', desc: '亚洲最大溶洞', img: '/banner3.png' },
  { id: 4, name: '温峡水库', desc: '山水画卷', img: '/banner4.png' },
  { id: 5, name: '文峰塔', desc: '钟祥标志性古建筑', img: '/banner2.png' },
]

export default function TourismServicePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('tourism-service')
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchValue, setSearchValue] = useState('')

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(s => s.category === activeCategory)

  const tabs = [
    { key: 'home', title: '首页', icon: <EnvironmentOutline /> },
    { key: 'nearby', title: '附近', icon: <EnvironmentOutline /> },
    { key: 'square', title: '广场', icon: <MessageOutline /> },
    { key: 'messages', title: '消息', icon: <HeartOutline />, badge: 3 },
    { key: 'my', title: '我的', icon: <UserOutline /> },
  ]

  return (
    <div className={styles.container}>
      {/* 顶部导航 */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.backBtn} onClick={() => navigate('/')}>
            <LeftOutline /> 返回
          </div>
          <div className={styles.headerTitle}>钟祥旅游服务</div>
          <div className={styles.headerRight}>
            <PhonebookOutline style={{ color: '#fff' }} />
          </div>
        </div>
        <div className={styles.searchBar}>
          <SearchOutline className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="搜索民宿、门票、农家乐..." 
            className={styles.searchInput}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      {/* IP宣传区 */}
      <div className={styles.ipBanner}>
        <div className={styles.ipContent}>
          <div className={styles.ipTitle}>🏨 吃住游玩 · 全方位服务</div>
          <div className={styles.ipDesc}>旅游到钟祥 就找莫愁帮</div>
          <div className={styles.ipTags}>
            <span className={styles.ipTag}>民宿农家乐</span>
            <span className={styles.ipTag}>景区门票</span>
            <span className={styles.ipTag}>旅游咨询</span>
          </div>
        </div>
      </div>

      {/* 精选景点 */}
      <div className={styles.spotsSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>🗺️ 精选景点</span>
        </div>
        <div className={styles.spotsGrid}>
          {featuredSpots.map(spot => (
            <div key={spot.id} className={styles.spotCard}>
              <img src={spot.img} alt={spot.name} className={styles.spotImg} />
              <div className={styles.spotOverlay}>
                <div className={styles.spotName}>{spot.name}</div>
                <div className={styles.spotDesc}>{spot.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 分类导航 */}
      <div className={styles.categoryNav}>
        <div className={styles.categoryScroll}>
          {categories.map(cat => (
            <div 
              key={cat.id} 
              className={`${styles.categoryItem} ${activeCategory === cat.id ? styles.categoryItemActive : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className={styles.categoryIcon}>{cat.icon}</span>
              <span className={styles.categoryName}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 服务列表 */}
      <div className={styles.serviceSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>📋 全部服务</span>
          <span className={styles.serviceCount}>共{filteredServices.length}项</span>
        </div>
        <div className={styles.serviceList}>
          {filteredServices.map(service => (
            <div key={service.id} className={styles.serviceCard}>
              <img src={service.images[0]} alt={service.name} className={styles.serviceImg} />
              <div className={styles.serviceInfo}>
                <div className={styles.serviceTags}>
                  {service.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className={styles.serviceTag}>{tag}</span>
                  ))}
                </div>
                <div className={styles.serviceName}>{service.name}</div>
                <div className={styles.serviceSubtitle}>{service.subtitle}</div>
                <div className={styles.serviceFeatures}>
                  {service.features.map((f, idx) => (
                    <span key={idx} className={styles.serviceFeature}>{f}</span>
                  ))}
                </div>
                <div className={styles.serviceBottom}>
                  <div className={styles.servicePriceWrap}>
                    <span className={styles.servicePrice}>{service.price}</span>
                    <span className={styles.serviceUnit}>{service.unit}</span>
                  </div>
                  <div className={styles.serviceMeta}>
                    <span className={styles.serviceRating}>★ {service.rating}</span>
                    <span className={styles.serviceSales}>已售{service.sales}</span>
                  </div>
                </div>
                <div className={styles.serviceContact}>
                  <span className={styles.serviceSeller}>{service.seller}</span>
                  <span className={styles.contactBtn}>联系预约</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部导航 */}
      <TabBar activeKey={activeTab} onChange={(key) => setActiveTab(key)} className={styles.tabBar}>
        {tabs.map(tab => (
          <TabBar.Item
            key={tab.key}
            title={tab.title}
            icon={tab.icon}
            badge={tab.badge}
            onClick={() => {
              setActiveTab(tab.key)
              if (tab.key === 'home') navigate('/')
              else if (tab.key === 'nearby') navigate('/nearby')
              else if (tab.key === 'square') navigate('/square')
              else if (tab.key === 'messages') navigate('/messages')
              else if (tab.key === 'my') navigate('/my')
            }}
          />
        ))}
      </TabBar>
    </div>
  )
}
