import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useChatService } from '../../composition/useServices';
import type { ChatSummary } from '../../models/Chat';
import { queryKeys } from './queryKeys';

export function useMarkChatAsReadMutation() {
  const chatService = useChatService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chatId: string) => chatService.markChatAsRead(chatId),
    onSuccess: (_result, chatId) => {
      queryClient.setQueryData<ChatSummary[]>(queryKeys.chats, (chats = []) =>
        chats.map(chat => (chat.id === chatId ? { ...chat, unreadCount: 0 } : chat)),
      );
    },
  });
}
