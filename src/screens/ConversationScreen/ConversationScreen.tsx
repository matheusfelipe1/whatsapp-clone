import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MessageBubble } from '../../components/MessageBubble';
import { ErrorView, LoadingView } from '../../components/StateViews';
import type { Message } from '../../models/Message';
import type { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { useConversationViewModel } from '../../viewmodels/useConversationViewModel';

type ConversationRouteProp = RouteProp<RootStackParamList, 'Conversation'>;

export function ConversationScreen(): React.JSX.Element {
  const route = useRoute<ConversationRouteProp>();
  const { chatId } = route.params;

  const { messages, isLoading, isError, draftText, onChangeDraft, onSendMessage, isSending } =
    useConversationViewModel(chatId);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      {isLoading ? (
        <LoadingView />
      ) : isError ? (
        <ErrorView message="Could not load this conversation." />
      ) : (
        <FlatList
          data={[...messages].reverse()}
          keyExtractor={(item: Message) => item.id}
          renderItem={({ item }) => <MessageBubble message={item} />}
          inverted
          contentContainerStyle={styles.listContent}
        />
      )}

      <View style={styles.composer}>
        <TextInput
          value={draftText}
          onChangeText={onChangeDraft}
          placeholder="Digite uma mensagem"
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
          multiline
        />
        <TouchableOpacity
          onPress={onSendMessage}
          disabled={!draftText.trim() || isSending}
          style={[styles.sendButton, (!draftText.trim() || isSending) && styles.sendButtonDisabled]}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingVertical: 8,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    minHeight: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.background,
    color: colors.textPrimary,
    marginRight: 8,
  },
  sendButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.primary,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: colors.surface,
    fontWeight: '600',
  },
});
