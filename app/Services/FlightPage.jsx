import { 
  StyleSheet, Text, TouchableOpacity, View, Platform, TextInput, Modal, ScrollView 
} from 'react-native';
import React, { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const CLASS_OPTIONS = ['Economy', 'Premium Economy', 'Business', 'First'];

const FlightPage = () => {
  const [tripType, setTripType] = useState('ONEWAY');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  });

  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);

  // Editable FROM / TO inputs
  const [from, setFrom] = useState('New Delhi');
  const [fromCode, setFromCode] = useState('DEL');
  const [fromAirport, setFromAirport] = useState('Indira Gandhi International Airport');

  const [to, setTo] = useState('Mumbai');
  const [toCode, setToCode] = useState('BOM');
  const [toAirport, setToAirport] = useState('Chhatrapati Shivaji International Airport');

  // Traveller & Class modal
  const [travellerModalVisible, setTravellerModalVisible] = useState(false);

  // Traveller counts
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  // Class selection
  const [travelClass, setTravelClass] = useState(null); // null or one of CLASS_OPTIONS

  // Tomorrow's date for minimumDate restriction
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date) => {
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`;
  };

  // Traveller summary string
  const getTravellerSummary = () => {
    let parts = [];
    if (adults > 0) parts.push(`${adults} Adult${adults > 1 ? 's' : ''}`);
    if (children > 0) parts.push(`${children} Child${children > 1 ? 'ren' : ''}`);
    if (infants > 0) parts.push(`${infants} Infant${infants > 1 ? 's' : ''}`);
    const travellers = parts.join(', ') || '0';
    const cls = travelClass ? ` / ${travelClass}` : '';
    return travellers + cls;
  };

  // Helpers for increment/decrement with min 0 (adults min 1)
  const inc = (value, setter) => setter(value + 1);
  const dec = (value, setter, min = 0) => {
    if (value > min) setter(value - 1);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Flight Search</Text>
        <TouchableOpacity>
          <Ionicons name="language" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Selector */}
      <View style={styles.selectorContainer}>
        {['ONEWAY', 'ROUNDTRIP'].map(type => (
          <TouchableOpacity
            key={type}
            style={[styles.selectorButton, tripType === type && styles.selected]}
            onPress={() => setTripType(type)}
          >
            <Text style={[styles.selectorText, tripType === type && styles.selectedText]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* FROM - Editable */}
      <View style={styles.inputBox}>
        <View style={styles.iconRow}>
          <MaterialCommunityIcons name="airplane-takeoff" size={18} color="#007AFF" />
          <Text style={styles.label}>FROM</Text>
        </View>
        <TextInput
          style={styles.textInput}
          value={from}
          onChangeText={setFrom}
          placeholder="Departure city"
        />
        <Text style={styles.subValue}>{fromAirport} ({fromCode})</Text>
      </View>

      {/* TO - Editable */}
      <View style={styles.inputBox}>
        <View style={styles.iconRow}>
          <MaterialCommunityIcons name="airplane-landing" size={18} color="#007AFF" />
          <Text style={styles.label}>TO</Text>
        </View>
        <TextInput
          style={styles.textInput}
          value={to}
          onChangeText={setTo}
          placeholder="Destination city"
        />
        <Text style={styles.subValue}>{toAirport} ({toCode})</Text>
      </View>

      {/* Departure + Return */}
      <View style={styles.inputRow}>
        <TouchableOpacity
          style={[styles.inputBox, { flex: 1 }]}
          onPress={() => {
            setShowDeparturePicker(true);
            setShowReturnPicker(false);
          }}
        >
          <View style={styles.iconRow}>
            <FontAwesome name="calendar" size={16} color="#007AFF" />
            <Text style={styles.label}>DEPARTURE DATE</Text>
          </View>
          <Text style={styles.value}>{formatDate(departureDate)}</Text>
        </TouchableOpacity>

        {tripType === 'ROUNDTRIP' ? (
          <TouchableOpacity
            style={[styles.inputBox, { flex: 1 }]}
            onPress={() => {
              setShowReturnPicker(true);
              setShowDeparturePicker(false);
            }}
          >
            <View style={styles.iconRow}>
              <FontAwesome name="calendar" size={16} color="#007AFF" />
              <Text style={styles.label}>RETURN DATE</Text>
            </View>
            <Text style={styles.value}>{formatDate(returnDate)}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.inputBox, { flex: 1, borderStyle: 'dashed', borderColor: '#007AFF' }]}
            onPress={() => {
              setTripType('ROUNDTRIP');
              setShowReturnPicker(true);
              setShowDeparturePicker(false);
            }}
          >
            <View style={styles.iconRow}>
              <FontAwesome name="calendar-plus-o" size={16} color="#007AFF" />
              <Text style={styles.label}>+ADD RETURN DATE</Text>
            </View>
            <Text style={{ color: '#888', fontSize: 13 }}>Save more on round trips!</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Traveller & Class - opens modal */}
      <TouchableOpacity
        style={styles.inputBox}
        onPress={() => setTravellerModalVisible(true)}
      >
        <View style={styles.iconRow}>
          <FontAwesome name="user" size={16} color="#007AFF" />
          <Text style={styles.label}>TRAVELLER & CLASS</Text>
        </View>
        <Text style={styles.value}>{getTravellerSummary()}</Text>
      </TouchableOpacity>


           <TouchableOpacity
           onPress={() => {
  router.push({
    pathname: '/ResultPage',
    params: {
      from,
      to,
      departureDate: departureDate.toISOString(),
      returnDate: tripType === 'ROUNDTRIP' ? returnDate.toISOString() : null,
      adults,
      children,
      infants,
      travelClass: travelClass ?? '',
    },
  });
}}

            activeOpacity={0.8}
            style={{ borderRadius: 10, overflow: 'hidden', marginTop: 20 }} 
            >
            <LinearGradient
                colors={['#3B82F6', '#6366F1', '#8B5CF6']} 
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                paddingVertical: 15,
                paddingHorizontal: 20,
                alignItems: 'center',
                borderRadius: 10,
                }}
            >
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                Search Flights
                </Text>
            </LinearGradient>
            </TouchableOpacity>



      {/* Calendar Pickers */}
      {showDeparturePicker && (
        <View style={styles.centeredPicker}>
          <DateTimePicker
            value={departureDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            minimumDate={tomorrow}
            onChange={(e, selectedDate) => {
              setShowDeparturePicker(false);
              if (selectedDate) setDepartureDate(selectedDate);
            }}
          />
        </View>
      )}
      {showReturnPicker && tripType === 'ROUNDTRIP' && (
        <View style={styles.centeredPicker}>
          <DateTimePicker
            value={returnDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            minimumDate={tomorrow}
            onChange={(e, selectedDate) => {
              setShowReturnPicker(false);
              if (selectedDate) setReturnDate(selectedDate);
            }}
          />
        </View>
      )}

      {/* Traveller & Class Modal */}
      <Modal
        visible={travellerModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setTravellerModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Select Travellers & Class</Text>

              {/* Adults */}
              <View style={styles.counterRow}>
                <Text style={styles.counterLabel}>Adults</Text>
                <View style={styles.counterControls}>
                  <TouchableOpacity onPress={() => dec(adults, setAdults, 1)} style={styles.counterBtn}>
                    <Text style={styles.counterBtnText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>{adults}</Text>
                  <TouchableOpacity onPress={() => inc(adults, setAdults)} style={styles.counterBtn}>
                    <Text style={styles.counterBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Children */}
              <View style={styles.counterRow}>
                <Text style={styles.counterLabel}>Children</Text>
                <View style={styles.counterControls}>
                  <TouchableOpacity onPress={() => dec(children, setChildren)} style={styles.counterBtn}>
                    <Text style={styles.counterBtnText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>{children}</Text>
                  <TouchableOpacity onPress={() => inc(children, setChildren)} style={styles.counterBtn}>
                    <Text style={styles.counterBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Infants */}
              <View style={styles.counterRow}>
                <Text style={styles.counterLabel}>Infants</Text>
                <View style={styles.counterControls}>
                  <TouchableOpacity onPress={() => dec(infants, setInfants)} style={styles.counterBtn}>
                    <Text style={styles.counterBtnText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>{infants}</Text>
                  <TouchableOpacity onPress={() => inc(infants, setInfants)} style={styles.counterBtn}>
                    <Text style={styles.counterBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Class Selection */}
              <Text style={[styles.modalTitle, { marginTop: 20 }]}>Select Class</Text>
              <View style={styles.classOptions}>
                {CLASS_OPTIONS.map(option => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.classOption,
                      travelClass === option && styles.classOptionSelected,
                    ]}
                    onPress={() => setTravelClass(option === travelClass ? null : option)}
                  >
                    <Text
                      style={[
                        styles.classOptionText,
                        travelClass === option && styles.classOptionTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                onPress={() => setTravellerModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Done</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FlightPage;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectorContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    marginBottom: 20,
    borderColor: '#007AFF',
    borderWidth: 1,
  },
  selectorButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  selected: {
    backgroundColor: '#e0f0ff',
  },
  selectorText: {
    color: '#888',
    fontWeight: '600',
  },
  selectedText: {
    color: '#007AFF',
  },
  inputBox: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  dashedBox: {
    borderStyle: 'dashed',
    borderColor: '#007AFF',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },
  code: {
    fontSize: 14,
    fontWeight: '500',
    color: '#888',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  subValue: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  textInput: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    borderBottomWidth: 1,
    borderColor: '#007AFF',
    paddingVertical: 4,
  },
  centeredPicker: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 999,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  counterLabel: {
    fontSize: 16,
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterBtn: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    borderColor: '#007AFF',
    borderWidth: 1,
  },
  counterBtnText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  counterValue: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  classOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  classOption: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  classOptionSelected: {
    backgroundColor: '#007AFF',
  },
  classOptionText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  classOptionTextSelected: {
    color: 'white',
  },
  modalCloseBtn: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  searchButton: {
  backgroundColor: '#007AFF',
  paddingVertical: 15,
  borderRadius: 10,
  marginTop: 20,
  alignItems: 'center',
},
searchButtonText: {
  color: 'white',
  fontSize: 18,
  fontWeight: 'bold',
},

});
