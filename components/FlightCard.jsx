import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const FlightCard = ({ flight, index = 0 }) => {
  const [expanded, setExpanded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, []);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Taxes
  const taxes = {
    UDF: 152,
    YR: 50,
    K3: 110,
    OtherTaxes: 236,
  };

  const sampleFlight = {
  from: "Delhi",
  to: "Chandigarh",
  fromCode: "DEL",
  toCode: "IXC",
  date: "Tue-03 Jun 2025",
  departureTime: "9:30 PM",
  arrivalTime: "10:25 PM",
  duration: "0h 55m",
  airline: "Indigo",
  flightNumber: "6E-2194",
  class: "Economy",
  checkin: "15 Kilograms",
  cabin: "7 KG",
  image:'https://play-lh.googleusercontent.com/zG1e9Pdw27RYpUo_TpSZcD-zjCeShkN5pxwgy7L-e9hra170T_SpBzcUc5nsBu3gWQ'
};

  // Calculate total price = base price + sum of taxes
  const basePrice = flight.price;
  const totalTaxes = Object.values(taxes).reduce((a, b) => a + b, 0);
  const totalPrice = basePrice + totalTaxes;

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <TouchableOpacity style={styles.card} onPress={toggleExpand} activeOpacity={0.8}>
        <View style={styles.topRow}>
          <Image source={{ uri: flight.airline.logo }} style={styles.logo} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.airlineName}>{flight.airline.name}</Text>
            <Text style={styles.flightNumber}>Flight: {flight.id}</Text>
          </View>
          <Text style={styles.price}>₹ {basePrice}</Text>
        </View>

        <View style={styles.timeRow}>
          <View style={styles.timeBlock}>
            <Text style={styles.time}>{formatTime(flight.from.time)}</Text>
            <Text style={styles.code}>{flight.from.code}</Text>
          </View>

          <View style={styles.middleBlock}>
            <Text style={styles.duration}>{flight.duration}</Text>
            <Ionicons name="airplane" size={20} color="#888" />
          </View>

          <View style={styles.timeBlock}>
            <Text style={styles.time}>{formatTime(flight.to.time)}</Text>
            <Text style={styles.code}>{flight.to.code}</Text>
          </View>
        </View>

        {expanded && (
          <View style={styles.details}>
            <View style={styles.infoBlock}>
              <Text style={styles.sectionTitle}>Terminal Information</Text>
              <View style={styles.detailRow}>
                <Ionicons name="business-outline" size={20} color="#3b5998" />
                <Text style={styles.detailText}>
                  {flight.from.terminal} → {flight.to.terminal}
                </Text>
              </View>
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.sectionTitle}>Flight Services</Text>
              <View style={styles.detailRow}>
                <MaterialIcons name="luggage" size={20} color="#3b5998" />
                <Text style={styles.detailText}>Check-in: {flight.checkIn}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="bed-outline" size={20} color="#3b5998" />
                <Text style={styles.detailText}>Cabin: {flight.cabin}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="restaurant-outline" size={20} color="#3b5998" />
                <Text style={styles.detailText}>Meals: {flight.meals}</Text>
              </View>
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.sectionTitle}>Amenities</Text>
              {flight.amenities.length === 0 ? (
                <Text style={[styles.detailText, { fontStyle: 'italic', color: '#777' }]}>
                  No additional amenities.
                </Text>
              ) : (
                flight.amenities.map((item, index) => (
                  <View key={index} style={styles.detailRow}>
                    <Ionicons name="checkmark-circle-outline" size={20} color="#4CAF50" />
                    <Text style={styles.detailText}>{item}</Text>
                  </View>
                ))
              )}
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.sectionTitle}>Tax Breakdown</Text>
              {Object.entries(taxes).map(([key, value]) => (
                <View style={styles.taxRow} key={key}>
                  <Text style={styles.taxLabel}>{key}:</Text>
                  <Text style={styles.taxValue}>{value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.infoBlock}>
              <View style={styles.priceRow}>
                <Text style={styles.basePrice}>Base Price:</Text>
                <Text style={styles.basePriceValue}>₹ {basePrice}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.totalPrice}>Total Price:</Text>
                <Text style={styles.totalPriceValue}>₹ {totalPrice}</Text>
              </View>
            </View>

            <TouchableOpacity
                onPress={() => 
                  router.push({
                    pathname: '/FlightPages/BookNow',
                    params: {
                      flight: JSON.stringify(sampleFlight),
                    },
                  })
                }
                activeOpacity={0.7}
              >
              <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.bookButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <MaterialCommunityIcons 
                  name="airplane-takeoff"
                  size={20}
                  color="#fff"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.bookButtonText}>Book Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  airlineName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  flightNumber: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a73e8',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    alignItems: 'center',
  },
  timeBlock: {
    alignItems: 'center',
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
  },
  code: {
    fontSize: 12,
    color: '#666',
  },
  middleBlock: {
    alignItems: 'center',
  },
  duration: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  details: {
    marginTop: 16,
    paddingTop: 12,
  },
  infoBlock: {
    backgroundColor: '#f9faff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3b5998',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    marginLeft: 12,
    color: '#333',
    flexShrink: 1,
  },
  taxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  taxLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  taxValue: {
    fontSize: 14,
    color: '#555',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  basePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  basePriceValue: {
    fontSize: 14,
    color: '#444',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a73e8',
  },
  totalPriceValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a73e8',
  },
  bookButton: {
    flexDirection: 'row', 
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default FlightCard;
