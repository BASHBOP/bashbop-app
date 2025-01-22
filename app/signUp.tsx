import { Alert, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'

import Icon from '@/assets/icons'
import BackButton from '@/components/BackButton'
import { useRouter } from 'expo-router'
import ScreenWrapper from '@/components/ScreenWrapper'
import { heightPercentage, widthPercentage } from '@/helpers/Common'
import { useTheme } from '@/context/ThemeContext'
import { getTheme } from '@/constants/theme'
import Input from '@/components/Input'
import Button from '@/components/Button'

const getStyles = (theme: ReturnType<typeof getTheme>) => StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: widthPercentage(5)
  },
  welcomeText: {
    fontSize: heightPercentage(4),
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  form: {
    gap: 25
  },
  formText: {
    fontSize: heightPercentage(1.5),
    color: theme.colors.text
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
  footerText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: heightPercentage(1.6)
  },
  signInText: {
    textAlign: 'center',
    color: theme.colors.primaryDark,
    fontSize: heightPercentage(1.6),
    fontWeight: '600'
  }
})

const SignUp = () => {
  const router = useRouter();
  const { isDark } = useTheme();
  const theme = getTheme(isDark);
  const styles = getStyles(theme);

  const emailRef = useRef<string | null>(null);
  const passwordRef = useRef<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    //validate login
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('SignUp', 'all fields are required')
      return
    }
    setLoading(true)
  }

  return (
    <ScreenWrapper>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>  
        <BackButton router={router} />

        {/* welcome */}
        <View>
          <Text style={styles.welcomeText}>Lets,</Text>
          <Text style={styles.welcomeText}>Get started</Text>
        </View>

        {/* form */}
        <View style={styles.form}>
          <Text style={styles.formText}>
            Please enter the details to create new Account
          </Text>

          <Input
            icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
            placeholder='Enter your name'
            onChangeText={value=> emailRef.current = value}
          />

          <Input
            icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
            placeholder='Enter your email'
            onChangeText={value=> emailRef.current = value}
          />

          <Input
            icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
            placeholder='Enter your password'
            secureTextEntry
            onChangeText={value=> passwordRef.current = value}
          />

          <Button title="SignUp" onPress={onSubmit} loading={loading} />

          {/* footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?
            </Text>
            <Pressable
              onPress={() => router.push('/login')}
            >
              <Text style={styles.signInText}>Sign In</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default SignUp