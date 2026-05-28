import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  SearchBar,
  Tabs,
  Card,
  Avatar,
  Empty,
  Toast,
  Badge,
  Image
} from 'antd-mobile';
import {
  FilterOutline,
  LikeOutline,
  UserOutline,
  ClockCircleOutline,
  LocationOutline,
  GiftOutline
} from 'antd-mobile-icons';
import styles from './Search.module.css';

interface SearchResult {
  id: string;
  type: 'idle' | 'help' | 'user';
  title: string;
  description?: string;
  price?: string;
  distance?: string;
  time?: string;
  location?: string;
  user?: {
    name: string;
    avatar: string;
    level?: number;
  };
  image?: string;
}

const Search = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [hasSearched, setHasSearched] = useState(false);

  // 搜索历史
  const [history] = useState(['自行车', '维修', '搬家', '李阿姨']);

  // 热门搜索
  const hotSearch = [
    { tag: '自行车', count: 234 },
    { tag: '家电维修', count: 189 },
    { tag: '搬家服务', count: 156 },
    { tag: '二手电脑', count: 123 },
    { tag: '水管维修', count: 98 },
    { tag: '家具转让', count: 87 }
  ];

  // 模拟搜索结果
  const searchResults: SearchResult[] = [
    {
      id: '1',
      type: 'idle',
      title: '九成新自行车转让',
      description: '品牌自行车，保养良好，因搬家低价转让',
      price: '¥280',
      time: '2小时前',
      location: '2.3km',
      user: { name: '王大哥', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wang', level: 3 },
      image: 'https://picsum.photos/200/200?random=1'
    },
    {
      id: '2',
      type: 'help',
      title: '急需：家电维修师傅',
      description: '空调不制冷，需要专业师傅上门维修',
      price: '¥100-200',
      time: '30分钟前',
      location: '1.5km',
      user: { name: '张阿姨', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhang', level: 2 }
    },
    {
      id: '3',
      type: 'user',
      title: '李大姐',
      description: '热爱互助，擅长家务整理',
      location: '3.2km',
      user: { name: '李大姐', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=li' }
    },
    {
      id: '4',
      type: 'idle',
      title: '搬家甩卖家具',
      description: '沙发、衣柜、书桌全套低价出',
      price: '面议',
      time: '昨天',
      location: '4.1km',
      user: { name: '陈先生', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chen', level: 4 },
      image: 'https://picsum.photos/200/200?random=2'
    }
  ];

  const handleSearch = (value: string) => {
    if (!value.trim()) {
      Toast.show('请输入搜索关键词');
      return;
    }
    setHasSearched(true);
  };

  const handleFilter = () => {
    Toast.show('跳转到筛选页面');
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'idle': return <GiftOutline style={{ color: '#ff6b6b' }} />;
      case 'help': return <LikeOutline style={{ color: '#4ecdc4' }} />;
      case 'user': return <UserOutline style={{ color: '#95e1d3' }} />;
      default: return null;
    }
  };

  const getResultTab = (type: string) => {
    switch (type) {
      case 'idle': return '闲置';
      case 'help': return '互助';
      case 'user': return '用户';
      default: return '';
    }
  };

  const filteredResults = activeTab === 'all' 
    ? searchResults 
    : searchResults.filter(item => item.type === activeTab);

  const renderHistory = () => (
    <div className={styles.historySection}>
      <div className={styles.sectionHeader}>
        <span>搜索历史</span>
        <span 
          className={styles.clearBtn}
          onClick={() => Toast.show('已清空历史记录')}
        >
          清空
        </span>
      </div>
      <div className={styles.historyTags}>
        {history.map((item, index) => (
          <span 
            key={index} 
            className={styles.historyTag}
            onClick={() => setSearchValue(item)}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );

  const renderHotSearch = () => (
    <div className={styles.hotSection}>
      <div className={styles.sectionHeader}>
        <span>热门搜索</span>
        <Badge color="#1677ff">实时更新</Badge>
      </div>
      <div className={styles.hotList}>
        {hotSearch.map((item, index) => (
          <div 
            key={index} 
            className={styles.hotItem}
            onClick={() => setSearchValue(item.tag)}
          >
            <span className={styles.hotRank}>{index + 1}</span>
            <span className={styles.hotTag}>{item.tag}</span>
            <span className={styles.hotCount}>{item.count}次</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSearchResults = () => (
    <div className={styles.resultsSection}>
      <Tabs 
        activeKey={activeTab} 
        onChange={(key) => setActiveTab(key)}
        className={styles.tabs}
      >
        <Tabs.Tab title="全部" key="all" />
        <Tabs.Tab title="闲置" key="idle" />
        <Tabs.Tab title="互助" key="help" />
        <Tabs.Tab title="用户" key="user" />
      </Tabs>

      {filteredResults.length === 0 ? (
        <Empty description="未找到相关结果" />
      ) : (
        <div className={styles.resultList}>
          {filteredResults.map((result) => (
            <Card 
              key={result.id}
              className={styles.resultCard}
              onClick={() => {
                if (result.type === 'idle') {
                  navigate(`/idle/${result.id}`);
                } else if (result.type === 'help') {
                  navigate(`/help/${result.id}`);
                } else {
                  navigate(`/user/${result.id}`);
                }
              }}
            >
              <div className={styles.resultContent}>
                {result.image && (
                  <Image 
                    src={result.image} 
                    className={styles.resultImage}
                    fit="cover"
                  />
                )}
                <div className={styles.resultInfo}>
                  <div className={styles.resultHeader}>
                    <span className={styles.resultType}>
                      {getResultIcon(result.type)}
                      {getResultTab(result.type)}
                    </span>
                    {result.price && (
                      <span className={styles.resultPrice}>{result.price}</span>
                    )}
                  </div>
                  <div className={styles.resultTitle}>{result.title}</div>
                  {result.description && (
                    <div className={styles.resultDesc}>{result.description}</div>
                  )}
                  <div className={styles.resultMeta}>
                    {result.user && (
                      <span className={styles.resultUser}>
                        <Avatar src={result.user.avatar} style={{ '--size': '16px' } as React.CSSProperties} />
                        {result.user.name}
                        {result.user.level && (
                          <Badge color="#ffd700" content={`Lv.${result.user.level}`} />
                        )}
                      </span>
                    )}
                    <span className={styles.resultMetaRight}>
                      {result.location && (
                        <span><LocationOutline /> {result.location}</span>
                      )}
                      {result.time && (
                        <span><ClockCircleOutline /> {result.time}</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <SearchBar
          placeholder="搜索闲置、互助、用户"
          value={searchValue}
          onChange={setSearchValue}
          onSearch={handleSearch}
          onClear={() => setHasSearched(false)}
          className={styles.searchBar}
        />
        <FilterOutline 
          className={styles.filterIcon}
          onClick={handleFilter}
        />
      </div>

      <div className={styles.content}>
        {!hasSearched ? (
          <>
            {renderHistory()}
            {renderHotSearch()}
          </>
        ) : (
          renderSearchResults()
        )}
      </div>
    </div>
  );
};

export default Search;
