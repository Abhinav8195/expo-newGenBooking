import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Animated,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { cabdata } from '../data';

// Animated Filter Chip component
const AnimatedFilterChip = ({ label, isSelected, onPress, delay }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 350,
      delay: delay,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, delay]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  return (
    <Animated.View
      style={{
        opacity: animatedValue,
        transform: [{ translateY }],
        marginRight: 10,
      }}
    >
      <TouchableOpacity
        style={[styles.chip, isSelected && styles.chipSelected]}
        onPress={onPress}
      >
        <Text style={isSelected ? styles.chipTextSelected : styles.chipText}>
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Separate Animated Card component
const AnimatedCabCard = ({ item, delay }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 400,
      delay: delay,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, delay]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: animatedValue,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.row}>
        <View style={{ alignItems: 'center', marginRight: 12 }}>
          <View style={styles.imagePlaceholder}>
            <Text>🚗</Text>
          </View>
          <View
            style={[
              styles.fuelTag,
              {
                backgroundColor:
                  item.fuelType === 'Petrol'
                    ? '#2AC29A'
                    : item.fuelType === 'Diesel'
                    ? '#F8B550'
                    : '#ccc',
              },
            ]}
          >
            <Text style={styles.fuelText}>{item.fuelType}</Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.carName}>{item.carName}</Text>
          <View style={[styles.row, { marginTop: 4 }]}>
            <Text style={styles.tag}>or similar</Text>
            {item.rating === 5 ? (
              <Text style={styles.ratingTag}>5/5</Text>
            ) : (
              <Text style={styles.newTag}>new</Text>
            )}
          </View>
          <Text style={styles.metaText}>{item.seating} Seats • AC</Text>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.discountText}>{item.discountPercent}% off</Text>
          <Text style={styles.strikePrice}>₹{item.oldPrice}</Text>
          <Text style={styles.priceText}>₹{item.newPrice}</Text>
          <Text style={styles.taxText}>+ ₹{item.taxes} (Taxes & Charges)</Text>
        </View>
      </View>

      <Text style={styles.carrierNote}>
        ✨ <Text style={{ fontWeight: '600' }}>Roof carrier</Text> available with
        this car starting @ INR 158
      </Text>
    </Animated.View>
  );
};

const CabSearchResult = () => {
  const { from, to, start, end } = useLocalSearchParams();

  const [selectedType, setSelectedType] = useState('All');
  const [selectedSort, setSelectedSort] = useState('');

  const formatDateTime = (iso) => {
    if (!iso) return '';
    const date = new Date(iso);
    return `${date.toDateString()} at ${date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  };

  const trimText = (text, maxLength = 15) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const filterOptions = [
    { type: 'cab', label: 'All' },
    { type: 'cab', label: 'SUV' },
    { type: 'cab', label: 'Sedan' },
    { type: 'cab', label: 'Hatchback' },
    { type: 'cab', label: 'Mini' },
    { type: 'cab', label: 'Luxury' },
    { type: 'sort', label: 'Low to High' },
    { type: 'sort', label: 'High to Low' },
  ];

  const filteredData = cabdata
    .filter((cab) => selectedType === 'All' || cab.type === selectedType)
    .sort((a, b) =>
      selectedSort === 'Low to High'
        ? a.newPrice - b.newPrice
        : selectedSort === 'High to Low'
        ? b.newPrice - a.newPrice
        : 0
    );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerCard}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.routeSection}>
          <Text style={styles.routeText}>
            {trimText(from)} → {trimText(to)}
          </Text>
          <Text style={styles.subText}>Start: {formatDateTime(start)}</Text>
          {end ? <Text style={styles.subText}>End: {formatDateTime(end)}</Text> : null}
        </View>

        <TouchableOpacity style={styles.filterButton} onPress={() => {}}>
          <Ionicons name="options-outline" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Combined Filter Bar */}
      <View style={{ marginTop: 16 }}>
        <FlatList
          data={filterOptions}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${item.label}-${index}`}
          renderItem={({ item, index }) => {
            const isSelected =
              (item.type === 'cab' && selectedType === item.label) ||
              (item.type === 'sort' && selectedSort === item.label);

            return (
              <AnimatedFilterChip
                label={item.label}
                isSelected={isSelected}
                delay={index * 100}
                onPress={() =>
                  item.type === 'cab'
                    ? setSelectedType(item.label)
                    : setSelectedSort(item.label)
                }
              />
            );
          }}
        />
      </View>

      {/* Animated Cab Cards */}
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => `${item.carName}-${index}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <AnimatedCabCard item={item} delay={index * 100} />
        )}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
    </View>
  );
};

export default CabSearchResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    padding: 10,
    elevation: 3,
  },
  backButton: {
    paddingRight: 10,
    paddingTop: 4,
  },
  routeSection: {
    flex: 1,
    justifyContent: 'center',
  },
  routeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    maxWidth: '100%',
  },
  subText: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  filterButton: {
    backgroundColor: '#279695',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
   
  },
  chipSelected: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#279695',
  },
  chipText: {
    color: '#333',
    fontSize: 14,
  },
  chipTextSelected: {
    color: '#279695',
    fontWeight: '600',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  imagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#f1f6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carName: {
    fontWeight: '600',
    fontSize: 16,
    color: '#222',
  },
  tag: {
    color: '#888',
    fontSize: 13,
  },
  newTag: {
    backgroundColor: '#E1FAF8',
    color: '#00887A',
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 6,
  },
  ratingTag: {
    backgroundColor: '#E5F9E8',
    color: '#228B22',
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 6,
  },
  fuelTag: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: -6,
  },
  fuelText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  metaText: {
    color: '#555',
    fontSize: 13,
    marginTop: 6,
  },
  discountText: {
    color: '#2AC29A',
    fontWeight: '600',
    fontSize: 14,
  },
  strikePrice: {
    textDecorationLine: 'line-through',
    color: '#999',
    fontSize: 13,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginTop: 2,
  },
  taxText: {
    fontSize: 13,
    color: '#888',
  },
  carrierNote: {
    backgroundColor: '#F0F6FF',
    marginTop: 12,
    padding: 8,
    borderRadius: 6,
    fontSize: 13,
    color: '#444',
  },
});
