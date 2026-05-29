import { supabase } from './supabase'

export interface Article {
  id: string
  user_id: string
  title: string
  content: string
  cover_image?: string
  category?: string
  tags?: string[]
  views: number
  likes: number
  is_published: boolean
  created_at: string
  updated_at?: string
}

// 获取资讯列表
export async function getArticles(options?: {
  category?: string
  page?: number
  pageSize?: number
}) {
  let query = supabase
    .from('articles')
    .select('*', { count: 'exact' })
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (options?.category) {
    query = query.eq('category', options.category)
  }

  const { page = 1, pageSize = 20 } = options || {}
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error, count } = await query.range(from, to)
  if (error) throw new Error(error.message)
  
  return { articles: data as Article[], total: count || 0 }
}

// 获取单个文章
export async function getArticle(id: string) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw new Error(error.message)
  return data as Article
}

// 发布文章
export async function createArticle(article: Omit<Article, 'id' | 'views' | 'likes' | 'is_published' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('articles')
    .insert(article)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as Article
}

// 更新文章
export async function updateArticle(id: string, updates: Partial<Article>) {
  const { data, error } = await supabase
    .from('articles')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as Article
}

// 删除文章
export async function deleteArticle(id: string) {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id)
  if (error) throw new Error(error.message)
}
