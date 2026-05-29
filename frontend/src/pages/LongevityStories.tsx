import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LongevityStories.module.css';

// 评论类型
interface Comment {
  id: number;
  foodId: string;
  author: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
}

// 初始评论数据
const initialComments: Comment[] = [
  { id: 1, foodId: 'miCha', author: '钟祥张阿姨', avatar: '👩', content: '从小就喝米茶，每天早上一碗，胃里暖暖的！我们家三代人都爱喝！', time: '2024-06-15', likes: 56 },
  { id: 2, foodId: 'miCha', author: '长寿李爷爷', avatar: '👴', content: '今年98岁了，喝了80多年的米茶，这东西养胃！', time: '2024-06-14', likes: 89 },
  { id: 3, foodId: 'miCha', author: '游客小王', avatar: '🧑', content: '来钟祥旅游第一次喝米茶，香！回去带了好几袋给朋友', time: '2024-06-13', likes: 34 },
  
  { id: 4, foodId: 'panLongCai', author: '王大厨', avatar: '👨‍🍳', content: '做了30年盘龙菜，这道菜确实是手艺活！推荐大家来钟祥尝尝正宗的！', time: '2024-06-15', likes: 78 },
  { id: 5, foodId: 'panLongCai', author: '婚宴老李', avatar: '👨', content: '钟祥人结婚没有盘龙菜不成席，这是规矩！', time: '2024-06-14', likes: 92 },
  { id: 6, foodId: 'panLongCai', author: '美食达人', avatar: '👩‍🎨', content: '吃过的最好吃的肉菜！入口即化，老人小孩都适合！', time: '2024-06-13', likes: 67 },
  
  { id: 7, foodId: 'baoZi', author: '丰乐河老刘', avatar: '👴', content: '我爷爷那辈就开始做包子了，祖传手艺！', time: '2024-06-15', likes: 45 },
  { id: 8, foodId: 'baoZi', author: '早餐店老板', avatar: '👨', content: '每天能卖几百个，回头客特别多！', time: '2024-06-14', likes: 38 },
  
  { id: 9, foodId: 'laoJiu', author: '老钟祥人', avatar: '👴', content: '转斗湾的老酒，一口下去满嘴粮香！', time: '2024-06-15', likes: 52 },
  { id: 10, foodId: 'laoJiu', author: '码头老张', avatar: '👨', content: '祖辈就在码头卖酒，这酒是老味道！', time: '2024-06-14', likes: 41 },
  
  { id: 11, foodId: 'suBing', author: '张集王奶奶', avatar: '👵', content: '我做的酥饼酥得掉渣！', time: '2024-06-15', likes: 36 },
  { id: 12, foodId: 'suBing', author: '游客', avatar: '🧑', content: '买了几盒带回去，脆香脆香的！', time: '2024-06-14', likes: 28 },
  
  { id: 13, foodId: 'douFu', author: '石牌豆腐坊', avatar: '👨', content: '做了几十年豆腐，石牌的水土是真的好！', time: '2024-06-15', likes: 63 },
  { id: 14, foodId: 'douFu', author: '家庭主妇', avatar: '👩', content: '石牌豆腐真的嫩！怎么炒都好吃！', time: '2024-06-14', likes: 55 },
];

