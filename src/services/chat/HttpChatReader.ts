import type { ChatSummary } from '../../models/Chat';
import { httpClient } from '../http/httpClient';
import type { ChatReader } from './types';

/** Reads chats from the REST API (see json-server `db.json`). */
export class HttpChatReader implements ChatReader {

    createUserChat(userName: string, avatarColor: string): Promise<ChatSummary> {
        const newChat: Omit<ChatSummary, 'id'> = {
            name: userName,
            avatarColor,
            lastMessage: '',
            lastMessageAt: Date.now(),
            unreadCount: 0,
        };
        return httpClient.post<ChatSummary>('/chats', newChat).then(response => response.data);
    }


    async getChats(): Promise<ChatSummary[]> {
        const { data } = await httpClient.get<ChatSummary[]>('/chats');
        return data;
    }
}
