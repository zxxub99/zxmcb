import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card,
  List,
  NavBar,
  TabBar,
  Grid,
  ProgressBar,
  Toast,
  SpinLoading
} from 'antd-mobile';
import {
  AppOutline,
  UnorderedListOutline,
  UserOutline,
  SetOutline,
  ClockCircleOutline,
  LocationOutline,
  MessageOutline,
  EyeOutline,
  StarOutline,
  LikeOutline,
  ExclamationCircleOutline,
  GiftOutline
} from 'antd-mobile-icons';
import styles from './Dashboard.module.css';

interface StatItem {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

interface ActivityItem {
  id: string;
  type: 'idle' | 'help' | 'chat';
  title: string;
  time: string;
  status: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [loading] = useState(false);

  // 用户数据
  const userStats = {
    posts: 12,
    helps: 5,
    deals: 8,
    followers: 23,
    following: 45,
    favorites: 15
  };

  // 积分等级数据
  const creditLevel = {
    level: 3,
    title: '热心帮友',
    points: 1250,
    nextLevelPoints: 2000,
    progress: 62.5
  };

  // 统计卡片数据
  const stats: StatItem[] = [
    { title: '发布闲置', value: userStats.posts, icon: <GiftOutline />, color: '#ff6b6b' },
    { title: '互助次数', value: userStats.helps, icon: <LikeOutline />, color: '#4ecdc4' },
    { title: '交易成功', value: userStats.deals, icon: <ExclamationCircleOutline />, color: '#ffe66d' },
    { title: '被关注', value: userStats.followers, icon: <StarOutline />, color: '#95e1d3' }
  ];

  // 近7日活动数据（模拟）
  const weeklyActivity = [
    { day: '周一', posts: 2, helps: 1, chats: 5 },
    { day: '周二', posts: 1, helps: 0, chats: 3 },
    { day: '周三', posts: 3, helps: 2, chats: 7 },
    { day: '周四', posts: 0, helps: 1, chats: 4 },
    { day: '周五', posts: 2, helps: 0, chats: 6 },
    { day: '周六', posts: 4, helps: 1, chats: 8 },
    { day: '周日', posts: 1, helps: 2, chats: 5 }
  ];

  // 最大值用于计算柱状图高度
  const maxActivity = Math.max(...weeklyActivity.map(d => Math.max(d.posts, d.helps, d.chats)));

  // 最近动态
  const recentActivities: ActivityItem[] = [
    { id: '1', type: 'idle', title: '发布了"九成新自行车"', time: '2小时前', status: '待交易' },
    { id: '2', type: 'help', title: '帮助"张阿姨"维修水管', time: '昨天', status: '已完成' },
    { id: '3', type: 'chat', title: '与"李大哥"聊起闲置交易', time: '昨天', status: '进行中' },
    { id: '4', type: 'idle', title: '发布了"搬家转让家电"', time: '3天前', status: '已完成' }
  ];