// 评论组件
const CommentSection: React.FC<{ foodId: string; comments: Comment[]; onAddComment: (foodId: string, content: string) => void }> = ({ foodId, comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  
  const foodComments = comments.filter(c => c.foodId === foodId);
  
  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(foodId, newComment);
      setNewComment('');
    }
  };
  
  return (
    <div className={styles.commentSection}>
      <div className={styles.commentToggle} onClick={() => setShowComments(!showComments)}>
        <span className={styles.commentIcon}>💬</span>
        <span className={styles.commentCount}>查看 {foodComments.length} 条评论</span>
        <span className={styles.arrow}>{showComments ? '▲' : '▼'}</span>
      </div>
      
      {showComments && (
        <div className={styles.commentList}>
          {foodComments.map(comment => (
            <div key={comment.id} className={styles.commentItem}>
              <div className={styles.commentAvatar}>{comment.avatar}</div>
              <div className={styles.commentBody}>
                <div className={styles.commentHeader}>
                  <span className={styles.commentAuthor}>{comment.author}</span>
                  <span className={styles.commentTime}>{comment.time}</span>
                </div>
                <p className={styles.commentContent}>{comment.content}</p>
                <div className={styles.commentActions}>
                  <span className={styles.commentLike}>❤️ {comment.likes}</span>
                </div>
              </div>
            </div>
          ))}
          
          <div className={styles.commentInput}>
            <input
              type="text"
              placeholder="说说你对这道美食的感受..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className={styles.commentInputField}
            />
            <button onClick={handleSubmit} className={styles.commentSubmit}>发布</button>
          </div>
        </div>
      )}
    </div>
  );
};

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
    title: '丰乐河包子：陀螺藏古味，御包润千秋',
    excerpt: '始于宋代王府、兴于明代帝途，嘉靖帝御封的宫廷斋包，一枚包子承载宋韵明风...',
    author: '非遗美食研究',
    date: '2024-06-05',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop',
    type: '美食',
    likes: 666,
    views: 3800,
    isFeatured: true
  },
  {
    id: 4,
    title: '转斗湾老酒：汉江码头酿，纯粮养流年',
    excerpt: '源于汉江古埠、兴于千年楚风，纯粮古酿浸润码头烟火，一杯老酒润岁岁安康...',
    author: '楚酒文化研究',
    date: '2024-06-06',
    image: 'https://images.unsplash.com/photo-1516594895297-db690e2f1a62?w=400&h=300&fit=crop',
    type: '美食',
    likes: 555,
    views: 3200,
    isFeatured: true
  },
  {
    id: 5,
    title: '张集酥饼：楚酥承军韵，一脆养烟火',
    excerpt: '源自楚庄王北伐的千年军粮，嘉靖帝御封的长寿点心，千年老街酥香不绝...',
    author: '荆楚美食研究',
    date: '2024-06-07',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop',
    type: '美食',
    likes: 444,
    views: 2800,
    isFeatured: true
  },
  {
    id: 6,
    title: '石牌豆腐：一方白玉豆香，千年温润长寿',
    excerpt: '千年豆腐之乡，始于汉代、兴于明清、盛于当代，白玉珍馐誉满江汉...',
    author: '长寿美食研究',
    date: '2024-06-08',
    image: 'https://images.unsplash.com/photo-1565587425305-80f4c7a6c0e9?w=400&h=300&fit=crop',
    type: '美食',
    likes: 333,
    views: 2200,
    isFeatured: true
  },
  {
    id: 7,
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
    id: 8,
    title: '世界长寿之乡的饮食秘密',
    excerpt: '钟祥拥有独特的富硒土壤，种出的农作物含有丰富的微量元素...',
    author: '健康养生频道',
    date: '2024-05-18',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
    type: '饮食',
    likes: 256,
    views: 1890,
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
  { name: '丰乐河包子', benefit: '陀螺古味·千年非遗', icon: '🥮', featured: true },
  { name: '转斗湾老酒', benefit: '汉江古酿·码头烟火', icon: '🍶', featured: true },
  { name: '张集酥饼', benefit: '楚酥军粮·嘉靖御封', icon: '🥮', featured: true },
  { name: '石牌豆腐', benefit: '白玉珍馐·富硒健康', icon: '🧈', featured: false },
  { name: '葛根粉羹', benefit: '清热解毒、延年益寿', icon: '🥣', featured: false },
  { name: '客店土鸡蛋', benefit: '林间散养、营养丰富', icon: '🥚', featured: false },
  { name: '旧口砂梨', benefit: '清甜多汁、润肺止咳', icon: '🍐', featured: false },
  { name: '长寿香米', benefit: '富硒土壤、粒粒精华', icon: '🍚', featured: false }
];

