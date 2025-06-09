import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Platform,
} from 'react-native';
import countries from 'world-countries';

const FullScreenCurrencyModal = ({ visible, onClose, onSelect }) => {
  const [searchText, setSearchText] = useState('');

  const filteredCountries = countries
    .filter(c => c.currencies && Object.keys(c.currencies).length > 0)
    .filter(c =>
      c.name?.common?.toLowerCase().includes(searchText.toLowerCase()) ||
      c.cca2?.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, padding: 20,}}>
            <View style={{flexDirection:'row',alignItems:'center',gap:10,marginBottom:10 }}>
                <MaterialIcons name="currency-exchange" size={24} color="black" />
                 <Text style={styles.title}> Select Country & Currency</Text>
            </View>
         

          {/* Search input with icons */}
          <View style={styles.searchContainer}>
            <AntDesign name="search1" size={20} color="black" />

            <TextInput
              style={styles.searchInput}
              placeholder="Search by country name..."
              value={searchText}
              onChangeText={setSearchText}
              autoCorrect={false}
              autoCapitalize="none"
            />

            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Entypo name="circle-with-cross" size={20} color="red" />
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            style={{ flex: 1 }} 
            data={filteredCountries}
            keyExtractor={(item) => item.cca2}
            renderItem={({ item }) => {
              const countryCode = item.cca2?.toLowerCase?.() || 'us';
              const currencyCode = item.currencies ? Object.keys(item.currencies)[0] : null;
              const currencyData = currencyCode && item.currencies[currencyCode];
              const currencyName = currencyData?.name || 'Unknown';
              const flagUrl = `https://flagcdn.com/w40/${countryCode}.png`;

              if (!currencyCode || !currencyName) return null;

              return (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    onSelect({
                      code: currencyCode,
                      name: `${currencyName} (${currencyCode})`,
                      cca2: item.cca2,
                    });
                    onClose();
                  }}
                >
                  <Image source={{ uri: flagUrl }} style={styles.flag} />
                  <View>
                    <Text style={styles.country}>{item.name?.common || 'Unknown'}</Text>
                    <Text style={styles.currency}>{currencyName} ({currencyCode})</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 50 : 0,
    paddingHorizontal: 16,
  },
  title: { fontSize: 22, fontWeight: 'bold' },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    gap:5
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 6,
    color: '#999',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  clearIcon: {
    fontSize: 18,
    color: '#999',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    gap: 10,
  },
  flag: { width: 30, height: 20, borderRadius: 4 },
  country: { fontSize: 16, fontWeight: '600' },
  currency: { fontSize: 14, color: '#666' },

  closeButton: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  closeText: { color: 'red', fontSize: 16 },
});

export default FullScreenCurrencyModal;
