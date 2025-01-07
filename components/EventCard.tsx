import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Event } from '@/api/events';
import { theme } from '@/constants/theme';
import { format } from 'date-fns';
import Icon from '@/assets/icons';

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

export default function EventCard({ event, onPress }: EventCardProps) {
  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'upcoming':
        return theme.colors.primary;
      case 'ongoing':
        return theme.colors.success;
      case 'completed':
        return theme.colors.textLight;
      default:
        return theme.colors.text;
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      {event.imageUrl && (
        <Image source={{ uri: event.imageUrl }} style={styles.image} />
      )}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={[styles.status, { color: getStatusColor(event.status) }]}>
            {event.status}
          </Text>
        </View>
        
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Icon name="calendar" size={16} color={theme.colors.textLight} />
            <Text style={styles.detailText}>
              {format(new Date(event.date), 'MMM dd, yyyy')}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Icon name="location" size={16} color={theme.colors.textLight} />
            <Text style={styles.detailText}>{event.location}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Icon name="ticket" size={16} color={theme.colors.textLight} />
            <Text style={styles.detailText}>
              {event.ticketsSold} / {event.capacity} tickets sold
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    flex: 1,
  },
  status: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: theme.colors.textLight,
  },
}); 