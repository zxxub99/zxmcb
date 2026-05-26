import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Toast } from 'antd-mobile'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    if (!phone || !password) {
      Toast.show('请输入手机号和密码')
      return
    }
    
    setLoading(true)
    try {
      // 本地存储模拟登录
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find((u: any) => u.phone === phone && u.password === password)
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user))
        localStorage.setItem('token', 'mock-token-' + user.id)
        Toast.show({ content: '登录成功', duration: 1500 })
        setTimeout(() => navigate('/'), 1000)
      } else {
        Toast.show({ content: '手机号或密码错误', duration: 2000 })
      }
    } catch (error: any) {
      Toast.show({ content: error.message || '登录失败', duration: 2000 })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>钟祥莫愁帮</h1>
        <p>同城陌生人，邻里互相帮</p>
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
        <Button block color="primary" size="large" loading={loading} onClick={handleLogin}>
          登录
        </Button>

        <div className={styles.footer}>
          <span onClick={() => navigate('/register')}>还没有账号？立即注册</span>
        </div>
      </div>
    </div>
  )
}
