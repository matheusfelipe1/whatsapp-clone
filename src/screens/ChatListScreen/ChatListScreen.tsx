import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatListItem } from '../../components/ChatListItem';
import { EmptyView, ErrorView, LoadingView } from '../../components/StateViews';
import type { ChatSummary } from '../../models/Chat';
import type { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { useChatListViewModel } from '../../viewmodels/useChatListViewModel';

type ChatListNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ChatList'>;

export function ChatListScreen(): React.JSX.Element {
  const navigation = useNavigation<ChatListNavigationProp>();
  const { chats, isLoading, isError, isRefreshing, onRefresh, onSelectChat } =
    useChatListViewModel(navigation);

  if (isLoading) {
    return <LoadingView />;
  }

  if (isError) {
    return <ErrorView message="Could not load your chats." onRetry={onRefresh} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <FlatList
        data={chats}
        keyExtractor={(item: ChatSummary) => item.id}
        renderItem={({ item }) => (
          <ChatListItem chat={item} onPress={() => onSelectChat(item)} />
        )}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<EmptyView message="No conversations yet." />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
});
