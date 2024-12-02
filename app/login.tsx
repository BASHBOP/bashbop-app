import { Alert, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'

import Icon from '@/assets/icons'
import BackButton from '@/components/BackButton'
import { useRouter } from 'expo-router'
import ScreenWrapper from '@/components/ScreenWrapper'
import { heightPercentage, widthPercentage } from '@/helpers/Common'
import { theme } from '@/constants/theme'
import Input from '@/components/Input'
import Button from '@/components/Button'

const Login = () => {
  const router = useRouter();

  const emailRef = useRef<string | null>(null);
  const passwordRef = useRef<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    //validate login
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Login', 'all fields are required')
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
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>

        {/* form */}
        <View style={styles.form}>
          <Text
            style={{
              fontSize: heightPercentage(1.5), color: theme.colors.text
            }}
          >
            Please login to continue
          </Text>
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

          <Text style={styles.forgotPassword}>
            Forgot password?
          </Text>

          <Button title="Login" onPress={onSubmit} loading={loading} />

          {/* footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have account?
            </Text>
            <Pressable
              onPress={() => router.push('/signUp')}
            >
              <Text style={[styles.footerText, { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold as 'medium' }]}>Sign up</Text>
            </Pressable>
          </View>
        </View>
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
  },
  welcomeText: {
    fontSize: heightPercentage(4),
    fontWeight: theme.fonts.bold as 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
    color: theme.colors.text,
  },
  form: {
    gap: 25
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: theme.fonts.semibold as 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
    color: theme.colors.text,
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
  }
})