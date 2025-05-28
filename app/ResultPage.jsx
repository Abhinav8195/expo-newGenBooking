import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import ActionSheet from "react-native-actions-sheet";
import {fullFlights} from '../data';
import FlightCard from '../components/FlightCard';

const ResultPage = () => {
  const {
    from,
    to,
    departureDate,
    returnDate,
    adults,
    children,
    infants,
    travelClass
  } = useLocalSearchParams();
   const actionSheetRef = useRef(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short'
    })}`;
  };

  const [loading, setLoading] = useState(false);

// Use When api intrgration will be done
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={'black'}/>
      </View>
    );
  }

  const formatPassengers = () => {
    const counts = [
      `${adults} Adult${adults > 1 ? 's' : ''}`,
      children > 0 ? `${children} Child${children > 1 ? 'ren' : ''}` : '',
      infants > 0 ? `${infants} Infant${infants > 1 ? 's' : ''}` : ''
    ].filter(Boolean);
    return counts.join(', ');
  };

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
        <TouchableOpacity style={styles.filterButton} onPress={() => actionSheetRef.current?.show()}>
          <Ionicons name="options-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>


<ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 16 }}>
    
   {fullFlights.map((flight, index) => (
  <FlightCard key={flight.id} flight={flight} index={index} />
))}

</ScrollView>

      <ActionSheet ref={actionSheetRef}>
      <Text>Hi, I am here.</Text>
    </ActionSheet>
    </View>
  );
};

export default ResultPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
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
    borderWidth:0.5,
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
