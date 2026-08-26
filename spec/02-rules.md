# Rules (Technical Constraints)

These rules are binding for every contribution to this repository (by the assistant or the user).

## 1. Architecture — MVVM

- **Model**: Plain TypeScript types/entities + services (API/storage access). No React imports.
- **ViewModel**: A custom hook (`use*ViewModel`) that composes Models/services and exposes state + intents (functions) to the View. Contains all business/presentation logic.
- **View**: React components (screens/components). Only render UI from the ViewModel's output and call ViewModel intents. No direct axios/MMKV/Zustand calls, no business logic, no data transformation.
- Views must not import services or repositories directly — only ViewModels.

## 2. State Management — Zustand

- Zustand stores hold **client/UI state** only (e.g., active chat id, composer draft text, connection status).
- Do **not** put server-state (fetched/cached data) in Zustand — that belongs to TanStack Query.
- One store per bounded concern (e.g., `useChatUiStore`), no single giant global store.
- Stores are consumed only through selector hooks to avoid unnecessary re-renders.

## 3. HTTP — axios

- A single configured axios instance lives in `src/services/http/httpClient.ts` (base URL, interceptors, timeouts).
- All network calls go through dedicated service classes/functions in `src/services/*` (e.g., `ChatService`, `MessageService`). No component or hook calls `axios` directly.
- Services return typed domain models, not raw axios responses.

## 4. Caching — TanStack Query

- All server-state reads/writes use `useQuery` / `useMutation` wrapped inside dedicated hooks under `src/data/queries/*` (e.g., `useChatsQuery`, `useSendMessageMutation`).
- Query keys are centralized in a `queryKeys.ts` factory to avoid typos/duplication.
- Optimistic updates for sending messages use `onMutate`/`onError`/`onSettled` per TanStack Query conventions.
- `QueryClient` is created once and provided at the app root.

## 5. Storage — MMKV

- All local persistence goes through a thin wrapper `src/services/storage/storage.ts` (get/set/remove/typed helpers).
- No direct `react-native-mmkv` imports outside that wrapper.
- Used for: lightweight caches, drafts, last-read markers, feature flags — not for large datasets (that's the API/Query layer's job).

## 6. Navigation — React Navigation

- Native Stack Navigator (`@react-navigation/native-stack`) defines routes in `src/navigation/*`.
- Route names and param types are centralized in a typed `RootStackParamList`.
- Screens receive navigation/route props only; navigation logic beyond simple `navigate()` calls belongs in the ViewModel.

## 7. Dependency Injection — Composition Hooks

- No class-based DI container. Dependencies (services, repositories) are created once (singletons) in `src/composition/*` and exposed via plain factory functions or React Context + hooks (e.g., `useChatService()`).
- ViewModels request dependencies via these composition hooks, never by importing a concrete singleton service directly by path inside a component.
- This allows swapping implementations (e.g., mock service vs real API service) in one place for tests or future backend integration.

## 8. Code Quality — SOLID & Clean Code

- **S**: Each module/class/hook has one reason to change (e.g., `ChatService` only talks to the chats API; formatting timestamps lives in a `formatters` util, not in the service).
- **O**: Services are defined behind interfaces (TS `interface`) so a mock implementation can replace the real one without modifying consumers.
- **L**: Any interface implementation (mock/real) must be interchangeable without breaking callers.
- **I**: Prefer small, focused interfaces (`ChatReader`, `MessageSender`) over one giant `IApi` interface.
- **D**: High-level modules (ViewModels) depend on abstractions (interfaces), not concrete implementations; concrete instances are wired in the composition layer.
- Naming: descriptive, no abbreviations; functions small and single-purpose; no dead code or commented-out blocks.
- Formatting/linting enforced via ESLint + Prettier (from the RN template), must pass with no errors before considering a task done.

## 9. Project Structure Rules

- `src/models` — domain types/entities only.
- `src/services` — external concerns: http, storage, mock data.
- `src/data/queries` — TanStack Query hooks.
- `src/store` — Zustand stores.
- `src/composition` — dependency wiring / DI hooks.
- `src/viewmodels` — `use*ViewModel` hooks per screen.
- `src/screens` — one folder per screen containing the View component.
- `src/components` — shared, reusable, presentation-only components.
- `src/navigation` — navigators and route typing.
- `src/utils` — pure helper functions (formatting, id generation, etc.).
- No cross-imports that skip layers (e.g., a screen importing `services` directly).

## 10. Definition of Done for a Task

A task is done when: it compiles with TypeScript strict mode, passes lint, follows the layer rules above, and (where applicable) has the minimal unit test for ViewModel/service logic.
