import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';

// 模拟收藏数据
const mockFavorites = [
  { id: 1, title: '明显陵景区', type: '景点', cover: '🏛️' },
  { id: 2, title: '莫愁村民宿', type: '民宿', cover: '🏡' },
  { id: 3, title: '石牌手工米茶', type: '特产', cover: '🍵' },
];

// 模拟发布数据
const mockPosts = [
  { id: 1, title: '钟祥旅游攻略分享', type: '游记', time: '2024-01-12', views: 256 },
  { id: 2, title: '转让九曲公园年卡', type: '二手', time: '2024-01-08', views: 89 },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 模拟从localStorage获取用户信息
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // 未登录，跳转到登录页
      navigate('/login');
    }
  }, [navigate]);

  // 退出登录
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  if (!user) {
    return <div className={styles.loading}>加载中...</div>;
  }

  // 统计
  const stats = [
    { label: '我的收藏', value: mockFavorites.length, icon: '⭐' },
    { label: '我的发布', value: mockPosts.length, icon: '📝' },
    { label: '浏览记录', value: 128, icon: '👁️' },
  ];

  return (
    <div className={styles.container}>
      {/* 用户信息卡片 */}
      <div className={styles.userCard}>
        <div className={styles.userBg}></div>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {user.avatar ? (
              <img src={user.avatar} alt="头像" />
            ) : (
              <span>{user.nickname?.[0] || '游'}</span>
            )}
          </div>
          <div className={styles.userDetail}>
            <h2 className={styles.nickname}>{user.nickname || '钟祥游客'}</h2>
            <p className={styles.phone}>{user.phone?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</p>
          </div>
          <button className={styles.editBtn} onClick={() => navigate('/login')}>
            编辑资料
          </button>
        </div>

        {/* 统计区域 */}
        <div className={styles.statsRow}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <span className={styles.statIcon}>{stat.icon}</span>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 订单快捷入口 */}
      <div className={styles.orderSection}>
        <div className={styles.sectionHeader}>
          <h3>我的订单</h3>
          <button className={styles.moreBtn}>
            全部订单 →
          </button>
        </div>
        <div className={styles.orderQuickNav}>
          {[
            { icon: '💳', label: '待付款' },
            { icon: '📦', label: '待发货' },
            { icon: '🚚', label: '待收货' },
            { icon: '⭐', label: '待评价' },
          ].map((item, index) => (
            <button key={index} className={styles.orderNavItem}>
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 功能菜单 */}
      <div className={styles.menuSection}>
        {[
          {
            icon: '💰',
            title: '我的钱包',
            desc: '余额、优惠券',
            onClick: () => {},
          },
          {
            icon: '📍',
            title: '收货地址',
            desc: '管理收货信息',
            onClick: () => {},
          },
          {
            icon: '🏪',
            title: '商家入驻',
            desc: '成为入驻商家',
            badge: 'NEW',
            onClick: () => navigate('/specialty'),
          },
          {
            icon: '❓',
            title: '帮助与反馈',
            desc: '联系客服、常见问题',
            onClick: () => {},
          },
          {
            icon: '📖',
            title: '用户协议',
            desc: '平台规则说明',
            onClick: () => navigate('/rules'),
          },
          {
            icon: '🔔',
            title: '消息通知',
            desc: '订单、互动消息',
            onClick: () => {},
          },
        ].map((item, index) => (
          <button key={index} className={styles.menuItem} onClick={item.onClick}>
            <span className={styles.menuIcon}>{item.icon}</span>
            <div className={styles.menuContent}>
              <span className={styles.menuTitle}>
                {item.title}
                {item.badge && <span className={styles.badge}>{item.badge}</span>}
              </span>
              <span className={styles.menuDesc}>{item.desc}</span>
            </div>
            <span className={styles.menuArrow}>›</span>
          </button>
        ))}
      </div>

      {/* 底部退出登录 */}
      <button className={styles.logoutBtn} onClick={handleLogout}>
        退出登录
      </button>

      {/* 底部安全提示 */}
      <p className={styles.safeTip}>
        🔒 账户安全 · 钟祥莫愁帮
      </p>
    </div>
  );
}
