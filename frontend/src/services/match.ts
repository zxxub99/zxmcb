/**
 * 智能匹配服务
 * 基于地理位置、兴趣标签、信用星级进行智能推荐
 */

// 用户兴趣标签
export const INTEREST_TAGS = [
  '维修', '家政', '搬家', '配送', '回收',
  '教育', '咨询', '陪诊', '代购', '遛宠',
  '健身', '摄影', '旅游', '美食', '文艺',
  '数码', '手工', '园艺', '宠物', '亲子'
]

// 互助类型
export const HELP_TYPES = {
  repair: { name: '维修帮扶', icon: '🔧', tags: ['维修', '数码'] },
  consult: { name: '咨询解答', icon: '💡', tags: ['咨询', '教育'] },
  errand: { name: '事务劳办', icon: '📋', tags: ['代购', '配送', '遛宠'] },
  technical: { name: '技术帮扶', icon: '💻', tags: ['数码', '手工'] }
}

// 物品分类
export const ITEM_CATEGORIES = [
  { id: 'electronics', name: '数码电子', icon: '📱' },
  { id: 'furniture', name: '家居家具', icon: '🛋️' },
  { id: 'clothing', name: '服装鞋帽', icon: '👗' },
  { id: 'books', name: '图书文具', icon: '📚' },
  { id: 'sports', name: '运动户外', icon: '⚽' },
  { id: 'beauty', name: '美妆护肤', icon: '💄' },
  { id: 'baby', name: '母婴用品', icon: '🍼' },
  { id: 'pet', name: '宠物用品', icon: '🐶' },
  { id: 'other', name: '其他物品', icon: '📦' }
]

// 计算距离评分 (0-100)
export function calculateDistanceScore(userLat: number, userLng: number, targetLat: number, targetLng: number): number {
  // 使用Haversine公式计算两点之间的距离（公里）
  const R = 6371 // 地球半径（公里）
  const dLat = (targetLat - userLat) * Math.PI / 180
  const dLng = (targetLng - userLng) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(userLat * Math.PI / 180) * Math.cos(targetLat * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  const distance = R * c

  // 将距离转换为评分（距离越近分数越高）
  // 0-1km: 100分, 1-5km: 80分, 5-10km: 60分, 10-20km: 40分, 20km以上: 20分
  if (distance <= 1) return 100
  if (distance <= 5) return 80
  if (distance <= 10) return 60
  if (distance <= 20) return 40
  return 20
}

// 计算兴趣匹配评分 (0-100)
export function calculateInterestScore(userInterests: string[], targetInterests: string[]): number {
  if (!userInterests.length || !targetInterests.length) return 50
  const intersection = userInterests.filter(tag => targetInterests.includes(tag))
  return Math.round((intersection.length / Math.max(userInterests.length, targetInterests.length)) * 100)
}

// 计算信用星级评分 (0-100)
export function calculateStarScore(star: number): number {
  return star * 20 // 1星20分，5星100分
}

// 计算综合匹配评分
export function calculateMatchScore(params: {
  distance: number      // 距离评分 (0-100)
  interest: number       // 兴趣匹配评分 (0-100)
  star: number          // 星级评分 (0-100)
  recentActivity: number // 最近活跃度 (0-100)
}): number {
  // 权重分配
  const weights = {
    distance: 0.35,    // 距离权重 35%
    interest: 0.25,    // 兴趣匹配权重 25%
    star: 0.25,        // 信用星级权重 25%
    recentActivity: 0.15 // 最近活跃权重 15%
  }

  const score = 
    params.distance * weights.distance +
    params.interest * weights.interest +
    params.star * weights.star +
    params.recentActivity * weights.recentActivity

  return Math.round(score)
}

// 计算物品匹配度
export function calculateItemMatchScore(params: {
  distance: number      // 距离评分
  categoryMatch: number // 分类匹配
  priceRange: number    // 价格区间匹配
  condition: number     // 成色评分
}): number {
  const weights = {
    distance: 0.4,
    categoryMatch: 0.2,
    priceRange: 0.2,
    condition: 0.2
  }

  return Math.round(
    params.distance * weights.distance +
    params.categoryMatch * weights.categoryMatch +
    params.priceRange * weights.priceRange +
    params.condition * weights.condition
  )
}

// 排序函数
export function sortByMatchScore<T extends { matchScore?: number }>(items: T[]): T[] {
  return items.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
}

// 生成模拟推荐数据
export function generateMockRecommendations(type: 'users' | 'items' | 'helps', count: number = 10) {
  const mockUsers = [
    { id: 1, nickname: '张大哥', gender: '男', age: 45, interests: ['维修', '摄影'], star: 4, level: 'excellent', distance: 1.2, lastActive: '刚刚' },
    { id: 2, nickname: '李阿姨', gender: '女', age: 52, interests: ['家政', '园艺'], star: 5, level: 'elite', distance: 0.8, lastActive: '5分钟前' },
    { id: 3, nickname: '王师傅', gender: '男', age: 38, interests: ['维修', '数码'], star: 4, level: 'excellent', distance: 2.5, lastActive: '1小时前' },
    { id: 4, nickname: '小美', gender: '女', age: 28, interests: ['美食', '旅游'], star: 3, level: 'newbie', distance: 3.1, lastActive: '今天' },
    { id: 5, nickname: '老陈', gender: '男', age: 55, interests: ['健身', '摄影'], star: 5, level: 'elite', distance: 1.5, lastActive: '昨天' },
  ]

  const mockItems = [
    { id: 1, title: '九成新电动车', price: 800, category: 'other', condition: 90, distance: 1.2, views: 156 },
    { id: 2, title: '品牌洗衣机转让', price: 500, category: 'furniture', condition: 85, distance: 2.0, views: 89 },
    { id: 3, title: '儿童自行车', price: 200, category: 'sports', condition: 95, distance: 0.5, views: 234 },
    { id: 4, title: '二手空调出售', price: 1200, category: 'electronics', condition: 80, distance: 3.5, views: 67 },
    { id: 5, title: '全套厨具转让', price: 350, category: 'furniture', condition: 90, distance: 1.8, views: 112 },
  ]

  const mockHelps = [
    { id: 1, title: '水管漏水需要维修', type: 'repair', urgent: true, distance: 0.8, reward: 50 },
    { id: 2, title: '帮忙代取快递', type: 'errand', urgent: false, distance: 1.5, reward: 10 },
    { id: 3, title: '电脑系统重装', type: 'technical', urgent: false, distance: 2.0, reward: 80 },
    { id: 4, title: '陪老人去医院', type: 'consult', urgent: true, distance: 1.2, reward: 100 },
    { id: 5, title: '搬家搬运服务', type: 'errand', urgent: false, distance: 3.0, reward: 150 },
  ]

  const data = type === 'users' ? mockUsers : type === 'items' ? mockItems : mockHelps
  return data.slice(0, count)
}

// 推荐理由生成
export function generateMatchReason(score: number, type: 'user' | 'item' | 'help'): string {
  if (score >= 80) {
    const reasons = {
      user: ['距离很近', '兴趣高度匹配', '高信用星级用户', '非常活跃'],
      item: ['性价比很高', '距离很近', '成色很好', '热门物品'],
      help: ['距离近且紧急', '高奖励任务', '好评率超高', '可快速响应']
    }
    return reasons[type][Math.floor(Math.random() * reasons[type].length)]
  } else if (score >= 60) {
    return '综合匹配度不错'
  } else {
    return '可了解一下'
  }
}
