import { useQuery } from '@tanstack/react-query';
import { useChatService } from '../../composition/useServices';
import { queryKeys } from './queryKeys';

export function useChatsQuery() {
  const chatService = useChatService();

  return useQuery({
    queryKey: queryKeys.chats,
    queryFn: () => chatService.getChats(),
  });
}
