import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import moment from 'moment';
import ActionSheet from 'react-native-actions-sheet';
import Filters from '../components/Filters';
import { busTrips } from '../data';
import BusFilter from '../components/BusActionSheet/BusFilter';
import BusDetails from '../components/BusActionSheet/BusDetails';

const BusSearchResult = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const filterSheetRef = useRef(null);
  const detailsSheetRef = useRef(null);

  const [selectedBus, setSelectedBus] = useState(null);
  const [filteredTrips, setFilteredTrips] = useState(busTrips);
  const [priceRange, setPriceRange] = useState([0, 2000]);
const [acOnly, setAcOnly] = useState(null);
const [selectedSellers, setSelectedSellers] = useState([]);
const [timeSlot, setTimeSlot] = useState(null);


const applyFilters = ({ priceRange, acOnly, sellers, timeSlot }) => {
  let filtered = busTrips;

  if (priceRange) {
    filtered = filtered.filter(
      (trip) => trip.price >= priceRange[0] && trip.price <= priceRange[1]
    );
  }

  if (acOnly !== null) {
    filtered = filtered.filter((trip) =>
      acOnly ? trip.busType.toLowerCase().includes('ac') : true
    );
  }

  if (sellers && sellers.length > 0) {
    filtered = filtered.filter((trip) => sellers.includes(trip.name));
  }

  if (timeSlot) {
    filtered = filtered.filter((trip) => {
      const hour = parseInt(trip.routes[0]?.time.split(':')[0], 10);
      switch (timeSlot) {
        case 'morning':
          return hour >= 5 && hour < 12;
        case 'afternoon':
          return hour >= 12 && hour < 17;
        case 'evening':
          return hour >= 17 && hour < 21;
        case 'night':
          return hour >= 21 || hour < 5;
        default:
          return true;
      }
    });
  }

  setFilteredTrips(filtered);
};


  const from = params.from || 'Unknown';
  const to = params.to || 'Unknown';
  const date = params.date || moment().format('D MMM, ddd, YYYY');

  const formatDate = (d) => {
    return moment(d, 'D MMM, ddd, YYYY').format('DD MMM YYYY');
  };

  const openDetailsSheet = (item) => {
    setSelectedBus(item);
    detailsSheetRef.current?.show();
  };

  const BusCard = ({ item, index }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <View style={styles.cardTop}>
          <View>
            <Text style={styles.busName}>{item.name}</Text>
            <Text style={styles.busType}>{item.busType}</Text>
          </View>
          <Text style={styles.price}>₹ {item.price}</Text>
        </View>

        <View style={styles.timingRow}>
          <Text style={styles.time}>{item.routes[0]?.time}</Text>
          <Text style={styles.duration}>⟶ {item.durationHours}h</Text>
          <Text style={styles.time}>
            {item.routes[item.routes.length - 1]?.time}
          </Text>
        </View>

        <Text style={styles.routeText}>
          {item.routes[0]?.stop} → {item.routes[item.routes.length - 1]?.stop}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.seatsLeft}>{item.seatsAvailable} Seats Left</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.rating}>⭐ {item.rating}</Text>
            <TouchableOpacity onPress={() => openDetailsSheet(item)}>
              <Text style={styles.detailsButton}>Details<AntDesign name="down" size={12} color="#1976d2" /></Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={{ padding: 20, flex: 1 ,backgroundColor:'white'}}>
      <View style={styles.headerCard}>
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.routeInfo}>
            <Text style={styles.routeText}>{from} → {to}</Text>
            <Text style={styles.subText}>{formatDate(date)}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => filterSheetRef.current?.show()}
        >
          <Ionicons name="options-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {filteredTrips.length === 0 ? (
  <View style={styles.emptyState}>
    <Text style={styles.emptyText}>😕 No buses match your filters.</Text>
    <Text style={styles.emptySubText}>Try changing price, time or AC options.</Text>
  </View>
) : (
  <FlatList
    data={filteredTrips}
    keyExtractor={(item) => item.id}
    renderItem={({ item, index }) => <BusCard item={item} index={index} />}
    contentContainerStyle={{ paddingBottom: 50 }}
    showsVerticalScrollIndicator={false}
  />
)}


      {/* Filter Sheet */}
      <ActionSheet ref={filterSheetRef}>
        <BusFilter
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            acOnly={acOnly}
            setAcOnly={setAcOnly}
            selectedSellers={selectedSellers}
            setSelectedSellers={setSelectedSellers}
            timeSlot={timeSlot}
            setTimeSlot={setTimeSlot}
            onClose={() => filterSheetRef.current?.hide()}
            applyFilters={applyFilters}
            />

      </ActionSheet>

      {/* Details Sheet */}
      <ActionSheet ref={detailsSheetRef}>
       <BusDetails  bus={selectedBus} onClose={() => detailsSheetRef.current?.hide()}/>
      </ActionSheet>
    </View>
  );
};

export default BusSearchResult;

const styles = StyleSheet.create({
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 12,
  },
  routeInfo: {
    flexShrink: 1,
  },
  routeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  subText: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  filterButton: {
    backgroundColor: '#279695',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: '#eee',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  busName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  busType: {
    fontSize: 13,
    color: '#777',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#279695',
  },
  timingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  time: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  duration: {
    fontSize: 13,
    color: '#888',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seatsLeft: {
    fontSize: 13,
    color: '#d32f2f',
  },
  rating: {
    fontSize: 13,
    color: '#ffa000',
    marginRight: 12,
  },
  detailsButton: {
    fontSize: 13,
    color: '#1976d2',
    fontWeight: '500',
    textDecorationLine:'underline',
  },
  emptyState: {
  alignItems: 'center',
  marginTop: 50,
},
emptyText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
},
emptySubText: {
  fontSize: 13,
  color: '#666',
  marginTop: 6,
  textAlign: 'center',
  paddingHorizontal: 20,
},

});
