import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '@/assets/icons'
import { router } from 'expo-router'
import { useTheme } from '@/context/ThemeContext'
import { getTheme } from '@/constants/theme'

const BackButton = ({ router }: { router: any }) => {
  const { isDark } = useTheme()
  const theme = getTheme(isDark)

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.back()}
    >
      <Icon name='arrowLeft' size={24} color={theme.colors.text} />
    </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.07)'
  }
})