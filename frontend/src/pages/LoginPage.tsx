import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

// 模拟用户数据存储（实际项目应连接后端API）
const mockUsers = [
  { phone: '13800138000', password: '123456', nickname: '钟祥游客', avatar: '' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 模拟发送验证码
  const sendCode = () => {
    if (!phone || phone.length !== 11) {
      setError('请输入正确的手机号');
      return;
    }
    setError('');
    alert('验证码已发送至您的手机');
  };

  // 处理登录
  const handleLogin = async () => {
    if (!phone || !password) {
      setError('请输入手机号和密码');
      return;
    }
    setLoading(true);
    setError('');

    // 模拟登录验证
    setTimeout(() => {
      const user = mockUsers.find(u => u.phone === phone && u.password === password);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/profile');
      } else {
        setError('手机号或密码错误');
      }
      setLoading(false);
    }, 1000);
  };

  // 处理注册
  const handleRegister = async () => {
    if (!phone || !password || !confirmPassword || !nickname) {
      setError('请填写完整信息');
      return;
    }
    if (password !== confirmPassword) {
      setError('两次密码输入不一致');
      return;
    }
    if (password.length < 6) {
      setError('密码至少6位');
      return;
    }
    setLoading(true);
    setError('');

    // 模拟注册
    setTimeout(() => {
      const newUser = { phone, password, nickname, avatar: '' };
      mockUsers.push(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/profile');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      {/* 背景装饰 */}
      <div className={styles.bgDecoration}>
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
      </div>

      {/* Logo区域 */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🏠</span>
          <span className={styles.logoText}>莫愁帮</span>
        </div>
        <p className={styles.slogan}>长寿之乡 · 地道钟祥</p>
      </div>

      {/* 表单区域 */}
      <div className={styles.formCard}>
        {/* 切换标签 */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${isLogin ? styles.active : ''}`}
            onClick={() => setIsLogin(true)}
          >
            登录
          </button>
          <button
            className={`${styles.tab} ${!isLogin ? styles.active : ''}`}
            onClick={() => setIsLogin(false)}
          >
            注册
          </button>
        </div>

        {/* 错误提示 */}
        {error && <div className={styles.error}>{error}</div>}

        {/* 登录表单 */}
        {isLogin ? (
          <div className={styles.form}>
            <div className={styles.inputGroup}>
              <span className={styles.inputIcon}>📱</span>
              <input
                type="tel"
                placeholder="请输入手机号"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={11}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <span className={styles.inputIcon}>🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
              <button
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>

            <div className={styles.forgotRow}>
              <label className={styles.remember}>
                <input type="checkbox" defaultChecked />
                <span>记住我</span>
              </label>
              <button className={styles.forgotLink}>忘记密码？</button>
            </div>

            <button
              className={styles.submitBtn}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? '登录中...' : '登录'}
            </button>

            <div className={styles.otherLogin}>
              <span>其他登录方式</span>
              <div className={styles.otherIcons}>
                <button className={styles.otherBtn}>微</button>
                <button className={styles.otherBtn}>Q</button>
              </div>
            </div>
          </div>
        ) : (
          // 注册表单
          <div className={styles.form}>
            <div className={styles.inputGroup}>
              <span className={styles.inputIcon}>📱</span>
              <input
                type="tel"
                placeholder="请输入手机号"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={11}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <span className={styles.inputIcon}>🔤</span>
              <input
                type="text"
                placeholder="请输入昵称"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <span className={styles.inputIcon}>🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="请设置密码（至少6位）"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <span className={styles.inputIcon}>🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="请确认密码"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <span className={styles.inputIcon}>🔢</span>
              <input
                type="text"
                placeholder="请输入验证码"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
                className={styles.input}
                style={{ flex: 1 }}
              />
              <button className={styles.codeBtn} onClick={sendCode}>
                获取验证码
              </button>
            </div>

            <button
              className={styles.submitBtn}
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? '注册中...' : '注册'}
            </button>

            <p className={styles.agreement}>
              注册即表示同意
              <a href="/rules">《用户协议》</a>和
              <a href="/rules">《隐私政策》</a>
            </p>
          </div>
        )}
      </div>

      {/* 返回首页 */}
      <button className={styles.backHome} onClick={() => navigate('/')}>
        ← 返回首页
      </button>
    </div>
  );
}
