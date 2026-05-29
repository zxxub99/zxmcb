import AV from 'leancloud-storage'

const appId = import.meta.env.VITE_LEANCLOUD_APP_ID || ''
const appKey = import.meta.env.VITE_LEANCLOUD_APP_KEY || ''

// 初始化 LeanCloud
export function initLeanCloud() {
  if (!appId || !appKey) {
    console.warn('LeanCloud 未配置，使用模拟模式')
    return false
  }
  
  AV.init({
    appId,
    appKey,
    serverURL: 'https://api.leancloud.cn'
  })
  return true
}

// 检查是否已配置
export const isConfigured = () => !!appId && !!appKey

// 导出 AV 实例
export { AV }

// 用户相关
export async function signUp(phone: string, password: string, nickname: string) {
  const user = new AV.User()
  user.setMobilePhoneNumber(phone)
  user.setUsername(phone)
  user.setPassword(password)
  user.set('nickname', nickname)
  
  await user.signUp()
  return user
}

export async function signIn(phone: string, password: string) {
  return await AV.User.logIn(phone, password)
}

export async function signOut() {
  AV.User.logOut()
}

export function getCurrentUser() {
  return AV.User.current()
}

export function onAuthStateChange(callback: (user: any) => void) {
  // LeanCloud 不支持实时监听，手动检查
  return () => {}
}
