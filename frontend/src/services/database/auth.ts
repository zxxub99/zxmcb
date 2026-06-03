import { supabase } from './supabase'

// 获取当前用户
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// 监听认证状态变化
export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback)
}

// 登录
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data.user
}

// 注册
export const signUp = async (email: string, password: string, userData: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: userData }
  })
  if (error) throw error
  return data.user
}

// 登出
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// 重置密码
export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email)
  if (error) throw error
}

// 更新用户信息
export const updateUserProfile = async (updates: any) => {
  const { data, error } = await supabase.auth.updateUser(updates)
  if (error) throw error
  return data.user
}

// 发送验证码（离线模式返回成功）
export const sendVerificationCode = async (_phone: string): Promise<boolean> => {
  // 离线模式下直接返回成功（Mock模式）
  return true
}
