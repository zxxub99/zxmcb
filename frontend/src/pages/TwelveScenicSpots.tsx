import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Tag, Empty, Spin } from 'antd-mobile';
import { EnvironmentOutline, ClockCircleOutline, PayCircleOutline } from 'antd-mobile-icons';
import styles from './TwelveScenicSpots.module.css';

// 钟祥十二景完整数据
const scenicSpots = [
  {
    id: 1,
    name: '明显陵',
    level: '5A',
    tag: '世界文化遗产',
    shortDesc: '明代帝陵孤例，一陵两冢世所罕见。龙鳞神道、石像生、九曲御河尽显皇家气势。',
    fullDesc: '明显陵是国家5A级景区、世界文化遗产，是明代帝陵的唯一特例。其独特之处在于一陵两冢的陵寝结构，在世界帝王陵寝中极为罕见。景区内的龙鳞神道蜿蜒曲折，石像生栩栩如生，九曲御河流水潺潺，尽显皇家陵寝的宏伟气势。这里是探秘明代藩王文化、感受皇家气度的核心地标。',
    navigation: '钟祥市城东郊纯德山',
    openTime: '08:30 - 17:30（全年开放）',
    ticket: '成人票 ¥65 | 学生票 ¥32 | 老人/儿童 ¥35',
    features: ['世界文化遗产', '明代帝陵', '皇家气派'],
    highlight: '一陵两冢的独特陵寝结构'
  },
  {
    id: 2,
    name: '莫愁湖·莫愁村',
    level: '5A',
    tag: '景区核心',
    shortDesc: '莫愁湖碧波环抱，湿地风光秀美；莫愁村荆楚风情浓郁，非遗演艺、地道美食云集。',
    fullDesc: '莫愁湖与莫愁村是钟祥5A级景区的核心区域。莫愁湖碧波荡漾，湿地风光旖旎，是游客休闲漫步的绝佳去处。莫愁村则洋溢着浓郁的荆楚风情，非遗演艺精彩纷呈，地道美食琳琅满目。景区日夜皆景，白天可泛舟湖上、品茶赏景，夜晚可观灯火阑珊、体验楚风民俗。',
    navigation: '钟祥市郢中街道莫愁湖路',
    openTime: '全天开放（商铺09:00-21:00）',
    ticket: '免费（特定项目另收费）',
    features: ['5A景区', '荆楚风情', '非遗演艺'],
    highlight: '日夜皆景的沉浸式体验'
  },
  {
    id: 3,
    name: '黄仙洞',
    level: '4A',
    tag: '天下第一洞',
    shortDesc: '大洪山核心溶洞，喀斯特地貌奇观。2万㎡云盆梯田、百变钟乳石、悬空栈道，光影奇幻。',
    fullDesc: '黄仙洞是大洪山国家风景名胜区的核心溶洞，被誉为"天下第一洞"。洞内喀斯特地貌发育完善，形成众多地质奇观：2万余平方米的云盆梯田蔚为壮观，百变钟乳石形态各异，悬空栈道惊险刺激。洞内光影交错，营造出梦幻般的地下世界，堪称大自然的地质艺术殿堂。',
    navigation: '钟祥市客店镇黄仙洞景区',
    openTime: '08:00 - 17:30（旺季延至18:00）',
    ticket: '成人票 ¥78 | 优惠票 ¥45',
    features: ['4A景区', '喀斯特地貌', '地质奇观'],
    highlight: '2万㎡云盆梯田'
  },
  {
    id: 4,
    name: '大口国家森林公园',
    level: '国家森林公园',
    tag: '天然氧吧',
    shortDesc: '鄂中原始林海，森林覆盖率超93%。九级天溪瀑布、溪涧清流、古木葱郁，避暑徒步优选。',
    fullDesc: '大口国家森林公园是鄂中地区难得的原始林海，森林覆盖率高达93%以上。公园内九级天溪瀑布飞珠溅玉，溪涧清澈见底，古木参天葱郁蔽日。空气中负氧离子含量极高，是天然的生态氧吧。这里是避暑纳凉、徒步健身、亲近自然的优选之地。',
    navigation: '钟祥市大口林场',
    openTime: '08:00 - 17:30（旺季07:30-18:00）',
    ticket: '成人票 ¥50 | 优惠票 ¥25',
    features: ['国家森林公园', '天然氧吧', '瀑布溪流'],
    highlight: '森林覆盖率超93%'
  },
  {
    id: 5,
    name: '钟祥博物馆',
    level: '城市文化地标',
    tag: '免费参观',
    shortDesc: '建筑呈"明"字造型，馆藏元青花梅瓶等国宝，系统展示钟祥千年文脉与长寿文化。',
    fullDesc: '钟祥博物馆是展示城市文化的重要窗口。建筑外观呈"明"字造型，寓意钟祥的明代历史文化。馆内珍藏丰富，包括举世闻名的元青花梅瓶等国宝级文物。博物馆系统展示了钟祥千年文脉、明代帝王文化与长寿文化，是了解钟祥历史变迁的必去之地。博物馆免费向公众开放（周一闭馆）。',
    navigation: '钟祥市郢中街道王府大道',
    openTime: '09:00 - 17:00（周一闭馆）',
    ticket: '免费（凭身份证入馆）',
    features: ['元青花梅瓶', '明代文化', '免费开放'],
    highlight: '馆藏元青花梅瓶等国宝'
  },
  {
    id: 6,
    name: '兴王府',
    level: '明代遗存',
    tag: '藩王府邸',
    shortDesc: '嘉靖皇帝出生地，明代藩王府规制典范。殿宇古朴庄重，雕梁画栋精巧，院落清幽雅致。',
    fullDesc: '兴王府是嘉靖皇帝朱厚熜的出生地，也是明代藩王府的规制典范。府内殿宇古朴庄重，雕梁画栋精巧细腻，院落布局清幽雅致。漫步其中，可品读藩王旧事，感受明代建筑的独特美学。兴王府是研究明代藩王制度、体验皇家气派的重要历史遗迹。',
    navigation: '钟祥市郢中街道王府路',
    openTime: '08:30 - 17:30',
    ticket: '成人票 ¥30 | 优惠票 ¥15',
    features: ['嘉靖出生地', '明代建筑', '藩王文化'],
    highlight: '嘉靖皇帝出生地'
  },
  {
    id: 7,
    name: '元佑宫',
    level: '明代皇家道观',
    tag: '道教圣地',
    shortDesc: '嘉靖敕建皇家道观，南方道教名地。红墙绿瓦殿宇恢弘，古碑石刻林立，道韵悠长。',
    fullDesc: '元佑宫是嘉靖皇帝敕建的皇家道观，是南方著名的道教圣地。宫内红墙绿瓦，殿宇恢弘壮观，古碑石刻林立，处处彰显皇家气派与道教文化底蕴。宫内道韵悠长，香火鼎盛，是信众祈福静心、游客观光揽胜的理想之地。',
    navigation: '钟祥市郢中街道元佑路',
    openTime: '08:00 - 17:30',
    ticket: '免费',
    features: ['皇家道观', '道教文化', '古碑石刻'],
    highlight: '嘉靖敕建皇家道观'
  },
  {
    id: 8,
    name: '彭墩乡村世界',
    level: '4A',
    tag: '最美休闲乡村',
    shortDesc: '中国最美休闲乡村，田园风光如画。融合现代农业、采摘游乐、康养度假，尽享田园慢生活。',
    fullDesc: '彭墩乡村世界是国家4A级景区，被誉为"中国最美休闲乡村"。这里田园风光如诗如画，融合了现代农业科技展示、农事采摘体验、康养度假等多种业态。游客可在此感受乡土气息，漫步乡间小道，尽享田园慢生活的惬意与舒适。',
    navigation: '钟祥市石牌镇彭墩村',
    openTime: '08:00 - 18:00',
    ticket: '成人票 ¥50 | 体验项目另收费',
    features: ['4A景区', '田园风光', '农事体验'],
    highlight: '中国最美休闲乡村'
  },
  {
    id: 9,
    name: '汇源农谷体验园',
    level: '4A',
    tag: '田园综合体',
    shortDesc: '华中大型田园综合体，集农业观光、果蔬采摘、亲子游乐、研学科普于一体，四季鲜果不断。',
    fullDesc: '汇源农谷体验园是华中地区大型田园综合体，集农业观光、果蔬采摘、亲子游乐、研学科普于一体。园区内四季鲜果不断，是家庭出游、亲子互动、团建研学的热门打卡地。游客可在此亲近自然、体验农事、享受欢乐的田园时光。',
    navigation: '钟祥市东桥镇大口村',
    openTime: '08:30 - 17:30（采摘季节延长）',
    ticket: '门票 ¥30 | 采摘另计',
    features: ['4A景区', '亲子乐园', '研学基地'],
    highlight: '四季鲜果不断'
  },
  {
    id: 10,
    name: '万紫千红植物园',
    level: '生态景区',
    tag: '紫薇花海',
    shortDesc: '毗邻石门水库，以紫薇花为特色。繁花盛放、山水相依，步道清幽，搭配特色民宿，花海漫步。',
    fullDesc: '万紫千红植物园位于石门水库旁，是钟祥以紫薇花为主题的特色植物园。园内繁花似锦、山水相依，漫步花海步道，清幽惬意。园区配套特色民宿，游客可在此赏花休憩，享受悠闲的户外休闲时光。',
    navigation: '钟祥市东桥镇石门水库旁',
    openTime: '08:00 - 18:00（花季延至18:30）',
    ticket: '成人票 ¥40 | 优惠票 ¥20',
    features: ['紫薇花海', '水库风光', '特色民宿'],
    highlight: '紫薇花主题植物园'
  },
  {
    id: 11,
    name: '石牌古镇',
    level: '历史文化名镇',
    tag: '豆腐之乡',
    shortDesc: '千年荆楚名镇，"中国豆腐之乡"。青石板古街完好，古桥老宅错落，品豆腐美食，感受古镇民俗。',
    fullDesc: '石牌古镇是千年荆楚历史文化名镇，被誉为"中国豆腐之乡"。古镇内青石板古街完好保存，古桥老宅错落有致，传统豆腐制作技艺代代传承。漫步古镇，可品地道石牌豆腐、尝特色风味小吃，感受淳朴的古镇民俗与厚重的历史文化。',
    navigation: '钟祥市石牌镇老街',
    openTime: '全天开放（商铺09:00-18:00）',
    ticket: '免费（特定场馆另收费）',
    features: ['千年古镇', '豆腐文化', '古街古宅'],
    highlight: '中国豆腐之乡'
  },
  {
    id: 12,
    name: '莫愁渡·白雪楼',
    level: '历史文化地标',
    tag: '楚风诗意',
    shortDesc: '千年古渡临江而立，流传莫愁女动人传说；白雪楼复刻"阳春白雪"典故，登楼远眺汉江，山水诗意。',
    fullDesc: '莫愁渡是千年古渡，临江而立，流传着莫愁女的动人传说。莫愁女的故事在钟祥源远流长，是当地重要的文化符号。白雪楼复刻了"阳春白雪"的千古典故，登楼远眺汉江，烟波浩渺，山水与古建相映成趣，尽显楚风诗意，是感受钟祥文化底蕴的必去之处。',
    navigation: '钟祥市郢中街道汉江边莫愁古渡片区',
    openTime: '全天开放（白雪楼09:00-17:00）',
    ticket: '免费（白雪楼登楼 ¥10）',
    features: ['莫愁文化', '楚风古建', '汉江风光'],
    highlight: '莫愁女传说发源地'
  }
];

