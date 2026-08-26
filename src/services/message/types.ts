import type { Message } from '../../models/Message';

export interface MessageReader {
  getMessages(chatId: string): Promise<Message[]>;
}

export interface MessageSender {
  sendMessage(chatId: string, text: string): Promise<Message>;
}

export type MessageService = MessageReader & MessageSender;
