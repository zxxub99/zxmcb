import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, TextArea, Toast, Switch, Picker, ActionSheet } from 'antd-mobile'
import { StarOutline } from 'antd-mobile-icons'
import { api } from '../services/api'
import { polishText } from '../services/aiPolish'
import styles from './PublishIdleItem.module.css'

const categories = [
  { label: '家具', value: 'furniture' },
  { label: '家电', value: 'appliance' },
  { label: '数码', value: 'digital' },
  { label: '母婴', value: 'baby' },
  { label: '生活用品', value: 'life' },
]

export default function PublishIdleItem() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<string>('')
  const [price, setPrice] = useState('')
  const [exchangeEnabled, setExchangeEnabled] = useState(true)
  const [deliveryEnabled, setDeliveryEnabled] = useState(false)
  const [showCategoryPicker, setShowCategoryPicker] = useState(false)
  const [polishingTitle, setPolishingTitle] = useState(false)
  const [polishingDesc, setPolishingDesc] = useState(false)

  // AI润色标题
  const handlePolishTitle = async () => {
    if (!title.trim()) {
      Toast.show({ content: '请先输入物品名称', duration: 2000 })
      return
    }
    setPolishingTitle(true)
    try {
      Toast.show({ content: '正在润色...', duration: 1000 })
      const polished = await polishText(title, 'title')
      setTitle(polished)
      Toast.show({ content: '润色完成', duration: 1500 })
    } catch (error: any) {
      Toast.show({ content: error.message || '润色失败，请重试', duration: 2000 })
    } finally {
      setPolishingTitle(false)
    }
  }

  // AI润色描述
  const handlePolishDescription = async () => {
    if (!description.trim()) {
      Toast.show({ content: '请先输入商品描述', duration: 2000 })
      return
    }
    setPolishingDesc(true)
    try {
      Toast.show({ content: '正在润色...', duration: 1000 })
      const polished = await polishText(description, 'description')
      setDescription(polished)
      Toast.show({ content: '润色完成', duration: 1500 })
    } catch (error: any) {
      Toast.show({ content: error.message || '润色失败，请重试', duration: 2000 })
    } finally {
      setPolishingDesc(false)
    }
  }

  // 显示润色选项
  const showPolishOptions = (type: 'title' | 'description') => {
    ActionSheet.show({
      actions: [
        {
          key: 'polish',
          text: '✨ AI智能润色',
        },
        {
          key: 'keep',
          text: '保持原样',
        },
      ],
      onAction: (action) => {
        if (action.key === 'polish') {
          if (type === 'title') {
            handlePolishTitle()
          } else {
            handlePolishDescription()
          }
        }
      },
    })
  }

  const handlePublish = async () => {
    if (!title.trim()) {
      Toast.show({ content: '请输入物品名称', duration: 2000 })
      return
    }
    if (!category) {
      Toast.show({ content: '请选择物品分类', duration: 2000 })
      return
    }

    setLoading(true)
    try {
      await api.createIdleItem({
        title: title.trim(),
        description: description.trim(),
        category,
        price: price ? parseFloat(price) : 0,
        images: [],
        exchange_enabled: exchangeEnabled,
        delivery_enabled: deliveryEnabled,
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
        {/* 物品名称 */}
        <div className={styles.field}>
          <label className={styles.label}>物品名称 *</label>
          <div className={styles.inputWithAction}>
            <Input
              placeholder="请输入物品名称"
              value={title}
              onChange={setTitle}
              maxLength={50}
              className={styles.inputFlex}
            />
            <Button
              size="small"
              color="primary"
              loading={polishingTitle}
              onClick={() => showPolishOptions('title')}
              className={styles.polishBtn}
            >
              <StarOutline /> 润色
            </Button>
          </div>
        </div>

        {/* 物品分类 */}
        <div className={styles.field}>
          <label className={styles.label}>物品分类 *</label>
          <div 
            className={styles.pickerTrigger}
            onClick={() => setShowCategoryPicker(true)}
          >
            {selectedCategory?.label || '请选择分类'}
          </div>
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

        {/* 价格 */}
        <div className={styles.field}>
          <label className={styles.label}>价格（元）</label>
          <Input
            placeholder="0表示免费赠送"
            type="number"
            value={price}
            onChange={setPrice}
          />
        </div>

        {/* 商品描述 */}
        <div className={styles.field}>
          <label className={styles.label}>商品描述</label>
          <div className={styles.inputWithAction}>
            <TextArea
              placeholder="描述物品的品牌、型号、成色等信息"
              value={description}
              onChange={setDescription}
              rows={4}
              maxLength={500}
              showCount
              className={styles.textAreaFlex}
            />
            <Button
              size="small"
              color="primary"
              loading={polishingDesc}
              onClick={() => showPolishOptions('description')}
              className={styles.polishBtnDesc}
            >
              <StarOutline /> 润色
            </Button>
          </div>
        </div>

        {/* 交易方式 */}
        <div className={styles.field}>
          <label className={styles.label}>交易方式</label>
          <div className={styles.switchRow}>
            <span>允许以物换物</span>
            <Switch checked={exchangeEnabled} onChange={setExchangeEnabled} />
          </div>
          <div className={styles.switchRow}>
            <span>支持同城配送</span>
            <Switch checked={deliveryEnabled} onChange={setDeliveryEnabled} />
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
          立即发布
        </Button>
      </div>
    </div>
  )
}