const TwelveScenicSpots: React.FC = () => {
  const navigate = useNavigate();

  const handleSpotClick = (spot: typeof scenicSpots[0]) => {
    // 跳转到旅游详情页或弹窗
    navigate('/tourism', { state: { spot } });
  };

  return (
    <div className={styles.container}>
      {/* 页面标题 */}
      <div className={styles.header}>
        <h1 className={styles.title}>钟祥十二景</h1>
        <p className={styles.subtitle}>世界长寿之乡 · 文旅精华</p>
      </div>

      {/* 景点列表 */}
      <div className={styles.spotList}>
        {scenicSpots.map((spot) => (
          <div 
            key={spot.id} 
            className={styles.spotCard}
            onClick={() => handleSpotClick(spot)}
          >
            {/* 图片占位 */}
            <div className={styles.imagePlaceholder}>
              <span className={styles.imageText}>{spot.name}</span>
              <div className={styles.levelBadge}>
                <Tag color={spot.level.includes('5A') ? 'danger' : spot.level.includes('4A') ? 'warning' : 'primary'}>
                  {spot.level}
                </Tag>
              </div>
            </div>

            {/* 景点信息 */}
            <div className={styles.spotInfo}>
              <div className={styles.spotHeader}>
                <h3 className={styles.spotName}>{spot.name}</h3>
                <Tag color="success" className={styles.tagBadge}>{spot.tag}</Tag>
              </div>

              <p className={styles.shortDesc}>{spot.shortDesc}</p>

              <div className={styles.spotMeta}>
                <div className={styles.metaItem}>
                  <ClockCircleOutline className={styles.metaIcon} />
                  <span>{spot.openTime}</span>
                </div>
                <div className={styles.metaItem}>
                  <PayCircleOutline className={styles.metaIcon} />
                  <span>{spot.ticket}</span>
                </div>
                <div className={styles.metaItem}>
                  <EnvironmentOutline className={styles.metaIcon} />
                  <span>{spot.navigation}</span>
                </div>
              </div>

              <div className={styles.features}>
                {spot.features.map((feature, index) => (
                  <Tag key={index} className={styles.featureTag}>{feature}</Tag>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 底部导航 */}
      <div className={styles.bottomNav}>
        <div className={styles.navItem} onClick={() => navigate('/tourism')}>
          <span className={styles.navIcon}>🏠</span>
          <span>返回首页</span>
        </div>
        <div className={styles.navItem} onClick={() => navigate('/specialty')}>
          <span className={styles.navIcon}>🎁</span>
          <span>选购特产</span>
        </div>
      </div>
    </div>
  );
};

export default TwelveScenicSpots;
