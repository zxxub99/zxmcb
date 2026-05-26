import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Toast } from 'antd-mobile'
import { api } from '../services/api'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: { phone: string; password: string }) => {
    setLoading(true)
    try {
      const response = await api.login(values.phone, values.password)
      if (response.access_token) {
        localStorage.setItem('token', response.access_token)
        Toast.success('登录成功')
        navigate('/')
      }
    } catch (error: any) {
      Toast.fail(error.detail || '登录失败')
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
        <Form onFinish={onFinish}>
          <Form.Item name="phone" rules={[{ required: true, message: '请输入手机号' }]}>
            <Input placeholder="请输入手机号" type="tel" maxLength={11} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input placeholder="请输入密码" type="password" />
          </Form.Item>
          <Button block color="primary" size="large" type="submit" loading={loading}>
            登录
          </Button>
        </Form>

        <div className={styles.footer}>
          <span onClick={() => navigate('/register')}>还没有账号？立即注册</span>
        </div>
      </div>
    </div>
  )
}
