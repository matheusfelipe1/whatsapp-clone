import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { ChatSummary } from '../models/Chat';
import { colors } from '../theme/colors';
import { formatRelativeTime } from '../utils/formatters';
import { Avatar } from './Avatar';

interface ChatListItemProps {
  chat: ChatSummary;
  onPress: () => void;
}

export function ChatListItem({ chat, onPress }: ChatListItemProps): React.JSX.Element {
  const hasUnread = chat.unreadCount > 0;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <Avatar name={chat.name} color={chat.avatarColor} />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>
            {chat.name}
          </Text>
          <Text style={[styles.time, hasUnread && styles.timeUnread]}>
            {formatRelativeTime(chat.lastMessageAt)}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {chat.lastMessage}
          </Text>
          {hasUnread && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{chat.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    flexShrink: 1,
  },
  time: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  timeUnread: {
    color: colors.accent,
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
    marginRight: 8,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.unreadBadge,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '700',
  },
});
