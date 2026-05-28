import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar, Button, Input, TextArea, Selector, Toast, Dialog } from 'antd-mobile'
import { LeftOutline, CameraOutline, GiftOutline, EnvironmentOutline, TeamOutline, ClockCircleOutline } from 'antd-mobile-icons'
import styles from './CreateTourGroup.module.css'

// 分类选项
const categoryOptions = [
  { label: '周边自驾游', value: 'self-drive' },
  { label: '背包旅行', value: 'backpack' },
  { label: '摄影采风', value: 'photography' },
  { label: '美食探索', value: 'food' },
  { label: '户外徒步', value: 'hiking' },
  { label: '亲子游', value: 'family' },
  { label: '水上运动', value: 'water' },
  { label: '民俗文化', value: 'culture' },
  { label: '养生度假', value: 'health' },
  { label: '农业体验', value: 'farm' },
]

// 难度选项
const difficultyOptions = [
  { label: '休闲', value: 'easy' },
  { label: '中等', value: 'medium' },
  { label: '挑战', value: 'hard' },
]

const CreateTourGroup: React.FC = () => {
  const navigate = useNavigate()
  const [groupName, setGroupName] = useState('')
  const [groupDesc, setGroupDesc] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState<string[]>([])
  const [destination, setDestination] = useState('')
  const [startDate, setStartDate] = useState('')
  const [maxMembers, setMaxMembers] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 封面图片选项
  const coverOptions = [
    'https://picsum.photos/750/400?random=201',
    'https://picsum.photos/750/400?random=202',
    'https://picsum.photos/750/400?random=203',
    'https://picsum.photos/750/400?random=204',
    'https://picsum.photos/750/400?random=205',
    'https://picsum.photos/750/400?random=206',
  ]

  const handleSelectCover = () => {
    Dialog.show({
      title: '选择封面图',
      content: (
        <div className={styles.coverGrid}>
          {coverOptions.map((url, index) => (
            <div 
              key={index} 
              className={styles.coverOption}
              onClick={() => {
                setCoverImage(url)
                Dialog.clear()
              }}
            >
              <img src={url} alt={`封面${index + 1}`} />
            </div>
          ))}
        </div>
      ),
      closeOnAction: true,
      actions: [],
    })
  }

  const handleSubmit = async () => {
    // 表单验证
    if (!groupName.trim()) {
      Toast.show({ content: '请输入组团名称', position: 'top' })
      return
    }
    if (!groupDesc.trim()) {
      Toast.show({ content: '请输入组团描述', position: 'top' })
      return
    }
    if (categories.length === 0) {
      Toast.show({ content: '请选择组团类型', position: 'top' })
      return
    }
    if (!destination.trim()) {
      Toast.show({ content: '请输入目的地', position: 'top' })
      return
    }
    if (!startDate.trim()) {
      Toast.show({ content: '请输入出发日期', position: 'top' })
      return
    }
    if (!maxMembers.trim()) {
      Toast.show({ content: '请输入人数上限', position: 'top' })
      return
    }

    setIsSubmitting(true)

    // 模拟提交
    setTimeout(() => {
      Toast.show({ content: '组团创建成功！', position: 'top' })
      setIsSubmitting(false)
      navigate('/tour-group')
    }, 1500)
  }

  return (
    <div className={styles.container}>
      <NavBar 
        className={styles.navbar}
        left={<span onClick={() => navigate(-1)}><LeftOutline /></span>}
        right={<span className={styles.publishBtn} onClick={handleSubmit}>发布</span>}
      >
        <span className={styles.navTitle}>创建自组团</span>
      </NavBar>

      <div className={styles.content}>
        {/* 封面图 */}
        <div className={styles.coverSection} onClick={handleSelectCover}>
          {coverImage ? (
            <img src={coverImage} alt="封面" className={styles.coverImage} />
          ) : (
            <div className={styles.coverPlaceholder}>
              <CameraOutline className={styles.cameraIcon} />
              <span>点击选择封面图</span>
            </div>
          )}
        </div>

        {/* 组团名称 */}
        <div className={styles.formSection}>
          <div className={styles.formLabel}>
            <GiftOutline className={styles.labelIcon} />
            <span>组团名称</span>
          </div>
          <Input 
            className={styles.input}
            placeholder="给您的组团起个名字"
            value={groupName}
            onChange={val => setGroupName(val)}
            maxLength={20}
          />
          <div className={styles.charCount}>{groupName.length}/20</div>
        </div>

        {/* 组团描述 */}
        <div className={styles.formSection}>
          <div className={styles.formLabel}>
            <GiftOutline className={styles.labelIcon} />
            <span>组团描述</span>
          </div>
          <TextArea
            className={styles.textArea}
            placeholder="介绍一下您的组团计划..."
            value={groupDesc}
            onChange={val => setGroupDesc(val)}
            rows={4}
            maxLength={200}
            showCount
          />
        </div>

        {/* 组团类型 */}
        <div className={styles.formSection}>
          <div className={styles.formLabel}>
            <TeamOutline className={styles.labelIcon} />
            <span>组团类型</span>
          </div>
          <Selector
            options={categoryOptions}
            value={categories}
            onChange={val => setCategories(val as string[])}
            multiple
            className={styles.selector}
          />
        </div>

        {/* 目的地 */}
        <div className={styles.formSection}>
          <div className={styles.formLabel}>
            <EnvironmentOutline className={styles.labelIcon} />
            <span>目的地</span>
          </div>
          <Input 
            className={styles.input}
            placeholder="例如：莫愁村、明显陵、黄仙洞"
            value={destination}
            onChange={val => setDestination(val)}
          />
        </div>

        {/* 难度选择 */}
        <div className={styles.formSection}>
          <div className={styles.formLabel}>
            <TeamOutline className={styles.labelIcon} />
            <span>难度选择</span>
          </div>
          <Selector
            options={difficultyOptions}
            value={difficulty}
            onChange={val => setDifficulty(val as string[])}
            className={styles.selector}
          />
        </div>

        {/* 出发日期 */}
        <div className={styles.formSection}>
          <div className={styles.formLabel}>
            <ClockCircleOutline className={styles.labelIcon} />
            <span>出发日期</span>
          </div>
          <Input 
            className={styles.input}
            placeholder="例如：2024-06-15"
            value={startDate}
            onChange={val => setStartDate(val)}
          />
        </div>

        {/* 人数上限 */}
        <div className={styles.formSection}>
          <div className={styles.formLabel}>
            <TeamOutline className={styles.labelIcon} />
            <span>人数上限</span>
          </div>
          <Input 
            className={styles.input}
            placeholder="例如：10人"
            value={maxMembers}
            onChange={val => setMaxMembers(val)}
            type="number"
          />
        </div>

        {/* 发布按钮 */}
        <div className={styles.submitSection}>
          <Button 
            block 
            color="primary" 
            size="large"
            loading={isSubmitting}
            onClick={handleSubmit}
            className={styles.submitBtn}
          >
            发起组团
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateTourGroup
