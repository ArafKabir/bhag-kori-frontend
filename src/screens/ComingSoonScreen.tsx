import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, Animated, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function ComingSoonScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0.8,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [fadeAnim, scaleAnim]);
  return (
    <LinearGradient
      colors={['#201A47', '#40407A', '#19A1BD']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.centerBox,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={require('../assets/AppLogo/logo.png')} // 👈 your app logo here
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Coming Soon</Text>
        <Text style={styles.subtitle}>
          This feature is under development. Stay tuned!
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 25,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
  subtitle: {
    color: '#E0E0E0',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 22,
  },
});
