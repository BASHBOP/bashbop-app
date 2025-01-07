import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import { heightPercentage } from '@/helpers/Common';
import { theme } from '@/constants/theme';

const Button = ({
  title = 'Button',
  onPress = () => { },
  style = {},
  textStyle = {},
  disabled = false,
  loading = false,
  hasShadow = true,
  loadingColor = Colors.dark.background,
  loadingSize = 'large',
  loadingStyle = {},
  ...props
}) => {

  const shadowStyle = {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4
  };

  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, style, hasShadow && shadowStyle, disabled && styles.disabled]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size={loadingSize === 'large' ? 'large' : 'small'} color={loadingColor} style={loadingStyle} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    height: heightPercentage(6.6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.xl,
  },
  text: {
    color: '#000',
    fontSize: heightPercentage(2.5),
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: theme.colors.disabled,
  }
});