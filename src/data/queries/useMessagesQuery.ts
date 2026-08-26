import { useQuery } from '@tanstack/react-query';
import { useMessageService } from '../../composition/useServices';
import { queryKeys } from './queryKeys';

export function useMessagesQuery(chatId: string) {
  const messageService = useMessageService();

  return useQuery({
    queryKey: queryKeys.messages(chatId),
    queryFn: () => messageService.getMessages(chatId),
    enabled: Boolean(chatId),
  });
}
