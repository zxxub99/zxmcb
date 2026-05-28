import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Tag, Toast } from 'antd-mobile'
import { api } from '../services/api'
import styles from './HelpRequestDetail.module.css'

interface HelpRequest {
  id: number
  user_id: number
  title: string
  description: string
  category: string
  urgent: boolean
  status: string
  helper_id: number | null
  created_at: string
}

export default function HelpRequestDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [request, setRequest] = useState<HelpRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    loadRequest()
  }, [id])

  const loadRequest = async () => {
    if (!id) return
    try {
      // 从广场列表中获取（简化处理）
      const list = await api.getHelpRequests() as unknown as any[]
      const item = (list as any[]).find(r => r.id === parseInt(id))
      setRequest(item || null)
    } catch (error) {
      console.error('加载失败', error)
      Toast.show({ content: '加载失败', duration: 2000 })
    } finally {
      setLoading(false)
    }
  }

  const getCategoryName = (category: string) => {
    const map: Record<string, string> = {
      'repair': '维修帮扶',
      'consult': '咨询解答',
      'errand': '事务劳办',
      'tech': '技术帮扶',
    }
    return map[category] || category
  }

  const getStatusName = (status: string) => {
    const map: Record<string, { text: string; color: string }> = {
      'open': { text: '待帮助', color: 'blue' },
      'accepted': { text: '进行中', color: 'orange' },
      'completed': { text: '已完成', color: 'green' },
      'cancelled': { text: '已取消', color: 'gray' },
    }
    return map[status] || { text: status, color: 'gray' }
  }

  const handleAccept = async () => {
    if (!id) return
    setActionLoading(true)
    try {
      await api.acceptHelpRequest(parseInt(id))
      Toast.show({ content: '接单成功', duration: 1500 })
      loadRequest()
    } catch (error: any) {
      Toast.show({ content: error.message || '接单失败', duration: 2000 })
    } finally {
      setActionLoading(false)
    }
  }

  const handleContact = () => {
    if (!request) return
    navigate(`/chat/${request.user_id}`)
  }

  if (loading) {
    return <div className={styles.container}><div className={styles.loading}>加载中...</div></div>
  }

  if (!request) {
    return <div className={styles.container}><div className={styles.empty}>请求不存在</div></div>
  }

  const statusInfo = getStatusName(request.status)
  const canAccept = request.status === 'open'

  return (
    <div className={styles.container}>
      {/* 头部信息 */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{request.title}</h2>
          {request.urgent && <Tag color="red">紧急</Tag>}
        </div>
        <div className={styles.meta}>
          <Tag color={statusInfo.color}>{statusInfo.text}</Tag>
          <Tag color="blue">{getCategoryName(request.category)}</Tag>
          <span className={styles.time}>{new Date(request.created_at).toLocaleDateString()}</span>
        </div>
      </div>

      {/* 详细描述 */}
      <div className={styles.descSection}>
        <h3>详细描述</h3>
        <p className={styles.desc}>{request.description || '暂无详细描述'}</p>
      </div>

      {/* 帮助说明 */}
      <div className={styles.helpSection}>
        <h3>如何帮助</h3>
        <p>如果您有能力帮助这位用户，可以点击下方按钮联系对方，也可以直接在平台内与对方沟通具体帮助方式。</p>
      </div>

      {/* 底部操作栏 */}
      <div className={styles.actionBar}>
        <Button color="default" size="large" block onClick={handleContact}>
          联系求助者
        </Button>
        {canAccept && (
          <Button color="primary" size="large" block loading={actionLoading} onClick={handleAccept}>
            我来帮忙
          </Button>
        )}
        {!canAccept && (
          <div className={styles.statusHint}>
            {request.status === 'accepted' && '已有志愿者接单帮助中'}
            {request.status === 'completed' && '此请求已完成'}
          </div>
        )}
      </div>
    </div>
  )
}
