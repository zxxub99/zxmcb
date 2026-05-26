// 初始化100个模拟用户账号
const users = [];
const areas = ['郢中街道', '文集镇', '冷水镇', '石牌镇', '磷矿镇', '旧口镇', '柴湖镇', '长滩镇', '东桥镇', '客店镇'];
const genders = ['male', 'female'];
const interests = ['旅游', '美食', '运动', '音乐', '阅读', '摄影', '游戏', '养宠物', '健身', '园艺'];

for (let i = 1; i <= 100; i++) {
  const gender = genders[i % 2];
  const userInterests = [];
  for (let j = 0; j < 3; j++) {
    const interest = interests[(i + j) % interests.length];
    if (!userInterests.includes(interest)) userInterests.push(interest);
  }

  users.push({
    id: 'user_' + i.toString().padStart(3, '0'),
    phone: '13' + (3 + (i % 7)).toString() + Math.floor(10000000 + Math.random() * 90000000).toString(),
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
  });
}

localStorage.setItem('mochoubang_users', JSON.stringify(users));
console.log('已初始化100个用户账号');

// 创建一些初始消息
const currentUser = JSON.parse(localStorage.getItem('mochoubang_current_user') || '{}');
if (currentUser.id) {
  const messages = [];
  for (let i = 1; i <= 10; i++) {
    if (i % 3 !== 0) { // 排除当前用户
      messages.push({
        id: 'msg_' + Date.now() + '_' + i,
        senderId: 'user_' + i.toString().padStart(3, '0'),
        receiverId: currentUser.id,
        content: '你好！很高兴认识你！',
        type: 'text',
        status: 'read',
        createdAt: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString()
      });
    }
  }
  const existingMessages = JSON.parse(localStorage.getItem('mochoubang_messages') || '[]');
  localStorage.setItem('mochoubang_messages', JSON.stringify([...existingMessages, ...messages]));
  console.log('已初始化消息记录');
}

// 创建一些初始收藏
if (currentUser.id) {
  const favorites = [];
  for (let i = 1; i <= 5; i++) {
    favorites.push({
      id: 'fav_' + i,
      userId: currentUser.id,
      itemId: 'idle_' + i.toString().padStart(3, '0'),
      itemType: 'idle',
      createdAt: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString()
    });
  }
  localStorage.setItem('mochoubang_favorites', JSON.stringify(favorites));
  console.log('已初始化收藏记录');
}

// 创建一些初始闲置物品
const idleItems = [];
const categories = ['数码产品', '家居用品', '图书音像', '母婴用品', '服装鞋帽', '其他'];
const conditions = ['全新', '几乎全新', '轻微使用', '正常使用', '有瑕疵'];
const statuses = ['available', 'reserved', 'traded'];

for (let i = 1; i <= 50; i++) {
  idleItems.push({
    id: 'idle_' + i.toString().padStart(3, '0'),
    userId: 'user_' + ((i % 100) + 1).toString().padStart(3, '0'),
    title: ['转让九成新iPad', '闲置微波炉转让', '二手自行车出售', '儿童安全座椅转让', '全新未拆封耳机'][i % 5],
    description: '物品描述信息，详情请联系我...',
    category: categories[i % categories.length],
    condition: conditions[i % conditions.length],
    price: 50 + (i * 20),
    exchangeType: i % 2 === 0 ? 'sell' : 'exchange',
    images: [
      'https://picsum.photos/400/300?random=' + i,
      'https://picsum.photos/400/300?random=' + (i + 100)
    ],
    location: areas[i % areas.length],
    viewCount: Math.floor(Math.random() * 500),
    favoriteCount: Math.floor(Math.random() * 50),
    status: statuses[i % statuses.length],
    createdAt: new Date(Date.now() - Math.random() * 86400000 * 60).toISOString(),
    updatedAt: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString()
  });
}
localStorage.setItem('mochoubang_idle_items', JSON.stringify(idleItems));
console.log('已初始化50个闲置物品');

// 创建一些初始互助请求
const helpRequests = [];
const helpTypes = ['维修', '咨询', '跑腿', '技术'];
const urgentLevels = ['normal', 'urgent'];

for (let i = 1; i <= 30; i++) {
  helpRequests.push({
    id: 'help_' + i.toString().padStart(3, '0'),
    userId: 'user_' + ((i % 100) + 1).toString().padStart(3, '0'),
    type: helpTypes[i % helpTypes.length],
    title: ['家电维修求助', '法律咨询需求', '代购跑腿服务', '电脑技术支援'][i % 4],
    description: '求助详情描述，请有能力的朋友帮忙...',
    urgentLevel: urgentLevels[i % 2],
    reward: 20 + (i * 5),
    location: areas[i % areas.length],
    status: i % 5 === 0 ? 'completed' : 'open',
    applications: [],
    createdAt: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString(),
    updatedAt: new Date(Date.now() - Math.random() * 86400000 * 3).toISOString()
  });
}
localStorage.setItem('mochoubang_help_requests', JSON.stringify(helpRequests));
console.log('已初始化30个互助请求');

alert('系统数据初始化完成！\n\n测试账号：\n手机号：任意已存在的用户手机号\n密码：123456\n\n前10个用户手机号：13312345678 ~ 13312345687');
