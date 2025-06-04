import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../components/Header';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';


const StaySearch = () => {
  const [location, setLocation] = useState('Ambala, Haryana');
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(null); 
  const [showTravellerModal, setShowTravellerModal] = useState(false);

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [infants, setInfants] = useState(0);
  const [rooms, setRooms] = useState(1);

  const { type } = useLocalSearchParams();

  const increment = (setter) => setter((prev) => prev + 1);
  const decrement = (setter) => setter((prev) => (prev > 0 ? prev - 1 : 0));

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      if (showDatePicker === 'in') setCheckIn(selectedDate);
      else if (showDatePicker === 'out') setCheckOut(selectedDate);
    }
    setShowDatePicker(null);
  };

  const goToStayResults = () => {
    router.push({
      pathname: '/Services/Stays',
      params: {
        type: type || 'Hotels',
        location,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        adults,
        children,
        infants,
        rooms,
      },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      <Header title={type || 'Hotels'} />

      <ScrollView style={styles.container}>
        {/* Location */}
        <View style={styles.inputRow}>
          <Ionicons name="location-sharp" size={20} color="#007bff" />
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Enter location"
            style={styles.inputText}
            placeholderTextColor="#999"
          />
        </View>

        {/* Check In */}
        <TouchableOpacity
          style={styles.inputRow}
          onPress={() => setShowDatePicker('in')}
        >
          <Text style={styles.label}>Check In</Text>
          <Text style={styles.inputText}>{checkIn.toDateString()}</Text>
        </TouchableOpacity>

        {/* Check Out */}
        <TouchableOpacity
          style={styles.inputRow}
          onPress={() => setShowDatePicker('out')}
        >
          <Text style={styles.label}>Check Out</Text>
          <Text style={styles.inputText}>{checkOut.toDateString()}</Text>
        </TouchableOpacity>

        {/* Native DateTime Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={showDatePicker === 'in' ? checkIn : checkOut}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
          />
        )}

        {/* Travellers & Rooms */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => setShowTravellerModal(true)}
        >
          <Text style={styles.detailBox}>
            {adults + children + infants} Travellers
          </Text>
          <Text style={styles.detailBox}>{rooms} Room</Text>
        </TouchableOpacity>

        {/* Search Button */}
        <TouchableOpacity onPress={goToStayResults} activeOpacity={0.9}>
  <LinearGradient
    colors={['#3B82F6', '#6366F1', '#8B5CF6']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.gradientButton}
  >
    <Text style={styles.searchText}>Search {type}</Text>
  </LinearGradient>
</TouchableOpacity>

      </ScrollView>

      {/* Traveller Modal */}
      <Modal visible={showTravellerModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {[{ label: 'Adults', value: adults, set: setAdults },
              { label: 'Children', value: children, set: setChildren },
              { label: 'Infants', value: infants, set: setInfants },
              { label: 'Rooms', value: rooms, set: setRooms },
            ].map(({ label, value, set }) => (
              <View key={label} style={styles.counterRow}>
                <Text style={styles.counterLabel}>{label}</Text>
                <View style={styles.counterControl}>
                  <TouchableOpacity onPress={() => decrement(set)} style={styles.counterBtn}>
                    <Text style={styles.counterText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>{value}</Text>
                  <TouchableOpacity onPress={() => increment(set)} style={styles.counterBtn}>
                    <Text style={styles.counterText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <TouchableOpacity
              onPress={() => setShowTravellerModal(false)}
              style={styles.modalCloseBtn}
            >
              <Text style={styles.modalCloseText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default StaySearch;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },
  inputText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  detailBox: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    fontSize: 15,
  },
  searchButton: {
    backgroundColor: '#007bff',
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalCloseBtn: {
    marginTop: 16,
    padding: 10,
    paddingHorizontal: 24,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  modalCloseText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  counterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  counterControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterBtn: {
    backgroundColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginHorizontal: 8,
  },
  counterText: {
    fontSize: 18,
    fontWeight: '600',
  },
  counterValue: {
    fontSize: 16,
    fontWeight: '600',
    minWidth: 24,
    textAlign: 'center',
  },
  gradientButton: {
  paddingVertical: 15,
  paddingHorizontal: 20,
  alignItems: 'center',
  borderRadius: 10,
  marginTop: 20,
},

});
