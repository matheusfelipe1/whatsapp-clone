export type RootStackParamList = {
  ChatList: undefined;
  Conversation: { chatId: string; chatName: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
