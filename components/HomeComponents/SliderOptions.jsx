import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Animated } from 'react-native';

const SliderOptions = ({ SliderOPtions }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const animations = useRef(
    SliderOPtions.map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(20),
    }))
  ).current;

  useEffect(() => {
    const animatedItems = animations.map(({ opacity, translateY }, index) =>
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          delay: index * 100,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 400,
          delay: index * 100,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.stagger(100, animatedItems).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 17, fontWeight: 'bold', padding: 15}}>Offers</Text>
      <FlatList
        data={SliderOPtions}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.sliderContainer}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          const isActive = index === activeIndex;
          const { opacity, translateY } = animations[index];
          return (
            <TouchableOpacity onPress={() => setActiveIndex(index)} style={styles.optionWrapper} activeOpacity={0.8}>
              <Animated.View
                style={{
                  opacity,
                  transform: [{ translateY }],
                  alignItems: 'center',
                }}
              >
                <item.Icon size={26} color={isActive ? '#247ba0' : '#888'} />
                <Text style={[styles.optionText, isActive && styles.activeText]}>{item.title}</Text>
                {isActive && <View style={styles.underline} />}
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default SliderOptions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  sliderContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  optionWrapper: {
    marginHorizontal: 15,
  },
  optionText: {
    marginTop: 5,
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  activeText: {
    color: '#247ba0',
    fontWeight: 'bold',
  },
  underline: {
    height: 2,
    backgroundColor: 'red',
    width: '100%',
    marginTop: 4,
    borderRadius: 5,
  },
});
