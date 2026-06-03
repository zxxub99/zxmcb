import { supabase, isConfigured } from './supabase'

export interface Favorite {
  id: string
  user_id: string
  item_id: string
  item_type: 'tourism' | 'secondhand' | 'dating' | 'article'
  created_at: string
}

// 添加收藏
export async function addFavorite(userId: string, itemId: string, itemType: Favorite['item_type']) {
  const { data, error } = await supabase
    .from('favorites')
    .insert({ user_id: userId, item_id: itemId, item_type: itemType })
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as Favorite
}

// 取消收藏
export async function removeFavorite(userId: string, itemId: string) {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('item_id', itemId)
  if (error) throw new Error(error.message)
}

// 获取用户收藏列表
export async function getUserFavorites(userId: string) {
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data as Favorite[]
}

// 检查是否已收藏
export async function isFavorited(userId: string, itemId: string) {
  const { data, error } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('item_id', itemId)
    .maybeSingle()
  if (error) throw new Error(error.message)
  return !!data
}
