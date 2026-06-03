import { supabase } from './supabase'
import type { User } from '../../types/user'

// 获取用户资料
export const getProfile = async (userId: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) return null
  return data
}

// 创建用户资料
export const createProfile = async (profile: Partial<User>): Promise<User | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profile)
    .select()
    .single()
  
  if (error) return null
  return data
}

// 更新用户资料
export const updateProfile = async (userId: string, updates: Partial<User>): Promise<User | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  if (error) return null
  return data
}

// 上传头像
export const uploadAvatar = async (userId: string, file: File): Promise<string | null> => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/avatar.${fileExt}`
  
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(fileName, file, { upsert: true })
  
  if (uploadError) return null
  
  const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName)
  return publicUrl
}
