import React, { useRef, useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
} from 'react-native';






const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.7;
const ITEM_HEIGHT = height * 0.55;
const SPACING = 10;

const DisplayCard = ({destinations}) => {
    const loopedData = Array(10).fill(destinations).flat();
  const flatListRef = useRef(null);
  const [scrollX] = useState(new Animated.Value(0));

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(-30)).current;

  useEffect(() => {
    // Fade-down animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Scroll to center of looped list
    setTimeout(() => {
      flatListRef.current.scrollToOffset({
        offset: destinations.length * (ITEM_WIDTH + SPACING),
        animated: false,
      });
    }, 100);
  }, []);

  return (
    <Animated.View
      style={{
        flex: 1,
        justifyContent: 'center',
        opacity: fadeAnim,
        transform: [{ translateY: translateYAnim }],
      }}
    >
      <Animated.FlatList
        ref={flatListRef}
        data={loopedData}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
        bounces={false}
        contentContainerStyle={{
          paddingHorizontal: (width - ITEM_WIDTH) / 2,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        ItemSeparatorComponent={() => <View style={{ width: SPACING }} />}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * (ITEM_WIDTH + SPACING),
            index * (ITEM_WIDTH + SPACING),
            (index + 1) * (ITEM_WIDTH + SPACING),
          ];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.93, 1, 0.93],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View style={[styles.card, { opacity, transform: [{ scale }] }]}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price} Per person</Text>
            </Animated.View>
          );
        }}
      />
    </Animated.View>
  );
};

export default DisplayCard;

const styles = StyleSheet.create({
  card: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 6,
    alignItems: 'center',
    padding: 12,
    marginLeft: -3.5, 
  },
  image: {
    width: '100%',
    height: '75%',
    borderRadius: 16,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
  },
  price: {
    fontSize: 15,
    color: '#555',
    marginTop: 4,
  },
});
