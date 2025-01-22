import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '@/context/ThemeContext';

const RootLayout = () => {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ThemeProvider>
  );
};

export default RootLayout;