import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'

import Login from './Login'
import Home from './Home'
import Logout from './Logout'
import ArrowLeft from './ArrowLeft'

const icons: { [key: string]: React.ComponentType<any> } = {
   home: Home,
   login: Login,
   logout: Logout,
   arrowLeft: ArrowLeft
}

const Icon = ({ name, size, color, strokeWidth, ...props }: { name: string, size?: number, color: string, strokeWidth?: number }) => {
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
         color={color || Colors.light.tint}
         {...props}
      />)

}

export default Icon

const styles = StyleSheet.create({})