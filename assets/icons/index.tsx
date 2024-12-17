import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Login from './Login'
import Logout from './Logout'
import ArrowLeft from './ArrowLeft'
import Mail from './Mail'
import { theme } from '@/constants/theme'
import Lock from './Lock'
import Home from './home'

const icons: { [key: string]: React.ComponentType<any> } = {
   home: Home,
   login: Login,
   logout: Logout,
   arrowLeft: ArrowLeft,
   mail: Mail,
   lock: Lock
}

const Icon = ({ name, size, color, strokeWidth, ...props }: { name: string, size?: number, color?: string, strokeWidth?: number }) => {
   const IconComponent = icons[name]
   if (!IconComponent) {
      return (
         <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>Icon with name: '{name}' not found</Text>
         </View>
      )
   }

   return (
      <IconComponent
         height={size || 24}
         width={size || 24}
         strokeWidth={strokeWidth || 1.9}
         color={color ||theme.colors.text}
         {...props}
      />)

}

export default Icon

const styles = StyleSheet.create({})