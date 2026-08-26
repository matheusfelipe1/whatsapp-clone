export type MessageSender = 'me' | 'them';

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read';

export interface Message {
  id: string;
  chatId: string;
  text: string;
  createdAt: number;
  sender: MessageSender;
  status: MessageStatus;
}
