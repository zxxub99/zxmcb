import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// 初始化模拟数据
const initMockData = () => {
  // 检查是否已有数据
  const existingData = localStorage.getItem('mochoubang_initialized')
  if (existingData) return

  // 用户数据
  const users = []
  const areas = ['郢中街道', '文集镇', '冷水镇', '石牌镇', '磷矿镇', '旧口镇', '柴湖镇', '长滩镇', '东桥镇', '客店镇']
  const genders = ['male', 'female']
  const interests = ['旅游', '美食', '运动', '音乐', '阅读', '摄影', '游戏', '养宠物', '健身', '园艺']

  for (let i = 1; i <= 100; i++) {
    const gender = genders[i % 2] as 'male' | 'female'
    const userInterests: string[] = []
    for (let j = 0; j < 3; j++) {
      const interest = interests[(i + j) % interests.length]
      if (!userInterests.includes(interest)) userInterests.push(interest)
    }
    
    users.push({
      id: 'user_' + i.toString().padStart(3, '0'),
      phone: '1' + (3 + (i % 7)).toString() + Math.floor(10000000 + Math.random() * 90000000).toString(),
      nickname: '钟祥用户' + i.toString().padStart(3, '0'),
      password: '123456',
      gender: gender,
      age: 18 + (i % 50),
      avatar: gender === 'male' 
        ? 'https://api.dicebear.com/7.x/avataaars/svg?seed=male' + i 
        : 'https://api.dicebear.com/7.x/avataaars/svg?seed=female' + i,
      location: areas[i % areas.length],
      bio: '我是来自' + areas[i % areas.length] + '的居民，很高兴认识大家！',
      interests: userInterests,
      creditLevel: Math.floor(1 + (i % 5)),
      points: 50 + (i * 10),
      isVerified: i % 3 === 0,
      registeredAt: new Date(2024, 0, 1 + (i % 365)).toISOString(),
      lastActive: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString()
    })
  }

  // 闲置物品数据
  const idleItems = []
  const categories = ['数码产品', '家居用品', '图书音像', '服装鞋帽', '母婴用品', '美妆护肤', '运动户外', '其他']
  const conditions = ['全新', '几乎全新', '轻微使用', '正常使用']
  const itemNames = [
    '九成新iPad', '小米手机', '华为平板', '二手笔记本', '家用烤箱',
    '微波炉', '电饭煲', '洗衣机', '冰箱', '空调扇',
    '儿童自行车', '婴儿推车', '儿童玩具', '课外读物', '小说合集',
    '运动鞋', '女装外套', '男士衬衫', '牛仔裤', '连衣裙'
  ]
  
  for (let i = 1; i <= 50; i++) {
    const seller = users[i % users.length]
    idleItems.push({
      id: 'idle_' + i.toString().padStart(3, '0'),
      title: itemNames[i % itemNames.length] + (i > itemNames.length ? ' ' + Math.ceil(i / itemNames.length) : ''),
      description: '物品保存完好，功能正常，因闲置不用现低价转让，有意者请联系我。',
      price: Math.floor(Math.random() * 500) + 10,
      category: categories[i % categories.length],
      condition: conditions[i % conditions.length],
      images: ['https://picsum.photos/seed/' + i + '/400/400'],
      sellerId: seller.id,
      sellerName: seller.nickname,
      sellerAvatar: seller.avatar,
      sellerLevel: seller.creditLevel,
      location: seller.location,
      viewCount: Math.floor(Math.random() * 100),
      favoriteCount: Math.floor(Math.random() * 20),
      exchangeMethod: i % 2 === 0 ? '仅同城自提' : '可邮寄',
      createdAt: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString(),
      status: 'available'
    })
  }

  // 互助请求数据
  const helpRequests = []
  const helpTypes = ['维修帮助', '咨询解答', '事务代办', '技术协助']
  const helpTitles = [
    '家里水龙头漏水需要维修', '想咨询一下社保问题', '帮忙代取快递',
    '电脑系统重装', '帮忙搬运家具', '疏通下水道',
    '照顾老人', '辅导孩子作业', '帮忙搬家', '安装家具'
  ]
  
  for (let i = 1; i <= 30; i++) {
    const requester = users[(i + 50) % users.length]
    helpRequests.push({
      id: 'help_' + i.toString().padStart(3, '0'),
      title: helpTitles[i % helpTitles.length],
      description: '急需帮助，具体情况可以详谈，有报酬。',
      type: helpTypes[i % helpTypes.length],
      urgent: i % 4 === 0,
      reward: Math.floor(Math.random() * 100) + 20,
      location: requester.location,
      requesterId: requester.id,
      requesterName: requester.nickname,
      requesterAvatar: requester.avatar,
      requesterLevel: requester.creditLevel,
      viewCount: Math.floor(Math.random() * 50),
      responseCount: Math.floor(Math.random() * 10),
      createdAt: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
      status: 'open'
    })
  }

  // 保存到localStorage
  localStorage.setItem('mochoubang_users', JSON.stringify(users))
  localStorage.setItem('mochoubang_idle_items', JSON.stringify(idleItems))
  localStorage.setItem('mochoubang_help_requests', JSON.stringify(helpRequests))
  localStorage.setItem('mochoubang_initialized', 'true')
  console.log('钟祥莫愁帮模拟数据初始化完成，共 ' + users.length + ' 个用户')
}

// 启动应用
initMockData()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
