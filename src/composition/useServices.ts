import { useContext } from 'react';
import type { ChatService } from '../services/chat/types';
import type { MessageService } from '../services/message/types';
import { ServicesContext } from './ServiceProvider';

function useServices() {
  const services = useContext(ServicesContext);
  if (!services) {
    throw new Error('useServices must be used within a <ServiceProvider>');
  }
  return services;
}

/** Composition hook: injects the active `ChatService` implementation. */
export function useChatService(): ChatService {
  return useServices().chatService;
}

/** Composition hook: injects the active `MessageService` implementation. */
export function useMessageService(): MessageService {
  return useServices().messageService;
}
