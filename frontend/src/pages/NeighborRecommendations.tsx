import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NeighborRecommendations.module.css';

// 邻居推荐数据
const neighbors = [
  {
    id: 1,
    name: '王阿姨',
    avatar: '👩',
    location: '郢中街道',
    tags: ['厨艺好', '热心肠', '养花高手'],
    rating: 4.9,
    reviews: 128,
    specialty: '手工点心',
    intro: '擅长制作各种传统糕点，用的都是本地富硒食材',
    isOnline: true
  },
  {
    id: 2,
    name: '李叔叔',
    avatar: '👨',
    location: '王府大道',
    tags: ['钓鱼达人', '农家乐', '土特产'],
    rating: 4.8,
    reviews: 96,
    specialty: '新鲜河鱼',
    intro: '每天清晨去汉江钓鱼，保证新鲜，绝不注水',
    isOnline: false
  },
  {
    id: 3,
    name: '张奶奶',
    avatar: '👵',
    location: '阳春大街',
    tags: ['手织布', '传统工艺', '长寿秘诀'],
    rating: 5.0,
    reviews: 256,
    specialty: '手工棉鞋',
    intro: '传承三代的棉鞋手艺，温暖舒适又健康',
    isOnline: true
  },
  {
    id: 4,
    name: '陈大哥',
    avatar: '👨‍🌾',
    location: '文集镇',
    tags: ['种植专家', '有机蔬菜', '实在人'],
    rating: 4.7,
    reviews: 89,
    specialty: '有机蔬菜',
    intro: '自家菜园，不打农药，让您吃上放心菜',
    isOnline: true
  },
  {
    id: 5,
    name: '刘姐姐',
    avatar: '👩‍🍳',
    location: '石牌镇',
    tags: ['豆腐西施', '传统美食', '现做现卖'],
    rating: 4.9,
    reviews: 312,
    specialty: '石牌豆腐',
    intro: '百年传承的手工豆腐，每天限量供应',
    isOnline: false
  },
  {
    id: 6,
    name: '赵爷爷',
    avatar: '🧓',
    location: '客店镇',
    tags: ['土蜂蜜', '山里人', '纯天然'],
    rating: 4.8,
    reviews: 78,
    specialty: '深山土蜂蜜',
    intro: '来自大洪山深处，保证纯正天然，假一赔十',
    isOnline: false
  }
];

// 推荐好物
const recommendedItems = [
  {
    id: 1,
    name: '王阿姨的手工桃酥',
    price: 35,
    originalPrice: 45,
    neighbor: '王阿姨',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop',
    sales: 256,
    rating: 4.9
  },
  {
    id: 2,
    name: '李叔叔的汉江河鱼',
    price: 28,
    originalPrice: null,
    neighbor: '李叔叔',
    image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=300&h=300&fit=crop',
    sales: 189,
    rating: 4.8
  },
  {
    id: 3,
    name: '张奶奶的棉鞋',
    price: 68,
    originalPrice: 88,
    neighbor: '张奶奶',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=300&fit=crop',
    sales: 423,
    rating: 5.0
  },
  {
    id: 4,
    name: '刘姐姐的石牌豆腐',
    price: 8,
    originalPrice: null,
    neighbor: '刘姐姐',
    image: 'https://images.unsplash.com/photo-1585702860073-8c4f8e7e3c3f?w=300&h=300&fit=crop',
    sales: 890,
    rating: 4.9
  }
];

const locations = ['全部', '郢中街道', '王府大道', '阳春大街', '文集镇', '石牌镇', '客店镇'];

