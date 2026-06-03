import { supabase, isConfigured } from './supabase'

// 用户登录
export async function signIn(phone: string, password: string) {
  if (!isConfigured()) throw new Error('数据库未配置')
  const { data, error } = await supabase!.auth.signInWithPassword({
    phone,
    password,
  })
  if (error) throw new Error(error.message)
  return data
}

// 用户注册
export async function signUp(phone: string, password: string, nickname: string) {
  if (!isConfigured()) throw new Error('数据库未配置')
  const { data, error } = await supabase!.auth.signUp({
    phone,
    password,
    options: {
      data: { nickname }
    }
  })
  if (error) throw new Error(error.message)
  return data
}

// 发送验证码
export async function sendVerificationCode(phone: string) {
  if (!isConfigured()) throw new Error('数据库未配置')
  const { error } = await supabase!.auth.signInWithOtp({
    phone,
    options: {
      channel: 'sms'
    }
  })
  if (error) throw new Error(error.message)
}

// 验证验证码
export async function verifyCode(phone: string, token: string) {
  const { data, error } = await supabase.auth.verifyOTP(phone, token)
  if (error) throw new Error(error.message)
  return data
}

// 获取当前用户
export async function getCurrentUser() {
  if (!isConfigured()) return null
  const { data: { user }, error } = await supabase!.auth.getUser()
  if (error) throw new Error(error.message)
  return user
}

// 获取会话
export async function getSession() {
  if (!isConfigured()) return null
  const { data: { session }, error } = await supabase!.auth.getSession()
  if (error) throw new Error(error.message)
  return session
}

// 退出登录
export async function signOut() {
  if (!isConfigured()) return
  const { error } = await supabase!.auth.signOut()
  if (error) throw new Error(error.message)
}

// 监听认证状态变化
export function onAuthStateChange(callback: (user: any) => void) {
  if (!isConfigured()) return { data: { subscription: { unsubscribe: () => {} } } }
  return supabase!.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null)
  })
}
