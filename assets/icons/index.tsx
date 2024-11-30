import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './home'
import { Colors } from '@/constants/Colors'

const icons: { [key: string]: React.ComponentType<any> } = {
   home: Home,
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
         color={color || 'black'}
         {...props}
      />)

}

export default Icon

const styles = StyleSheet.create({})