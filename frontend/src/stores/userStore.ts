import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getCurrentUser, onAuthStateChange, signOut as authSignOut } from '../services/database/auth'
import { getProfile, type Profile } from '../services/database/profile'

interface UserState {
  user: any | null
  profile: Profile | null
  isLoading: boolean
  isInitialized: boolean
  
  // 方法
  initialize: () => Promise<void>
  setUser: (user: any | null) => void
  setProfile: (profile: Profile | null) => void
  logout: () => Promise<void>
  refreshProfile: () => Promise<void>
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      isLoading: true,
      isInitialized: false,

      initialize: async () => {
        if (get().isInitialized) return
        
        set({ isLoading: true })
        try {
          const user = await getCurrentUser()
          if (user) {
            set({ user })
            const profile = await getProfile(user.id)
            set({ profile })
          }
        } catch (error) {
          console.error('初始化用户失败:', error)
        } finally {
          set({ isLoading: false, isInitialized: true })
        }

        // 监听认证状态变化
        onAuthStateChange(async (user) => {
          if (user) {
            set({ user })
            try {
              const profile = await getProfile(user.id)
              set({ profile })
            } catch (error) {
              console.error('获取用户资料失败:', error)
            }
          } else {
            set({ user: null, profile: null })
          }
        })
      },

      setUser: (user) => set({ user }),
      
      setProfile: (profile) => set({ profile }),

      logout: async () => {
        try {
          await authSignOut()
          set({ user: null, profile: null })
        } catch (error) {
          console.error('退出登录失败:', error)
          throw error
        }
      },

      refreshProfile: async () => {
        const { user } = get()
        if (!user) return
        
        try {
          const profile = await getProfile(user.id)
          set({ profile })
        } catch (error) {
          console.error('刷新用户资料失败:', error)
        }
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
)
// force rebuild Wed Jun  3 13:26:10 CST 2026
