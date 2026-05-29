import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LongevityStories.module.css';

// 长寿故事数据
const stories = [
  {
    id: 1,
    title: '一陵千年文脉，一碗米香长寿',
    excerpt: '钟祥米茶始于明代王府、兴于显陵营建、盛于千年民间，是钟祥独一份的皇家长寿味道...',
    author: '钟祥非遗传承',
    date: '2024-06-01',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
    type: '美食',
    likes: 888,
    views: 5600,
    isFeatured: true
  },
  {
    id: 2,
    title: '一波三折帝王路，一盘盘龙养流年',
    excerpt: '盘龙菜诞生于皇权更迭的绝境，成名于嘉靖盛世，流传于民间烟火，六百年岁月沉淀...',
    author: '宫廷御膳研究',
    date: '2024-06-03',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    type: '美食',
    likes: 777,
    views: 4800,
    isFeatured: true
  },
  {
    id: 3,
    title: '百岁老人的早餐秘诀',
    excerpt: '103岁的张奶奶每天早上都会喝一碗葛根粉，她说这是祖辈传下来的养生之道...',
    author: '钟祥日报',
    date: '2024-05-20',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    type: '养生',
    likes: 328,
    views: 2560,
    isFeatured: false
  },
  {
    id: 4,
    title: '世界长寿之乡的饮食秘密',
    excerpt: '钟祥拥有独特的富硒土壤，种出的农作物含有丰富的微量元素...',
    author: '健康养生频道',
    date: '2024-05-18',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
    type: '饮食',
    likes: 256,
    views: 1890,
    isFeatured: false
  },
  {
    id: 5,
    title: '黄爹爹的太极人生',
    excerpt: '98岁的黄爷爷每天清晨都会在阳春公园打太极，已经坚持了50年...',
    author: '本地生活',
    date: '2024-05-15',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    type: '运动',
    likes: 412,
    views: 3200,
    isFeatured: false
  },
  {
    id: 6,
    title: '客店镇的千年泉水传说',
    excerpt: '相传这里的泉水是仙人留下的，常年饮用可延年益寿...',
    author: '文化探索',
    date: '2024-05-12',
    image: 'https://images.unsplash.com/photo-1569856358087-8d1aeb97fe58?w=400&h=300&fit=crop',
    type: '传说',
    likes: 189,
    views: 1450,
    isFeatured: false
  },
  {
    id: 7,
    title: '钟祥米茶：明代御用的长寿秘密',
    excerpt: '明朝正德年间，兴王府厨工为嘉靖帝生母特制米茶，自此成为皇家御用清润饮品...',
    author: '长寿文化研究',
    date: '2024-06-02',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
    type: '美食',
    likes: 666,
    views: 4200,
    isFeatured: false
  },
  {
    id: 8,
    title: '长寿老人们的共同习惯',
    excerpt: '通过对钟祥百岁老人的调研，发现他们都有这些共同点...',
    author: '养生专家',
    date: '2024-05-10',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&h=300&fit=crop',
    type: '研究',
    likes: 567,
    views: 4200,
    isFeatured: false
  },
  {
    id: 9,
    title: '石牌镇的豆腐密码',
    excerpt: '百年传承的手工豆腐，选用本地富硒黄豆，口感细腻营养丰富...',
    author: '美食探店',
    date: '2024-05-08',
    image: 'https://images.unsplash.com/photo-1565587425305-80f4c7a6c0e9?w=400&h=300&fit=crop',
    type: '美食',
    likes: 298,
    views: 2100,
    isFeatured: false
  },
  {
    id: 10,
    title: '盘龙菜：嘉靖帝的登基神器',
    excerpt: '三王进京、先到为君，后到为臣。嘉靖帝凭一盘神秘美食逆天改命...',
    author: '帝王秘史',
    date: '2024-06-04',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
    type: '传说',
    likes: 999,
    views: 6800,
    isFeatured: false
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
  { name: '钟祥米茶', benefit: '明代御饮·六百年长寿密码', icon: '🍵', featured: true },
  { name: '钟祥盘龙菜', benefit: '嘉靖御赐·无宴不成席', icon: '🐉', featured: true },
  { name: '葛根粉羹', benefit: '清热解毒、延年益寿', icon: '🥣', featured: false },
  { name: '石牌豆腐', benefit: '富硒健康、手工制作', icon: '🧈', featured: false },
  { name: '客店土鸡蛋', benefit: '林间散养、营养丰富', icon: '🥚', featured: false },
  { name: '旧口砂梨', benefit: '清甜多汁、润肺止咳', icon: '🍐', featured: false },
  { name: '长寿香米', benefit: '富硒土壤、粒粒精华', icon: '🍚', featured: false }
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

      {/* 钟祥米茶专题 */}
      <section className={styles.miChaSection}>
        <div className={styles.miChaHeader}>
          <span className={styles.miChaBadge}>🏆 钟祥非遗</span>
          <h2 className={styles.miChaTitle}>一陵千年文脉，一碗米香长寿</h2>
          <p className={styles.miChaSubtitle}>明代御饮 · 六百年皇家长寿味道</p>
        </div>
        
        <div className={styles.miChaContent}>
          <div className={styles.miChaStory}>
            <h3>🍵 米茶由来</h3>
            <p><strong>始于明宫御味，源自显陵皇史</strong></p>
            <p>明朝正德年间，钟祥为兴王府封地。嘉靖帝生母蒋氏久居燥热、茶饭不思。府中厨工取本地农耕古法，将江汉熟米文火细炒，焙至金黄凝香，再以清泉熬煮成茶汤。此米茶清而不腻、焦香温润，入口即刻开胃健脾。</p>
            <p>嘉靖登基后，斥巨资营建明显陵。数万工匠汇聚钟祥，暑气蒸腾。当地百姓户户熬制米茶，送至皇陵工地。一碗金黄米茶，解暑气、消疲惫、润脾胃。随着显陵工程绵延数十年，米茶彻底化作钟祥代代相传的传世风物。</p>
          </div>
          
          <div className={styles.miChaFeatures}>
            <h3>✨ 米茶特色</h3>
            <div className={styles.featureGrid}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🌾</span>
                <span>古法天成</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>💧</span>
                <span>至简至养</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>❄️</span>
                <span>冰镇清暑</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🔥</span>
                <span>热饮暖胃</span>
              </div>
            </div>
            <p className={styles.featureDesc}>无茶之名、有茶之韵。不添糖、不增料、无香精、无杂质。仅以本土稻米经传统文火焙炒、清水慢熬而成。</p>
          </div>
          
          <div className={styles.miChaLongevity}>
            <h3>🌿 米茶与长寿</h3>
            <p>钟祥获评世界长寿之乡，常年饮米茶是最核心的长寿民俗。稻米经文火炒制，褪去寒性、增其温性，久饮可健脾消食、清热祛湿、调和脾胃。</p>
            <p>钟祥长者一生三餐不离米茶：暑日借它清火气、解油腻，冬日靠它暖脾胃、和气血。日复一日的清淡滋养，养出了钟祥人平和康健的体态。</p>
            <div className={styles.quoteBox}>
              <p>"明显陵承载钟祥千年皇脉，米茶滋养钟祥世代福寿"</p>
            </div>
          </div>
          
          <div className={styles.miChaLocal}>
            <h3>🏠 本土盛行度</h3>
            <p>在钟祥，米茶从不是小众特产，而是深入全城百姓骨髓的生活底色。</p>
            <ul>
              <li>寻常农家户户四季常备</li>
              <li>宴席待客必有米茶</li>
              <li>上至百岁老者、下至垂髫孩童，人人爱饮、日日必饮</li>
              <li>古城街巷、乡村小院、文旅景区、民宿酒楼，处处米香</li>
            </ul>
          </div>
        </div>
        
        <button className={styles.miChaBtn} onClick={() => navigate('/specialty')}>
          🍵 立即品鉴钟祥米茶
        </button>
      </section>

      {/* 钟祥盘龙菜专题 */}
      <section className={styles.panLongSection}>
        <div className={styles.panLongHeader}>
          <span className={styles.panLongBadge}>🐉 宫廷御膳</span>
          <h2 className={styles.panLongTitle}>一波三折帝王路，一盘御味养流年</h2>
          <p className={styles.panLongSubtitle}>嘉靖御赐 · 无宴不成席的长寿御膳</p>
        </div>
        
        <div className={styles.panLongContent}>
          <div className={styles.panLongStory}>
            <h3>🏰 传奇由来</h3>
            <p><strong>一波三折，先到为君定传奇</strong></p>
            <p>明正德十六年，武宗驾崩无嗣，朝堂立下旷世铁规：三王进京，先到为君，后到为臣。钟祥兴王朱厚熜千里迢迢、路途最远，按皇家仪仗行进，必败无疑。此为<strong>第一折：绝境临身，帝位将失</strong>。</p>
            <p>为逆天改命，幕僚献策假扮钦犯、乘坐囚车日夜疾驰。可锦衣玉食长大的朱厚熜不堪囚车风霜，粗茶粗粮难以下咽。此为<strong>第二折：行路困局，命悬一线</strong>。</p>
            <p>情急之下，朱厚熜下死令：三日内，必须造出一道吃肉不见肉、营养耐饿的吃食，逾期全员问斩。主厨詹多苦思无解，绝境逢生见妻子送来的蒸红薯，瞬间顿悟，<strong>第三折：绝境逢生，天赐奇方</strong>。</p>
            <p>他连夜革新技法，精选本地鲜猪精肉、鲜活河鱼，反复捶打去腥，以蛋清淀粉摊皮卷馅，盘绕成龙形文火久蒸。成品形似朴素红薯，内里软糯鲜香，真正实现"吃肉不见肉，吃鱼不见鱼"。朱厚熜凭此珍味蓄力续航，率先入京、登临帝位。嘉靖感念此菜助他定鼎江山，御赐美名<strong>盘龙菜</strong>，列为宫廷御宴头牌。</p>
          </div>
          
          <div className={styles.panLongFeatures}>
            <h3>🍳 风物特点</h3>
            <div className={styles.panLongFeatureGrid}>
              <div className={styles.panLongFeatureItem}>
                <span className={styles.panLongFeatureIcon}>🔥</span>
                <span>古法蒸制</span>
              </div>
              <div className={styles.panLongFeatureItem}>
                <span className={styles.panLongFeatureIcon}>🥬</span>
                <span>清润为本</span>
              </div>
              <div className={styles.panLongFeatureItem}>
                <span className={styles.panLongFeatureIcon}>✨</span>
                <span>细腻无渣</span>
              </div>
              <div className={styles.panLongFeatureItem}>
                <span className={styles.panLongFeatureIcon}>💪</span>
                <span>补而不燥</span>
              </div>
            </div>
            <p className={styles.panLongFeatureDesc}>盘龙菜摒弃传统大菜重油、重盐、重爆炒的做法，全程坚持纯古法蒸制。经捶茸、摊皮、卷馅、盘形、慢蒸数道精工，肉质细腻无渣、荤素相融、鲜香清雅。</p>
          </div>
          
          <div className={styles.panLongLongevity}>
            <h3>🌿 长寿渊源</h3>
            <p>钟祥长寿的核心智慧，在于饮食清淡、脾胃常和、温润食补。盘龙菜本为帝王健体续命创制，恰好契合钟祥千年养生之道。</p>
            <p>蒸制工艺温和养胃，细腻肉质极易吸收，可<strong>补益气血、调和脏腑、固本培元</strong>，不给肠胃增添负担。数百年来，这道皇家御膳走入寻常百姓家，成为钟祥人日常食补、节庆滋养的核心美食。</p>
            <div className={styles.panLongQuoteBox}>
              <p>"明显陵沉淀一城帝王文脉，盘龙菜滋养一方长寿子民"</p>
            </div>
          </div>
          
          <div className={styles.panLongLocal}>
            <h3>🏠 民间地位</h3>
            <p>在钟祥，盘龙菜是<strong>宴席之魂、待客之尊</strong>。婚寿嫁娶、团圆家宴、宾客酬宾，无论城乡大小宴席，必以盘龙菜为首席重头菜。</p>
            <div className={styles.panLongHighlight}>
              <p>素有"无盘龙不成席"的说法</p>
            </div>
            <p>它承载着钟祥人的礼仪文化、团圆温情与祥瑞期许。六百年帝王传奇、烟火传承，让这道绝境诞生的御味，成为钟祥兼具历史厚度、养生价值、民俗底蕴的顶级文旅美食名片。</p>
          </div>
        </div>
        
        <button className={styles.panLongBtn} onClick={() => navigate('/specialty')}>
          🐉 立即品鉴盘龙御膳
        </button>
      </section>

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
