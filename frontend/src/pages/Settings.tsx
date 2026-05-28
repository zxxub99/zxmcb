import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  List,
  Switch,
  Dialog,
  Toast,
  NavBar,
  Button,
  Card,
  Avatar,
  Space
} from 'antd-mobile';
import {
  BellOutline,
  LockOutline,
  EyeOutline,
  CloseCircleOutline,
  GlobalOutline,
  QuestionCircleOutline,
  ExclamationCircleOutline,
  RightOutline,
  SoundOutline,
  MessageOutline,
  UserSetOutline,
  DeleteOutline,
  FileOutline,
  CheckCircleOutline,
  LocationOutline
} from 'antd-mobile-icons';
import styles from './Settings.module.css';

const Settings = () => {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // 设置状态
  const [settings, setSettings] = useState({
    pushEnabled: true,
    soundEnabled: true,
    vibrationEnabled: true,
    locationEnabled: true,
    allowSearch: true,
    allowRecommend: true
  });

  // 模拟用户信息
  const userInfo = {
    nickname: '张三',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=avatar1'
  };

  const handleToggle = (key: keyof typeof settings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    Toast.show({
      content: value ? '已开启' : '已关闭',
      icon: 'success'
    });
  };

  const handleLogout = () => {
    Toast.show({
      content: '正在退出登录...',
      icon: 'loading'
    });
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const handleClearCache = () => {
    Dialog.confirm({
      title: '清除缓存',
      content: '确定要清除本地缓存吗？这不会删除您的账号数据。',
      confirmText: '清除',
      onConfirm: () => {
        Toast.show({
          content: '缓存已清除',
          icon: 'success'
        });
      }
    });
  };

  const handleAbout = () => {
    Dialog.alert({
      title: '关于钟祥莫愁帮',
      content: (
        <div className={styles.aboutContent}>
          <p>版本：1.0.0</p>
          <p>钟祥莫愁帮是一款专注于钟祥本地的综合服务社交平台，致力于帮助邻里之间实现资源共享、互助互帮。</p>
        </div>
      ),
      confirmText: '知道了'
    });
  };

  return (
    <div className={styles.container}>
      <NavBar 
        left={<span onClick={() => navigate(-1)}>返回</span>}
        onBack={() => navigate(-1)}
      >
        设置
      </NavBar>

      <div className={styles.content}>
        {/* 用户信息卡片 */}
        <Card className={styles.userCard}>
          <div className={styles.userInfo} onClick={() => navigate('/edit-profile')}>
            <Avatar 
              src={userInfo.avatar} 
              style={{ '--size': '60px' } as React.CSSProperties}
            />
            <div className={styles.userDetail}>
              <div className={styles.nickname}>{userInfo.nickname}</div>
              <div className={styles.editHint}>点击编辑资料</div>
            </div>
            <RightOutline className={styles.arrowIcon} />
          </div>
        </Card>

        {/* 通知设置 */}
        <Card className={styles.section}>
          <div className={styles.sectionTitle}>
            <BellOutline className={styles.sectionIcon} />
            通知设置
          </div>
          <List>
            <List.Item
              prefix={<MessageOutline />}
              extra={
                <Switch
                  checked={settings.pushEnabled}
                  onChange={(checked) => handleToggle('pushEnabled', checked)}
                />
              }
            >
              推送通知
            </List.Item>
            <List.Item
              prefix={<SoundOutline />}
              extra={
                <Switch
                  checked={settings.soundEnabled}
                  onChange={(checked) => handleToggle('soundEnabled', checked)}
                />
              }
            >
              声音提醒
            </List.Item>
            <List.Item
              prefix={<GlobalOutline />}
              extra={
                <Switch
                  checked={settings.vibrationEnabled}
                  onChange={(checked) => handleToggle('vibrationEnabled', checked)}
                />
              }
            >
              震动提醒
            </List.Item>
          </List>
        </Card>

        {/* 隐私设置 */}
        <Card className={styles.section}>
          <div className={styles.sectionTitle}>
            <LockOutline className={styles.sectionIcon} />
            隐私设置
          </div>
          <List>
            <List.Item
              prefix={<LocationOutline />}
              extra={
                <Switch
                  checked={settings.locationEnabled}
                  onChange={(checked) => handleToggle('locationEnabled', checked)}
                />
              }
            >
              位置信息
            </List.Item>
            <List.Item
              prefix={<EyeOutline />}
              extra={
                <Switch
                  checked={settings.allowSearch}
                  onChange={(checked) => handleToggle('allowSearch', checked)}
                />
              }
            >
              允许被搜索
            </List.Item>
            <List.Item
              prefix={<UserSetOutline />}
              extra={
                <Switch
                  checked={settings.allowRecommend}
                  onChange={(checked) => handleToggle('allowRecommend', checked)}
                />
              }
            >
              个性化推荐
            </List.Item>
          </List>
        </Card>

        {/* 黑名单 */}
        <Card className={styles.section}>
          <div className={styles.sectionTitle}>
            <CloseCircleOutline className={styles.sectionIcon} />
            黑名单
          </div>
          <List>
            <List.Item
              prefix={<CheckCircleOutline />}
              extra={<RightOutline />}
              onClick={() => Toast.show('跳转到黑名单管理')}
            >
              管理黑名单
            </List.Item>
          </List>
        </Card>

        {/* 其他设置 */}
        <Card className={styles.section}>
          <div className={styles.sectionTitle}>
            <FileOutline className={styles.sectionIcon} />
            其他
          </div>
          <List>
            <List.Item
              prefix={<ExclamationCircleOutline />}
              extra={<RightOutline />}
              onClick={handleClearCache}
            >
              清除缓存
            </List.Item>
            <List.Item
              prefix={<QuestionCircleOutline />}
              extra={<RightOutline />}
              onClick={() => Toast.show('跳转到帮助中心')}
            >
              帮助与反馈
            </List.Item>
            <List.Item
              prefix={<FileOutline />}
              extra={<RightOutline />}
              onClick={handleAbout}
            >
              关于我们
            </List.Item>
          </List>
        </Card>

        {/* 退出登录 */}
        <div className={styles.logoutSection}>
          <Button 
            block 
            color="danger" 
            size="large"
            onClick={() => setShowLogoutDialog(true)}
          >
            <Space>
              <DeleteOutline />
              退出登录
            </Space>
          </Button>
        </div>

        {/* 协议链接 */}
        <div className={styles.agreements}>
          <span onClick={() => Toast.show('跳转到用户协议')}>用户协议</span>
          <span className={styles.divider}>|</span>
          <span onClick={() => Toast.show('跳转到隐私政策')}>隐私政策</span>
        </div>
      </div>

      {/* 退出登录确认对话框 */}
      <Dialog
        visible={showLogoutDialog}
        title="退出登录"
        content="确定要退出当前账号吗？"
        closeOnAction
        onClose={() => setShowLogoutDialog(false)}
        actions={[
          { key: 'cancel', text: '取消' },
          { key: 'confirm', text: '确定', onClick: handleLogout }
        ]}
      />
    </div>
  );
};

export default Settings;
