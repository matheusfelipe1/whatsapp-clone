import type { ChatSummary } from '../../models/Chat';
import { initialChats } from './mockData';
import type { ChatService } from './types';

const SIMULATED_LATENCY_MS = 400;

function delay<T>(value: T, ms: number = SIMULATED_LATENCY_MS): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

/**
 * In-memory implementation of {@link ChatService}. Swap this out for a real
 * axios-backed implementation in `src/composition/composition.ts` once a
 * backend exists — consumers only depend on the `ChatService` interface.
 */
export class MockChatService implements ChatService {
  private chats: ChatSummary[] = [...initialChats];

  async getChats(): Promise<ChatSummary[]> {
    const sorted = [...this.chats].sort((a, b) => b.lastMessageAt - a.lastMessageAt);
    return delay(sorted);
  }

  async markChatAsRead(chatId: string): Promise<void> {
    this.chats = this.chats.map(chat =>
      chat.id === chatId ? { ...chat, unreadCount: 0 } : chat,
    );
    return delay(undefined, 100);
  }
  async sendMessage(chatId: string, text: string): Promise<void> {
    // In a real implementation, this would send a message to the backend.
    return delay(undefined, 100);
  }
    async createUserChat(userName: string, avatarColor: string): Promise<ChatSummary> {
    const newChat: ChatSummary = {
      id: `chat-${Date.now()}`,
      name: userName,
      avatarColor,
      lastMessage: '',
      lastMessageAt: Date.now(),
      unreadCount: 0,
    };
    this.chats.push(newChat);
    return delay(newChat);
  }
}
