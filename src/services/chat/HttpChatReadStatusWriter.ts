import { httpClient } from '../http/httpClient';
import type { ChatReadStatusWriter } from './types';

/** Persists the "read" status of a chat via the REST API. */
export class HttpChatReadStatusWriter implements ChatReadStatusWriter {
  sendMessage(chatId: string, text: string): Promise<void> {
    return httpClient.post(`/chats/${chatId}/messages`, { text }).then(() => {});
  }
  
  async markChatAsRead(chatId: string): Promise<void> {
    await httpClient.patch(`/chats/${chatId}`, { unreadCount: 0 });
  }
}
