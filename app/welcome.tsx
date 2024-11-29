import ScreenWrapper from "@/components/ScreenWrapper";
import { heightPercentage, widthPercentage } from "@/helpers/Common";
import { StatusBar, Text, View, StyleSheet, Image } from "react-native";


const Welcome = () => {

   return (
      <ScreenWrapper bg={'#ffffff'}>
         <StatusBar barStyle="dark-content" />
         <View style={styles.container}>
            <Image source={require('../assets/images/organiser.gif')} style={styles.welcomeImage} />
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Welcome to the App!</Text>
         </View>
      </ScreenWrapper>
   )

}

export default Welcome;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      paddingHorizontal: widthPercentage(4)
   },
   welcomeImage: {
      height: heightPercentage(30),
      width: widthPercentage(100),
      alignSelf: 'center',
   }
});