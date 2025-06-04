import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Platform,
} from 'react-native';
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';


const RECENT_SEARCHES_KEY = '@recent_searches';

const Bus = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(moment().format('D MMM, ddd, YYYY'));
  const [tempDate, setTempDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  

  // Load recent searches on mount
   useEffect(() => {
    const loadRecentSearches = async () => {
      try {
        const saved = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
        if (saved) setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load recent searches', e);
      }
    };
    loadRecentSearches();
  }, []);

   // Save recent searches whenever it changes
  useEffect(() => {
    const saveRecentSearches = async () => {
      try {
        await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches));
      } catch (e) {
        console.error('Failed to save recent searches', e);
      }
    };
    saveRecentSearches();
  }, [recentSearches]);


  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const today = () => setDate(moment().format('D MMM, ddd, YYYY'));
  const tomorrow = () => setDate(moment().add(1, 'day').format('D MMM, ddd, YYYY'));

  const handleSearch = () => {
    const newSearch = { from, to, date };
    setRecentSearches((prev) => [
      newSearch,
      ...prev.filter((item) => item.from !== from || item.to !== to),
    ]);
    router.push({
    pathname: '/BusSearchResult',
    params: { from, to, date },
  });
  };

  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) setTempDate(selectedDate);
  };

  const confirmDate = () => {
    setDate(moment(tempDate).format('D MMM, ddd, YYYY'));
    setShowCalendar(false);
  };


  const handleRecentClick = (item) => {
    setFrom(item.from);
    setTo(item.to);
    setDate(item.date);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Header title={'Bus Search'} />

      {/* From input */}
      <View style={{ marginTop: 20 }}>
        <View style={styles.inputBox}>
          <View style={styles.inputWithIcon}>
            <MaterialCommunityIcons name="map-marker-outline" size={20} color="#888" />
            <TextInput
              style={styles.inputText}
              value={from}
              onChangeText={setFrom}
              placeholder="From"
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity onPress={swap} style={styles.swapIcon}>
            <MaterialCommunityIcons name="swap-vertical" size={22} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* To input */}
      <View style={styles.inputBox}>
        <View style={styles.inputWithIcon}>
          <MaterialCommunityIcons name="map-marker-check-outline" size={20} color="#888" />
          <TextInput
            style={styles.inputText}
            value={to}
            onChangeText={setTo}
            placeholder="To"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Date input */}
      <View style={styles.inputBox}>
        <TouchableOpacity style={styles.inputWithIcon} onPress={() => setShowCalendar(true)}>
          <Ionicons name="calendar-outline" size={20} color="#888" />
          <Text style={styles.inputText}>{date}</Text>
        </TouchableOpacity>
        <View style={styles.dateBtnGroup}>
          <TouchableOpacity style={styles.dateBtn} onPress={today}>
            <Text style={styles.dateBtnText}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.dateBtn, { backgroundColor: '#eee' }]} onPress={tomorrow}>
            <Text style={[styles.dateBtnText, { color: '#333' }]}>Tomorrow</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Custom Calendar Modal */}
      <Modal visible={showCalendar} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <DateTimePicker
              value={tempDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChangeDate}
              style={{ backgroundColor: 'white' }}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setShowCalendar(false)} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDate} style={styles.okBtn}>
                <Text style={styles.okText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Search Button */}
     <TouchableOpacity
  disabled={!from || !to}
  onPress={() => {
    if (!from || !to) {
     Toast.show({
        type: 'error',
        text1: 'Please fill all details',
        position: 'bottom',
        visibilityTime: 2000,
        autoHide: true,
      });
    } else {
      handleSearch();
    }
  }}
  activeOpacity={0.8}
>
  <LinearGradient
    colors={!from || !to ? ['#ccc', '#ccc'] : ['#3B82F6', '#6366F1', '#8B5CF6']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={{
      paddingVertical: 15,
      paddingHorizontal: 20,
      alignItems: 'center',
      borderRadius: 10,
      opacity: !from || !to ? 0.5 : 1,
    }}
  >
    <Text style={styles.searchBtnText}>SEARCH BUSES</Text>
  </LinearGradient>
</TouchableOpacity>

      

      {/* Recent Searches */}
       <Text style={styles.sectionTitle}>RECENT SEARCHES</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recentSearches.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.recentCard}
            onPress={() => handleRecentClick(item)}
          >
            <Text style={styles.recentText}>{item.from} → {item.to}</Text>
            <Text style={{ color: '#666', fontSize: 12 }}>{item.date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Offers Section */}
      <Text style={styles.sectionTitle}>🎉 More Offers</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={[styles.offerCard, { backgroundColor: '#FFE4E1' }]}>
          <Text style={styles.offerCardTitle}>GOA GETAWAY</Text>
          <Text style={styles.offerCardText}>Up to 35% OFF on flights, stays, buses, more</Text>
        </View>
        <View style={[styles.offerCard, { backgroundColor: '#E8F6FF' }]}>
          <Text style={styles.offerCardTitle}>₹100 OFF on Buses</Text>
          <Text style={styles.offerCardText}>Use Code: NGTBUS</Text>
        </View>
        <View style={[styles.offerCard, { backgroundColor: '#E0FFE0' }]}>
          <Text style={styles.offerCardTitle}>Weekend Special</Text>
          <Text style={styles.offerCardText}>Flat ₹75 off on return bus tickets</Text>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default Bus;


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },

  inputBox: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  inputText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  swapIcon: {
    padding: 4,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 2,
  },
  dateBtnGroup: { flexDirection: 'row', gap: 10 },
  dateBtn: {
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  dateBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  searchBtn: {
    marginTop: 16,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  searchBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
    fontSize: 15,
  },
  recentCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    minWidth: 140,
  },
  recentText: {
    fontWeight: '600',
    marginBottom: 4,
    fontSize: 14,
  },
  offerCard: {
    width: 200,
    height: 100,
    backgroundColor: '#E0F7FF',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    justifyContent: 'center',
  },
  offerCardTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  offerCardText: {
    fontSize: 13,
    color: '#444',
  },
    modalContainer: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  cancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  okBtn: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  cancelText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  okText: {
    color: 'white',
    fontWeight: '500',
  },

});
