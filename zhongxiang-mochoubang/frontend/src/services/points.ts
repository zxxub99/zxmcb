/**
 * 积分和信用体系服务
 * 包含积分获取、扣减、等级计算等功能
 */

// 信用星级配置
export const STAR_CONFIG = {
  1: { name: '一星用户', minScore: 0, color: '#999', icon: '⭐' },
  2: { name: '二星用户', minScore: 100, color: '#999', icon: '⭐⭐' },
  3: { name: '三星用户', minScore: 300, color: '#52c41a', icon: '⭐⭐⭐' },
  4: { name: '四星用户', minScore: 600, color: '#1677ff', icon: '⭐⭐⭐⭐' },
  5: { name: '五星精英', minScore: 1000, color: '#faad14', icon: '⭐⭐⭐⭐⭐' },
}

// 用户等级配置
export const LEVEL_CONFIG = {
  newbie: { 
    name: '新锐用户', 
    minScore: 0, 
    color: '#999', 
    icon: '🌱',
    privileges: ['基础发布功能', '浏览广场'] 
  },
  excellent: { 
    name: '优秀用户', 
    minScore: 500, 
    color: '#1677ff', 
    icon: '🌟',
    privileges: ['优先推荐', '更多发布配额', '高级筛选'] 
  },
  elite: { 
    name: '精英用户', 
    minScore: 2000, 
    color: '#faad14', 
    icon: '👑',
    privileges: ['置顶功能', '专属客服', 'VIP标识', '更多发布配额'] 
  },
}

// 积分规则
export const POINTS_RULES = {
  // 获取积分
  earn: {
    publishIdle: { points: 5, desc: '发布闲置物品' },
    publishHelp: { points: 5, desc: '发布互助请求' },
    completeTransaction: { points: 10, desc: '完成交易' },
    completeHelp: { points: 10, desc: '完成互助服务' },
    receiveGoodReview: { points: 2, desc: '获得好评' },
    receiveExcellentReview: { points: 5, desc: '获得优秀评价' },
    dailyLogin: { points: 1, desc: '每日登录' },
    perfectProfile: { points: 10, desc: '完善个人资料' },
    realNameVerify: { points: 20, desc: '完成实名认证' },
    firstTransaction: { points: 30, desc: '首次完成交易' },
    shareContent: { points: 3, desc: '分享内容' },
    inviteFriend: { points: 50, desc: '邀请好友注册' },
  },
  // 扣减积分
  deduct: {
    cancelTransaction: { points: -5, desc: '取消交易' },
    receiveBadReview: { points: -10, desc: '收到差评' },
    timeoutResponse: { points: -3, desc: '超时未响应' },
    violateRules: { points: -20, desc: '违反社区规则' },
    falseReport: { points: -30, desc: '被举报核实' },
  }
}

// 计算用户信用分
export function calculateCreditScore(params: {
  starLevel: number      // 星级 (1-5)
  transactionCount: number // 交易次数
  helpCount: number       // 互助次数
  goodReviewRate: number  // 好评率 (0-1)
  responseRate: number   // 响应率 (0-1)
  activeDays: number     // 活跃天数
}): number {
  // 基础分 = 星级分 * 20
  const starScore = params.starLevel * 20
  
  // 交易经验分 (每完成一次+2分，上限30分)
  const transactionScore = Math.min(params.transactionCount * 2, 30)
  
  // 互助经验分 (每完成一次+2分，上限30分)
  const helpScore = Math.min(params.helpCount * 2, 30)
  
  // 好评率分 (好评率 * 30)
  const reviewScore = Math.round(params.goodReviewRate * 30)
  
  // 响应率分 (响应率 * 30)
  const responseScore = Math.round(params.responseRate * 30)
  
  // 活跃度分 (活跃天数 / 10，上限30分)
  const activeScore = Math.min(Math.floor(params.activeDays / 10), 30)
  
  return starScore + transactionScore + helpScore + reviewScore + responseScore + activeScore
}

