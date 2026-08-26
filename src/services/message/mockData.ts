import type { Message } from '../../models/Message';
import { generateId } from '../../utils/id';

const MINUTE = 60 * 1000;

function seedMessages(chatId: string, contactName: string): Message[] {
  const now = Date.now();
  return [
    {
      id: generateId('msg'),
      chatId,
      text: `Hey! This is ${contactName}.`,
      createdAt: now - 40 * MINUTE,
      sender: 'them',
      status: 'read',
    },
    {
      id: generateId('msg'),
      chatId,
      text: 'Hey, how is it going?',
      createdAt: now - 35 * MINUTE,
      sender: 'me',
      status: 'read',
    },
    {
      id: generateId('msg'),
      chatId,
      text: 'All good here, just testing this chat clone 🙂',
      createdAt: now - 30 * MINUTE,
      sender: 'them',
      status: 'read',
    },
  ];
}

export const initialMessagesByChat: Record<string, Message[]> = {
  'chat-1': seedMessages('chat-1', 'Ana'),
  'chat-2': seedMessages('chat-2', 'Bruno'),
  'chat-3': seedMessages('chat-3', 'the family group'),
  'chat-4': seedMessages('chat-4', 'Carla'),
  'chat-5': seedMessages('chat-5', 'Diego'),
};
