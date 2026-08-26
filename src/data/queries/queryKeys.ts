/** Centralized query key factory to avoid typos/duplication across the app. */
export const queryKeys = {
  chats: ['chats'] as const,
  messages: (chatId: string) => ['messages', chatId] as const,
};
