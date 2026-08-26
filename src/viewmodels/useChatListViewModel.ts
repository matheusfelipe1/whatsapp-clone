import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useChatsQuery } from '../data/queries/useChatsQuery';
import type { ChatSummary } from '../models/Chat';
import type { RootStackParamList } from '../navigation/types';

type ChatListNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ChatList'>;

export function useChatListViewModel(navigation: ChatListNavigationProp) {
  const { data, isLoading, isError, refetch, isRefetching } = useChatsQuery();

  const chats = data ?? [];

  function onSelectChat(chat: ChatSummary): void {
    navigation.navigate('Conversation', { chatId: chat.id, chatName: chat.name });
  }

  function onRefresh(): void {
    refetch().catch(() => {});
  }

  return {
    chats,
    isLoading,
    isError,
    isRefreshing: isRefetching,
    onRefresh,
    onSelectChat,
  };
}
