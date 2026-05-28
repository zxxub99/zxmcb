import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchBar } from 'antd-mobile'
import {
  EnvironmentOutline,
  HeartOutline,
  StarOutline,
  EyeOutline,
  PictureOutline,
  ClockCircleOutline,
  RightOutline,
  PhonebookOutline,
} from 'antd-mobile-icons'
import styles from './TourismPage.module.css'

// 旅游景点数据
const touristSpots = [
  {
    id: 1,
    name: '明显陵',
    category: '历史遗迹',
    level: '世界文化遗产',
    rating: 4.8,
    reviews: 1256,
    views: 35680,
    description: '明代皇陵建筑群，规模宏大，建筑精美，是钟祥最著名的历史遗迹。明显陵是嘉靖皇帝的父亲恭睿献皇帝和母亲章圣皇太后的合葬墓，是中国中南地区唯一的明代帝陵。',
    cover: 'https://picsum.photos/400/250?random=50',
    gallery: [
      'https://picsum.photos/400/250?random=50',
      'https://picsum.photos/400/250?random=58',
      'https://picsum.photos/400/250?random=59',
      'https://picsum.photos/400/250?random=60',
    ],
    distance: '3.5km',
    tags: ['世界遗产', '明代', '皇陵'],
    hours: '08:30-17:30',
    ticket: '60元',
    phone: '0724-4235999',
    address: '湖北省钟祥市明显陵路1号',
    tips: ['建议游览时间2-3小时', '建议请导游讲解', '适合拍照打卡'],
  },
  {
    id: 2,
    name: '莫愁村',
    category: '民俗文化',
    level: '4A级景区',
    rating: 4.6,
    reviews: 892,
    views: 23450,
    description: '依托莫愁女传说打造的民俗文化村，古色古香，美食众多。村内有各种传统手工艺、特色小吃、民俗表演，是体验钟祥文化的好去处。',
    cover: 'https://picsum.photos/400/250?random=51',
    gallery: [
      'https://picsum.photos/400/250?random=51',
      'https://picsum.photos/400/250?random=61',
      'https://picsum.photos/400/250?random=62',
      'https://picsum.photos/400/250?random=63',
    ],
    distance: '2.8km',
    tags: ['民俗', '美食', '夜景'],
    hours: '全天开放（商铺9:00-21:00）',
    ticket: '免费',
    phone: '0724-4288888',
    address: '湖北省钟祥市郢中镇莫愁村',
    tips: ['晚上夜景很美', '美食价格实惠', '周末人较多'],
  },
  {
    id: 3,
    name: '黄仙洞',
    category: '自然景观',
    level: '4A级景区',
    rating: 4.7,
    reviews: 1034,
    views: 28900,
    description: '喀斯特地貌溶洞，洞内有众多钟乳石景观，四季恒温，冬暖夏凉。洞内石笋、石柱、石花形态各异，被誉为"华中第一洞"。',
    cover: 'https://picsum.photos/400/250?random=52',
    gallery: [
      'https://picsum.photos/400/250?random=52',
      'https://picsum.photos/400/250?random=64',
      'https://picsum.photos/400/250?random=65',
      'https://picsum.photos/400/250?random=66',
    ],
    distance: '28km',
    tags: ['溶洞', '避暑', '探险'],
    hours: '08:00-17:30',
    ticket: '78元',
    phone: '0724-4231666',
    address: '湖北省钟祥市客店镇黄仙洞风景区',
    tips: ['洞内温度较低', '建议穿外套', '游览约2小时'],
  },
  {
    id: 4,
    name: '大口森林公园',
    category: '生态休闲',
    level: '3A级景区',
    rating: 4.5,
    reviews: 567,
    views: 15670,
    description: '原生态森林氧吧，空气清新，适合徒步、露营、亲近自然。公园内有溪流、瀑布、奇石，林木茂密，鸟语花香。',
    cover: 'https://picsum.photos/400/250?random=53',
    gallery: [
      'https://picsum.photos/400/250?random=53',
      'https://picsum.photos/400/250?random=67',
      'https://picsum.photos/400/250?random=68',
      'https://picsum.photos/400/250?random=69',
    ],
    distance: '15km',
    tags: ['森林', '氧吧', '露营'],
    hours: '全天开放',
    ticket: '免费',
    phone: '0724-4268888',
    address: '湖北省钟祥市东桥镇大口林场',
    tips: ['适合野餐', '注意防蚊虫', '可自带帐篷露营'],
  },
  {
    id: 5,
    name: '彭墩乡村世界',
    category: '乡村旅游',
    level: '3A级景区',
    rating: 4.4,
    reviews: 423,
    views: 11230,
    description: '体验农村生活，采摘水果，品尝农家菜，享受田园风光。有有机蔬菜园、果园、垂钓鱼塘，可体验农耕乐趣。',
    cover: 'https://picsum.photos/400/250?random=54',
    gallery: [
      'https://picsum.photos/400/250?random=54',
      'https://picsum.photos/400/250?random=70',
      'https://picsum.photos/400/250?random=71',
      'https://picsum.photos/400/250?random=72',
    ],
    distance: '20km',
    tags: ['农家乐', '采摘', '田园'],
    hours: '08:00-18:00',
    ticket: '免费（项目另收费）',
    phone: '0724-4259999',
    address: '湖北省钟祥市石牌镇彭墩村',
    tips: ['水果采摘季节性强', '农家菜味道好', '适合亲子游'],
  },
  {
    id: 6,
    name: '温峡湖',
    category: '水利景观',
    level: '省级湿地公园',
    rating: 4.3,
    reviews: 312,
    views: 8960,
    description: '湖光山色，碧波荡漾，是垂钓、泛舟的好去处。湖中有多个小岛，生态环境优美，是休闲度假的理想之地。',
    cover: 'https://picsum.photos/400/250?random=55',
    gallery: [
      'https://picsum.photos/400/250?random=55',
      'https://picsum.photos/400/250?random=73',
      'https://picsum.photos/400/250?random=74',
      'https://picsum.photos/400/250?random=75',
    ],
    distance: '35km',
    tags: ['湖泊', '垂钓', '泛舟'],
    hours: '全天开放',
    ticket: '免费（游船另收费）',
    phone: '0724-4276666',
    address: '湖北省钟祥市温峡水库',
    tips: ['可租船游湖', '钓鱼免费', '风景优美'],
  },
  {
    id: 7,
    name: '元佑温泉',
    category: '康养度假',
    level: '温泉度假区',
    rating: 4.6,
    reviews: 678,
    views: 18900,
    description: '天然温泉，水质优良，泡池众多，是休闲养生的好去处。温泉水温适宜，含有多种微量元素，具有保健功效。',
    cover: 'https://picsum.photos/400/250?random=56',
    gallery: [
      'https://picsum.photos/400/250?random=56',
      'https://picsum.photos/400/250?random=76',
      'https://picsum.photos/400/250?random=77',
      'https://picsum.photos/400/250?random=78',
    ],
    distance: '18km',
    tags: ['温泉', '养生', '度假'],
    hours: '10:00-23:00',
    ticket: '128元（含自助餐）',
    phone: '0724-4298888',
    address: '湖北省钟祥市文集镇元佑温泉度假区',
    tips: ['建议提前预约', '自带泳衣', '泡完记得补水'],
  },
  {
    id: 8,
    name: '汇源农谷',
    category: '农业观光',
    level: '工业旅游示范点',
    rating: 4.2,
    reviews: 289,
    views: 7560,
    description: '集农业观光、果汁加工体验、美食于一体的综合园区。可以参观果汁生产线，体验采摘乐趣，品尝新鲜果汁。',
    cover: 'https://picsum.photos/400/250?random=57',
    gallery: [
      'https://picsum.photos/400/250?random=57',
      'https://picsum.photos/400/250?random=79',
      'https://picsum.photos/400/250?random=80',
      'https://picsum.photos/400/250?random=81',
    ],
    distance: '22km',
    tags: ['采摘', '体验', '亲子'],
    hours: '08:30-17:30',
    ticket: '免费（采摘另收费）',
    phone: '0724-4218888',
    address: '湖北省钟祥市经济开放区汇源路',
    tips: ['果汁鲜美', '适合带孩子参观', '应季水果最好'],
  },
]

