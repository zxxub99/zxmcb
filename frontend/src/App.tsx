import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import React from 'react'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
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
import ProductDetail from './pages/ProductDetail'
import MerchantRegister from './pages/MerchantRegister'
import Notifications from './pages/Notifications'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Search from './pages/Search'
import Favorites from './pages/Favorites'
import Rating from './pages/Rating'
import InterestGroupPage from './pages/InterestGroupPage'
import TourismPage from './pages/TourismPage'
import TourGroupPage from './pages/TourGroupPage'
import CreateTourGroup from './pages/CreateTourGroup'
import MySkillsPage from './pages/MySkillsPage'
import AccommodationPage from './pages/AccommodationPage'
import CustomerService from './pages/CustomerService'
import SpecialtyPage from './pages/SpecialtyPage'
import TourismServicePage from './pages/TourismServicePage'
import RulesPage from './pages/RulesPage'
import LongevityStories from './pages/LongevityStories'
import NeighborRecommendations from './pages/NeighborRecommendations'
import TwelveScenicSpots from './pages/TwelveScenicSpots'
import AgentChatPage from './pages/AgentChatPage'

// 错误边界组件，防止白屏
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: '' }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: String(error.message || error) }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#e8f5e9',
          padding: 20,
          fontFamily: '-apple-system, sans-serif'
        }}>
          <h2 style={{ color: '#2e7d32', marginBottom: 10 }}>🌿 钟祥莫愁帮</h2>
          <p style={{ color: '#555', textAlign: 'center' }}>页面加载遇到问题，请刷新重试</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: 16,
              padding: '8px 24px',
              background: '#4caf50',
              color: '#fff',
              border: 'none',
              borderRadius: 20,
              cursor: 'pointer'
            }}
          >🔄 刷新页面</button>
        </div>
      )
    }
    return this.props.children
  }
}

function App() {
  return (
    <ErrorBoundary>
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/rating/:id/:type" element={<Rating />} />
          <Route path="/interest-groups" element={<InterestGroupPage />} />
          <Route path="/tourism" element={<TourismPage />} />
          <Route path="/tour-group" element={<TourGroupPage />} />
          <Route path="/create-tour-group" element={<CreateTourGroup />} />
          <Route path="/my-skills" element={<MySkillsPage />} />
          <Route path="/accommodation" element={<AccommodationPage />} />
          <Route path="/customer-service" element={<CustomerService />} />
          <Route path="/specialty" element={<SpecialtyPage />} />
          <Route path="/tourism-service" element={<TourismServicePage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/longevity-stories" element={<LongevityStories />} />
          <Route path="/neighbor-recommendations" element={<NeighborRecommendations />} />
          <Route path="/twelve-scenic-spots" element={<TwelveScenicSpots />} />
          <Route path="/agent-chat" element={<AgentChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/merchant-register" element={<MerchantRegister />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
    </ErrorBoundary>
  )
}

export default App
