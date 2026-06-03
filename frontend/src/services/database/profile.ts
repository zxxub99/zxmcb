import { supabase, isConfigured } from './supabase'

export interface Profile {
  id: string
  nickname: string
  avatar?: string
  phone?: string
  bio?: string
  location?: string
  is_verified?: boolean
  created_at: string
  updated_at?: string
}

// 获取用户资料
export async function getProfile(userId: string) {
  if (!isConfigured()) return null
  const { data, error } = await supabase!
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()
  if (error) throw new Error(error.message)
  return data as Profile | null
}

// 更新用户资料
export async function updateProfile(userId: string, updates: Partial<Profile>) {
  if (!isConfigured()) throw new Error('数据库未配置')
  const { data, error } = await supabase!
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as Profile
}

// 创建用户资料
export async function createProfile(profile: Omit<Profile, 'created_at' | 'updated_at'>) {
  if (!isConfigured()) throw new Error('数据库未配置')
  const { data, error } = await supabase!
    .from('profiles')
    .insert(profile)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as Profile
}

// 上传头像
export async function uploadAvatar(userId: string, file: File) {
  if (!isConfigured()) throw new Error('数据库未配置')
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/avatar.${fileExt}`
  
  const { error: uploadError } = await supabase!.storage
    .from('avatars')
    .upload(fileName, file, { upsert: true })
  
  if (uploadError) throw new Error(uploadError.message)
  
  const { data: { publicUrl } } = supabase!.storage
    .from('avatars')
    .getPublicUrl(fileName)
  
  return publicUrl
}
