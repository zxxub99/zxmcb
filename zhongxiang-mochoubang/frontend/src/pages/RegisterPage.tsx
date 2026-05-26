import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Radio, Toast } from 'antd-mobile'
import { api } from '../services/api'
import styles from './RegisterPage.module.css'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: { phone: string; password: string; nickname: string; gender: string }) => {
    setLoading(true)
    try {
      await api.register(values.phone, values.password, values.nickname, values.gender)
      Toast.success('注册成功，请登录')
      navigate('/login')
    } catch (error: any) {
      Toast.fail(error.detail || '注册失败')
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
        <Form onFinish={onFinish}>
          <Form.Item name="phone" label="手机号" rules={[{ required: true, message: '请输入手机号' }]}>
            <Input placeholder="请输入手机号" type="tel" maxLength={11} />
          </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
            <Input placeholder="请输入密码" type="password" />
          </Form.Item>
          <Form.Item name="nickname" label="昵称" rules={[{ required: true, message: '请输入昵称' }]}>
            <Input placeholder="请输入昵称" />
          </Form.Item>
          <Form.Item name="gender" label="性别" rules={[{ required: true, message: '请选择性别' }]}>
            <Radio.Group>
              <Radio value="male">男</Radio>
              <Radio value="female">女</Radio>
              <Radio value="secret">保密</Radio>
            </Radio.Group>
          </Form.Item>
          <Button block color="primary" size="large" type="submit" loading={loading}>
            注册
          </Button>
        </Form>

        <div className={styles.footer}>
          <span onClick={() => navigate('/login')}>已有账号？立即登录</span>
        </div>
      </div>
    </div>
  )
}
