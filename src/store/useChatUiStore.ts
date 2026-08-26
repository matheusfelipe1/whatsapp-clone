import { create } from 'zustand';

interface ChatUiState {
  /** Id of the chat currently open on screen, if any. UI state only. */
  activeChatId: string | null;
  setActiveChatId: (chatId: string | null) => void;
}

export const useChatUiStore = create<ChatUiState>(set => ({
  activeChatId: null,
  setActiveChatId: chatId => set({ activeChatId: chatId }),
}));
