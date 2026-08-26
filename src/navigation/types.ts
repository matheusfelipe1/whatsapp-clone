export type RootStackParamList = {
  ChatList: undefined;
  Conversation: { chatId: string; chatName: string };
  RegisterUser: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
