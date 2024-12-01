import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Colors } from "@/constants/Colors";
import { theme } from "@/constants/theme";
import { heightPercentage, widthPercentage } from "@/helpers/Common";
import { useRouter } from "expo-router";
import { StatusBar, Text, View, StyleSheet, Image, Pressable } from "react-native";


const Welcome = () => {
   const router = useRouter();   
   
   return (
      <ScreenWrapper bg={'#ffffff'}>
         <StatusBar barStyle="dark-content" />
         <View style={styles.container}>
            {/* Welcome Image */}
            <Image source={require('../assets/images/organiser.gif')} style={styles.welcomeImage} resizeMode='contain' />

            {/* title */}
            <View style={{ gap: 20 }}>
               <Text style={styles.title}>BASHBOP!</Text>
               <Text style={styles.slugan}>
                  Simplifying events, amplifying experiences.
               </Text>
            </View>

            {/* footer */}
            <View style={styles.footer}>
               <Button
                  title="Get Started"
                  style={styles.button}
                  onPress={() => router.push('/signUp')}
               />
            </View>
            <View style={styles.bottomTextContainer}>
               <Text style={styles.loginText}>
                  Already have an account?
               </Text>
               <Pressable
                  onPress={() => router.push('/login')}
               >
                  <Text style={[styles.loginText, { color: Colors.light.tint, fontWeight: '600' }]}> Login</Text>
               </Pressable>

            </View>
         </View>
      </ScreenWrapper>
   )

}

export default Welcome;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      paddingHorizontal: widthPercentage(4)
   },
   title: {
      fontSize: heightPercentage(4),
      fontWeight: '800',
      textAlign: 'center',
      color: Colors.light.text
   },
   slugan: {
      fontSize: heightPercentage(1.7),
      paddingHorizontal: widthPercentage(10),
      textAlign: 'center',
      color: '#333333'
   },
   welcomeImage: {
      height: heightPercentage(30),
      width: widthPercentage(100),
      alignSelf: 'center',
   },
   footer: {
      gap: 30,
      width: '100%',
   },
   button: {
      marginHorizontal: widthPercentage(3),
   },
   bottomTextContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5
   },
   loginText: {
      textAlign: 'center',
      color: theme.colors.text,
      fontSize: heightPercentage(1.6)
   }
});