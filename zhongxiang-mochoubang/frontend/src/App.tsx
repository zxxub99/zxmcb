import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NearbyPage from './pages/NearbyPage'
import SquarePage from './pages/SquarePage'
import MessagePage from './pages/MessagePage'
import MyPage from './pages/MyPage'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/nearby" element={<NearbyPage />} />
          <Route path="/square" element={<SquarePage />} />
          <Route path="/messages" element={<MessagePage />} />
          <Route path="/my" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
