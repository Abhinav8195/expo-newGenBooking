import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import Slider from '@react-native-community/slider';

const sellers = ['RedBus', 'InterCity', 'GreenLine', 'SkyBus'];
const timeSlots = ['Morning', 'Afternoon', 'Evening', 'Night'];

const BusFilter = ({
  priceRange,
  setPriceRange,
  acOnly,
  setAcOnly,
  selectedSellers,
  setSelectedSellers,
  timeSlot,
  setTimeSlot,
  onClose,
  applyFilters,
}) => {
  const toggleSeller = (name) => {
    setSelectedSellers((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  const handleApply = () => {
    applyFilters({
      priceRange,
      acOnly,
      sellers: selectedSellers,
      timeSlot,
    });
    onClose();
  };

  const handleReset = () => {
    setPriceRange([0, 2000]);
    setAcOnly(null);
    setSelectedSellers([]);
    setTimeSlot(null);
  };

  return (
    <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Filters</Text>

      {/* Price Range */}
      <Text style={styles.label}>Price Range</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>₹{priceRange[0]}</Text>
        <Text>₹{priceRange[1]}</Text>
      </View>
      <Slider
        minimumValue={0}
        maximumValue={2000}
        step={100}
        value={priceRange[1]}
        onValueChange={(val) => setPriceRange([0, val])}
        minimumTrackTintColor="#279695"
        maximumTrackTintColor="#ccc"
      />

      {/* AC Only */}
      <Text style={styles.label}>AC Only</Text>
      <Switch value={acOnly === true} onValueChange={() => setAcOnly(!acOnly)} />

      {/* Sellers */}
      <Text style={styles.label}>Sellers</Text>
      <View style={styles.chipContainer}>
        {sellers.map((seller) => (
          <TouchableOpacity
            key={seller}
            onPress={() => toggleSeller(seller)}
            style={[
              styles.chip,
              selectedSellers.includes(seller) && styles.chipSelected,
            ]}
          >
            <Text
              style={{
                color: selectedSellers.includes(seller) ? 'white' : '#333',
              }}
            >
              {seller}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Time Slots */}
      <Text style={styles.label}>Departure Time</Text>
      <View style={styles.timeRow}>
        {timeSlots.map((slot) => (
          <TouchableOpacity
            key={slot}
            onPress={() => setTimeSlot(slot)}
            style={[
              styles.timeButton,
              timeSlot === slot && styles.timeButtonSelected,
            ]}
          >
            <Text
              style={{
                color: timeSlot === slot ? 'white' : '#333',
                fontWeight: '500',
              }}
            >
              {slot}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <Text style={{ color: '#279695', fontWeight: '600' }}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BusFilter;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  label: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#aaa',
    marginTop: 6,
    marginRight: 8,
    backgroundColor: 'white',
  },
  chipSelected: {
    backgroundColor: '#279695',
    borderColor: '#279695',
  },
  timeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  timeButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#aaa',
    marginRight: 10,
    marginBottom: 10,
  },
  timeButtonSelected: {
    backgroundColor: '#279695',
    borderColor: '#279695',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  resetBtn: {
    borderWidth: 1,
    borderColor: '#279695',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  applyBtn: {
    backgroundColor: '#279695',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
});
