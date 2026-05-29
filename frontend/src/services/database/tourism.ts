import { supabase } from './supabase'

export interface TourismProduct {
  id: string
  user_id?: string
  name: string
  description: string
  price: number
  original_price?: number
  images?: string[]
  category?: string
  location?: string
  duration?: string
  features?: string[]
  views: number
  likes: number
  stock: number
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at?: string
}

// 获取旅游商品列表
export async function getTourismProducts(options?: {
  category?: string
  location?: string
  featured?: boolean
  page?: number
  pageSize?: number
}) {
  let query = supabase
    .from('tourism_products')
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (options?.category) {
    query = query.eq('category', options.category)
  }
  if (options?.location) {
    query = query.eq('location', options.location)
  }
  if (options?.featured) {
    query = query.eq('is_featured', true)
  }

  const { page = 1, pageSize = 20 } = options || {}
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error, count } = await query.range(from, to)
  if (error) throw new Error(error.message)
  
  return { products: data as TourismProduct[], total: count || 0 }
}

// 获取热门推荐
export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from('tourism_products')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('views', { ascending: false })
    .limit(6)
  if (error) throw new Error(error.message)
  return data as TourismProduct[]
}

// 获取单个旅游商品
export async function getTourismProduct(id: string) {
  const { data, error } = await supabase
    .from('tourism_products')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw new Error(error.message)
  return data as TourismProduct
}

// 创建旅游商品（商家）
export async function createTourismProduct(product: Omit<TourismProduct, 'id' | 'views' | 'likes' | 'is_featured' | 'is_active' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('tourism_products')
    .insert(product)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as TourismProduct
}

// 更新旅游商品
export async function updateTourismProduct(id: string, updates: Partial<TourismProduct>) {
  const { data, error } = await supabase
    .from('tourism_products')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as TourismProduct
}

// 删除旅游商品
export async function deleteTourismProduct(id: string) {
  const { error } = await supabase
    .from('tourism_products')
    .update({ is_active: false })
    .eq('id', id)
  if (error) throw new Error(error.message)
}
