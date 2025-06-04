import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';

const allDestinations = [
  'Thailand',
  'UAE',
  'USA',
  'Indonesia',
  'Europe',
  'Singapore',
  'Japan',
  'Australia',
  'Canada',
  'Malaysia',
];

const Insurance = () => {
  const [travellers, setTravellers] = useState(1);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const toggleDestination = (dest) => {
    if (selectedDestinations.includes(dest)) {
      setSelectedDestinations(selectedDestinations.filter((d) => d !== dest));
    } else {
      setSelectedDestinations([...selectedDestinations, dest]);
    }
  };

  const handleExplorePlans = () => {
    console.log('Selected Destinations:', selectedDestinations);
    console.log('Travel Dates:', startDate.toDateString(), 'to', endDate.toDateString());
    console.log('Travellers:', travellers);
    alert('Plans fetched! (check console)');
  };

  const filteredDestinations = allDestinations.filter((item) =>
    item.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }} contentContainerStyle={{ paddingBottom: 30 }}>
      <ImageBackground
        source={require('../../assets/images/bgimage1.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {/* Header */}
          
          <Header />

          <Text style={styles.title}>Insure Your Journey — Wherever You Go</Text>

          <View style={styles.banner}>
            <Text style={styles.bannerMain}>🛡️ Save up to 40% on Insurance</Text>
            <Text style={styles.bannerSub}>Pay with wallet and get extra discount!</Text>
          </View>

          <View style={styles.formBox}>
            {/* Destination with search */}
            <Text style={styles.label}>Where are you travelling?</Text>
            <TextInput
              placeholder="Search destinations..."
              value={searchText}
              onChangeText={setSearchText}
              style={styles.input}
            />

            <FlatList
              data={filteredDestinations}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ marginVertical: 8 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => toggleDestination(item)}
                  style={[
                    styles.chip,
                    selectedDestinations.includes(item) && styles.chipSelected,
                  ]}
                >
                  <Text style={{ fontWeight: selectedDestinations.includes(item) ? 'bold' : 'normal' }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />

            {/* Travel Dates */}
            <Text style={styles.label}>Travel Dates</Text>
            <View style={styles.dateRow}>
              <TouchableOpacity
                onPress={() => setStartDatePickerVisible(true)}
                style={styles.dateBox}
              >
                <Text>{startDate.toDateString()}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setEndDatePickerVisible(true)}
                style={styles.dateBox}
              >
                <Text>{endDate.toDateString()}</Text>
              </TouchableOpacity>
            </View>

            <DateTimePickerModal
              isVisible={isStartDatePickerVisible}
              mode="date"
              onConfirm={(date) => {
                setStartDate(date);
                setStartDatePickerVisible(false);
              }}
              onCancel={() => setStartDatePickerVisible(false)}
            />
            <DateTimePickerModal
              isVisible={isEndDatePickerVisible}
              mode="date"
              onConfirm={(date) => {
                setEndDate(date);
                setEndDatePickerVisible(false);
              }}
              onCancel={() => setEndDatePickerVisible(false)}
            />

            {/* Travellers */}
            <Text style={styles.label}>No. of Travellers</Text>
            <View style={styles.counter}>
              <TouchableOpacity onPress={() => setTravellers(Math.max(1, travellers - 1))}>
                <Text style={styles.counterBtn}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{travellers}</Text>
              <TouchableOpacity onPress={() => setTravellers(travellers + 1)}>
                <Text style={styles.counterBtn}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Explore Plans */}
            <TouchableOpacity
              onPress={handleExplorePlans}
              activeOpacity={0.8}
              style={{ borderRadius: 10, marginTop: 10 }}
            >
              <LinearGradient
                colors={['#3B82F6', '#6366F1', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  paddingVertical: 14,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={styles.exploreText}>🔍 Explore Plans</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={{ marginVertical: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Travel With Peace Of Mind</Text>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: '#e6e6e6',
              padding: 20,
              borderRadius: 10,
              backgroundColor: 'white',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexShrink: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '700' }}>Protect Your International Adventures</Text>
              <Text style={{ fontSize: 13, color: 'gray', marginTop: 4 }}>
                Affordable and all-inclusive travel insurance plans offering worldwide coverage, seamless digital claims, and peace of mind wherever you go.
              </Text>
            </View>
            <Image
              source={require('../../assets/images/passenger.gif')}
              style={{ width: 70, height: 70, resizeMode: 'contain' }}
            />
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: '#e6e6e6',
              padding: 20,
              borderRadius: 10,
              backgroundColor: 'white',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}
          >
            <View style={{ flexShrink: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '700' }}>24/7 Global Travel Assistance</Text>
              <Text style={{ fontSize: 13, color: 'gray', marginTop: 4 }}>
                Get reliable worldwide support anytime, anywhere with our comprehensive travel insurance plans, including seamless digital claims and peace of mind.
              </Text>
            </View>
            <Image
              source={require('../../assets/images/customer-support.gif')}
              style={{ width: 70, height: 70, resizeMode: 'contain' }}
            />
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default Insurance;

const styles = StyleSheet.create({
  background: {
    flex: 1, // Remove fixed height here to allow scroll
    paddingBottom: 30,
  },
  overlay: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1a1a1a',
    paddingHorizontal: 20,
  },
  banner: {
    backgroundColor: '#e6f9f1',
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#00C28B',
    width: '95%',
    alignSelf: 'center',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  bannerMain: {
    color: '#007F5F',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bannerSub: {
    color: '#666',
    marginTop: 4,
  },
  formBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
    marginTop: -5,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    marginTop: 15,
    marginBottom: 6,
    color: '#333',
  },
  input: {
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: '#d0ebff',
    borderColor: '#007AFF',
    borderWidth: 1,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    marginTop: 8,
  },
  dateBox: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    alignItems: 'center',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginVertical: 12,
    justifyContent: 'center',
  },
  counterBtn: {
    fontSize: 20,
    backgroundColor: '#eee',
    width: 40,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 8,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  counterValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  exploreText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
