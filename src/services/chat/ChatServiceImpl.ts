import { ChatSummary } from "../../models/Chat";
import { ChatReader, ChatService, ChatReadStatusWriter } from "./types";

export class ChatServiceImpl implements ChatService {
  constructor(private readonly chatReader: ChatReader, private readonly chatReadStatusWriter: ChatReadStatusWriter) {}

  async getChats(): Promise<ChatSummary[]> {
    return this.chatReader.getChats();
  }

  async markChatAsRead(chatId: string): Promise<void> {
    return this.chatReadStatusWriter.markChatAsRead(chatId);
  }
  async sendMessage(chatId: string, text: string): Promise<void> {
    return this.chatReadStatusWriter.sendMessage(chatId, text);
  }
  async createUserChat(userName: string, avatarColor: string): Promise<ChatSummary> {
    return this.chatReader.createUserChat(userName, avatarColor);
  }
}