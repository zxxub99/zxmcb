import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Tag, Toast } from 'antd-mobile'
import { api } from '../services/api'
import styles from './IdleItemDetail.module.css'

interface IdleItem {
  id: number
  user_id: number
  title: string
  description: string
  category: string
  price: number
  images: string[]
  exchange_enabled: boolean
  delivery_enabled: boolean
  status: string
  view_count: number
  favorite_count: number
  created_at: string
}

export default function IdleItemDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [item, setItem] = useState<IdleItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadItem()
  }, [id])

  const loadItem = async () => {
    if (!id) return
    try {
      const data: any = await api.getIdleItem(parseInt(id))
      // 解析images字符串
      if (data.images && typeof data.images === 'string') {
        data.images = JSON.parse(data.images)
      } else if (!Array.isArray(data.images)) {
        data.images = []
      }
      setItem(data)
    } catch (error) {
      console.error('加载失败', error)
      Toast.show({ content: '加载失败', duration: 2000 })
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
    }
    return map[category] || category
  }

  const handleContact = () => {
    if (!item) return
    // 跳转到聊天页面
    navigate(`/chat/${item.user_id}`)
  }

  if (loading) {
    return <div className={styles.container}><div className={styles.loading}>加载中...</div></div>
  }

  if (!item) {
    return <div className={styles.container}><div className={styles.empty}>物品不存在</div></div>
  }

  return (
    <div className={styles.container}>
      {/* 图片展示 */}
      <div className={styles.imageSection}>
        {item.images.length > 0 ? (
          <img src={item.images[0]} alt={item.title} className={styles.mainImage} />
        ) : (
          <div className={styles.noImage}>暂无图片</div>
        )}
      </div>

      {/* 价格和信息 */}
      <div className={styles.infoSection}>
        <div className={styles.priceRow}>
          <span className={styles.price}>
            {item.price === 0 ? '免费赠送' : `¥${item.price}`}
          </span>
          <Tag color="blue">{getCategoryName(item.category)}</Tag>
        </div>
        <h2 className={styles.title}>{item.title}</h2>
        <div className={styles.meta}>
          <span>浏览 {item.view_count}</span>
          <span>收藏 {item.favorite_count}</span>
          <span>{new Date(item.created_at).toLocaleDateString()}</span>
        </div>
      </div>

      {/* 交易方式 */}
      <div className={styles.tradeSection}>
        <h3>交易方式</h3>
        <div className={styles.tradeTags}>
          {item.exchange_enabled && <Tag color="green">允许交换</Tag>}
          {item.delivery_enabled && <Tag color="orange">支持配送</Tag>}
          {!item.exchange_enabled && !item.delivery_enabled && <Tag>仅限自提</Tag>}
        </div>
      </div>

      {/* 商品描述 */}
      <div className={styles.descSection}>
        <h3>商品描述</h3>
        <p className={styles.desc}>{item.description || '暂无描述'}</p>
      </div>

      {/* 底部操作栏 */}
      <div className={styles.actionBar}>
        <Button color="primary" size="large" block onClick={handleContact}>
          联系卖家
        </Button>
      </div>
    </div>
  )
}
