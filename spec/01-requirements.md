# Requirements

## 1. Product Scope

A WhatsApp clone mobile app (React Native CLI) limited to two features:

1. **Chat List** — list of conversations (contacts/groups) with last message preview.
2. **Conversation** — a single chat thread where the user can view and send messages.

Out of scope (explicitly NOT included): authentication, contacts sync, media/voice/video calls, status/stories, groups management, push notifications, settings, profile editing, end-to-end encryption.

## 2. Functional Requirements

### 2.1 Chat List Screen
- FR-1: Display a scrollable list of chats, each showing: avatar, contact name, last message snippet, last message timestamp, unread message count badge.
- FR-2: List is sorted by most recent message first.
- FR-3: Tapping a chat item navigates to the Conversation screen for that chat.
- FR-4: Pull-to-refresh reloads the chat list from the data source.
- FR-5: Show a loading state while chats are being fetched.
- FR-6: Show an empty state when there are no chats.
- FR-7: Show an error state with a retry action when the chat list fails to load.

### 2.2 Conversation Screen
- FR-8: Display the chat header with contact name and avatar.
- FR-9: Display messages in a scrollable list, oldest to newest, grouped visually by sender (incoming vs outgoing).
- FR-10: Each message shows its text content, timestamp, and delivery status (sent/delivered/read) for outgoing messages.
- FR-11: A text input + send button lets the user compose and send a new message.
- FR-12: Sending a message optimistically appends it to the list before server/mock confirmation.
- FR-13: New/incoming messages update the conversation in real time (simulated via polling or mock socket for this phase).
- FR-14: Opening a conversation marks its messages as read and clears the unread badge on the Chat List.

## 3. Non-Functional Requirements

- NFR-1: **Architecture** — MVVM (Model-View-ViewModel), see [02-rules.md](./02-rules.md).
- NFR-2: **State management** — Zustand stores for cross-cutting app state (e.g., chats, active conversation, session).
- NFR-3: **Networking** — axios-based HTTP client, isolated behind a service layer (never called directly from views/components).
- NFR-4: **Caching / server-state** — TanStack Query manages all server-state fetching, caching, retries, and invalidation.
- NFR-5: **Persistence** — MMKV for fast local key-value storage (e.g., cached last-viewed chat, draft messages, auth token placeholder).
- NFR-6: **Navigation** — React Navigation (native stack) for screen transitions.
- NFR-7: **Dependency Injection** — Composition hooks (custom hooks that compose/provide dependencies) instead of manual instantiation inside components.
- NFR-8: **Code quality** — SOLID principles and Clean Code; consistent folder structure; no business logic inside React components.
- NFR-9: **Performance** — Chat list and message list must use virtualization (`FlatList`) and avoid unnecessary re-renders.
- NFR-10: **Testability** — ViewModels and services must be unit-testable independent of React rendering.

## 4. Acceptance Criteria (Phase 1 — what "start" means)

The initial delivery (done by the assistant) is considered complete when:
- The project builds and runs on iOS and/or Android via React Native CLI.
- Navigation between Chat List and Conversation screens works.
- Chat List renders mock data through the full MVVM + Query + Zustand + DI pipeline.
- Conversation screen renders mock messages and supports sending a new (optimistic, local) message.
- The architecture/folders are established so the user can plug in a real backend later by only touching the `services` layer.
