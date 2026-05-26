import axios from 'axios'

const API_BASE_URL = '/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器：添加token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器：处理错误
apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const message = error.response?.data?.detail || '请求失败'
    return Promise.reject(new Error(message))
  }
)

export const api = {
  // 认证
  login: (phone: string, password: string) => {
    const formData = new FormData()
    formData.append('username', phone)
    formData.append('password', password)
    return apiClient.post('/auth/login', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  register: (phone: string, password: string, nickname: string, gender: string) => {
    return apiClient.post('/auth/register', null, {
      params: { phone, password, nickname, gender },
    })
  },

  getUserInfo: () => {
    return apiClient.get('/auth/me')
  },

  // 用户
  getNearbyUsers: (lat?: number, lng?: number) => {
    return apiClient.get('/users/nearby', { params: { lat, lng } })
  },

  getUserProfile: (userId: number) => {
    return apiClient.get(`/users/${userId}`)
  },

  updateProfile: (data: { nickname?: string; avatar?: string; bio?: string }) => {
    return apiClient.put('/users/profile', null, { params: data })
  },

  // 闲置物品
  getIdleItems: (category?: string) => {
    return apiClient.get('/idle-items/', { params: { category } })
  },

  createIdleItem: (data: {
    title: string
    description: string
    category: string
    price: number
    images: string[]
    exchange_enabled: boolean
    delivery_enabled: boolean
  }) => {
    return apiClient.post('/idle-items/', data)
  },

  getIdleItem: (itemId: number) => {
    return apiClient.get(`/idle-items/${itemId}`)
  },

  // 互助请求
  getHelpRequests: (category?: string) => {
    return apiClient.get('/help-requests/', { params: { category } })
  },

  createHelpRequest: (data: {
    title: string
    description: string
    category: string
    urgent: boolean
  }) => {
    return apiClient.post('/help-requests/', data)
  },

  acceptHelpRequest: (requestId: number) => {
    return apiClient.post(`/help-requests/${requestId}/accept`)
  },

  // 消息
  getConversations: () => {
    return apiClient.get('/messages/conversations')
  },

  getMessages: (userId: number, limit = 50, offset = 0) => {
    return apiClient.get(`/messages/${userId}`, { params: { limit, offset } })
  },

  sendMessage: (toUserId: number, content: string, messageType = 'text') => {
    return apiClient.post('/messages/', { to_user_id: toUserId, content, message_type: messageType })
  },
}

export default apiClient