const categories = ['全部', '养生', '饮食', '运动', '传说', '美食', '研究'];

export default function LongevityStories() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('全部');
  const [likedStories, setLikedStories] = useState<number[]>([]);
  const [comments, setComments] = useState<Comment[]>(initialComments);

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

  const handleAddComment = (foodId: string, content: string) => {
    const newComment: Comment = {
      id: Date.now(),
      foodId,
      author: '匿名用户',
      avatar: '👤',
      content,
      time: new Date().toISOString().split('T')[0],
      likes: 0
    };
    setComments(prev => [...prev, newComment]);
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
        
        {/* 米茶评论区 */}
        <CommentSection foodId="miCha" comments={comments} onAddComment={handleAddComment} />
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
        
        {/* 盘龙菜评论区 */}
        <CommentSection foodId="panLongCai" comments={comments} onAddComment={handleAddComment} />
      </section>

      {/* 钟祥八大长寿风物专辑 */}
      <section className={styles.albumSection}>
        <div className={styles.albumHeader}>
          <h2 className={styles.albumTitle}>🌾 钟祥八大长寿风物专辑</h2>
          <p className={styles.albumSubtitle}>一风物一故事，一味藏千年福寿</p>
          <p className={styles.albumIntro}>
            钟祥，世界长寿之乡。千年文脉浸润一方水土，温润风物滋养世代百姓。
            从一碗米茶、一盘御膳，到一枚酥饼、一坛老酒，八大本土风物，承千年农耕智慧、融皇家祥瑞底蕴、载百姓长寿密码。
          </p>
        </div>
      </section>

      {/* 丰乐河包子专题 */}
      <section className={styles.baoZiSection}>
        <div className={styles.baoZiHeader}>
          <span className={styles.baoZiBadge}>🥮 非遗烟火</span>
          <h2 className={styles.baoZiTitle}>丰乐河包子：陀螺藏古味，御包润千秋</h2>
          <p className={styles.baoZiSubtitle}>始于宋代王府 · 嘉靖帝御封</p>
        </div>
        
        <div className={styles.baoZiContent}>
          <div className={styles.baoZiStory}>
            <h3>🏺 传奇由来</h3>
            <p><strong>宋韵明风，千年非遗</strong></p>
            <p>丰乐河陀螺包子始于北宋，民间素有"丰乐河的包子，转斗湾的酒"的千古美誉。</p>
            <p>古时王府宴席摒弃清水和面，独创本地黄酒老面发酵技法，经反复揉制、塑形，成品形似陀螺、色白如雪、松软清甜、久放不干。因其口感温润、耐储顶饱、清香不腻，成为宋代王府御用点心。</p>
            <p>明代嘉靖帝北上登基，途经丰乐河，百姓敬献数百筐陀螺包子。皇子一路昼夜兼程，全凭这一口软糯干粮充饥续航。嘉靖登基后念念不忘其味，御封其为宫廷"斋包"，列入御膳名录。</p>
          </div>
          
          <div className={styles.baoZiFeatures}>
            <h3>✨ 风物特色</h3>
            <div className={styles.featureGrid}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🍶</span>
                <span>黄酒发酵</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🌀</span>
                <span>陀螺形状</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>❄️</span>
                <span>久放不干</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🥮</span>
                <span>层层起筋</span>
              </div>
            </div>
            <p className={styles.featureDesc}>依靠黄酒自然发酵，无添加、无酵母，层层起筋、温润养胃，易消化、护脾胃，适配老人孩童体质。</p>
          </div>
          
          <div className={styles.baoZiLongevity}>
            <h3>🌿 长寿渊源</h3>
            <p>一方陀螺包子、一碗清润米茶，构成钟祥人最经典的养生早餐。千百年来，这种清淡易消化的饮食习惯，养出了钟祥人平和康健的体态。</p>
            <div className={styles.quoteBox}>
              <p>"一枚小小包子，承载宋韵明风，藏着水乡烟火，是钟祥最温柔、最绵长的长寿乡愁味道"</p>
            </div>
          </div>
        </div>
        
        {/* 丰乐河包子评论区 */}
        <CommentSection foodId="baoZi" comments={comments} onAddComment={handleAddComment} />
      </section>

      {/* 转斗湾老酒专题 */}
      <section className={styles.laoJiuSection}>
        <div className={styles.laoJiuHeader}>
          <span className={styles.laoJiuBadge}>🍶 汉江古酿</span>
          <h2 className={styles.laoJiuTitle}>转斗湾老酒：汉江码头酿，纯粮养流年</h2>
          <p className={styles.laoJiuSubtitle}>纯粮古酿 · 码头烟火</p>
        </div>
        
        <div className={styles.laoJiuContent}>
          <div className={styles.laoJiuStory}>
            <h3>🏺 传奇由来</h3>
            <p><strong>汉江古埠，千年楚风</strong></p>
            <p>转斗湾依汉江而立，自古为粮食转运码头，粮船云集、五谷丰登，为酿酒提供了绝佳原料与水土条件。</p>
            <p>其酿酒技艺承袭春秋郢州春酒古法，取汉江活水、本土纯粮，固态发酵、陶缸窖藏，承楚酒清冽风骨。</p>
            <p>古时码头船工、商旅劳力，晨起必饮一杯早酒，驱寒暖身、舒筋益气，抵御江汉湿气，百年形成独特的早酒养生民俗。</p>
          </div>
          
          <div className={styles.laoJiuFeatures}>
            <h3>✨ 风物特色</h3>
            <div className={styles.featureGrid}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🌾</span>
                <span>纯粮酿造</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🏺</span>
                <span>陶缸窖藏</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>💧</span>
                <span>汉江活水</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🍶</span>
                <span>早酒民俗</span>
              </div>
            </div>
            <p className={styles.featureDesc}>老酒酒体清亮、粮香醇厚、绵甜爽净、入口温润，不口干、不上头，无勾兑、无香精。</p>
          </div>
          
          <div className={styles.laoJiuLongevity}>
            <h3>🌿 长寿渊源</h3>
            <p>温补气血、祛湿散寒，契合钟祥温润养生的长寿之道。一杯老酒，酿的是汉江水土，藏的是码头烟火，润的是岁岁安康。</p>
            <div className={styles.quoteBox}>
              <p>"是钟祥市井烟火里最醇厚的长寿滋味"</p>
            </div>
          </div>
        </div>
        
        {/* 转斗湾老酒评论区 */}
        <CommentSection foodId="laoJiu" comments={comments} onAddComment={handleAddComment} />
      </section>

      {/* 张集酥饼专题 */}
      <section className={styles.suBingSection}>
        <div className={styles.suBingHeader}>
          <span className={styles.suBingBadge}>🥮 楚酥军粮</span>
          <h2 className={styles.suBingTitle}>张集酥饼：楚酥承军韵，一脆养烟火</h2>
          <p className={styles.suBingSubtitle}>源自楚庄王 · 嘉靖帝御封</p>
        </div>
        
        <div className={styles.suBingContent}>
          <div className={styles.suBingStory}>
            <h3>🏺 传奇由来</h3>
            <p><strong>千年军粮，楚风酥香</strong></p>
            <p>张集酥饼古称"酥粑粑"，始于楚、兴于明、盛于清，是源自楚庄王北伐的千年军粮。</p>
            <p>相传春秋时期，楚庄王北伐问鼎，大军粮草转运艰难，偶遇张集本土酥饼，其便携耐存、香酥顶饱、干食不腻，遂定为楚军专用军粮，助楚军驰骋中原、成就霸业。</p>
            <p>明代嘉靖帝往返钟祥古道，偏爱此饼酥香温润、养胃耐饥，登基后将其列为宫廷御点、长寿茶点。清代匠人改良工艺，叠层起酥、土缸倒挂烤制。</p>
          </div>
          
          <div className={styles.suBingFeatures}>
            <h3>✨ 风物特色</h3>
            <div className={styles.featureGrid}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🫓</span>
                <span>叠层起酥</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🔥</span>
                <span>炭火慢烤</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🧈</span>
                <span>小磨麻油</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🥮</span>
                <span>酥脆化渣</span>
              </div>
            </div>
            <p className={styles.featureDesc}>依托古法手工制作，取材本土面粉、小磨麻油，自然发酵，口感酥脆化渣、清香绵长，温润平和、不燥不火。</p>
          </div>
          
          <div className={styles.suBingLongevity}>
            <h3>🌿 长寿渊源</h3>
            <p>解馋充饥、和胃益气，适配日常养生。千年老街酥香不绝，一饼酥脆承楚风、润烟火。</p>
            <div className={styles.quoteBox}>
              <p>"是钟祥最具古战场底蕴的长寿非遗风物"</p>
            </div>
          </div>
        </div>
        
        {/* 张集酥饼评论区 */}
        <CommentSection foodId="suBing" comments={comments} onAddComment={handleAddComment} />
      </section>

      {/* 石牌豆腐专题 */}
      <section className={styles.douFuSection}>
        <div className={styles.douFuHeader}>
          <span className={styles.douFuBadge}>🧈 千年豆腐</span>
          <h2 className={styles.douFuTitle}>石牌豆腐：一方白玉豆香，千年温润长寿</h2>
          <p className={styles.douFuSubtitle}>汉代传承 · 明代贡品</p>
        </div>
        
        <div className={styles.douFuContent}>
          <div className={styles.douFuStory}>
            <h3>🏺 传奇由来</h3>
            <p><strong>千年豆腐之乡，白玉珍馐</strong></p>
            <p>石牌镇，千年豆腐之乡，依汉江沃土、汲清冽甘泉，孕育出享誉江汉的石牌豆腐。其技艺始于汉代、兴于明清、盛于当代。</p>
            <p>石牌水土温润、黄豆优质、地下水甘冽，为豆腐制作提供了天然禀赋。汉代先民开创古法，石磨慢碾、卤水点制，做出的豆腐白嫩如玉、豆香纯粹、久煮不烂、清润养胃。</p>
            <p>明代时，石牌豆腐以色纯味真、清淡适口，入选兴王府贡品，深得嘉靖帝喜爱，誉为"人间清味、白玉珍馐"。</p>
          </div>
          
          <div className={styles.douFuFeatures}>
            <h3>✨ 风物特色</h3>
            <div className={styles.featureGrid}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🫘</span>
                <span>本土黄豆</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>💧</span>
                <span>清冽甘泉</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🪨</span>
                <span>石磨慢碾</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🧂</span>
                <span>卤水点制</span>
              </div>
            </div>
            <p className={styles.featureDesc}>白嫩如玉、豆香纯粹、久煮不烂、清润养胃，低脂健康、老少皆宜。</p>
          </div>
          
          <div className={styles.douFuLongevity}>
            <h3>🌿 长寿渊源</h3>
            <p>豆腐性平微凉、清润补虚、健脾养胃、清淡低脂，最贴合钟祥"少盐少油、顺时养生"的长寿理念。千百年来，石牌人以豆腐为日常，煎炒炖煮、百样吃法，豆制品贯穿三餐，温润滋养。</p>
            <div className={styles.quoteBox}>
              <p>"石牌镇是钟祥清淡长寿饮食文化的核心代表"</p>
            </div>
          </div>
        </div>
        
        {/* 石牌豆腐评论区 */}
        <CommentSection foodId="douFu" comments={comments} onAddComment={handleAddComment} />
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
