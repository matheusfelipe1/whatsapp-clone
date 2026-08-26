import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMessageService } from '../../composition/useServices';
import type { ChatSummary } from '../../models/Chat';
import type { Message } from '../../models/Message';
import { generateId } from '../../utils/id';
import { queryKeys } from './queryKeys';

interface MutationContext {
  previousMessages: Message[];
  optimisticMessage: Message;
}

export function useSendMessageMutation(chatId: string) {
  const messageService = useMessageService();
  const queryClient = useQueryClient();

  return useMutation<Message, Error, string, MutationContext>({
    mutationFn: (text: string) => messageService.sendMessage(chatId, text),

    onMutate: async text => {
      await queryClient.cancelQueries({ queryKey: queryKeys.messages(chatId) });

      const previousMessages =
        queryClient.getQueryData<Message[]>(queryKeys.messages(chatId)) ?? [];

      const optimisticMessage: Message = {
        id: generateId('optimistic'),
        chatId,
        text,
        createdAt: Date.now(),
        sender: 'me',
        status: 'sending',
      };

      queryClient.setQueryData<Message[]>(queryKeys.messages(chatId), [
        ...previousMessages,
        optimisticMessage,
      ]);

      return { previousMessages, optimisticMessage };
    },

    onError: (_error, _text, context) => {
      if (context) {
        queryClient.setQueryData(queryKeys.messages(chatId), context.previousMessages);
      }
    },

    onSuccess: (sentMessage, _text, context) => {
      queryClient.setQueryData<Message[]>(queryKeys.messages(chatId), (current = []) =>
        current.map(message =>
          message.id === context?.optimisticMessage.id ? sentMessage : message,
        ),
      );

      queryClient.setQueryData<ChatSummary[]>(queryKeys.chats, (chats = []) =>
        chats
          .map(chat =>
            chat.id === chatId
              ? { ...chat, lastMessage: sentMessage.text, lastMessageAt: sentMessage.createdAt }
              : chat,
          )
          .sort((a, b) => b.lastMessageAt - a.lastMessageAt),
      );
    },
  });
}
