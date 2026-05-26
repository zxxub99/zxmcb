import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Radio, Toast } from 'antd-mobile'
import styles from './RegisterPage.module.css'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [gender, setGender] = useState('')

  const handleRegister = async () => {
    if (!phone || !password || !nickname || !gender) {
      Toast.show({ content: '请填写完整信息', duration: 2000 })
      return
    }
    
    setLoading(true)
    try {
      // 本地存储模拟注册
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const existingUser = users.find((u: any) => u.phone === phone)
      if (existingUser) {
        Toast.show({ content: '该手机号已注册', duration: 2000 })
        setLoading(false)
        return
      }
      
      const newUser = {
        id: Date.now(),
        phone,
        password, // 实际应加密存储
        nickname,
        gender,
        avatar: '',
        bio: '',
        interests: [],
        points: 100,
        starLevel: 1,
        isVerified: false,
        createdAt: new Date().toISOString()
      }
      
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
      
      Toast.show({ content: '注册成功，请登录', duration: 1500 })
      setTimeout(() => navigate('/login'), 1000)
    } catch (error: any) {
      Toast.show({ content: error.message || '注册失败', duration: 2000 })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>注册账号</h1>
        <p>加入钟祥莫愁帮，开始本地社交</p>
      </div>

      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <span className={styles.label}>手机号</span>
          <Input 
            placeholder="请输入手机号" 
            type="tel" 
            maxLength={11}
            value={phone}
            onChange={(val) => setPhone(val)}
          />
        </div>
        <div className={styles.inputGroup}>
          <span className={styles.label}>密码</span>
          <Input 
            placeholder="请输入密码" 
            type="password"
            value={password}
            onChange={(val) => setPassword(val)}
          />
        </div>
        <div className={styles.inputGroup}>
          <span className={styles.label}>昵称</span>
          <Input 
            placeholder="请输入昵称" 
            value={nickname}
            onChange={(val) => setNickname(val)}
          />
        </div>
        <div className={styles.inputGroup}>
          <span className={styles.label}>性别</span>
          <Radio.Group value={gender} onChange={(val) => setGender(val as string)}>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
            <Radio value="secret">保密</Radio>
          </Radio.Group>
        </div>
        <Button block color="primary" size="large" loading={loading} onClick={handleRegister}>
          注册
        </Button>

        <div className={styles.footer}>
          <span onClick={() => navigate('/login')}>已有账号？立即登录</span>
        </div>
      </div>
    </div>
  )
}
