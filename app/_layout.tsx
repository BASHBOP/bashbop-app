import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
     <Stack
        screenOptions={{
        headerShown: false,
     }}
     >
      <Text>_layout</Text>
    </Stack>
  )
}

export default _layout