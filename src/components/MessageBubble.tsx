import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Message } from '../models/Message';
import { colors } from '../theme/colors';
import { formatMessageTime } from '../utils/formatters';

interface MessageBubbleProps {
  message: Message;
}

const STATUS_LABEL: Record<Message['status'], string> = {
  sending: '🕓',
  sent: '✓',
  delivered: '✓✓',
  read: '✓✓',
};

export function MessageBubble({ message }: MessageBubbleProps): React.JSX.Element {
  const isOutgoing = message.sender === 'me';

  return (
    <View style={[styles.row, isOutgoing ? styles.rowOutgoing : styles.rowIncoming]}>
      <View style={[styles.bubble, isOutgoing ? styles.bubbleOutgoing : styles.bubbleIncoming]}>
        <Text style={styles.text}>{message.text}</Text>
        <View style={styles.meta}>
          <Text style={styles.time}>{formatMessageTime(message.createdAt)}</Text>
          {isOutgoing && (
            <Text style={[styles.status, message.status === 'read' && styles.statusRead]}>
              {STATUS_LABEL[message.status]}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  rowOutgoing: {
    alignItems: 'flex-end',
  },
  rowIncoming: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  bubbleOutgoing: {
    backgroundColor: colors.bubbleOutgoing,
  },
  bubbleIncoming: {
    backgroundColor: colors.bubbleIncoming,
  },
  text: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4,
  },
  time: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  status: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  statusRead: {
    color: '#4FC3F7',
  },
});
