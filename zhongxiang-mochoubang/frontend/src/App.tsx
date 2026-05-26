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
import IdleItemDetail from './pages/IdleItemDetail'
import PublishIdleItem from './pages/PublishIdleItem'
import HelpRequestDetail from './pages/HelpRequestDetail'
import PublishHelpRequest from './pages/PublishHelpRequest'
import ChatPage from './pages/ChatPage'
import EditProfile from './pages/EditProfile'
import Verification from './pages/Verification'
import PointsRecord from './pages/PointsRecord'
import UserDetail from './pages/UserDetail'
import Notifications from './pages/Notifications'

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
          <Route path="/idle/:id" element={<IdleItemDetail />} />
          <Route path="/publish-idle" element={<PublishIdleItem />} />
          <Route path="/help/:id" element={<HelpRequestDetail />} />
          <Route path="/publish-help" element={<PublishHelpRequest />} />
          <Route path="/chat/:userId" element={<ChatPage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/points" element={<PointsRecord />} />
          <Route path="/user/:userId" element={<UserDetail />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
