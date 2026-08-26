import type { ChatSummary } from '../../models/Chat';

export interface ChatReader {
  getChats(): Promise<ChatSummary[]>;
}

export interface ChatReadStatusWriter {
  markChatAsRead(chatId: string): Promise<void>;
}

export type ChatService = ChatReader & ChatReadStatusWriter;
