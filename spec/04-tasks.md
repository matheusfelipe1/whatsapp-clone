# Tasks

Legend: [x] done by the assistant in this initial delivery · [ ] left for you.

## Phase 0 — Project bootstrap (done)

- [x] Scaffold React Native CLI TypeScript project (`react-native@0.87`).
- [x] Install and wire: `zustand`, `axios`, `@tanstack/react-query`, `react-native-mmkv` (+ `react-native-nitro-modules`), `@react-navigation/native` + `native-stack`, `react-native-screens`, `react-native-safe-area-context`.
- [x] `pod install` for iOS.
- [x] MVVM folder structure under `src/` (see [03-design-spec.md](./03-design-spec.md)).

## Phase 1 — Chat List (done, mock data)

- [x] `ChatSummary` model.
- [x] `ChatService` interface + `MockChatService`.
- [x] `useChatsQuery` (TanStack Query).
- [x] `useChatListViewModel` (navigation intent, refresh, loading/error state).
- [x] `ChatListScreen` + `ChatListItem` + `Avatar` + shared `StateViews` (loading/error/empty).
- [x] Pull-to-refresh.

## Phase 2 — Conversation (done, mock data)

- [x] `Message` model.
- [x] `MessageService` interface + `MockMessageService`.
- [x] `useMessagesQuery`, `useSendMessageMutation` (optimistic update + rollback), `useMarkChatAsReadMutation`.
- [x] `useConversationViewModel` (draft persisted via MMKV, marks chat as read on open, sets active chat in Zustand store).
- [x] `ConversationScreen` + `MessageBubble` + composer.

## Phase 3 — Wiring (done)

- [x] `RootNavigator` with typed `RootStackParamList` (`ChatList`, `Conversation`).
- [x] `ServiceProvider` + `useChatService`/`useMessageService` composition hooks.
- [x] `App.tsx`: `SafeAreaProvider` → `QueryClientProvider` → `ServiceProvider` → `RootNavigator`.
- [x] Unit tests: `MockChatService` (sorting, mark-as-read); default RN `App.test.tsx` kept green.
- [x] `tsc --noEmit`, ESLint, and Jest all passing.

## Phase 4 — Up to you

- [ ] Run on a device/simulator and visually polish (spacing, fonts, dark mode, real avatars/images).
- [ ] Replace `MockChatService`/`MockMessageService` with real HTTP implementations built on `src/services/http/httpClient.ts`, then swap them in `src/composition/composition.ts`.
- [ ] Add pagination/infinite scroll for long message histories (`useInfiniteQuery`).
- [ ] Add real-time updates (WebSocket/socket.io) instead of the current mock/local-only sending.
- [ ] Add message delivery/read receipts driven by a real backend instead of the static mock status.
- [ ] Add authentication flow (out of scope for this MVP, see [01-requirements.md](./01-requirements.md)).
- [ ] Add end-to-end/component tests for `ChatListScreen`/`ConversationScreen` (e.g. React Native Testing Library).
- [ ] Configure app icons/splash screen and bundle IDs for release builds.

## How to run

```bash
# iOS
cd ios && bundle install && bundle exec pod install && cd ..
npx react-native run-ios

# Android
npx react-native run-android

# Tests / checks
npx tsc --noEmit
npx eslint src App.tsx __tests__
npx jest
```
