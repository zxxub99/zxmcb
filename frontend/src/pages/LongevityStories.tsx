import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LongevityStories.module.css';

// 长寿故事数据
const stories = [
  {
    id: 1,
    title: '百岁老人的早餐秘诀',
    excerpt: '103岁的张奶奶每天早上都会喝一碗葛根粉，她说这是祖辈传下来的养生之道...',
    author: '钟祥日报',
    date: '2024-05-20',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    type: '养生',
    likes: 328,
    views: 2560
  },
  {
    id: 2,
    title: '世界长寿之乡的饮食秘密',
    excerpt: '钟祥拥有独特的富硒土壤，种出的农作物含有丰富的微量元素...',
    author: '健康养生频道',
    date: '2024-05-18',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
    type: '饮食',
    likes: 256,
    views: 1890
  },
  {
    id: 3,
    title: '黄爹爹的太极人生',
    excerpt: '98岁的黄爷爷每天清晨都会在阳春公园打太极，已经坚持了50年...',
    author: '本地生活',
    date: '2024-05-15',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    type: '运动',
    likes: 412,
    views: 3200
  },
  {
    id: 4,
    title: '客店镇的千年泉水传说',
    excerpt: '相传这里的泉水是仙人留下的，常年饮用可延年益寿...',
    author: '文化探索',
    date: '2024-05-12',
    image: 'https://images.unsplash.com/photo-1569856358087-8d1aeb97fe58?w=400&h=300&fit=crop',
    type: '传说',
    likes: 189,
    views: 1450
  },
  {
    id: 5,
    title: '长寿老人们的共同习惯',
    excerpt: '通过对钟祥百岁老人的调研，发现他们都有这些共同点...',
    author: '养生专家',
    date: '2024-05-10',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&h=300&fit=crop',
    type: '研究',
    likes: 567,
    views: 4200
  },
  {
    id: 6,
    title: '石牌镇的豆腐密码',
    excerpt: '百年传承的手工豆腐，选用本地富硒黄豆，口感细腻营养丰富...',
    author: '美食探店',
    date: '2024-05-08',
    image: 'https://images.unsplash.com/photo-1565587425305-80f4c7a6c0e9?w=400&h=300&fit=crop',
    type: '美食',
    likes: 298,
    views: 2100
  }
];

// 长寿老人推荐
const longevityElders = [
  {
    name: '张奶奶',
    age: 103,
    location: '郢中街道',
    secret: '每天一碗葛根粉，早睡早起心态好',
    avatar: '👵',
    years: '五代同堂'
  },
  {
    name: '黄爷爷',
    age: 98,
    location: '阳春公园',
    secret: '坚持太极50年，饮食清淡心态平和',
    avatar: '🧓',
    years: '四代同堂'
  },
  {
    name: '李奶奶',
    age: 101,
    location: '文集镇',
    secret: '常喝山泉水，爱劳动，心胸开阔',
    avatar: '👵',
    years: '五代同堂'
  },
  {
    name: '王爷爷',
    age: 100,
    location: '客店镇',
    secret: '日出而作日落而息，粗茶淡饭最养生',
    avatar: '🧓',
    years: '四代同堂'
  }
];

// 长寿食谱
const recipes = [
  { name: '葛根粉羹', benefit: '清热解毒、延年益寿', icon: '🥣' },
  { name: '钟祥蟠龙菜', benefit: '传承百年、宴席必备', icon: '🍖' },
  { name: '石牌豆腐', benefit: '富硒健康、手工制作', icon: '🧈' },
  { name: '客店土鸡蛋', benefit: '林间散养、营养丰富', icon: '🥚' },
  { name: '旧口砂梨', benefit: '清甜多汁、润肺止咳', icon: '🍐' },
  { name: '长寿香米', benefit: '富硒土壤、粒粒精华', icon: '🍚' }
];

const categories = ['全部', '养生', '饮食', '运动', '传说', '美食', '研究'];

