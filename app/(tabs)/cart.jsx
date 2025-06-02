import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { 
  Animated, 
  Image, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity 
} from 'react-native';

const Cart = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;  
  const slideAnim = useRef(new Animated.Value(20)).current; 

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/cart.gif')} 
        style={styles.image} 
      />

      <Animated.Text
        style={[
          styles.animatedText,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        Nothing is in your cart yet!
      </Animated.Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          router.push('/(tabs)/home')
        }}
      >
        <Text style={styles.buttonText}>Explore More</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
  animatedText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#279695',
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#279695',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
