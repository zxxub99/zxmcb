import { useState, useEffect } from 'react'
import { Tabs } from 'antd-mobile'
import { api } from '../services/api'
import styles from './SquarePage.module.css'

interface Post {
  id: number
  user_id: number
  title: string
  description: string
  category: string
  created_at: string
}

export default function SquarePage() {
  const [idleItems, setIdleItems] = useState<Post[]>([])
  const [helpRequests, setHelpRequests] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('idle')

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

  const getCategoryName = (category: string) => {
    const map: Record<string, string> = {
      'furniture': '家具',
      'appliance': '家电',
      'digital': '数码',
      'baby': '母婴',
      'life': '生活用品',
      'repair': '维修帮扶',
      'consult': '咨询解答',
      'errand': '事务劳办',
      'tech': '技术帮扶',
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
          <div className={styles.list}>
            {loading ? (
              <div className={styles.loading}>加载中...</div>
            ) : idleItems.length > 0 ? (
              idleItems.map(item => (
                <div key={item.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.title}>{item.title}</span>
                    <span className={styles.tag}>{getCategoryName(item.category)}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <p>{item.description || '暂无描述'}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.empty}>暂无闲置物品</div>
            )}
          </div>
        </Tabs.Tab>
        <Tabs.Tab title="互助需求" key="help">
          <div className={styles.list}>
            {loading ? (
              <div className={styles.loading}>加载中...</div>
            ) : helpRequests.length > 0 ? (
              helpRequests.map(req => (
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
