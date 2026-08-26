import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useChatService } from '../../composition/useServices';
import type { ChatSummary } from '../../models/Chat';
import { queryKeys } from './queryKeys';

interface CreateUserChatInput {
  userName: string;
  avatarColor: string;
}

export function useCreateUserChatMutation() {
  const chatService = useChatService();
  const queryClient = useQueryClient();

  return useMutation<ChatSummary, Error, CreateUserChatInput>({
    mutationFn: ({ userName, avatarColor }) =>
      chatService.createUserChat(userName, avatarColor),

    onSuccess: newChat => {
      queryClient.setQueryData<ChatSummary[]>(queryKeys.chats, (chats = []) =>
        [newChat, ...chats].sort((a, b) => b.lastMessageAt - a.lastMessageAt),
      );
    },
  });
}
