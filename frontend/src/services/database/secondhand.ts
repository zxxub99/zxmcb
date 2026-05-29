import { supabase } from './supabase'

export interface SecondhandItem {
  id: string
  user_id: string
  title: string
  description: string
  price: number
  original_price?: number
  images?: string[]
  category?: string
  condition?: string
  location?: string
  views: number
  likes: number
  is_sold: boolean
  is_active: boolean
  created_at: string
  updated_at?: string
}

// 获取二手商品列表
export async function getSecondhandItems(options?: {
  category?: string
  location?: string
  page?: number
  pageSize?: number
}) {
  let query = supabase
    .from('secondhand_items')
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .eq('is_sold', false)
    .order('created_at', { ascending: false })

  if (options?.category) {
    query = query.eq('category', options.category)
  }
  if (options?.location) {
    query = query.eq('location', options.location)
  }

  const { page = 1, pageSize = 20 } = options || {}
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error, count } = await query.range(from, to)
  if (error) throw new Error(error.message)
  
  return { items: data as SecondhandItem[], total: count || 0 }
}

// 获取单个二手商品
export async function getSecondhandItem(id: string) {
  const { data, error } = await supabase
    .from('secondhand_items')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw new Error(error.message)
  return data as SecondhandItem
}

// 发布二手商品
export async function createSecondhandItem(item: Omit<SecondhandItem, 'id' | 'views' | 'likes' | 'is_sold' | 'is_active' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('secondhand_items')
    .insert(item)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as SecondhandItem
}

// 更新二手商品
export async function updateSecondhandItem(id: string, updates: Partial<SecondhandItem>) {
  const { data, error } = await supabase
    .from('secondhand_items')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as SecondhandItem
}

// 删除二手商品
export async function deleteSecondhandItem(id: string) {
  const { error } = await supabase
    .from('secondhand_items')
    .update({ is_active: false })
    .eq('id', id)
  if (error) throw new Error(error.message)
}

// 上传图片
export async function uploadImage(bucket: string, file: File, userId: string) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${Date.now()}.${fileExt}`
  
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(fileName, file)
  
  if (uploadError) throw new Error(uploadError.message)
  
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName)
  
  return publicUrl
}
