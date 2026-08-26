import type { Message } from '../../models/Message';
import { generateId } from '../../utils/id';
import { initialMessagesByChat } from './mockData';
import type { MessageService } from './types';

const SIMULATED_LATENCY_MS = 300;

function delay<T>(value: T, ms: number = SIMULATED_LATENCY_MS): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

/**
 * In-memory implementation of {@link MessageService}. Swap this out for a
 * real axios-backed implementation in `src/composition/composition.ts` once
 * a backend exists — consumers only depend on the `MessageService` interface.
 */
export class MockMessageService implements MessageService {
  private messagesByChat: Record<string, Message[]> = { ...initialMessagesByChat };

  async getMessages(chatId: string): Promise<Message[]> {
    const messages = this.messagesByChat[chatId] ?? [];
    return delay([...messages].sort((a, b) => a.createdAt - b.createdAt));
  }

  async sendMessage(chatId: string, text: string): Promise<Message> {
    const message: Message = {
      id: generateId('msg'),
      chatId,
      text,
      createdAt: Date.now(),
      sender: 'me',
      status: 'sent',
    };

    const existing = this.messagesByChat[chatId] ?? [];
    this.messagesByChat[chatId] = [...existing, message];

    return delay(message);
  }
}
