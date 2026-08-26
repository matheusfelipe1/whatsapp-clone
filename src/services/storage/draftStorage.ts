import { storage } from './storage';

const draftKey = (chatId: string): string => `draft:${chatId}`;

/** Persists in-progress composer text per chat so it survives app restarts. */
export const draftStorage = {
  get(chatId: string): string {
    return storage.getString(draftKey(chatId)) ?? '';
  },
  set(chatId: string, text: string): void {
    if (text) {
      storage.setString(draftKey(chatId), text);
    } else {
      storage.delete(draftKey(chatId));
    }
  },
};
