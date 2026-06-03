import { supabase, isConfigured } from './supabase'

export interface DatingPost {
  id: string
  user_id: string
  title: string
  content: string
  images?: string[]
  gender?: string
  age_range?: string
  location?: string
  tags?: string[]
  views: number
  likes: number
  is_active: boolean
  created_at: string
  updated_at?: string
}

// 获取交友帖子列表
export async function getDatingPosts(options?: {
  location?: string
  page?: number
  pageSize?: number
}) {
  let query = supabase
    .from('dating_posts')
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (options?.location) {
    query = query.eq('location', options.location)
  }

  const { page = 1, pageSize = 20 } = options || {}
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error, count } = await query.range(from, to)
  if (error) throw new Error(error.message)
  
  return { posts: data as DatingPost[], total: count || 0 }
}

// 获取单个帖子
export async function getDatingPost(id: string) {
  const { data, error } = await supabase
    .from('dating_posts')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw new Error(error.message)
  return data as DatingPost
}

// 发布交友帖子
export async function createDatingPost(post: Omit<DatingPost, 'id' | 'views' | 'likes' | 'is_active' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('dating_posts')
    .insert(post)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as DatingPost
}

// 更新交友帖子
export async function updateDatingPost(id: string, updates: Partial<DatingPost>) {
  const { data, error } = await supabase
    .from('dating_posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as DatingPost
}

// 删除交友帖子
export async function deleteDatingPost(id: string) {
  const { error } = await supabase
    .from('dating_posts')
    .delete()
    .eq('id', id)
  if (error) throw new Error(error.message)
}

// 增加浏览量
export async function incrementViews(id: string) {
  const { data } = await supabase.rpc('increment_views', { post_id: id })
  return data
}
