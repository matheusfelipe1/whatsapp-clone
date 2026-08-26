import { MockChatService } from '../src/services/chat/MockChatService';

describe('MockChatService', () => {
  it('returns chats sorted by most recent message first', async () => {
    const service = new MockChatService();

    const chats = await service.getChats();

    const timestamps = chats.map(chat => chat.lastMessageAt);
    const sortedDescending = [...timestamps].sort((a, b) => b - a);
    expect(timestamps).toEqual(sortedDescending);
  });

  it('clears the unread count when a chat is marked as read', async () => {
    const service = new MockChatService();
    const [firstChat] = await service.getChats();
    expect(firstChat.unreadCount).toBeGreaterThan(0);

    await service.markChatAsRead(firstChat.id);

    const chatsAfter = await service.getChats();
    const updatedChat = chatsAfter.find(chat => chat.id === firstChat.id);
    expect(updatedChat?.unreadCount).toBe(0);
  });
});
