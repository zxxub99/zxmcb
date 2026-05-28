import { useState, useEffect } from 'react'
import { Tabs, SearchBar } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import styles from './SquarePage.module.css'

interface Post {
  id: number
  user_id: number
  title: string
  description: string
  category: string
  price?: string
  status?: string
  created_at: string
}

// 闲置物品分类
const idleCategories = [
  { key: 'all', label: '全部' },
  { key: 'furniture', label: '家具' },
  { key: 'appliance', label: '家电' },
  { key: 'digital', label: '数码' },
  { key: 'baby', label: '母婴' },
  { key: 'books', label: '图书' },
  { key: 'sports', label: '运动' },
  { key: 'clothing', label: '服饰' },
]

// 互助需求分类
const helpCategories = [
  { key: 'all', label: '全部' },
  { key: 'repair', label: '维修帮扶' },
  { key: 'consult', label: '咨询解答' },
  { key: 'errand', label: '事务劳办' },
  { key: 'tech', label: '技术帮扶' },
  { key: 'care', label: '关爱陪护' },
]

export default function SquarePage() {
  const navigate = useNavigate()
  const [idleItems, setIdleItems] = useState<Post[]>([])
  const [helpRequests, setHelpRequests] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('idle')
  const [idleCategory, setIdleCategory] = useState('all')
  const [helpCategory, setHelpCategory] = useState('all')
  const [idleSearch, setIdleSearch] = useState('')
  const [helpSearch, setHelpSearch] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [idleData, helpData]: [any, any] = await Promise.all([
        api.getIdleItems(),
        api.getHelpRequests(),
      ])
      setIdleItems(idleData || [])
      setHelpRequests(helpData || [])
    } catch (error) {
      console.error('加载数据失败', error)
    } finally {
      setLoading(false)
    }
  }

  // 筛选闲置物品
  const filteredIdleItems = idleItems.filter(item => {
    const matchCategory = idleCategory === 'all' || item.category === idleCategory
    const matchSearch = !idleSearch || 
      item.title.includes(idleSearch) || 
      item.description?.includes(idleSearch)
    return matchCategory && matchSearch
  })

  // 筛选互助需求
  const filteredHelpRequests = helpRequests.filter(req => {
    const matchCategory = helpCategory === 'all' || req.category === helpCategory
    const matchSearch = !helpSearch || 
      req.title.includes(helpSearch) || 
      req.description?.includes(helpSearch)
    return matchCategory && matchSearch
  })

  const getCategoryName = (category: string) => {
    const map: Record<string, string> = {
      'furniture': '家具',
      'appliance': '家电',
      'digital': '数码',
      'baby': '母婴',
      'books': '图书',
      'sports': '运动',
      'clothing': '服饰',
      'life': '生活用品',
      'repair': '维修帮扶',
      'consult': '咨询解答',
      'errand': '事务劳办',
      'tech': '技术帮扶',
      'care': '关爱陪护',
    }
    return map[category] || category
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>同城广场</h2>
        <span className={styles.subtitle}>发现身边的闲置好物和互助需求</span>
      </div>

      <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
        <Tabs.Tab title="闲置好物" key="idle">
          <div className={styles.searchBar}>
            <SearchBar
              placeholder="搜索闲置物品..."
              value={idleSearch}
              onChange={setIdleSearch}
            />
          </div>
          <div className={styles.categoryTabs}>
            {idleCategories.map(cat => (
              <button
                key={cat.key}
                className={`${styles.categoryBtn} ${idleCategory === cat.key ? styles.active : ''}`}
                onClick={() => setIdleCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div 
            className={styles.publishBtn}
            onClick={() => navigate('/publish-idle')}
          >
            + 发布闲置
          </div>
          <div className={styles.list}>
            {loading ? (
              <div className={styles.loading}>加载中...</div>
            ) : filteredIdleItems.length > 0 ? (
              filteredIdleItems.map(item => (
                <div key={item.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.title}>{item.title}</span>
                    <span className={styles.tag}>{getCategoryName(item.category)}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <p>{item.description || '暂无描述'}</p>
                    {item.price && (
                      <span className={styles.price}>{item.price}</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.empty}>暂无闲置物品</div>
            )}
          </div>
        </Tabs.Tab>
        <Tabs.Tab title="互助需求" key="help">
          <div className={styles.searchBar}>
            <SearchBar
              placeholder="搜索互助需求..."
              value={helpSearch}
              onChange={setHelpSearch}
            />
          </div>
          <div className={styles.categoryTabs}>
            {helpCategories.map(cat => (
              <button
                key={cat.key}
                className={`${styles.categoryBtn} ${helpCategory === cat.key ? styles.active : ''}`}
                onClick={() => setHelpCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div 
            className={styles.publishBtn}
            onClick={() => navigate('/publish-help')}
          >
            + 发布求助
          </div>
          <div className={styles.list}>
            {loading ? (
              <div className={styles.loading}>加载中...</div>
            ) : filteredHelpRequests.length > 0 ? (
              filteredHelpRequests.map(req => (
                <div key={req.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.title}>{req.title}</span>
                    <span className={styles.tag}>{getCategoryName(req.category)}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <p>{req.description || '暂无描述'}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.empty}>暂无互助需求</div>
            )}
          </div>
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}
