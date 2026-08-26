import { ChatServiceImpl } from '../services/chat/ChatServiceImpl';
import { HttpChatReader } from '../services/chat/HttpChatReader';
import { HttpChatReadStatusWriter } from '../services/chat/HttpChatReadStatusWriter';
import type { ChatService } from '../services/chat/types';
import { MockMessageService } from '../services/message/MockMessageService';
import type { MessageService } from '../services/message/types';

/**
 * Single wiring point for the app's dependencies (Dependency Inversion).
 * Everything else depends on the `ChatService`/`MessageService` interfaces,
 * so replacing these mock singletons with real axios-backed implementations
 * later only requires editing this file.
 */
export const chatService: ChatService = new ChatServiceImpl(
  new HttpChatReader(),
  new HttpChatReadStatusWriter(),
);
export const messageService: MessageService = new MockMessageService();
