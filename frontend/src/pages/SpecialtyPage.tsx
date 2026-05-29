import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import { EnvironmentOutline, MessageOutline, UserOutline, HeartOutline, SearchOutline, LeftOutline } from 'antd-mobile-icons'
import styles from './SpecialtyPage.module.css'

// 长寿特产分类
const categories = [
  { id: 'all', name: '全部', icon: '🏪' },
  { id: 'tofu', name: '石牌豆腐', icon: '🧈' },
  { id: 'rice', name: '长寿米茶', icon: '🍚' },
  { id: 'gegen', name: '葛根粉', icon: '🌿' },
  { id: 'panlong', name: '蟠龙菜', icon: '🥩' },
  { id: '糕点', name: '本地糕点', icon: '🍪' },
  { id: '干货', name: '干货杂粮', icon: '🥜' },
  { id: 'fresh', name: '农家生鲜', icon: '🥬' },
]

// 特产商品数据
const products = [
  {
    id: 1,
    name: '钟祥蟠龙菜',
    subtitle: '明代宫廷御膳·湖北十大名菜',
    price: '¥68',
    originalPrice: '¥88',
    seller: '正宗农家小院',
    sales: 328,
    rating: 4.9,
    images: ['https://picsum.photos/300/300?random=201', 'https://picsum.photos/300/300?random=202'],
    tags: ['正宗', '冷冻配送'],
    category: 'panlong',
  },
  {
    id: 2,
    name: '钟祥米茶',
    subtitle: '富硒特产·消暑解渴',
    price: '¥25',
    originalPrice: '¥35',
    seller: '长寿之乡特产店',
    sales: 568,
    rating: 4.8,
    images: ['https://picsum.photos/300/300?random=203', 'https://picsum.photos/300/300?random=204'],
    tags: ['富硒', '传统工艺'],
    category: 'rice',
  },
  {
    id: 3,
    name: '钟祥葛根粉',
    subtitle: '南葛北参·美容养颜',
    price: '¥45',
    originalPrice: '¥58',
    seller: '钟祥葛业基地',
    sales: 892,
    rating: 4.9,
    images: ['https://picsum.photos/300/300?random=205', 'https://picsum.photos/300/300?random=206'],
    tags: ['纯天然', '中国葛粉之乡'],
    category: 'gegen',
  },
  {
    id: 4,
    name: '石牌豆腐',
    subtitle: '中国豆腐之乡·千年传承',
    price: '¥15',
    originalPrice: '¥20',
    seller: '石牌豆腐坊',
    sales: 1234,
    rating: 4.7,
    images: ['https://picsum.photos/300/300?random=207', 'https://picsum.photos/300/300?random=208'],
    tags: ['手工', '当天配送'],
    category: 'tofu',
  },
  {
    id: 5,
    name: '钟祥长寿香米',
    subtitle: '明清贡米·富硒稻米',
    price: '¥35',
    originalPrice: '¥48',
    seller: '钟祥粮仓',
    sales: 456,
    rating: 4.8,
    images: ['https://picsum.photos/300/300?random=209', 'https://picsum.photos/300/300?random=210'],
    tags: ['贡米', '富硒'],
    category: 'rice',
  },
  {
    id: 6,
    name: '钟祥野生蜂蜜',
    subtitle: '深山采集·纯正天然',
    price: '¥58',
    originalPrice: '¥78',
    seller: '钟祥蜂业',
    sales: 234,
    rating: 4.9,
    images: ['https://picsum.photos/300/300?random=211', 'https://picsum.photos/300/300?random=212'],
    tags: ['野生', '纯天然'],
    category: '干货',
  },
  {
    id: 7,
    name: '钟祥皮蛋',
    subtitle: '传统工艺·口感独特',
    price: '¥28',
    originalPrice: '¥36',
    seller: '正宗农家小院',
    sales: 189,
    rating: 4.6,
    images: ['https://picsum.photos/300/300?random=213', 'https://picsum.photos/300/300?random=214'],
    tags: ['传统', '松花蛋'],
    category: '糕点',
  },
  {
    id: 8,
    name: '钟祥糍粑',
    subtitle: '手打糍粑·软糯香甜',
    price: '¥22',
    originalPrice: '¥30',
    seller: '长寿之乡特产店',
    sales: 345,
    rating: 4.7,
    images: ['https://picsum.photos/300/300?random=215', 'https://picsum.photos/300/300?random=216'],
    tags: ['手工', '现做'],
    category: '糕点',
  },
  // 新增更多特产商品
  {
    id: 9,
    name: '丰乐河陀螺包子',
    subtitle: '千年非遗·宋代王府御点',
    price: '¥32',
    originalPrice: '¥42',
    seller: '丰乐河老字号',
    sales: 156,
    rating: 4.9,
    images: ['https://picsum.photos/300/300?random=217', 'https://picsum.photos/300/300?random=218'],
    tags: ['非遗', '黄酒发酵'],
    category: '糕点',
  },
  {
    id: 10,
    name: '转斗湾老酒',
    subtitle: '汉江码头酿·纯粮养流年',
    price: '¥88',
    originalPrice: '¥108',
    seller: '转斗湾酒坊',
    sales: 234,
    rating: 4.8,
    images: ['https://picsum.photos/300/300?random=219', 'https://picsum.photos/300/300?random=220'],
    tags: ['纯粮', '陶缸窖藏'],
    category: '干货',
  },
  {
    id: 11,
    name: '张集酥饼',
    subtitle: '楚酥承军韵·嘉靖御封',
    price: '¥38',
    originalPrice: '¥48',
    seller: '张集老街饼铺',
    sales: 198,
    rating: 4.7,
    images: ['https://picsum.photos/300/300?random=221', 'https://picsum.photos/300/300?random=222'],
    tags: ['古法', '炭火慢烤'],
    category: '糕点',
  },
  {
    id: 12,
    name: '钟祥香菇',
    subtitle: '深山种植·香气浓郁',
    price: '¥48',
    originalPrice: '¥58',
    seller: '钟祥菌业基地',
    sales: 567,
    rating: 4.8,
    images: ['https://picsum.photos/300/300?random=223', 'https://picsum.photos/300/300?random=224'],
    tags: ['有机', '深山'],
    category: '干货',
  },
  {
    id: 13,
    name: '钟祥泡菜',
    subtitle: '农家自制·酸脆爽口',
    price: '¥18',
    originalPrice: '¥25',
    seller: '长寿之乡特产店',
    sales: 789,
    rating: 4.6,
    images: ['https://picsum.photos/300/300?random=225', 'https://picsum.photos/300/300?random=226'],
    tags: ['农家', '开胃'],
    category: 'fresh',
  },
  {
    id: 14,
    name: '钟祥土鸡蛋',
    subtitle: '林间散养·营养丰富',
    price: '¥35',
    originalPrice: '¥45',
    seller: '钟祥生态农场',
    sales: 456,
    rating: 4.9,
    images: ['https://picsum.photos/300/300?random=227', 'https://picsum.photos/300/300?random=228'],
    tags: ['散养', '有机'],
    category: 'fresh',
  },
  {
    id: 15,
    name: '钟祥菜籽油',
    subtitle: '传统压榨·香浓醇厚',
    price: '¥58',
    originalPrice: '¥72',
    seller: '钟祥油脂公司',
    sales: 321,
    rating: 4.7,
    images: ['https://picsum.photos/300/300?random=229', 'https://picsum.photos/300/300?random=230'],
    tags: ['土榨', '纯正'],
    category: '干货',
  },
  {
    id: 16,
    name: '钟祥腊肉',
    subtitle: '传统腌制·柴火慢熏',
    price: '¥68',
    originalPrice: '¥88',
    seller: '正宗农家小院',
    sales: 234,
    rating: 4.8,
    images: ['https://picsum.photos/300/300?random=231', 'https://picsum.photos/300/300?random=232'],
    tags: ['土猪', '柴火熏'],
    category: 'fresh',
  },
]

