/**
 * AI文本润色服务
 * 使用后端API进行文本润色
 */

// 润色类型
export type PolishType = 'general' | 'title' | 'description';

// 润色请求
export interface PolishRequest {
  text: string;
  type: PolishType;
}

// 润色响应
export interface PolishResponse {
  original: string;
  polished: string;
  suggestions?: string[];
}

// API基础URL（开发模式下为空，使用相对路径）
const API_BASE = '';

/**
 * 调用AI润色API
 * @param text 要润色的文本
 * @param type 润色类型
 * @returns 润色后的文本
 */
export async function polishText(text: string, type: PolishType = 'general'): Promise<string> {
  try {
    const response = await fetch(`${API_BASE}/api/ai/polish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, type }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: '润色失败' }));
      throw new Error(error.detail || '润色请求失败');
    }

    const data: PolishResponse = await response.json();
    return data.polished;
  } catch (error) {
    console.error('AI润色失败:', error);
    // 如果API调用失败，返回原始文本并提示用户
    throw error;
  }
}

/**
 * 检查是否可以使用AI润色功能
 * @returns 是否有网络连接
 */
export function canUsePolish(): boolean {
  // 在开发模式下总是可以使用
  return true;
}
