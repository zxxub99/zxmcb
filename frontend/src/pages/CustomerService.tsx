import { useState } from 'react';
import { NavBar } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { SendOutline, SoundOutline, CloseOutline, PhonebookOutline } from 'antd-mobile-icons';
import styles from './CustomerService.module.css';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  time: string;
}

const quickQuestions = [
  '如何发布闲置物品？',
  '如何加入旅游组团？',
  '如何发布互助请求？',
  '钟祥有哪些特产？',
  '明显陵开放时间？',
  '如何联系客服？',
];

const botResponses: Record<string, string> = {
  '如何发布闲置物品？': '您好！发布闲置物品很简单：\n1. 点击首页"我有闲置"按钮\n2. 上传物品照片\n3. 填写物品名称、描述、价格\n4. 选择分类后发布即可',
  '如何加入旅游组团？': '加入旅游组团步骤：\n1. 进入"乐聚团"页面\n2. 浏览感兴趣的组团\n3. 点击"加入"按钮\n4. 等待团长审核通过即可',
  '如何发布互助请求？': '发布互助请求：\n1. 点击"需要服务"按钮\n2. 选择互助类型\n3. 填写详细描述\n4. 设置积分奖励\n5. 发布等待响应',
  '钟祥有哪些特产？': '钟祥特产丰富：\n🍜 蟠龙菜 - 明代宫廷御膳\n🍵 钟祥葛粉 - "南葛北参"美誉\n🍚 钟祥米茶 - 消暑解腻\n🍠 9里红薯 - 香甜可口\n🥜 富硒花生 - 养生佳品',
  '明显陵开放时间？': '明显陵景区信息：\n📍 地址：钟祥市城东郊\n🕐 开放时间：8:30-17:30\n💰 门票：60元/人\n⭐ 评分：4.8分\n🏆 世界文化遗产',
  '如何联系客服？': '联系我们：\n📞 客服热线：400-888-8888\n💬 在线客服：点击右下角咨询\n📧 邮箱：service@zxmcb.com\n⏰ 服务时间：9:00-18:00',
};

const defaultResponse = '您好！我是钟祥莫愁帮智能客服小莫，很高兴为您服务！请问有什么可以帮助您的？您可以点击下方的快捷问题，或直接输入您的问题。';

export default function CustomerService() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: defaultResponse,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputText,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // 模拟机器人回复延迟
    setTimeout(() => {
      const response = botResponses[inputText] || botResponses[Object.keys(botResponses).find(key => 
        inputText.includes(key.split('？')[0]) || key.includes(inputText)
      ) || ''] || '抱歉，我不太理解您的问题。请尝试点击下方的快捷问题，或拨打客服热线400-888-8888咨询。';

      const botMessage: Message = {
        id: Date.now() + 1,
        type: 'bot',
        content: response,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
    setTimeout(handleSend, 100);
  };

  if (isMinimized) {
    return (
      <div className={styles.minimizedWidget} onClick={() => setIsMinimized(false)}>
        <PhonebookOutline className={styles.minimizedIcon} />
        <span className={styles.unreadBadge}>1</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <NavBar
        className={styles.navBar}
        left={
          <span onClick={() => navigate(-1)}>
            <CloseOutline className={styles.closeIcon} />
          </span>
        }
        right={
          <SoundOutline className={styles.soundIcon} />
        }
      >
        <div className={styles.titleContainer}>
          <span className={styles.title}>智能客服</span>
          <span className={styles.subtitle}>小莫为您服务</span>
        </div>
      </NavBar>

      <div className={styles.serviceHeader}>
        <div className={styles.serviceInfo}>
          <div className={styles.avatar}>莫</div>
          <div className={styles.info}>
            <div className={styles.serviceName}>钟祥莫愁帮智能客服</div>
            <div className={styles.serviceStatus}>
              <span className={styles.onlineDot}></span>
              在线服务中
            </div>
          </div>
        </div>
        <button className={styles.minimizeBtn} onClick={() => setIsMinimized(true)}>
          收起
        </button>
      </div>

      <div className={styles.quickQuestions}>
        <div className={styles.quickTitle}>猜你想问</div>
        <div className={styles.quickList}>
          {quickQuestions.map((q, index) => (
            <button
              key={index}
              className={styles.quickBtn}
              onClick={() => handleQuickQuestion(q)}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.messageList}>
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`${styles.message} ${msg.type === 'user' ? styles.userMessage : styles.botMessage}`}
          >
            {msg.type === 'bot' && (
              <div className={styles.botAvatar}>莫</div>
            )}
            <div className={styles.messageContent}>
              <div className={styles.messageBubble}>{msg.content}</div>
              <div className={styles.messageTime}>{msg.time}</div>
            </div>
            {msg.type === 'user' && (
              <div className={styles.userAvatar}>
                <span>我</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.inputArea}>
        <input
          type="text"
          className={styles.input}
          placeholder="请输入您的问题..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
        />
        <button className={styles.sendBtn} onClick={handleSend}>
          <SendOutline />
        </button>
      </div>
    </div>
  );
}
