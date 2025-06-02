import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Animated,
  Image,
} from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useRouter } from 'expo-router'

const services = [
  { name: 'Flights', icon: require('../../assets/images/air.png'), route: '/Services/FlightPage' },
  { name: 'Hotels', icon: require('../../assets/images/hotel.png'), route: '/hotels' },
  { name: 'Homestays', icon: require('../../assets/images/homestay.png'), route: '/homestays' },
  { name: 'Villas', icon: require('../../assets/images/building.png'), route: '/villas' },
  { name: 'eSIM', icon: require('../../assets/images/internet.png'), route: '/esim' },
  { name: 'Holiday Packages', icon: require('../../assets/images/luggage.png'), route: '/Services/Holidays' },
  { name: 'Trains', icon: require('../../assets/images/train.png'), route: '/Services/Train' },
  { name: 'Buses', icon: require('../../assets/images/bus.png'), route: '/Services/Bus' },
  { name: 'Cabs', icon: require('../../assets/images/taxi.png'), route: '/cab' },
  { name: 'Charter', icon: require('../../assets/images/helicopter.png'), route: '/Services/Charter' },
  { name: 'Cruise', icon: require('../../assets/images/cruise-ship.png'), route: '/Services/Cruise' },
  { name: 'Forex & Currency', icon: require('../../assets/images/exchange.png'), route: '/Services/Forex' },
  { name: 'Visa', icon: require('../../assets/images/boarding-pass.png'), route: '/Services/Visa' },
  { name: 'Insurance', icon: require('../../assets/images/insurance.png'), route: '/Services/Insurance' },
];


const numColumns = 4
const cardSize = Dimensions.get('window').width / numColumns - 16

const Service = () => {
  const [showAll, setShowAll] = useState(false);

   const router = useRouter()

  const handlePress = (route) => {
    console.log(route)
    router.push(route)
  }

  const rotateAnim = useRef(new Animated.Value(0)).current

  const toggleShow = () => {
    Animated.timing(rotateAnim, {
      toValue: showAll ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
    setShowAll(!showAll)
  }

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })

  const displayedServices = showAll ? services : services.slice(0, 8)

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {displayedServices.map((item, index) => (
          <AnimatedCard key={index} icon={item.icon} name={item.name} index={index} onPress={() => handlePress(item.route)} />
        ))}
      </View>

      <Pressable onPress={toggleShow} style={styles.showMoreContainer}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Icon name="chevron-down" size={30} color="#1E88E5" />
        </Animated.View>
      </Pressable>
    </View>
  )
}

const AnimatedCard = ({ icon, name, index,onPress }) => {
  const scale = useRef(new Animated.Value(1)).current
  const translateY = useRef(new Animated.Value(20)).current
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const delay = index * 50

    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        delay,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start()
  }

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} style={{ width: cardSize }}  onPress={onPress}>
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale }, { translateY }],
            opacity,
          },
        ]}
      >
        <View style={styles.iconShadowWrapper}>
          <Image source={icon} style={styles.iconImage} resizeMode="contain" />
        </View>
        <Text style={styles.label} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
      </Animated.View>
    </Pressable>
  )
}

export default Service

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    flex: 1,
   
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  iconShadowWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: 'transparent',
    borderRadius: 16,
    padding: 6,
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  showMoreContainer: {  
    alignItems: 'center',
  },
  showMoreText: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '600',
    color: '#1E88E5',
  },
})
