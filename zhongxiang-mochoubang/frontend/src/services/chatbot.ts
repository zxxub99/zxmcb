/**
 * 聊天机器人服务
 * 与后端AI机器人对话
 */

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
  timestamp: number;
}

export interface BotInfo {
  bot_id: string;
  bot_name: string;
  bot_avatar: string;
  bot_intro: string;
  online: boolean;
}

// 获取机器人信息
export const getBotInfo = async (): Promise<BotInfo> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/chatbot/info`);
    return response.data;
  } catch (error) {
    // 后端未运行时返回默认信息
    return {
      bot_id: 'bot_mochou',
      bot_name: '小莫愁',
      bot_avatar: '🤖',
      bot_intro: '钟祥莫愁帮智能助手，随时为你解答问题~',
      online: false
    };
  }
};

// 发送消息给机器人
export const sendToBot = async (
  userId: string,
  message: string,
  chatHistory: ChatMessage[] = []
): Promise<string> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/chatbot/chat`, {
      user_id: userId,
      message: message,
      chat_history: chatHistory.map(m => ({
        role: m.role,
        content: m.content
      }))
    });
    return response.data.message;
  } catch (error) {
    // 后端未运行时使用本地模拟回复
    return getLocalBotResponse(message);
  }
};

// 本地模拟机器人回复（后端未运行时使用）
const getLocalBotResponse = (message: string): string => {
  const msg = message.toLowerCase();
  
  const responses: Record<string, string[]> = {
    'greeting': [
      '你好！我是钟祥莫愁帮的智能助手小莫愁，有什么可以帮助你的吗？',
      '嗨！很高兴认识你！我是小莫愁~'
    ],
    'help': [
      '我可以帮你：\n📍 解答关于平台使用的问题\n🛒 介绍闲置物品交易流程\n🤝 说明互助服务的使用方法',
      '有什么想问的尽管说哦！我随时为你服务~'
    ],
    'default': [
      '这个问题我还在学习中，你可以换个方式问我~',
      '让我想想...换个问题试试？',
      '抱歉，我暂时不太理解这个问题。你可以问我关于平台功能、交易流程、积分规则等方面的内容~'
    ]
  };
  
  if (msg.includes('你好') || msg.includes('hi') || msg.includes('hello') || msg.includes('嗨')) {
    return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
  }
  
  if (msg.includes('帮助') || msg.includes('怎么用') || msg.includes('使用')) {
    return responses.help[Math.floor(Math.random() * responses.help.length)];
  }
  
  return responses.default[Math.floor(Math.random() * responses.default.length)];
};

// 常见问题快速回复
export const quickQuestions = [
  '如何使用平台？',
  '如何获得积分？',
  '如何发布闲置物品？',
  '如何发布互助请求？',
  '实名认证有什么好处？',
  '平台使用规则是什么？'
];
