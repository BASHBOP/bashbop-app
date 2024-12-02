import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { theme } from '@/constants/theme'
import { heightPercentage } from '@/helpers/Common'

import { TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  containerStyles?: object;
  icon?: React.ReactNode;
  inputRef?: React.RefObject<TextInput>;
}

const Input = (props: InputProps) => {
  return (
    <View style={[styles.container, props.containerStyles]}>
        {
           props.icon
        }
        <TextInput
           style={{ flex: 1 }}
           placeholderTextColor={theme.colors.textLight}
           ref={props.inputRef}
           {...props}
        />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      height: heightPercentage(7.2),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0.4,
      borderColor: theme.colors.text,
      borderRadius: theme.radius.xxl,
      borderCurve: 'continuous',
      paddingHorizontal: 18,
      gap: 12
   }
})