// 获取用户星级
export function getUserStar(creditScore: number): number {
  if (creditScore >= STAR_CONFIG[5].minScore) return 5
  if (creditScore >= STAR_CONFIG[4].minScore) return 4
  if (creditScore >= STAR_CONFIG[3].minScore) return 3
  if (creditScore >= STAR_CONFIG[2].minScore) return 2
  return 1
}

// 获取用户等级
export function getUserLevel(creditScore: number): keyof typeof LEVEL_CONFIG {
  if (creditScore >= LEVEL_CONFIG.elite.minScore) return 'elite'
  if (creditScore >= LEVEL_CONFIG.excellent.minScore) return 'excellent'
  return 'newbie'
}

// 获取等级特权
export function getLevelPrivileges(level: keyof typeof LEVEL_CONFIG): string[] {
  return LEVEL_CONFIG[level].privileges
}

// 计算距离下个等级所需积分
export function getNextLevelProgress(creditScore: number): { target: number; current: number; progress: number } {
  const currentLevel = getUserLevel(creditScore)
  
  if (currentLevel === 'elite') {
    return { target: creditScore, current: creditScore, progress: 100 }
  }
  
  const nextLevel = currentLevel === 'newbie' ? 'excellent' : 'elite'
  const targetScore = LEVEL_CONFIG[nextLevel].minScore
  const progress = Math.round((creditScore / targetScore) * 100)
  
  return { target: targetScore, current: creditScore, progress }
}

// 积分记录类型
export type PointsRecordType = 
  | 'publish_idle'
  | 'publish_help'
  | 'complete_transaction'
  | 'complete_help'
  | 'receive_review'
  | 'daily_login'
  | 'perfect_profile'
  | 'real_verify'
  | 'share_content'
  | 'invite_friend'
  | 'cancel_transaction'
  | 'bad_review'
  | 'timeout_response'
  | 'violate_rules'

// 积分记录
export interface PointsRecord {
  id: string
  type: PointsRecordType
  points: number
  desc: string
  createdAt: string
  balance: number
}

// 积分变化说明
export function getPointsChangeDesc(type: PointsRecordType, points: number): string {
  const prefix = points > 0 ? '+' : ''
  const earnDesc = POINTS_RULES.earn as Record<string, { points: number; desc: string }>
  const deductDesc = POINTS_RULES.deduct as Record<string, { points: number; desc: string }>
  const baseDesc = earnDesc[type]?.desc || deductDesc[type]?.desc || '其他'
  return `${prefix}${points} ${baseDesc}`
}

// 模拟积分数据
export function generateMockPointsData() {
  const records: PointsRecord[] = [
    { id: '1', type: 'real_verify', points: 20, desc: '+20 完成实名认证', createdAt: '2024-01-15 10:30', balance: 120 },
    { id: '2', type: 'publish_idle', points: 5, desc: '+5 发布闲置物品', createdAt: '2024-01-14 15:20', balance: 100 },
    { id: '3', type: 'daily_login', points: 1, desc: '+1 每日登录', createdAt: '2024-01-14 08:00', balance: 95 },
    { id: '4', type: 'complete_transaction', points: 10, desc: '+10 完成交易', createdAt: '2024-01-13 18:30', balance: 94 },
    { id: '5', type: 'receive_review', points: 2, desc: '+2 获得好评', createdAt: '2024-01-13 18:25', balance: 84 },
    { id: '6', type: 'perfect_profile', points: 10, desc: '+10 完善个人资料', createdAt: '2024-01-12 09:00', balance: 82 },
    { id: '7', type: 'daily_login', points: 1, desc: '+1 每日登录', createdAt: '2024-01-12 08:05', balance: 72 },
  ]
  return records
}

// 等级进度条配置
export function getLevelProgressConfig(level: keyof typeof LEVEL_CONFIG) {
  const configs = {
    newbie: { color: '#999', bgColor: '#f0f0f0', text: '新锐' },
    excellent: { color: '#1677ff', bgColor: '#e6f4ff', text: '优秀' },
    elite: { color: '#faad14', bgColor: '#fffbe6', text: '精英' },
  }
  return configs[level]
}
