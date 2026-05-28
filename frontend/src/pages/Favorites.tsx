import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Tabs,
  Card,
  Empty,
  Toast,
  Dialog,
  Image,
  Badge,
  SwipeAction
} from 'antd-mobile';
import {
  LikeOutline,
  ClockCircleOutline,
  LocationOutline,
  DeleteOutline,
  MessageOutline,
  GiftOutline
} from 'antd-mobile-icons';
import styles from './Favorites.module.css';

interface FavoriteItem {
  id: string;
  type: 'idle' | 'help';
  title: string;
  description: string;
  price?: string;
  location: string;
  time: string;
  image?: string;
  user: {
    name: string;
    avatar: string;
  };
}

const Favorites = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('idle');

  // 收藏的闲置物品
  const idleFavorites: FavoriteItem[] = [
    {
      id: '1',
      type: 'idle',
      title: '九成新自行车转让',
      description: '品牌自行车，保养良好，因搬家低价转让',
      price: '¥280',
      location: '2.3km',
      time: '2小时前',
      image: 'https://picsum.photos/200/200?random=10',
      user: { name: '王大哥', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wang' }
    },
    {
      id: '2',
      type: 'idle',
      title: '二手显示器27寸',
      description: 'dell显示器，ips面板，显示效果优秀',
      price: '¥450',
      location: '1.8km',
      time: '昨天',
      image: 'https://picsum.photos/200/200?random=11',
      user: { name: '李师傅', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=li' }
    }
  ];

  // 收藏的互助请求
  const helpFavorites: FavoriteItem[] = [
    {
      id: '3',
      type: 'help',
      title: '急需：家电维修师傅',
      description: '空调不制冷，需要专业师傅上门维修',
      location: '1.5km',
      time: '30分钟前',
      user: { name: '张阿姨', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhang' }
    },
    {
      id: '4',
      type: 'help',
      title: '求助：搬家帮手',
      description: '明天需要2-3人帮忙搬家，有酬劳',
      location: '3.2km',
      time: '昨天',
      user: { name: '陈先生', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chen' }
    }
  ];

  const currentFavorites = activeTab === 'idle' ? idleFavorites : helpFavorites;

  const handleUnfavorite = (_id: string) => {
    Dialog.confirm({
      title: '取消收藏',
      content: '确定要取消收藏吗？',
      confirmText: '确定',
      onConfirm: () => {
        Toast.show({
          content: '已取消收藏',
          icon: 'success'
        });
      }
    });
  };

  const handleContact = (userId: string) => {
    navigate(`/chat/${userId}`);
  };

  const renderFavoriteCard = (item: FavoriteItem) => (
    <SwipeAction
      key={item.id}
      rightActions={[
        {
          key: 'delete',
          text: '取消收藏',
          color: 'danger',
          onClick: () => handleUnfavorite(item.id)
        }
      ]}
    >
      <Card 
        className={styles.favoriteCard}
        onClick={() => navigate(item.type === 'idle' ? `/idle/${item.id}` : `/help/${item.id}`)}
      >
        <div className={styles.cardContent}>
          {item.image && (
            <Image 
              src={item.image} 
              className={styles.cardImage}
              fit="cover"
            />
          )}
          <div className={styles.cardInfo}>
            <div className={styles.cardHeader}>
              <Badge 
                color={item.type === 'idle' ? '#ff6b6b' : '#4ecdc4'}
                content={item.type === 'idle' ? '闲置' : '互助'}
              />
              {item.price && (
                <span className={styles.cardPrice}>{item.price}</span>
              )}
            </div>
            <div className={styles.cardTitle}>{item.title}</div>
            <div className={styles.cardDesc}>{item.description}</div>
            <div className={styles.cardMeta}>
              <span className={styles.cardUser}>
                <img src={item.user.avatar} alt="" className={styles.userAvatar} />
                {item.user.name}
              </span>
              <span className={styles.cardMetaRight}>
                <span><LocationOutline /> {item.location}</span>
                <span><ClockCircleOutline /> {item.time}</span>
              </span>
            </div>
          </div>
        </div>
        <div className={styles.cardActions}>
          <button 
            className={styles.actionBtn}
            onClick={(e) => {
              e.stopPropagation();
              handleContact(item.user.name);
            }}
          >
            <MessageOutline /> 联系
          </button>
          <button 
            className={styles.actionBtn}
            onClick={(e) => {
              e.stopPropagation();
              handleUnfavorite(item.id);
            }}
          >
            <DeleteOutline /> 取消
          </button>
        </div>
      </Card>
    </SwipeAction>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.backBtn} onClick={() => navigate(-1)}>返回</span>
        <span className={styles.title}>我的收藏</span>
        <span className={styles.editBtn} onClick={() => Toast.show('批量管理')}>管理</span>
      </div>

      <div className={styles.content}>
        <Tabs 
          activeKey={activeTab} 
          onChange={(key) => setActiveTab(key)}
          className={styles.tabs}
        >
          <Tabs.Tab 
            title={
              <span className={styles.tabTitle}>
                <GiftOutline /> 
                闲置收藏 ({idleFavorites.length})
              </span>
            } 
            key="idle" 
          />
          <Tabs.Tab 
            title={
              <span className={styles.tabTitle}>
                <LikeOutline /> 
                互助收藏 ({helpFavorites.length})
              </span>
            } 
            key="help" 
          />
        </Tabs>

        <div className={styles.listSection}>
          {currentFavorites.length === 0 ? (
            <div className={styles.emptyState}>
              <Empty 
                description={
                  activeTab === 'idle' 
                    ? '暂无收藏的闲置物品' 
                    : '暂无收藏的互助请求'
                }
              />
              <button 
                className={styles.goExplore}
                onClick={() => navigate('/square')}
              >
                去广场逛逛
              </button>
            </div>
          ) : (
            <div className={styles.favoriteList}>
              {currentFavorites.map(renderFavoriteCard)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
