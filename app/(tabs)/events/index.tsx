import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import ScreenWrapper from '@/components/ScreenWrapper';
import { useTheme } from '@/context/ThemeContext';
import { getTheme } from '@/constants/theme';
import Icon from '@/assets/icons';
import { useEvents } from '@/hooks/useEvents';

type EventCategory = 'all' | 'music' | 'sports' | 'arts' | 'tech';

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  category: Exclude<EventCategory, 'all'>;
}

const CATEGORIES: EventCategory[] = ['all', 'music', 'sports', 'arts', 'tech'];

function Events(): JSX.Element {
  const router = useRouter();
  const { isDark } = useTheme();
  const theme = getTheme(isDark);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('all');
  const { events, loading, error } = useEvents();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      padding: 16,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: theme.radius.md,
      padding: 8,
      marginBottom: 16,
    },
    searchInput: {
      flex: 1,
      marginLeft: 8,
      color: theme.colors.text,
    },
    categoriesContainer: {
      marginBottom: 16,
    },
    categoryButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginRight: 8,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.card,
    },
    categoryButtonActive: {
      backgroundColor: theme.colors.primary,
    },
    categoryText: {
      color: theme.colors.text,
      fontSize: 14,
    },
    categoryTextActive: {
      color: theme.colors.textLight,
    },
    eventCard: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.radius.md,
      padding: 16,
      marginHorizontal: 16,
      marginBottom: 12,
    },
    eventTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 4,
    },
    eventInfo: {
      fontSize: 14,
      color: theme.colors.textLight,
      marginBottom: 2,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    errorText: {
      color: theme.colors.error,
      textAlign: 'center',
    },
  });

  const filteredEvents = events?.filter((event: Event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (error) {
    return (
      <ScreenWrapper>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading events: {error}</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color={theme.colors.text} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search events..."
              placeholderTextColor={theme.colors.textLight}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          <FlatList<EventCategory>
            horizontal
            data={CATEGORIES}
            renderItem={({ item: category }) => (
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive
                ]}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <FlatList<Event>
          data={filteredEvents}
          renderItem={({ item: event }) => (
            <TouchableOpacity
              style={styles.eventCard}
              onPress={() => router.push(`/(tabs)/events/${event.id}` as any)}
            >
              <Text style={styles.eventTitle}>{event.name}</Text>
              <Text style={styles.eventInfo}>{event.date}</Text>
              <Text style={styles.eventInfo}>{event.location}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ScreenWrapper>
  );
}

export default Events; 