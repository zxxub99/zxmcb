import { supabase } from './supabase'

export interface Order {
  id: string
  user_id: string
  product_id: string
  product_type: 'tourism' | 'secondhand' | 'dating'
  quantity: number
  total_amount: number
  status: 'pending' | 'paid' | 'completed' | 'cancelled'
  contact_phone: string
  contact_name: string
  remark?: string
  created_at: string
  updated_at?: string
}

// 创建订单
export async function createOrder(order: Omit<Order, 'id' | 'status' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as Order
}

// 获取用户订单列表
export async function getUserOrders(userId: string, options?: {
  status?: string
  page?: number
  pageSize?: number
}) {
  let query = supabase
    .from('orders')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (options?.status) {
    query = query.eq('status', options.status)
  }

  const { page = 1, pageSize = 20 } = options || {}
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error, count } = await query.range(from, to)
  if (error) throw new Error(error.message)
  
  return { orders: data as Order[], total: count || 0 }
}

// 获取单个订单
export async function getOrder(id: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw new Error(error.message)
  return data as Order
}

// 更新订单状态
export async function updateOrderStatus(id: string, status: Order['status']) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as Order
}

// 取消订单
export async function cancelOrder(id: string) {
  return updateOrderStatus(id, 'cancelled')
}
