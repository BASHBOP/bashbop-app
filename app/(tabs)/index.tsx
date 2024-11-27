import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const index = () => {
  return (
    <View style={style.container}>
      <Text style={style.text}>WELCOME TO BASHBOP</Text>
    </View>
  )
}

export default index

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  }
})