export default function NeighborRecommendations() {
  const navigate = useNavigate();
  const [activeLocation, setActiveLocation] = useState('全部');
  const [followedIds, setFollowedIds] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'neighbors' | 'items'>('neighbors');

  const filteredNeighbors = activeLocation === '全部'
    ? neighbors
    : neighbors.filter(n => n.location === activeLocation);

  const handleFollow = (id: number) => {
    setFollowedIds(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  return (
    <div className={styles.container}>
      {/* 顶部 Banner */}
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1 className={styles.bannerTitle}>
            <span>🏘️</span>
            邻居推荐
          </h1>
          <p className={styles.bannerSubtitle}>
            真实邻居，真实推荐，买得放心
          </p>
        </div>
        <div className={styles.bannerDecor}>
          <div className={styles.decorCircle}></div>
          <div className={styles.decorCircle}></div>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'neighbors' ? styles.active : ''}`}
          onClick={() => setActiveTab('neighbors')}
        >
          🌟 达人邻居
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'items' ? styles.active : ''}`}
          onClick={() => setActiveTab('items')}
        >
          🛒 邻居好物
        </button>
      </div>

      {activeTab === 'neighbors' ? (
        <>
          {/* 位置筛选 */}
          <div className={styles.filters}>
            {locations.map((loc) => (
              <button
                key={loc}
                className={`${styles.filterBtn} ${activeLocation === loc ? styles.active : ''}`}
                onClick={() => setActiveLocation(loc)}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* 邻居列表 */}
          <div className={styles.neighborList}>
            {filteredNeighbors.map((neighbor) => (
              <div key={neighbor.id} className={styles.neighborCard}>
                <div className={styles.neighborMain}>
                  <div className={styles.avatarWrapper}>
                    <span className={styles.avatar}>{neighbor.avatar}</span>
                    {neighbor.isOnline && <span className={styles.onlineDot}></span>}
                  </div>
                  <div className={styles.neighborInfo}>
                    <div className={styles.neighborHeader}>
                      <h3>{neighbor.name}</h3>
                      <span className={styles.location}>📍 {neighbor.location}</span>
                    </div>
                    <div className={styles.tags}>
                      {neighbor.tags.map((tag, i) => (
                        <span key={i} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                    <p className={styles.intro}>{neighbor.intro}</p>
                    <div className={styles.neighborMeta}>
                      <span className={styles.rating}>⭐ {neighbor.rating}</span>
                      <span className={styles.reviews}>({neighbor.reviews}条评价)</span>
                      <span className={styles.specialty}>🏷️ {neighbor.specialty}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.neighborActions}>
                  <button className={styles.chatBtn}>💬 私信</button>
                  <button
                    className={`${styles.followBtn} ${followedIds.includes(neighbor.id) ? styles.followed : ''}`}
                    onClick={() => handleFollow(neighbor.id)}
                  >
                    {followedIds.includes(neighbor.id) ? '✓ 已关注' : '+ 关注'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* 邻居好物 */
        <div className={styles.itemsGrid}>
          {recommendedItems.map((item) => (
            <div key={item.id} className={styles.itemCard}>
              <div 
                className={styles.itemImage}
                style={{ backgroundImage: `url(${item.image})` }}
              >
                {item.originalPrice && (
                  <span className={styles.discountTag}>
                    优惠
                  </span>
                )}
              </div>
              <div className={styles.itemContent}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemNeighbor}>👤 {item.neighbor}</p>
                <div className={styles.itemMeta}>
                  <span className={styles.itemPrice}>¥{item.price}</span>
                  {item.originalPrice && (
                    <span className={styles.originalPrice}>¥{item.originalPrice}</span>
                  )}
                  <span className={styles.sales}>已售{item.sales}</span>
                </div>
                <div className={styles.itemRating}>
                  ⭐ {item.rating} · 邻居严选
                </div>
              </div>
              <button 
                className={styles.buyBtn}
                onClick={() => navigate('/product/1')}
              >
                立即购买
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 发布推荐按钮 */}
      <button className={styles.publishBtn}>
        <span>➕</span> 我要推荐好物
      </button>

      {/* 返回按钮 */}
      <button className={styles.backBtn} onClick={() => navigate('/')}>
        ← 返回首页
      </button>
    </div>
  );
}
