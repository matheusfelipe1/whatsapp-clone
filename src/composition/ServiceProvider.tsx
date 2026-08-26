import React, { createContext, type PropsWithChildren, useMemo } from 'react';
import type { ChatService } from '../services/chat/types';
import type { MessageService } from '../services/message/types';
import * as defaultComposition from './composition';

export interface Services {
  chatService: ChatService;
  messageService: MessageService;
}

export const ServicesContext = createContext<Services | null>(null);

interface ServiceProviderProps {
  /** Allows overriding services (e.g. in tests) instead of the default singletons. */
  services?: Partial<Services>;
}

export function ServiceProvider({
  services,
  children,
}: PropsWithChildren<ServiceProviderProps>): React.JSX.Element {
  const value = useMemo<Services>(
    () => ({
      chatService: services?.chatService ?? defaultComposition.chatService,
      messageService: services?.messageService ?? defaultComposition.messageService,
    }),
    [services],
  );

  return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>;
}
