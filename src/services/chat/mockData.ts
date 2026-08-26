import type { ChatSummary } from '../../models/Chat';

const HOUR = 60 * 60 * 1000;

export const initialChats: ChatSummary[] = [
  {
    id: 'chat-1',
    name: 'Ana Souza',
    avatarColor: '#F28B82',
    lastMessage: 'See you tomorrow!',
    lastMessageAt: Date.now() - 1 * HOUR,
    unreadCount: 2,
  },
  {
    id: 'chat-2',
    name: 'Bruno Lima',
    avatarColor: '#7BAAF7',
    lastMessage: 'Sent the files, check it out.',
    lastMessageAt: Date.now() - 3 * HOUR,
    unreadCount: 0,
  },
  {
    id: 'chat-3',
    name: 'Família 👨‍👩‍👧',
    avatarColor: '#57BB8A',
    lastMessage: 'Mom: dinner at 8pm',
    lastMessageAt: Date.now() - 26 * HOUR,
    unreadCount: 5,
  },
  {
    id: 'chat-4',
    name: 'Carla Mendes',
    avatarColor: '#F6BF26',
    lastMessage: 'Haha that is hilarious',
    lastMessageAt: Date.now() - 48 * HOUR,
    unreadCount: 0,
  },
  {
    id: 'chat-5',
    name: 'Diego Alves',
    avatarColor: '#BA68C8',
    lastMessage: 'Ok, talk later',
    lastMessageAt: Date.now() - 72 * HOUR,
    unreadCount: 0,
  },
];
