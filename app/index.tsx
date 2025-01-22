import { StyleSheet, Text, View, Image, Dimensions, Animated, ScrollView, TouchableOpacity, PanResponder } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/context/ThemeContext';
import { heightPercentage, widthPercentage } from '@/helpers/Common';

const { width } = Dimensions.get('window');

const FEATURES = [
  {
    title: 'Easy Booking',
    text: 'Book tickets in seconds with our streamlined process'
  },
  {
    title: 'Secure Payments',
    text: 'Your transactions are protected with bank-level security'
  },
  {
    title: 'Instant Access',
    text: 'Get your tickets delivered instantly to your phone'
  }
];

const Landing = () => {
  const router = useRouter();
  const { isDark } = useTheme();
  const theme = getTheme(isDark);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      Animated.spring(scale, {
        toValue: 0.98,
        useNativeDriver: true,
      }).start();
    },
    onPanResponderMove: (_, gesture) => {
      position.setValue(gesture.dx);
    },
    onPanResponderRelease: (_, gesture) => {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();

      if (Math.abs(gesture.dx) > 60) { // Made it easier to swipe
        const newIndex = gesture.dx > 0 
          ? (currentIndex - 1 + FEATURES.length) % FEATURES.length 
          : (currentIndex + 1) % FEATURES.length;
        
        Animated.spring(position, {
          toValue: gesture.dx > 0 ? width : -width,
          useNativeDriver: true,
          tension: 20,
        }).start(() => {
          position.setValue(0);
          setCurrentIndex(newIndex);
        });
      } else {
        Animated.spring(position, {
          toValue: 0,
          useNativeDriver: true,
          tension: 20,
        }).start();
      }
    },
  });

  const nextCard = () => {
    Animated.sequence([
      Animated.spring(scale, {
        toValue: 0.96,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(position, {
      toValue: -width,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      position.setValue(0);
      setCurrentIndex((prev) => (prev + 1) % FEATURES.length);
    });
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const renderFeatureCards = () => {
    return FEATURES.map((feature, index) => {
      const isFirst = index === currentIndex;
      const isSecond = (index === (currentIndex + 1) % FEATURES.length);
      const isThird = (index === (currentIndex + 2) % FEATURES.length);

      if (!isFirst && !isSecond && !isThird) return null;

      const cardStyle = {
        zIndex: isFirst ? 3 : isSecond ? 2 : 1,
        transform: [
          { translateX: isFirst ? position : 0 },
          { 
            translateY: isFirst ? 0 : isSecond ? heightPercentage(2) : heightPercentage(4) 
          },
          { 
            scale: isFirst ? scale : isSecond ? 0.95 : 0.9 
          },
          {
            rotate: isFirst 
              ? position.interpolate({
                  inputRange: [-200, 0, 200],
                  outputRange: ['-10deg', '0deg', '10deg'],
                }) 
              : '0deg'
          }
        ],
        opacity: isFirst ? 1 : isSecond ? 0.8 : 0.6,
      };

      return (
        <Animated.View 
          key={index}
          style={[
            styles.featureItem,
            cardStyle,
            isFirst && styles.firstCard
          ]}
          {...(isFirst ? panResponder.panHandlers : {})}
        >
          <TouchableOpacity 
            activeOpacity={0.9}
            onPress={nextCard}
            style={styles.cardContent}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <View style={styles.indicator}>
                {FEATURES.map((_, i) => (
                  <View 
                    key={i} 
                    style={[
                      styles.dot,
                      i === index && styles.activeDot
                    ]} 
                  />
                ))}
              </View>
            </View>
            <Text style={styles.featureText}>{feature.text}</Text>
          </TouchableOpacity>
        </Animated.View>
      );
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFE600', // Bashbop brand yellow
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: widthPercentage(5),
      paddingTop: heightPercentage(8),
      paddingBottom: heightPercentage(5),
    },
    logoContainer: {
      marginBottom: heightPercentage(4),
    },
    logoText: {
      fontSize: heightPercentage(6),
      fontWeight: theme.fonts.bold as 'bold',
      color: theme.colors.textDark,
      letterSpacing: 2,
    },
    textContainer: {
      alignItems: 'center',
      marginBottom: heightPercentage(4),
    },
    title: {
      fontSize: heightPercentage(4),
      fontWeight: theme.fonts.bold as 'bold',
      color: theme.colors.textDark,
      marginBottom: heightPercentage(2),
      textAlign: 'center',
    },
    subtitle: {
      fontSize: heightPercentage(2.5),
      fontWeight: theme.fonts.semibold as 'bold',
      color: theme.colors.textDark,
      marginBottom: heightPercentage(2),
      textAlign: 'center',
    },
    description: {
      fontSize: heightPercentage(1.8),
      color: theme.colors.text,
      textAlign: 'center',
      paddingHorizontal: widthPercentage(5),
    },
    buttonContainer: {
      width: '100%',
      gap: heightPercentage(2),
      marginBottom: heightPercentage(4),
    },
    button: {
      width: '100%',
    },
    features: {
      width: '100%',
      position: 'relative',
      height: heightPercentage(22),
      marginTop: heightPercentage(2),
    },
    featureItem: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      padding: heightPercentage(2.5),
      borderRadius: theme.radius.xl,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
      position: 'absolute',
      width: '100%',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    firstCard: {
      shadowOpacity: 0.25,
      shadowRadius: 12,
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
    },
    cardContent: {
      width: '100%',
      height: '100%',
      justifyContent: 'space-between',
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: heightPercentage(1.5),
    },
    featureTitle: {
      fontSize: heightPercentage(2.2),
      fontWeight: theme.fonts.bold as 'bold',
      color: theme.colors.textDark,
    },
    featureText: {
      fontSize: heightPercentage(1.8),
      color: theme.colors.text,
      lineHeight: heightPercentage(2.4),
    },
    indicator: {
      flexDirection: 'row',
      gap: 4,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    activeDot: {
      backgroundColor: theme.colors.primary,
      width: 18,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
            <Text style={styles.logoText}>BASHBOP</Text>
          </Animated.View>

          <Animated.View style={[styles.textContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.title}>Welcome to Bashbop</Text>
            <Text style={styles.subtitle}>
              Your Ultimate Event Experience Platform
            </Text>
            <Text style={styles.description}>
              Discover amazing events, buy tickets, and connect with fellow event-goers.
              All in one place.
            </Text>
          </Animated.View>

          <View style={styles.buttonContainer}>
            <Button
              title="Get Started"
              onPress={() => router.push('/signUp')}
              style={styles.button}
            />
            <Button
              title="Login"
              onPress={() => router.push('/login')}
              variant="outline"
              style={styles.button}
            />
          </View>

          <Animated.View style={[styles.features, { opacity: fadeAnim }]}>
            {renderFeatureCards()}
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Landing;