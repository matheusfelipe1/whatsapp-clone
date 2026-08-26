import type { ChatSummary } from '../../models/Chat';

export interface ChatReader {
  getChats(): Promise<ChatSummary[]>;
  createUserChat(userName: string, avatarColor: string): Promise<ChatSummary>;
}

export interface ChatReadStatusWriter {
    markChatAsRead(chatId: string): Promise<void>;
    sendMessage(chatId: string, text: string): Promise<void>;
}


export type ChatService = ChatReader & ChatReadStatusWriter;