export default function LongevityStories() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('全部');
  const [likedStories, setLikedStories] = useState<number[]>([]);

  const filteredStories = activeCategory === '全部' 
    ? stories 
    : stories.filter(s => s.type === activeCategory);

  const handleLike = (id: number) => {
    setLikedStories(prev => 
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
            <span className={styles.icon}>🌿</span>
            长寿之乡 · 养生之道
          </h1>
          <p className={styles.bannerSubtitle}>
            探索钟祥百岁老人的长寿秘诀，传承千年养生智慧
          </p>
          <div className={styles.bannerStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>128</span>
              <span className={styles.statLabel}>百岁老人</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>10万+</span>
              <span className={styles.statLabel}>养生粉丝</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>养生食谱</span>
            </div>
          </div>
        </div>
      </div>

      {/* 长寿食谱推荐 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span>🥗</span> 长寿食谱推荐
        </h2>
        <div className={styles.recipeGrid}>
          {recipes.map((recipe, index) => (
            <div key={index} className={styles.recipeCard}>
              <span className={styles.recipeIcon}>{recipe.icon}</span>
              <div className={styles.recipeInfo}>
                <h3 className={styles.recipeName}>{recipe.name}</h3>
                <p className={styles.recipeBenefit}>{recipe.benefit}</p>
              </div>
              <button 
                className={styles.recipeBtn}
                onClick={() => navigate('/specialty')}
              >
                购买
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 长寿老人故事 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span>👴👵</span> 长寿老人访谈
        </h2>
        <div className={styles.eldersGrid}>
          {longevityElders.map((elder, index) => (
            <div key={index} className={styles.elderCard}>
              <div className={styles.elderAvatar}>{elder.avatar}</div>
              <div className={styles.elderInfo}>
                <div className={styles.elderHeader}>
                  <h3>{elder.name}</h3>
                  <span className={styles.elderAge}>{elder.age}岁</span>
                </div>
                <p className={styles.elderLocation}>📍 {elder.location}</p>
                <p className={styles.elderYears}>🏠 {elder.years}</p>
                <p className={styles.elderSecret}>💡 {elder.secret}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 分类筛选 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span>📖</span> 长寿故事
        </h2>
        <div className={styles.categories}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 故事列表 */}
        <div className={styles.storiesGrid}>
          {filteredStories.map((story) => (
            <div key={story.id} className={styles.storyCard}>
              <div 
                className={styles.storyImage}
                style={{ backgroundImage: `url(${story.image})` }}
              >
                <span className={styles.storyType}>{story.type}</span>
              </div>
              <div className={styles.storyContent}>
                <h3 className={styles.storyTitle}>{story.title}</h3>
                <p className={styles.storyExcerpt}>{story.excerpt}</p>
                <div className={styles.storyMeta}>
                  <span className={styles.storyAuthor}>📰 {story.author}</span>
                  <span className={styles.storyDate}>📅 {story.date}</span>
                </div>
                <div className={styles.storyActions}>
                  <button 
                    className={`${styles.likeBtn} ${likedStories.includes(story.id) ? styles.liked : ''}`}
                    onClick={() => handleLike(story.id)}
                  >
                    ❤️ {likedStories.includes(story.id) ? story.likes + 1 : story.likes}
                  </button>
                  <span className={styles.views}>👁️ {story.views}</span>
                  <button className={styles.shareBtn}>分享</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 长寿知识科普 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <span>💡</span> 长寿知识小贴士
        </h2>
        <div className={styles.tipsGrid}>
          <div className={styles.tipCard}>
            <div className={styles.tipIcon}>🌞</div>
            <h3>早睡早起</h3>
            <p>百岁老人们普遍在晚上9点前入睡，清晨5-6点起床，保持规律作息</p>
          </div>
          <div className={styles.tipCard}>
            <div className={styles.tipIcon}>🍃</div>
            <h3>清淡饮食</h3>
            <p>以蔬菜、粗粮为主，少油少盐，多喝白开水和本地山泉水</p>
          </div>
          <div className={styles.tipCard}>
            <div className={styles.tipIcon}>🚶</div>
            <h3>适度运动</h3>
            <p>每天散步、做家务，既锻炼身体又不过度劳累</p>
          </div>
          <div className={styles.tipCard}>
            <div className={styles.tipIcon}>😊</div>
            <h3>心态平和</h3>
            <p>与世无争、知足常乐，家庭和睦、邻里融洽</p>
          </div>
        </div>
      </section>

      {/* 返回按钮 */}
      <button className={styles.backBtn} onClick={() => navigate('/')}>
        ← 返回首页
      </button>
    </div>
  );
}
