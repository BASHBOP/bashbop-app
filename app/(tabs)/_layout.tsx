import { Tabs } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import Icon from '@/assets/icons';

export default function TabLayout() {
  const iconColor = useThemeColor({}, 'icon');
  const selectedIconColor = useThemeColor({}, 'tabIconSelected');

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: selectedIconColor,
      }}>
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => <Icon name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: 'Scanner',
          tabBarIcon: ({ color }) => <Icon name="qrcode" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Icon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
} 