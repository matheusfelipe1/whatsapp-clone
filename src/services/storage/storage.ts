import { createMMKV } from 'react-native-mmkv';

const mmkv = createMMKV({ id: 'whatsapp-clone-storage' });

/**
 * Thin wrapper around MMKV. This is the only file allowed to import
 * `react-native-mmkv` directly (see spec/02-rules.md, section 5).
 */
export const storage = {
  getString(key: string): string | undefined {
    return mmkv.getString(key);
  },
  setString(key: string, value: string): void {
    mmkv.set(key, value);
  },
  delete(key: string): void {
    mmkv.remove(key);
  },
};
