import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import ActionSheet from "react-native-actions-sheet";
import { fullFlights } from '../data';
import FlightCard from '../components/FlightCard';
import Filters from '../components/Filters';

const ResultPage = () => {
  const {
    from,
    to,
    departureDate,
    returnDate,
    adults,
    children,
    infants,
    travelClass,
  } = useLocalSearchParams();

  const actionSheetRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [popularFilters, setPopularFilters] = useState([]);
  const [selectedAirlines, setSelectedAirlines] = useState(['All Airlines']);
  const [filteredFlights, setFilteredFlights] = useState(fullFlights);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    })}`;
  };

  const formatPassengers = () => {
    const counts = [
      `${adults} Adult${adults > 1 ? 's' : ''}`,
      children > 0 ? `${children} Child${children > 1 ? 'ren' : ''}` : '',
      infants > 0 ? `${infants} Infant${infants > 1 ? 's' : ''}` : '',
    ].filter(Boolean);
    return counts.join(', ');
  };

  useEffect(() => {
    const applyFilterLogic = () => {
      let flights = fullFlights;

      // Filter by airline
      if (!selectedAirlines.includes('All Airlines')) {
        flights = flights.filter((f) =>
          selectedAirlines.includes(f.airline.name)
        );
      }

      // Filter by departure time
      if (popularFilters.includes('Morning Departure')) {
        flights = flights.filter((f) => {
          const hour = new Date(f.from.time).getHours();
          return hour >= 5 && hour < 12;
        });
      }

      if (popularFilters.includes('Evening Departure')) {
        flights = flights.filter((f) => {
          const hour = new Date(f.from.time).getHours();
          return hour >= 17 || hour < 5;
        });
      }

      // Filter by stops
      if (popularFilters.includes('1 Stop')) {
        flights = flights.filter((f) => f.stops === 1);
      }

      if (popularFilters.includes('2 Stops')) {
        flights = flights.filter((f) => f.stops === 2);
      }

      setFilteredFlights(flights);
    };

    applyFilterLogic();
  }, [popularFilters, selectedAirlines]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={'black'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        {/* Back & Info */}
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.routeInfo}>
            <Text style={styles.routeText}>{from} → {to}</Text>
            <Text style={styles.subText}>
              {formatDate(departureDate)} | {formatPassengers()} | {travelClass}
            </Text>
          </View>
        </View>

        {/* Filter Button */}
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => actionSheetRef.current?.show()}
        >
          <Ionicons name="options-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 16 }}>
        {filteredFlights.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 32, color: '#999' }}>
            No flights match your filters.
          </Text>
        ) : (
          filteredFlights.map((flight, index) => (
            <FlightCard key={flight.id} flight={flight} index={index} />
          ))
        )}
      </ScrollView>

      <ActionSheet ref={actionSheetRef}>
        <Filters
          onClose={() => actionSheetRef.current?.hide()}
          initialPopular={popularFilters}
          initialAirlines={selectedAirlines}
          setPopularFilters={setPopularFilters}
          setSelectedAirlines={setSelectedAirlines}
        />
      </ActionSheet>
    </View>
  );
};

export default ResultPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    flex: 1,
  },
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
});
