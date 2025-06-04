import { Entypo, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Header from '../../components/Header';

const LabeledInput = ({ label, icon, children }) => (
  <View style={{ marginHorizontal: 16, marginBottom: 12 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputBox}>
      {icon}
      {children}
    </View>
  </View>
);

const Cabs = () => {
  const [tab, setTab] = useState('Outstation');
  const [tripType, setTripType] = useState('OneWay');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [stops, setStops] = useState([]);
  const [tripStart, setTripStart] = useState(new Date());
  const [tripEnd, setTripEnd] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [pickerMode, setPickerMode] = useState('start');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let location = await Location.getCurrentPositionAsync({});
      let reverse = await Location.reverseGeocodeAsync(location.coords);
      if (reverse.length > 0) {
        const { name, city, region, postalCode, country } = reverse[0];
        setFromLocation(`${name}, ${city}, ${region}, ${postalCode}, ${country}`);
      }
    })();
  }, []);

  const openDatePicker = (mode) => {
    setPickerMode(mode);
    setDatePickerVisibility(true);
  };

  const handleConfirm = (selectedDate) => {
    if (pickerMode === 'start') setTripStart(selectedDate);
    else setTripEnd(selectedDate);
    setDatePickerVisibility(false);
  };

  const handleAddStop = () => {
    setStops((prev) => [...prev, '']);
  };

  const updateStop = (index, value) => {
    const updated = [...stops];
    updated[index] = value;
    setStops(updated);
  };

  const removeStop = (index) => {
    const updated = stops.filter((_, i) => i !== index);
    setStops(updated);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // adjust offset if needed
    >
      <View style={styles.container}>
        <View style={{paddingHorizontal:20,paddingVertical:10}}>
          <Header title={'Cab Booking'} />
        </View>
        

        <ScrollView keyboardShouldPersistTaps="handled">
          <LinearGradient
            colors={['#004e8e', '#04142c']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.banner}
          >
            <Text style={styles.bannerTitle}>Guaranteed On-time Cabs!</Text>
            <Text style={styles.bannerSub}>
              Trusted Drivers • Clean cabs • On-Time Pickup
            </Text>
            <Text style={styles.bannerBottom}>
              Making outstation travel seamless for{' '}
              <Text style={{ fontWeight: 'bold' }}>last 7 years</Text>
            </Text>
          </LinearGradient>

          <View style={styles.tabRow}>
            {['Outstation', 'Airport', 'Hourly Rentals'].map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.tab, tab === t && styles.tabActive]}
                onPress={() => setTab(t)}
              >
                <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {tab === 'Outstation' && (
            <View style={styles.tripToggle}>
              {['OneWay', 'RoundTrip'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.toggleOption, tripType === type && styles.toggleActive]}
                  onPress={() => setTripType(type)}
                >
                  <Ionicons
                    name={tripType === type ? 'radio-button-on' : 'radio-button-off'}
                    size={16}
                    color={tripType === type ? '#007AFF' : '#888'}
                  />
                  <Text
                    style={[
                      styles.toggleText,
                      tripType === type && styles.toggleTextActive,
                    ]}
                  >
                    {type === 'OneWay' ? 'One Way' : 'Round Trip'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <LabeledInput
            label="From"
            icon={<Ionicons name="location-outline" size={18} color="#007AFF" />}
          >
            <TextInput
              placeholder="Pickup location"
              value={fromLocation}
              onChangeText={setFromLocation}
              style={styles.inputText}
            />
          </LabeledInput>

          <LabeledInput
            label="To"
            icon={<Ionicons name="flag-outline" size={18} color="#007AFF" />}
          >
            <TextInput
              placeholder="Destination"
              value={toLocation}
              onChangeText={setToLocation}
             style={[styles.inputText, { flex: 1 }]}
            />
          </LabeledInput>

          {tab === 'Outstation' && (
            <>
              <TouchableOpacity style={styles.addStop} onPress={handleAddStop}>
                <Text style={styles.addStopText}>+ Add a stop</Text>
                <Text style={styles.newTag}>NEW</Text>
              </TouchableOpacity>
              {stops.map((stop, idx) => (
                <LabeledInput
                  key={idx}
                  label={`Stop ${idx + 1}`}
                  icon={<Ionicons name="pin-outline" size={18} color="#007AFF" />}
                >
                  <TextInput
                    placeholder={`Enter Stop ${idx + 1}`}
                    value={stop}
                    onChangeText={(text) => updateStop(idx, text)}
                    style={[styles.inputText, { flex: 1 }]}
                  />
                  <TouchableOpacity onPress={() => removeStop(idx)}>
                    <Ionicons name="close-circle" size={20} color="#FF3B30" />
                  </TouchableOpacity>
                </LabeledInput>
              ))}
            </>
          )}

          {/* New Date/Time UI for RoundTrip: side-by-side */}
          {tripType === 'RoundTrip' ? (
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 16,
                marginBottom: 12,
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.label}>Trip Start Date & Time</Text>
                <TouchableOpacity
                  style={styles.inputBox}
                  onPress={() => openDatePicker('start')}
                  activeOpacity={0.7}
                >
                  <Ionicons name="calendar-outline" size={18} color="#007AFF" />
                  <Text style={styles.inputText}>
                    {tripStart.toDateString()}{' '}
                    {tripStart.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={styles.label}>Trip End Date & Time</Text>
                <TouchableOpacity
                  style={styles.inputBox}
                  onPress={() => openDatePicker('end')}
                  activeOpacity={0.7}
                >
                  <Ionicons name="calendar-outline" size={18} color="#007AFF" />
                  <Text style={styles.inputText}>
                    {tripEnd.toDateString()}{' '}
                    {tripEnd.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <LabeledInput
              label="Trip Start Date & Time"
              icon={<Ionicons name="calendar-outline" size={18} color="#007AFF" />}
            >
              <TouchableOpacity onPress={() => openDatePicker('start')}>
                <Text style={styles.inputText}>
                  {tripStart.toDateString()}{' '}
                  {tripStart.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </TouchableOpacity>
            </LabeledInput>
          )}

          <TouchableOpacity onPress={() =>
            router.push({
              pathname: '/CabSearchResult',
              params: {
                from: fromLocation,
                to: toLocation,
                start: tripStart.toISOString(),
               end: tripType === 'RoundTrip' ? tripEnd.toISOString() : '',
              },
            })
          }style={styles.searchBtn}>
            <LinearGradient
              colors={['#3B82F6', '#6366F1', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.searchGradient}
            >
              <Text style={styles.searchBtnText}>SEARCH</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          date={pickerMode === 'start' ? tripStart : tripEnd}
          minimumDate={pickerMode === 'end' ? tripStart : new Date()}
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Cabs;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  banner: { padding: 16 },
  bannerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  bannerSub: { color: '#fff', marginTop: 7, fontWeight: '600' },
  bannerBottom: { color: '#fff', marginTop: 12, fontWeight: '500' },

  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
    marginHorizontal: 16,
    padding: 6,
    borderRadius: 30,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  tabActive: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  tabTextActive: {
    color: 'white',
  },

  tripToggle: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  toggleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  toggleActive: {},
  toggleText: {
    marginLeft: 6,
    color: '#888',
  },
  toggleTextActive: {
    color: '#007AFF',
    fontWeight: 'bold',
  },

  label: {
    fontWeight: '600',
    marginBottom: 4,
    color: '#444',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  inputText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },

  addStop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 6,
  },
  addStopText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#007AFF',
  },
  newTag: {
    marginLeft: 8,
    backgroundColor: '#007AFF',
    color: 'white',
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: 'bold',
  },

  searchBtn: {
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 30,
    overflow: 'hidden',
  },
  searchGradient: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  searchBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
