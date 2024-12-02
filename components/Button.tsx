import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import { heightPercentage } from '@/helpers/Common';
import Loading from './Loading';
import { theme } from '@/constants/theme';

const Button = (
   {
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
   }
) => {

   const shadownStyle = {
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 10
      },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4
   };


   if (loading) {
      return (
         <View style={[styles.button, style, {backgroundColor: 'white'}]}>
            <Loading size={loadingSize as 'large'} color={loadingColor} />
         </View>
      )
   }

   return (
      <Pressable
         onPress={onPress}
         style={[styles.button, style, hasShadow && shadownStyle]}
      >
         <Text style={styles.text}>{title}</Text>
      </Pressable>
   )
}

export default Button

const styles = StyleSheet.create({
   button: {
      backgroundColor: theme.colors.primary,
      height: heightPercentage(6.6),
      justifyContent: 'center',
      alignItems: 'center',
      borderCurve: 'continuous',
      borderRadius: theme.radius.xl,
   },
   text: {
      color: '#000',
      fontSize: heightPercentage(2.5),
      fontWeight: 'bold',
   },
})   