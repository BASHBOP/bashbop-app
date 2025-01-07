import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme';
import Icon from '@/assets/icons';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: string;
}

export default function EmptyState({ title, message, icon = 'calendar' }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Icon name={icon} size={48} color={theme.colors.textLight} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
}); 