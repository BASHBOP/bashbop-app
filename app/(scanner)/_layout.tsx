import { Stack } from 'expo-router';

export default function ScannerLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Scan Ticket',
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="history" 
        options={{ 
          title: 'Scan History'
        }} 
      />
    </Stack>
  );
}