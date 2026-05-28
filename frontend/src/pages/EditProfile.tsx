import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, TextArea, Button, Toast, Selector } from 'antd-mobile'
import { StarOutline } from 'antd-mobile-icons'
import { api } from '../services/api'
import { polishText } from '../services/aiPolish'
import styles from './EditProfile.module.css'

const avatarOptions = [
  { value: 'avatar1', label: '🙂' },
  { value: 'avatar2', label: '😀' },
  { value: 'avatar3', label: '😊' },
  { value: 'avatar4', label: '😄' },
  { value: 'avatar5', label: '🤗' },
  { value: 'avatar6', label: '😎' },
]

const interestOptions = [
  { value: 'repair', label: '🔧 维修' },
  { value: 'consult', label: '💬 咨询' },
  { value: 'errand', label: '🏃 跑腿' },
  { value: 'tech', label: '💻 技术' },
  { value: 'trading', label: '🔄 交易' },
  { value: 'chat', label: '👥 交友' },
]

export default function EditProfile() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [polishing, setPolishing] = useState(false)
  const [nickname, setNickname] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState('avatar1')
  const [interests, setInterests] = useState<string[]>([])

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const data: any = await api.getUserInfo()
      setNickname(data.nickname || '')
      setBio(data.bio || '')
      setAvatar(data.avatar || 'avatar1')
      setInterests(data.interests || [])
    } catch (error) {
      console.error('加载资料失败', error)
    }
  }

  const handleSave = async () => {
    if (!nickname.trim()) {
      Toast.show({ content: '请输入昵称', duration: 2000 })
      return
    }

    setLoading(true)
    try {
      await api.updateProfile({
        nickname: nickname.trim(),
        bio: bio.trim(),
        avatar,
        interests,
      })
      Toast.show({ content: '保存成功', duration: 1500 })
      setTimeout(() => navigate('/my'), 1000)
    } catch (error: any) {
      Toast.show({ content: error.message || '保存失败', duration: 2000 })
    } finally {
      setLoading(false)
    }
  }

  // AI润色个人简介
  const handlePolishBio = async () => {
    if (!bio.trim() || polishing) return
    setPolishing(true)
    try {
      Toast.show({ content: '正在润色...', duration: 1000 })
      const polished = await polishText(bio, 'description')
      setBio(polished)
      Toast.show({ content: '润色完成', duration: 1500 })
    } catch (error: any) {
      Toast.show({ content: error.message || '润色失败，请重试', duration: 2000 })
    } finally {
      setPolishing(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        {/* 头像选择 */}
        <div className={styles.field}>
          <label className={styles.label}>头像</label>
          <div className={styles.avatarGrid}>
            {avatarOptions.map(opt => (
              <div
                key={opt.value}
                className={`${styles.avatarItem} ${avatar === opt.value ? styles.selected : ''}`}
                onClick={() => setAvatar(opt.value)}
              >
                {opt.label}
              </div>
            ))}
          </div>
        </div>

        {/* 昵称 */}
        <div className={styles.field}>
          <label className={styles.label}>昵称 *</label>
          <Input
            placeholder="设置您的昵称"
            value={nickname}
            onChange={setNickname}
            maxLength={20}
          />
        </div>

        {/* 个人简介 */}
        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label className={styles.label}>个人简介</label>
            <button 
              className={styles.polishBtn}
              onClick={handlePolishBio}
              disabled={!bio.trim() || polishing}
            >
              <StarOutline /> AI润色
            </button>
          </div>
          <TextArea
            placeholder="介绍一下自己，让邻居更了解您"
            value={bio}
            onChange={setBio}
            rows={3}
            maxLength={100}
            showCount
          />
        </div>

        {/* 兴趣标签 */}
        <div className={styles.field}>
          <label className={styles.label}>我的兴趣</label>
          <div className={styles.interestTip}>选择后可获得更精准的匹配</div>
          <Selector
            multiple
            options={interestOptions}
            value={interests}
            onChange={setInterests}
          />
        </div>
      </div>

      <div className={styles.footer}>
        <Button 
          color="primary" 
          size="large" 
          block 
          loading={loading}
          onClick={handleSave}
        >
          保存修改
        </Button>
      </div>
    </div>
  )
}