const categories = [
  { key: 'all', label: '全部' },
  { key: '历史遗迹', label: '历史遗迹' },
  { key: '民俗文化', label: '民俗文化' },
  { key: '自然景观', label: '自然景观' },
  { key: '生态休闲', label: '生态休闲' },
  { key: '康养度假', label: '康养度假' },
  { key: '乡村旅游', label: '乡村旅游' },
]

interface TouristSpot {
  id: number
  name: string
  category: string
  level: string
  rating: number
  reviews: number
  views: number
  description: string
  cover: string
  gallery: string[]
  distance: string
  tags: string[]
  hours: string
  ticket: string
  phone: string
  address: string
  tips: string[]
}

export default function TourismPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchValue, setSearchValue] = useState('')
  const [favorites, setFavorites] = useState<number[]>([1, 3])
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null)

  const filteredSpots = touristSpots.filter(spot => {
    const matchCategory = activeCategory === 'all' || spot.category === activeCategory
    const matchSearch = spot.name.includes(searchValue) || spot.description.includes(searchValue)
    return matchCategory && matchSearch
  })

  const toggleFavorite = (spotId: number) => {
    if (favorites.includes(spotId)) {
      setFavorites(favorites.filter(id => id !== spotId))
    } else {
      setFavorites([...favorites, spotId])
    }
  }

  const showSpotDetail = (spot: TouristSpot) => {
    setSelectedSpot(spot)
  }

  const closeSpotDetail = () => {
    setSelectedSpot(null)
  }

  return (
    <div className={styles.container}>
      {/* 景点详情面板 */}
      {selectedSpot && (
        <div className={styles.detailPanel} onClick={closeSpotDetail}>
          <div className={styles.detailContent} onClick={e => e.stopPropagation()}>
            <div className={styles.detailHeader}>
              <img src={selectedSpot.cover} alt={selectedSpot.name} className={styles.detailCover} />
              <button className={styles.closeBtn} onClick={closeSpotDetail}>×</button>
            </div>
            <div className={styles.detailBody}>
              <div className={styles.detailTitleRow}>
                <h2 className={styles.detailTitle}>{selectedSpot.name}</h2>
                <span className={styles.detailLevel}>{selectedSpot.level}</span>
              </div>
              
              <div className={styles.detailMeta}>
                <span><StarOutline /> {selectedSpot.rating}分</span>
                <span><PictureOutline /> {selectedSpot.reviews}条评价</span>
                <span><EyeOutline /> {selectedSpot.views}次浏览</span>
              </div>
              
              <p className={styles.detailDesc}>{selectedSpot.description}</p>
              
              <div className={styles.detailSection}>
                <h4>基本信息</h4>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <ClockCircleOutline className={styles.infoIcon} />
                    <span>开放时间</span>
                    <p>{selectedSpot.hours}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoIcon}>票</span>
                    <span>门票价格</span>
                    <p>{selectedSpot.ticket}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <EnvironmentOutline className={styles.infoIcon} />
                    <span>距离市区</span>
                    <p>{selectedSpot.distance}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <PhonebookOutline className={styles.infoIcon} />
                    <span>咨询电话</span>
                    <p>{selectedSpot.phone}</p>
                  </div>
                </div>
              </div>
              
              <div className={styles.detailSection}>
                <h4>地址</h4>
                <p className={styles.addressText}>{selectedSpot.address}</p>
              </div>
              
              <div className={styles.detailSection}>
                <h4>游览提示</h4>
                <div className={styles.tipsList}>
                  {selectedSpot.tips.map((tip, index) => (
                    <span key={index} className={styles.tipItem}>{tip}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 顶部标题 */}
      <div className={styles.header}>
        <h1 className={styles.title}>钟祥旅游资源</h1>
        <p className={styles.subtitle}>探索莫愁故里 · 品味楚风汉韵</p>
      </div>

      {/* 搜索栏 */}
      <div className={styles.searchSection}>
        <SearchBar
          placeholder="搜索景点"
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
              className={`${styles.tabBtn} ${activeCategory === cat.key ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 景点列表 */}
      <div className={styles.spotList}>
        {filteredSpots.map(spot => (
          <div 
            key={spot.id} 
            className={styles.spotCard}
            onClick={() => navigate(`/tourism/${spot.id}`)}
          >
            <div className={styles.spotCover}>
              <img src={spot.cover} alt={spot.name} />
              <div className={styles.spotLevel}>{spot.level}</div>
              <button 
                className={`${styles.favoriteBtn} ${favorites.includes(spot.id) ? styles.favorited : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(spot.id)
                }}
              >
                <HeartOutline />
              </button>
            </div>
            <div className={styles.spotInfo} onClick={() => showSpotDetail(spot)}>
              <div className={styles.spotHeader}>
                <h3 className={styles.spotName}>{spot.name}</h3>
                <span className={styles.spotCategory}>{spot.category}</span>
              </div>
              <p className={styles.spotDesc}>{spot.description}</p>
              <div className={styles.spotTags}>
                {spot.tags.map((tag, i) => (
                  <span key={i} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <div className={styles.spotStats}>
                <span className={styles.stat}>
                  <StarOutline /> {spot.rating}
                </span>
                <span className={styles.stat}>
                  <EyeOutline /> {spot.views}
                </span>
                <span className={styles.distance}>
                  <EnvironmentOutline /> {spot.distance}
                </span>
              </div>
            </div>
            <button className={styles.detailBtn} onClick={() => showSpotDetail(spot)}>
              <RightOutline /> 查看详情
            </button>
          </div>
        ))}
      </div>

      {/* 空状态 */}
      {filteredSpots.length === 0 && (
        <div className={styles.emptyState}>
          <PictureOutline style={{ fontSize: 48, color: '#ccc' }} />
          <p>暂无符合条件的景点</p>
        </div>
      )}

      {/* 底部导航 */}
      <div className={styles.bottomNav}>
        <div className={styles.navItem} onClick={() => navigate('/')}>
          <span className={styles.navIcon}>🏠</span>
          <span>首页</span>
        </div>
        <div className={styles.navItem} onClick={() => navigate('/interest-groups')}>
          <span className={styles.navIcon}>💬</span>
          <span>兴趣团</span>
        </div>
        <div className={`${styles.navItem} ${styles.active}`}>
          <span className={styles.navIcon}>🏞️</span>
          <span>旅游</span>
        </div>
        <div className={styles.navItem} onClick={() => navigate('/my')}>
          <span className={styles.navIcon}>👤</span>
          <span>我的</span>
        </div>
      </div>
    </div>
  )
}
