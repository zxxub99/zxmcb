import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import { 
  EnvironmentOutline, 
  MessageOutline, 
  UserOutline,
  HeartOutline,
  DownOutline,
  UpOutline,
  PhonebookOutline,
  SendOutline,
} from 'antd-mobile-icons'
import styles from './HomePage.module.css'

// 变现区板块 - 旅游服务 + 长寿特产
const monetizationSections = [
  {
    id: 'longevity-stories',
    icon: '🌿',
    title: '长寿故事',
    subTitle: '百岁老人养生之道',
    desc: '探访钟祥百岁老人，揭秘长寿秘诀',
    color: '#4CAF50',
    bgGradient: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
    path: '/longevity-stories',
    items: [
      { id: 1, title: '百岁老人的早餐', views: '2.3k', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=120&h=80&fit=crop' },
      { id: 2, title: '长寿之乡饮食', views: '1.8k', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=120&h=80&fit=crop' },
      { id: 3, title: '太极养生之道', views: '1.5k', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=120&h=80&fit=crop' },
    ]
  },
  {
    id: 'neighbor',
    icon: '🏘️',
    title: '邻居推荐',
    subTitle: '真实邻居 严选好物',
    desc: '邻里推荐，放心购买',
    color: '#ff9800',
    bgGradient: 'linear-gradient(135deg, #ff9800 0%, #ff5722 100%)',
    path: '/neighbor-recommendations',
    items: [
      { id: 1, title: '王阿姨的手工桃酥', price: '¥35', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=120&h=80&fit=crop' },
      { id: 2, title: '李叔叔的河鱼', price: '¥28', img: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=120&h=80&fit=crop' },
      { id: 3, title: '张奶奶的棉鞋', price: '¥68', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=120&h=80&fit=crop' },
    ]
  },
  {
    id: 'specialty',
    icon: '🎁',
    title: '长寿特产专区',
    subTitle: '地道钟祥 原生态',
    desc: '石牌豆腐 · 葛根粉 · 米茶 · 蟠龙菜',
    color: '#ff6b6b',
    bgGradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%)',
    path: '/specialty',
    items: [
      { id: 1, title: '钟祥蟠龙菜', price: '¥68', img: 'https://picsum.photos/120/80?random=131' },
      { id: 2, title: '钟祥米茶', price: '¥25', img: 'https://picsum.photos/120/80?random=132' },
      { id: 3, title: '葛根粉', price: '¥45', img: 'https://picsum.photos/120/80?random=133' },
      { id: 4, title: '石牌豆腐', price: '¥15', img: 'https://picsum.photos/120/80?random=134' },
      { id: 5, title: '钟祥香稻', price: '¥35', img: 'https://picsum.photos/120/80?random=135' },
    ]
  },
  {
    id: 'tourism-service',
    icon: '🏨',
    title: '旅游服务专区',
    subTitle: '吃住游玩 全方位',
    desc: '民宿农家乐 · 景区门票 · 旅游咨询',
    color: '#11998e',
    bgGradient: 'linear-gradient(135deg, #11998e 0%, #0e8a7c 100%)',
    path: '/tourism-service',
    items: [
      { id: 1, title: '莫愁村民宿', rating: '4.9', price: '¥288起', img: 'https://picsum.photos/120/80?random=141' },
      { id: 2, title: '农家乐餐饮', rating: '4.8', price: '¥68/人', img: 'https://picsum.photos/120/80?random=142' },
      { id: 3, title: '明显陵门票', rating: '4.7', price: '¥50', img: 'https://picsum.photos/120/80?random=143' },
      { id: 4, title: '黄仙洞门票', rating: '4.6', price: '¥70', img: 'https://picsum.photos/120/80?random=144' },
      { id: 5, title: '温峡漂流', rating: '4.8', price: '¥128', img: 'https://picsum.photos/120/80?random=145' },
    ]
  },
  {
    id: 'twelve-scenic',
    icon: '🏛️',
    title: '钟祥十二景',
    subTitle: '文旅精华',
    desc: '明显陵 · 莫愁湖 · 黄仙洞 · 石牌古镇',
    color: '#667eea',
    bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    path: '/twelve-scenic-spots',
    items: [
      { id: 1, title: '明显陵', tag: '5A', img: 'https://picsum.photos/120/80?random=151' },
      { id: 2, title: '莫愁湖', tag: '5A', img: 'https://picsum.photos/120/80?random=152' },
      { id: 3, title: '黄仙洞', tag: '4A', img: 'https://picsum.photos/120/80?random=153' },
      { id: 4, title: '石牌古镇', tag: '历史', img: 'https://picsum.photos/120/80?random=154' },
      { id: 5, title: '更多...', tag: '', img: 'https://picsum.photos/120/80?random=155' },
    ]
  },
]

// 流量区板块 - 交友 + 二手 + 资讯
const trafficSections = [
  {
    id: 'social',
    icon: '👥',
    title: '同城交友',
    subTitle: '邻里交流 兴趣结伴',
    desc: '生活求助 · 问答互助',
    color: '#ff9a9e',
    bgGradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    path: '/social',
    items: [
      { id: 1, title: '周边自驾游', members: 128, img: 'https://picsum.photos/120/80?random=101' },
      { id: 2, title: '摄影采风', members: 86, img: 'https://picsum.photos/120/80?random=102' },
      { id: 3, title: '美食分享', members: 156, img: 'https://picsum.photos/120/80?random=103' },
    ]
  },
  {
    id: 'idle',
    icon: '🔄',
    title: '二手闲置',
    subTitle: '闲置处置 物品互换',
    desc: '同城自提 · 低价好物',
    color: '#4ecdc4',
    bgGradient: 'linear-gradient(135deg, #4ecdc4 0%, #44b8b0 100%)',
    path: '/square',
    items: [
      { id: 1, title: '九成新自行车', price: '¥180', img: 'https://picsum.photos/120/80?random=111' },
      { id: 2, title: '二手冰箱转让', price: '¥450', img: 'https://picsum.photos/120/80?random=112' },
      { id: 3, title: '儿童玩具套装', price: '¥50', img: 'https://picsum.photos/120/80?random=113' },
    ]
  },
  {
    id: 'info',
    icon: '📰',
    title: '旅游资讯',
    subTitle: '景区攻略 游玩路线',
    desc: '人文文化 · 乡村旅游',
    color: '#a8edea',
    bgGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    path: '/tourism-info',
    items: [
      { id: 1, title: '明显陵游览攻略', views: '2.3k', img: 'https://picsum.photos/120/80?random=151' },
      { id: 2, title: '莫愁村美食地图', views: '1.8k', img: 'https://picsum.photos/120/80?random=152' },
      { id: 3, title: '黄仙洞探秘指南', views: '1.5k', img: 'https://picsum.photos/120/80?random=153' },
    ]
  },
]

// 钟祥特色介绍数据
const zhongxiangIntro = [
  {
    title: '一、长寿文化：福寿绵长，康养胜地',
    subTitle: '世界长寿之乡 · 富硒生态福地',
    content: '钟祥获评世界长寿之乡，长寿文化源远流长、深入人心，是城市核心文旅IP。境内生态环境优越，土壤、水源天然富硒，气候温润宜居，滋养出绵长寿康之风。当地敬老孝亲传统代代传承，民风淳朴、生活恬淡，形成了顺应自然、饮食养生、心态豁达的长寿生活理念。'
  },
  {
    title: '二、旅游资源：皇陵楚韵，山水奇观',
    subTitle: '世界文化遗产 · 明代帝王故里',
    content: '皇家人文地标：明显陵（国家5A级、世界文化遗产），为明嘉靖皇帝父母合葬墓，"一陵两冢"形制举世罕见。楚风山水名片：莫愁村（湖北旅游名街），沉浸式还原古郢都风貌；莫愁湖国家湿地公园，湖光澄澈、生态盎然。自然生态胜境：黄仙洞（国家4A级），亚洲大型单体溶洞，天然云盆景观堪称地质奇观。'
  },
  {
    title: '三、农产品资源：富硒沃土，长寿珍味',
    subTitle: '中国葛粉之乡 · 特色美食宝库',
    content: '钟祥是天然富硒产区，先后获评中国葛粉之乡、全国产粮先进县市、中国长寿食材宝库。钟祥长寿米曾为明清贡米；钟祥葛粉享有"南葛北参"美誉；蟠龙菜为明代宫廷御膳、湖北十大名菜；石牌豆腐享誉全国，石牌镇素有"中国豆腐之乡"称号。'
  },
]

// Banner数据
const banners = [
  { id: 1, image: '/banner1.png', title: '明显陵', subtitle: '世界文化遗产', isHighlight: false },
  { id: 2, image: '/banner2.png', title: '文风塔', subtitle: '钟祥标志性古建筑', isHighlight: false },
  { id: 3, image: '/banner3.png', title: '黄仙洞', subtitle: '喀斯特地貌奇观', isHighlight: false },
  { id: 4, image: '/banner4.png', title: '温峡水库', subtitle: '山水画卷', isHighlight: false },
  { id: 5, image: '/banner5.png', title: '莫愁村', subtitle: '民俗文化体验', isHighlight: false },
  { id: 6, image: '/banner_new.png', title: '大口森林公园', subtitle: '生态氧吧', isHighlight: false },
  { id: 7, image: '/banner6.png', title: '莫愁湖', subtitle: '湖光潋滟', isHighlight: false },
]

export default function HomePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('home')
  const [location] = useState('钟祥市')
  const [introExpanded, setIntroExpanded] = useState(false)
  const [shareVisible, setShareVisible] = useState(false)

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('链接已复制到剪贴板')
      setShareVisible(false)
    })
  }

  const shareTo = (platform: string) => {
    const url = window.location.href
    const title = '旅游到钟祥 就找莫愁帮'
    let shareUrl = ''
    
    switch (platform) {
      case 'weixin':
        alert('请长按复制链接后，在微信中粘贴分享')
        return
      case 'douyin':
        alert('请长按复制链接后，在抖音中粘贴分享')
        return
      case 'qq':
        shareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
        break
      case 'weibo':
        shareUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
        break
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`
        break
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank')
    }
    setShareVisible(false)
  }

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
          <span className={styles.searchPlaceholder}>搜索特产、服务、资讯...</span>
        </div>
        <div className={styles.searchCenterText}>旅游到钟祥 就找莫愁帮</div>
      </div>

      {/* Banner轮播 */}
      <div className={styles.bannerSection}>
        <div className={styles.bannerScroll}>
          {[...banners, ...banners].map((banner, index) => (
            <div key={`banner-${index}`} className={styles.bannerItem}>
              <img src={banner.image} alt={banner.title} className={styles.bannerImage} />
              <div className={styles.bannerOverlay}>
                <div className={styles.bannerBottom}>
                  <div className={styles.bannerTitle}>{banner.title}</div>
                  <div className={styles.bannerSubtitle}>{banner.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 视频号 - 许可3108 */}
      <div className={styles.videoChannel}>
        <div className={styles.videoChannelHeader}>
          <span className={styles.videoChannelIcon}>📺</span>
          <span className={styles.videoChannelTitle}>许可3108 视频号</span>
        </div>
        <div className={styles.videoChannelContent}>
          <div className={styles.qrcodeContainer}>
            <img
              src="/images/video-qrcode.png"
              alt="许可3108 视频号二维码"
              className={styles.qrcodeImage}
            />
            <p className={styles.qrcodeTip}>扫一扫二维码，关注"许可3108"视频号</p>
          </div>
        </div>
      </div>

      {/* 钟祥特色介绍 - 可折叠面板 */}
      <div className={styles.introPanel}>
        <div className={styles.introHeader} onClick={() => setIntroExpanded(!introExpanded)}>
          <span className={styles.introTitleWrap}>
            <span className={styles.introTitleLeft}>📖 湖北钟祥旅游天堂</span>
            <span className={styles.introTitleRight}>人到钟祥醉览风光</span>
          </span>
        </div>
        {!introExpanded && (
          <div className={styles.introSummary} onClick={() => setIntroExpanded(!introExpanded)}>
            <div className={styles.introPoemScroll}>
              <div className={styles.introPoemContent}>
                <div className={styles.introPoemLine}>莫愁故里喜相逢</div>
                <div className={styles.introPoemLine}>莫愁村中笑语浓</div>
                <div className={styles.introPoemLine}>莫愁湖畔风光好</div>
                <div className={styles.introPoemLine}>莫愁小院话从容</div>
                <div className={styles.introPoemLine}>莫愁故里喜相逢</div>
                <div className={styles.introPoemLine}>莫愁村中笑语浓</div>
                <div className={styles.introPoemLine}>莫愁湖畔风光好</div>
                <div className={styles.introPoemLine}>莫愁小院话从容</div>
              </div>
            </div>
            <div className={styles.introPoemAuthor}>---钟祥莫愁帮</div>
            <div className={styles.introSummaryLine}>世界长寿之乡 · 历史文化名城 · 旅游康养圣地</div>
            <div className={styles.introSummaryLineWrap}>
              <span className={styles.introSummaryLine}>长寿文化底蕴深厚 · 富硒物产丰富 · 磷都工业转型</span>
              <span className={styles.introToggle}>
                {introExpanded ? <UpOutline /> : <DownOutline />}
              </span>
            </div>
          </div>
        )}
        {introExpanded && (
          <div className={styles.introContent}>
            {zhongxiangIntro.map((item, index) => (
              <div key={index} className={styles.introSection}>
                <div className={styles.introSectionTitle}>{item.title}</div>
                <div className={styles.introSectionText}>{item.content}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 变现区标题 - 上半区 */}
      <div className={styles.sectionAreaTitle}>
        <span className={styles.sectionAreaTitleText}>🎯 精选服务</span>
        <span className={styles.sectionAreaSubTitle}>长寿特产 · 旅游服务</span>
      </div>

      {/* 变现区 - 长寿特产 + 旅游服务 */}
      <div className={styles.monetizationGrid}>
        {monetizationSections.map(section => (
          <div key={section.id} className={styles.monetizationCard} onClick={() => navigate(section.path)}>
            <div className={styles.monetizationHeader} style={{background: section.bgGradient}}>
              <div className={styles.monetizationIcon}>{section.icon}</div>
              <div className={styles.monetizationTitleWrap}>
                <span className={styles.monetizationTitle}>{section.title}</span>
                <span className={styles.monetizationSubTitle}>{section.subTitle}</span>
              </div>
              <span className={styles.monetizationMore}>进入 {'>'}</span>
            </div>
            <div className={styles.monetizationDesc}>{section.desc}</div>
            <div className={styles.monetizationItems}>
              {section.items.slice(0, 3).map(item => (
                <div key={item.id} className={styles.monetizationItem}>
                  <img src={item.img} alt={item.title} className={styles.monetizationItemImg} />
                  <div className={styles.monetizationItemInfo}>
                    <span className={styles.monetizationItemTitle}>{item.title}</span>
                    <span className={styles.monetizationItemPrice}>{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 流量区标题 - 下半区 */}
      <div className={styles.sectionAreaTitle}>
        <span className={styles.sectionAreaTitleText}>📱 热门频道</span>
        <span className={styles.sectionAreaSubTitle}>同城交友 · 二手闲置 · 旅游资讯</span>
      </div>

      {/* 流量区 - 交友 + 二手 + 资讯 */}
      <div className={styles.trafficGrid}>
        {trafficSections.map(section => (
          <div key={section.id} className={styles.trafficCard} onClick={() => navigate(section.path)}>
            <div className={styles.trafficHeader} style={{background: section.bgGradient}}>
              <div className={styles.trafficIcon}>{section.icon}</div>
              <div className={styles.trafficTitleWrap}>
                <span className={styles.trafficTitle}>{section.title}</span>
                <span className={styles.trafficSubTitle}>{section.subTitle}</span>
              </div>
            </div>
            <div className={styles.trafficDesc}>{section.desc}</div>
            <div className={styles.trafficItems}>
              {section.items.map(item => (
                <div key={item.id} className={styles.trafficItem}>
                  <img src={item.img} alt={item.title} className={styles.trafficItemImg} />
                  <div className={styles.trafficItemInfo}>
                    <span className={styles.trafficItemTitle}>{item.title}</span>
                    {'members' in item && <span className={styles.trafficItemMeta}>{String(item.members)}人</span>}
                    {'price' in item && <span className={styles.trafficItemPrice}>{String(item.price)}</span>}
                    {'views' in item && <span className={styles.trafficItemMeta}>{String(item.views)}</span>}
                    {'rating' in item && <span className={styles.trafficItemMeta}>★ {String(item.rating)}</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.trafficMore}>查看更多 {'>'}</div>
          </div>
        ))}
      </div>

      {/* 分享按钮 */}
      <div className={styles.shareButton} onClick={() => setShareVisible(true)}>
        <SendOutline /> 分享
      </div>

      {/* 分享弹窗 */}
      {shareVisible && (
        <div className={styles.shareOverlay} onClick={() => setShareVisible(false)}>
          <div className={styles.shareModalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.shareModalTitle}>分享到</div>
            <div className={styles.shareTitle}>旅游到钟祥 就找莫愁帮</div>
            <div className={styles.shareLinks}>
              <div className={styles.shareLink} onClick={() => copyLink()}>
                <div className={styles.shareIcon} style={{background: '#07c160'}}>链</div>
                <span>复制链接</span>
              </div>
              <div className={styles.shareLink} onClick={() => shareTo('weixin')}>
                <div className={styles.shareIcon} style={{background: '#07c160'}}>微</div>
                <span>微信</span>
              </div>
              <div className={styles.shareLink} onClick={() => shareTo('douyin')}>
                <div className={styles.shareIcon} style={{background: '#000'}}>抖</div>
                <span>抖音</span>
              </div>
              <div className={styles.shareLink} onClick={() => shareTo('qq')}>
                <div className={styles.shareIcon} style={{background: '#12b7f5'}}>Q</div>
                <span>QQ</span>
              </div>
              <div className={styles.shareLink} onClick={() => shareTo('weibo')}>
                <div className={styles.shareIcon} style={{background: '#e6162d'}}>微</div>
                <span>微博</span>
              </div>
              <div className={styles.shareLink} onClick={() => shareTo('whatsapp')}>
                <div className={styles.shareIcon} style={{background: '#25d366'}}>W</div>
                <span>WhatsApp</span>
              </div>
            </div>
            <div className={styles.shareCloseBtn} onClick={() => setShareVisible(false)}>关闭</div>
          </div>
        </div>
      )}

      {/* 特别声明 */}
      <div className={styles.disclaimer}>
        <span className={styles.disclaimerIcon}>⚠️</span>
        <span className={styles.disclaimerText}>以上项目只提供平台服务，请认真筛选核实内容！版权归许可的农家小院所有</span>
      </div>

      {/* 悬浮智能客服按钮 */}
      <div className={styles.floatingServiceBtn} onClick={() => navigate('/customer-service')}>
        <PhonebookOutline className={styles.serviceIcon} />
        <span className={styles.serviceLabel}>智能客服</span>
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
              else if (tab.key === 'my') {
                const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                if (isLoggedIn) {
                  navigate('/profile')
                } else {
                  navigate('/login')
                }
              }
            }}
          />
        ))}
      </TabBar>
    </div>
  )
}
