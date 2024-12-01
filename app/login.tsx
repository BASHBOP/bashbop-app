import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Icon from '@/assets/icons'
import BackButton from '@/components/BackButton'
import { useRouter } from 'expo-router'
import ScreenWrapper from '@/components/ScreenWrapper'
import { widthPercentage } from '@/helpers/Common'

const Login = () => {
  const router = useRouter()
  return (
    <ScreenWrapper>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>  
        <BackButton router={router} />
      </View>
    </ScreenWrapper>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: widthPercentage(5)
  }
})