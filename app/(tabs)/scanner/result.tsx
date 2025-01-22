import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Button from '@/components/Button';
import { useTheme } from '@/context/ThemeContext';
import { getTheme } from '@/constants/theme';

const getStyles = (theme: ReturnType<typeof getTheme>) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  text: {
    color: theme.colors.text,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
  }
});

const ScannerResult = () => {
  const router = useRouter();
  const { ticketData } = useLocalSearchParams<{ ticketData: string }>();
  const { isDark } = useTheme();
  const theme = getTheme(isDark);
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{ticketData}</Text>
      <Button 
        title="Done" 
        onPress={() => router.back()} 
        style={styles.button}
      />
    </View>
  );
};

export default ScannerResult; 