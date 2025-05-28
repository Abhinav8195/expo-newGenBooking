import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import DisplayCarrd from '../../components/HolidaysCards/DisplayCarrd';
import DisplayCard from '../../components/HolidaysCards/DisplayCarrd';

const categories = [
  { name: 'Honeymoon', icon: 'heart-multiple' }, 
  { name: 'Pilgrimage', icon: 'mosque' }, 
  { name: 'Ayurveda', icon: 'spa' }, 
  { name: 'Adventure', icon: 'hiking' }, 
  { name: 'Group Departure', icon: 'users' }, 
  { name: 'Leisure', icon: 'beach' }, 
];

const destinationsByCategory = {
  Honeymoon: [
    { name: 'Maldives', price: '₹50,000', image: require('../../assets/images/maldives.jpg') },
    { name: 'Paris', price: '₹60,000', image: require('../../assets/images/paris.jpg') },
    { name: 'Bali', price: '₹45,000', image: require('../../assets/images/bali.jpg') },
  ],
  Pilgrimage: [
    { name: 'Varanasi', price: '₹10,000', image: require('../../assets/images/varanasi.jpg') },
    { name: 'Haridwar', price: '₹12,000', image: require('../../assets/images/haridwar.jpeg') },
    { name: 'Tirupati', price: '₹9,000', image: require('../../assets/images/tirupati.jpeg') },
  ],
  Ayurveda: [
    { name: 'Kerala', price: '₹20,000', image: require('../../assets/images/kerala.jpeg') },
    { name: 'Goa', price: '₹18,000', image: require('../../assets/images/goa.jpg') },
  ],
  Adventure: [
    { name: 'Rishikesh', price: '₹15,000', image: require('../../assets/images/rishikesh.jpg') },
    { name: 'Manali', price: '₹22,000', image: require('../../assets/images/manali.jpg') },
  ],
  'Group Departure': [
    { name: 'Singapore', price: '₹30,000', image: require('../../assets/images/singapore.jpg') },
    { name: 'Dubai', price: '₹28,000', image: require('../../assets/images/dubai.jpg') },
  ],
  Leisure: [
    { name: 'Goa', price: '₹15,000', image: require('../../assets/images/goa.jpg') },
    { name: 'Andaman', price: '₹25,000', image: require('../../assets/images/andn.jpg') },
  ],
};

const Holidays = () => {
  const [selectedCategory, setSelectedCategory] = useState('Honeymoon');

  const screenFade = useRef(new Animated.Value(0)).current;

  const categoryAnims = useRef(categories.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.timing(screenFade, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Staggered fade-in for categories
    const animations = categoryAnims.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        delay: index * 150,
        useNativeDriver: true,
      })
    );
    Animated.stagger(100, animations).start();
  }, []);

  return (
    <Animated.ScrollView
      style={[{ flex: 1, backgroundColor: 'white', opacity: screenFade }]}
      contentContainerStyle={{ padding: 20 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Holiday Packages</Text>
        <TouchableOpacity>
          <Ionicons name="language" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 20 }}
      >
        {categories.map((item, index) => {
          const isSelected = selectedCategory === item.name;

          return (
            <Animated.View
              key={index}
              style={{
                opacity: categoryAnims[index],
                transform: [
                  {
                    translateY: categoryAnims[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              }}
            >
              <TouchableOpacity
                onPress={() => setSelectedCategory(item.name)}
                style={[
                  styles.categoryItem,
                  {
                    borderColor: isSelected ? '#007AFF' : '#ccc',
                    backgroundColor: 'transparent',
                  },
                ]}
              >
                <View style={styles.iconWrapper}>
                  {item.icon === 'mosque' ||
                  item.icon === 'spa' ||
                  item.icon === 'hiking' ||
                  item.icon === 'users' ? (
                    <FontAwesome5
                      name={item.icon}
                      size={16}
                      color={isSelected ? '#007AFF' : '#666'}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={18}
                      color={isSelected ? '#007AFF' : '#666'}
                    />
                  )}
                </View>
                <Text
                  style={[
                    styles.categoryText,
                    { color: isSelected ? '#007AFF' : '#333' },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>

      {/* Content */}
      <View style={styles.saleContainer}>
        <Text style={styles.saleTitle}>
          Long Weekend Sale! Grab up to 25% off
        </Text>
        <Text style={styles.saleCode}>Use Code: LONGWEEKEND</Text>
      </View>

      <View>
       <DisplayCard
  destinations={destinationsByCategory[selectedCategory] || []}
/>
      </View>
    </Animated.ScrollView>
  );
};

export default Holidays;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
  },
  iconWrapper: {
    marginRight: 6,
  },
  categoryText: {
    fontWeight: '500',
  },
  saleContainer: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saleTitle: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  saleCode: {
    color: '#555',
    fontWeight: '600',
  },
});
