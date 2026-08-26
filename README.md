# WhatsApp Clone (playground)

This is **not** an attempt to build a pixel-perfect WhatsApp clone. It's a personal
playground to practice React Native CLI and try out a **Spec Driven Development**
workflow (spec → rules → design → tasks) with an AI coding assistant, using a chat
app as the excuse.

Scope on purpose is small: just a **Chat List** and a **Conversation** screen.
Everything else (auth, calls, stories, groups, media, push notifications...) is
explicitly out of scope — see [spec/01-requirements.md](spec/01-requirements.md).

## Spec

The project follows Spec Driven Development. Read these in order:

- [spec/01-requirements.md](spec/01-requirements.md) — what the app does (and doesn't do)
- [spec/02-rules.md](spec/02-rules.md) — architecture/technical rules (MVVM, SOLID, layer boundaries)
- [spec/03-design-spec.md](spec/03-design-spec.md) — folder structure and data flow
- [spec/04-tasks.md](spec/04-tasks.md) — what's done vs. what's left to build

## Stack

MVVM · Zustand (UI state) · TanStack Query (server state/cache) · axios (HTTP) ·
MMKV (local storage) · React Navigation (native stack) · composition hooks for DI.

Chats currently read/write from a local `json-server` (`db.json`) via
`ChatServiceImpl`/`HttpChatReader`/`HttpChatReadStatusWriter`. Messages still use
an in-memory mock (`MockMessageService`) — see [spec/04-tasks.md](spec/04-tasks.md)
for what's left to wire up.

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### 1. Install dependencies

```sh
npm install

# iOS only, first time or after native dependency changes
cd ios && bundle install && bundle exec pod install && cd ..
```

### 2. (Optional) Start the mock API

Chats are served locally via `json-server`:

```sh
npx json-server db.json --port 3001
```

`src/services/http/httpClient.ts` points at `http://localhost:3001` (works from
the iOS Simulator). On the Android emulator, use `http://10.0.2.2:3001` instead.

### 3. Start Metro

```sh
npm start
```

### 4. Build and run the app

```sh
# iOS
npm run ios

# Android
npm run android
```

### Checks

```sh
npx tsc --noEmit
npx eslint src App.tsx __tests__
npx jest
```

# Troubleshooting

If you're having issues getting the above steps to work, see the React Native
[Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
