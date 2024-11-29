import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

const Loading = ({size="large" as "large" | "small", color=Colors.light.background}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={size} color={color} />  
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})