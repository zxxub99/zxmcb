import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, TextArea, Toast, Picker, Switch } from 'antd-mobile'
import { api } from '../services/api'
import styles from './PublishHelpRequest.module.css'

const categories = [
  { label: '维修帮扶', value: 'repair', desc: '小家电检修、水电排查、家具安装' },
  { label: '咨询解答', value: 'consult', desc: '学业答疑、政策解读、生活常识' },
  { label: '事务劳办', value: 'errand', desc: '同城跑腿、资料代交、排队代办' },
  { label: '技术帮扶', value: 'tech', desc: '手机电脑调试、软件安装、设计排版' },
]

export default function PublishHelpRequest() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<string>('')
  const [urgent, setUrgent] = useState(false)
  const [showCategoryPicker, setShowCategoryPicker] = useState(false)

  const handlePublish = async () => {
    if (!title.trim()) {
      Toast.show({ content: '请输入求助标题', duration: 2000 })
      return
    }
    if (!category) {
      Toast.show({ content: '请选择求助类型', duration: 2000 })
      return
    }
    if (!description.trim()) {
      Toast.show({ content: '请输入详细描述', duration: 2000 })
      return
    }

    setLoading(true)
    try {
      await api.createHelpRequest({
        title: title.trim(),
        description: description.trim(),
        category,
        urgent,
      })
      Toast.show({ content: '发布成功', duration: 1500 })
      setTimeout(() => navigate('/square'), 1000)
    } catch (error: any) {
      Toast.show({ content: error.message || '发布失败', duration: 2000 })
    } finally {
      setLoading(false)
    }
  }

  const selectedCategory = categories.find(c => c.value === category)

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        {/* 求助标题 */}
        <div className={styles.field}>
          <label className={styles.label}>求助标题 *</label>
          <Input
            placeholder="简述您需要的帮助"
            value={title}
            onChange={setTitle}
            maxLength={50}
          />
        </div>

        {/* 求助类型 */}
        <div className={styles.field}>
          <label className={styles.label}>求助类型 *</label>
          <div 
            className={styles.pickerTrigger}
            onClick={() => setShowCategoryPicker(true)}
          >
            {selectedCategory?.label || '请选择类型'}
          </div>
          {selectedCategory && (
            <p className={styles.hint}>{selectedCategory.desc}</p>
          )}
          <Picker
            visible={showCategoryPicker}
            columns={[categories]}
            value={[category]}
            onConfirm={(val) => {
              setCategory(val[0] as string)
              setShowCategoryPicker(false)
            }}
            onClose={() => setShowCategoryPicker(false)}
          />
        </div>

        {/* 详细描述 */}
        <div className={styles.field}>
          <label className={styles.label}>详细描述 *</label>
          <TextArea
            placeholder="详细说明您的需求，例如：具体问题、地点、时间要求等"
            value={description}
            onChange={setDescription}
            rows={5}
            maxLength={500}
            showCount
          />
        </div>

        {/* 是否紧急 */}
        <div className={styles.field}>
          <label className={styles.label}>紧急程度</label>
          <div className={styles.switchRow}>
            <div>
              <span>标记为紧急</span>
              <p className={styles.hint}>紧急求助会优先推送</p>
            </div>
            <Switch checked={urgent} onChange={setUrgent} />
          </div>
        </div>
      </div>

      {/* 提交按钮 */}
      <div className={styles.footer}>
        <Button 
          color="primary" 
          size="large" 
          block 
          loading={loading}
          onClick={handlePublish}
        >
          发布求助
        </Button>
      </div>
    </div>
  )
}