  // 获取动态图标
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'idle': return <GiftOutline style={{ color: '#ff6b6b' }} />;
      case 'help': return <LikeOutline style={{ color: '#4ecdc4' }} />;
      case 'chat': return <MessageOutline style={{ color: '#95e1d3' }} />;
      default: return null;
    }
  };

  // 底部导航
  const bottomNav = [
    { key: 'home', title: '首页', icon: <AppOutline />, onClick: () => navigate('/') },
    { key: 'nearby', title: '附近', icon: <LocationOutline />, onClick: () => navigate('/nearby') },
    { key: 'square', title: '广场', icon: <UnorderedListOutline />, onClick: () => navigate('/square') },
    { key: 'message', title: '消息', icon: <MessageOutline />, onClick: () => navigate('/message') },
    { key: 'my', title: '我的', icon: <UserOutline />, onClick: () => navigate('/my') }
  ];

  return (
    <div className={styles.container}>
      <NavBar 
        back={null}
        left={<span className={styles.logo}>钟祥莫愁帮</span>}
        right={
          <SetOutline 
            className={styles.settingsIcon} 
            onClick={() => navigate('/settings')} 
          />
        }
      >
        数据看板
      </NavBar>

      {loading ? (
        <div className={styles.loading}>
          <SpinLoading />
        </div>
      ) : (
        <div className={styles.content}>
          {/* 积分等级卡片 */}
          <Card className={styles.levelCard}>
            <div className={styles.levelHeader}>
              <div className={styles.levelInfo}>
                <div className={styles.levelBadge}>Lv.{creditLevel.level}</div>
                <div className={styles.levelTitle}>{creditLevel.title}</div>
              </div>
              <div className={styles.levelPoints}>
                {creditLevel.points} 积分
              </div>
            </div>
            <div className={styles.levelProgress}>
              <ProgressBar 
                percent={creditLevel.progress} 
              />
              <div className={styles.levelText}>
                距离 {creditLevel.nextLevelPoints} 积分还有 {creditLevel.nextLevelPoints - creditLevel.points} 分
              </div>
            </div>
          </Card>

          {/* 统计卡片 */}
          <Grid columns={2} className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <Grid.Item key={index}>
                <Card className={styles.statCard}>
                  <div className={styles.statIcon} style={{ backgroundColor: stat.color + '20' }}>
                    {stat.icon}
                  </div>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statTitle}>{stat.title}</div>
                </Card>
              </Grid.Item>
            ))}
          </Grid>

          {/* 近7日活跃 */}
          <Card className={styles.activityCard}>
            <div className={styles.cardTitle}>近7日活跃</div>
            <div className={styles.activityChart}>
              {weeklyActivity.map((day, index) => (
                <div key={index} className={styles.dayColumn}>
                  <div className={styles.barsContainer}>
                    <div 
                      className={styles.bar} 
                      style={{ 
                        height: `${(day.posts / maxActivity) * 60}px`,
                        backgroundColor: '#ff6b6b'
                      }}
                      title={`发布: ${day.posts}`}
                    />
                    <div 
                      className={styles.bar} 
                      style={{ 
                        height: `${(day.helps / maxActivity) * 60}px`,
                        backgroundColor: '#4ecdc4'
                      }}
                      title={`互助: ${day.helps}`}
                    />
                    <div 
                      className={styles.bar} 
                      style={{ 
                        height: `${(day.chats / maxActivity) * 60}px`,
                        backgroundColor: '#95e1d3'
                      }}
                      title={`聊天: ${day.chats}`}
                    />
                  </div>
                  <div className={styles.dayLabel}>{day.day}</div>
                </div>
              ))}
            </div>
            <div className={styles.chartLegend}>
              <div className={styles.legendItem}>
                <div className={styles.legendDot} style={{ backgroundColor: '#ff6b6b' }} />
                <span>发布闲置</span>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.legendDot} style={{ backgroundColor: '#4ecdc4' }} />
                <span>互助</span>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.legendDot} style={{ backgroundColor: '#95e1d3' }} />
                <span>聊天</span>
              </div>
            </div>
          </Card>

          {/* 最近动态 */}
          <Card className={styles.activityList}>
            <div className={styles.cardTitle}>最近动态</div>
            <List>
              {recentActivities.map((activity) => (
                <List.Item
                  key={activity.id}
                  prefix={getActivityIcon(activity.type)}
                  extra={activity.status}
                  onClick={() => {
                    if (activity.type === 'idle') {
                      Toast.show('跳转到闲置详情');
                    } else if (activity.type === 'help') {
                      Toast.show('跳转到互助详情');
                    } else {
                      Toast.show('跳转到聊天');
                    }
                  }}
                >
                  <div className={styles.activityItem}>
                    <div className={styles.activityTitle}>{activity.title}</div>
                    <div className={styles.activityTime}>
                      <ClockCircleOutline /> {activity.time}
                    </div>
                  </div>
                </List.Item>
              ))}
            </List>
          </Card>

          {/* 数据说明 */}
          <Card className={styles.infoCard}>
            <div className={styles.cardTitle}>数据说明</div>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <EyeOutline className={styles.infoIcon} />
                <span>浏览量代表你的帖子被查看次数</span>
              </div>
              <div className={styles.infoItem}>
                <StarOutline className={styles.infoIcon} />
                <span>信用星级影响匹配优先级和曝光</span>
              </div>
              <div className={styles.infoItem}>
                <LikeOutline className={styles.infoIcon} />
                <span>帮助他人可获得积分奖励</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 底部导航 */}
      <TabBar activeKey={selectedTab} onChange={setSelectedTab} className={styles.tabBar}>
        {bottomNav.map(item => (
          <TabBar.Item
            key={item.key}
            icon={item.icon}
            title={item.title}
            onClick={item.onClick}
          />
        ))}
      </TabBar>
    </div>
  );
};

export default Dashboard;
