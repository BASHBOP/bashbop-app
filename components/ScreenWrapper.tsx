import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { getTheme } from '@/constants/theme';

interface Props {
  children: React.ReactNode;
  bg?: string;
}

const ScreenWrapper = ({ children, bg }: Props) => {
  const { isDark } = useTheme();
  const theme = getTheme(isDark);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg || theme.colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});