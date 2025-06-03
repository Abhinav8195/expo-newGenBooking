import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BookNow = () => {
  const [secondsLeft, setSecondsLeft] = useState(5 * 60);
  const { flight } = useLocalSearchParams();

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current; // opacity
  const translateYAnim = useRef(new Animated.Value(30)).current; // position

  if (!flight) {
    return (
      <View style={styles.center}>
        <Text>No flight details provided</Text>
      </View>
    );
  }

  const flightData = JSON.parse(flight);
  console.log(flightData);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  // Animate card on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start();
  }, []);

  const formatTime = () => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Booking Details</Text>
      </View>

      {/* Timer */}
      <View style={styles.timerBox}>
        <Text style={styles.timerText}>Time left: {formatTime()}</Text>
      </View>

      {/* Flight Card with animation */}
      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ translateY: translateYAnim }],
          },
        ]}
      >
        <View style={styles.sectionHeader}>
            <Image source={require('../../assets/images/takeoff.png')} style={{width:35,height:35,borderRadius:99,backgroundColor:'white',padding:5,resizeMode:'contain',borderWidth:2,borderColor:'#ffedd5'}}/>
          <Text style={styles.sectionHeaderText}>Flight Detail</Text>
        </View>

        <View
          style={{
            backgroundColor: '#4b5563',
            width: 60,
            padding: 5,
            marginTop: -8,
            borderBottomRightRadius: 10,
          }}
        >
          <Text style={styles.departLabel}>Depart</Text>
        </View>

        <View style={styles.flightRow}>
          <View style={styles.routeBox}>
            <MaterialCommunityIcons name="airplane" size={24} color="black" />
            <Text style={styles.routeText}>
              {flightData.from} - {flightData.to} |
            </Text>
            <Text style={styles.dateText}>{flightData.date}</Text>
          </View>
        </View>

        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Image source={{ uri: flightData.image }} style={{ width: 40, height: 40, resizeMode: 'cover' }} />
          <View>
            <Text>{flightData.airline}</Text>
            <Text>{flightData.flightNumber}</Text>
            <Text>{flightData.class}</Text>
          </View>
        </View>

        <View style={styles.flightInfoRow}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.timeText}>{flightData.departureTime}</Text>
            <Text style={styles.airportText}>
              {flightData.from} ({flightData.fromCode})
            </Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={styles.durationText}>{flightData.duration}</Text>
            <Image source={require('../../assets/images/flying.gif')} style={{ width: 40, height: 40 }} />
            <Text style={styles.refundableText}>REFUNDABLE</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={styles.timeText}>{flightData.arrivalTime}</Text>
            <Text style={styles.airportText}>
              {flightData.to} ({flightData.toCode})
            </Text>
          </View>
        </View>

        <View style={styles.airlineInfo}>
          <Text style={styles.airlineName}>
            {flightData.airline} {flightData.flightNumber}
          </Text>
          <Text style={styles.classText}>{flightData.class} Class</Text>
        </View>

        <View style={styles.baggageContainer}>
          <Text style={styles.baggageLabel}>Check-in:</Text>
          <Text style={styles.baggageValue}>{flightData.checkin}</Text>
          <Text style={styles.baggageLabel}>Cabin:</Text>
          <Text style={styles.baggageValue}>{flightData.cabin}</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default BookNow;


const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  timerBox: {
    position: 'absolute',
    top: 56,
    right: 10,
    backgroundColor: '#fdecea',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#d32f2f',
  },
  card: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 50,
  },
  sectionHeader: {
    backgroundColor: '#d0dff9',
    borderTopLeftRadius: 6,
    marginBottom: 8,
    padding:20,
    borderTopRightRadius:6,
    flexDirection:'row',
    alignItems:'center',
    gap:10
  },
  sectionHeaderText: {
    fontWeight: '600',
  
  },
  flightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal:20,
    marginTop:20
  },
  departLabel: {
    color: '#666',
    fontWeight: '500',
    color:'#fff',
  },
  routeBox: {
    flex: 1,
   
    flexDirection: 'row',
    alignItems: 'center',
    gap:7
  },
  routeText: {
    fontWeight: '600',
    fontSize: 16,
  },
  dateText: {
    fontSize: 13,
    color: '#666',
  },
  flightInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal:20
  },
  timeText: {
    fontWeight: '600',
    fontSize: 16,
  },
  airportText: {
    fontSize: 12,
    color: 'black',
    fontWeight:'bold'
  },
  durationText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  refundableText: {
    backgroundColor: '#d0f0d0',
    color: '#2e7d32',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 11,
    marginTop: 4,
  },
  airlineInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 20,
  },
  airlineName: {
    fontWeight: '600',
    color: '#000',
  },
  classText: {
    fontSize: 13,
    color: '#555',
  },
  baggageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 20,
  },
  baggageLabel: {
    fontWeight: '500',
    color: '#777',
  },
  baggageValue: {
    fontWeight: '600',
    color: '#000',
  },
});