// 精选推荐
const featuredProducts = products.slice(0, 4)

export default function SpecialtyPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('specialty')
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchValue, setSearchValue] = useState('')

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory)

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
          <div className={styles.headerTitle}>长寿特产专区</div>
          <div className={styles.headerRight}></div>
        </div>
        <div className={styles.searchBar}>
          <SearchOutline className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="搜索钟祥特产..." 
            className={styles.searchInput}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      {/* IP宣传区 */}
      <div className={styles.ipBanner}>
        <div className={styles.ipContent}>
          <div className={styles.ipTitle}>🌿 长寿之乡 · 地道钟祥</div>
          <div className={styles.ipDesc}>富硒生态特产 · 原产地直发</div>
          <div className={styles.ipTags}>
            <span className={styles.ipTag}>中国葛粉之乡</span>
            <span className={styles.ipTag}>中国豆腐之乡</span>
            <span className={styles.ipTag}>世界长寿之乡</span>
          </div>
        </div>
      </div>

      {/* 精选推荐 */}
      <div className={styles.featuredSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>⭐ 精选推荐</span>
          <span className={styles.sectionMore} onClick={() => navigate('/')}>查看全部 {'>'}</span>
        </div>
        <div className={styles.featuredGrid}>
          {featuredProducts.map(product => (
            <div key={product.id} className={styles.featuredCard}>
              <img src={product.images[0]} alt={product.name} className={styles.featuredImg} />
              <div className={styles.featuredInfo}>
                <div className={styles.featuredName}>{product.name}</div>
                <div className={styles.featuredPrice}>{product.price}</div>
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

      {/* 商品列表 */}
      <div className={styles.productSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>📦 全部商品</span>
          <span className={styles.productCount}>共{filteredProducts.length}件</span>
        </div>
        <div className={styles.productGrid}>
          {filteredProducts.map(product => (
            <div key={product.id} className={styles.productCard}>
              <img src={product.images[0]} alt={product.name} className={styles.productImg} />
              <div className={styles.productInfo}>
                <div className={styles.productTags}>
                  {product.tags.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className={styles.productTag}>{tag}</span>
                  ))}
                </div>
                <div className={styles.productName}>{product.name}</div>
                <div className={styles.productSubtitle}>{product.subtitle}</div>
                <div className={styles.productPriceRow}>
                  <span className={styles.productPrice}>{product.price}</span>
                  <span className={styles.productOriginalPrice}>{product.originalPrice}</span>
                </div>
                <div className={styles.productMeta}>
                  <span className={styles.productSeller}>{product.seller}</span>
                  <span className={styles.productSales}>已售{product.sales}</span>
                </div>
                <div className={styles.productRating}>★ {product.rating}</div>
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
