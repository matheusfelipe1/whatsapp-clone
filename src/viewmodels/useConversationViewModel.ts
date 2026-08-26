import { useEffect, useState } from 'react';
import { useMarkChatAsReadMutation } from '../data/queries/useMarkChatAsReadMutation';
import { useMessagesQuery } from '../data/queries/useMessagesQuery';
import { useSendMessageMutation } from '../data/queries/useSendMessageMutation';
import { draftStorage } from '../services/storage/draftStorage';
import { useChatUiStore } from '../store/useChatUiStore';

export function useConversationViewModel(chatId: string) {
  const { data, isLoading, isError } = useMessagesQuery(chatId);
  const sendMessageMutation = useSendMessageMutation(chatId);
  const markChatAsReadMutation = useMarkChatAsReadMutation();
  const setActiveChatId = useChatUiStore(state => state.setActiveChatId);

  const [draftText, setDraftText] = useState(() => draftStorage.get(chatId));

  useEffect(() => {
    setActiveChatId(chatId);
    markChatAsReadMutation.mutate(chatId);

    return () => setActiveChatId(null);
    // Only re-run when the chat being viewed changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  const messages = data ?? [];

  function onChangeDraft(text: string): void {
    setDraftText(text);
    draftStorage.set(chatId, text);
  }

  function onSendMessage(): void {
    const text = draftText.trim();
    if (!text) {
      return;
    }
    sendMessageMutation.mutate(text);
    onChangeDraft('');
    setDraftText('');
  }

  return {
    messages,
    isLoading,
    isError,
    draftText,
    onChangeDraft,
    onSendMessage,
    isSending: sendMessageMutation.isPending,
  };
}
