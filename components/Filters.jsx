import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Filters = ({
  onClose,
  initialPopular = [],
  initialAirlines = [],
  setPopularFilters,
  setSelectedAirlines,
}) => {
  const [localPopularFilters, setLocalPopularFilters] = useState(initialPopular);
  const [localSelectedAirlines, setLocalSelectedAirlines] = useState(initialAirlines);

  const togglePopular = (item) => {
    setLocalPopularFilters((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const toggleAirline = (airline) => {
    if (airline === 'All Airlines') {
      setLocalSelectedAirlines(['All Airlines']);
    } else {
      setLocalSelectedAirlines((prev) => {
        const updated = prev.includes(airline)
          ? prev.filter((a) => a !== airline)
          : [...prev.filter((a) => a !== 'All Airlines'), airline];
        return updated;
      });
    }
  };

  const resetFilters = () => {
    setLocalPopularFilters([]);
    setLocalSelectedAirlines(['All Airlines']);
    setPopularFilters([]);
    setSelectedAirlines(['All Airlines']);
    onClose(); // Close filter sheet after reset
  };

  const applyFilters = () => {
    setPopularFilters(localPopularFilters);
    setSelectedAirlines(localSelectedAirlines);
    onClose?.();
  };

  const isAirlineSelected = (airline) =>
    localSelectedAirlines.includes(airline) || localSelectedAirlines.includes('All Airlines');

  const POPULAR_OPTIONS = [
    { label: 'Morning Departure', icon: 'weather-sunset' },
    { label: 'Evening Departure', icon: 'weather-night' },
    { label: '1 Stop', icon: 'transit-connection-variant' },
    { label: '2 Stops', icon: 'transit-connection' },
  ];

  const AIRLINES = [
    { name: 'All Airlines', icon: 'airplane' },
    { name: 'Air India', icon: 'airplane-takeoff' },
    { name: 'IndiGo', icon: 'airplane-landing' },
    { name: 'Vistara', icon: 'airplane-check' },
    { name: 'Akasa Air', icon: 'airplane-clock' },
    { name: 'SpiceJet', icon: 'airplane-alert' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Filters</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      <Text style={styles.section}>Popular Filters</Text>
      <View style={styles.group}>
        {POPULAR_OPTIONS.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.row}
            onPress={() => togglePopular(item.label)}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={22}
              color={localPopularFilters.includes(item.label) ? '#247ba0' : '#aaa'}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.optionLabel}>{item.label}</Text>
            <View style={styles.radio}>
              {localPopularFilters.includes(item.label) && (
                <View style={styles.radioSelected} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.section}>Airlines</Text>
      <View style={styles.group}>
        {AIRLINES.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={styles.row}
            onPress={() => toggleAirline(item.name)}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={22}
              color={isAirlineSelected(item.name) ? '#279695' : '#aaa'}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.optionLabel}>{item.name}</Text>
            <View style={styles.radio}>
              {isAirlineSelected(item.name) && (
                <View style={styles.radioSelected} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
          <Text style={styles.applyText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Filters;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    paddingBottom: 30,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#444',
  },
  group: {
    gap: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    justifyContent: 'space-between',
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#279695',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#279695',
  },
  footer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  resetBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',
    alignItems: 'center',
  },
  resetText: {
    fontSize: 16,
    color: '#555',
  },
  applyBtn: {
    flex: 1,
    backgroundColor: '#279695',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  applyText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});
