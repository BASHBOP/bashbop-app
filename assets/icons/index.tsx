import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

import Login from './Login'
import Home from './home'
import Logout from './Logout'
import ArrowLeft from './ArrowLeft'
import Mail from './Mail'
import Lock from './Lock'
import { getTheme } from '@/constants/theme'
import { useTheme } from '@/context/ThemeContext'

const icons: { [key: string]: React.ComponentType<any> } = {
   home: Home,
   login: Login,
   logout: Logout,
   arrowLeft: ArrowLeft,
   mail: Mail,
   lock: Lock
}

const Icon = ({ name, size, color, strokeWidth, ...props }: { 
  name: string, 
  size?: number, 
  color?: string, 
  strokeWidth?: number 
}) => {
  const { isDark } = useTheme();
  const theme = getTheme(isDark);
  
  const IconComponent = icons[name];
  if (!IconComponent) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>Icon with name: '{name}' not found</Text>
      </View>
    );
  }

  return (
    <IconComponent
      height={size || 24}
      width={size || 24}
      strokeWidth={strokeWidth || 1.9}
      color={color || theme.colors.text}
      {...props}
    />
  );
}

export default Icon