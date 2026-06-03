import { createClient } from '@supabase/supabase-js'

// 从环境变量获取 Supabase 配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Mock 客户端 - 离线模式下使用，防止 null.xxx 崩溃
function createMockClient() {
  const empty = { data: null, error: null, count: null }
  const emptyList = { data: [], error: null, count: null }

  const mockQuery = {
    select: () => ({
      eq: () => ({ order: (c: string) => ({ data: [], error: null }), ...emptyList }),
      order: (c: string) => ({ data: [], error: null }),
      single: () => Promise.resolve(empty),
      ...emptyList
    }),
    insert: (_d: any) => ({
      select: () => ({ single: () => Promise.resolve(empty) }),
      ...empty
    }),
    update: (_d: any) => ({ eq: () => empty }),
    delete: () => ({ eq: () => empty }),
  }

  const mockAuth = {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: (_cb: any) => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: (_d: any) => Promise.resolve(empty),
    signUp: (_d: any) => Promise.resolve(empty),
    signOut: () => Promise.resolve(empty),
    resetPasswordForEmail: (_d: any) => Promise.resolve(empty),
    updateUser: (_d: any) => Promise.resolve({ data: { user: null }, error: null }),
  }

  return { auth: mockAuth, from: (_t: string) => mockQuery, storage: {
    from: (_b: string) => ({ upload: () => Promise.resolve({ error: null }), getPublicUrl: () => ({ data: { publicUrl: '' } }) })
  }} as ReturnType<typeof createClient>
}

// 安全创建 Supabase 客户端（未配置时返回 Mock）
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient()

// 导出环境变量检查函数
export const isConfigured = () => !!supabaseUrl && !!supabaseAnonKey
