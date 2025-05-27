import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';

const phrases = [
  'flights...',
  'hotels...',
  'trains...',
  'cruises...',
  'holidays...',
];

const SearchBar = () => {
  const [animatedPart, setAnimatedPart] = useState(phrases[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let charIndex = 0;
    setAnimatedPart('');
    const typingInterval = setInterval(() => {
      setAnimatedPart(phrases[index].substring(0, charIndex + 1));
      charIndex++;
      if (charIndex === phrases[index].length) {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [index]);

  return (
    <View style={styles.container}>
      <Feather name="search" size={20} color="#666" style={styles.icon} />
      <View style={styles.inputWrapper}>
        <Text style={styles.staticText}>Search for </Text>
        <Text style={styles.animatedText}>{animatedPart}</Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="options-outline" size={22} color="#666" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    margin: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  icon: {
    marginRight: 8,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  staticText: {
    fontSize: 16,
    color: '#999',
  },
  animatedText: {
    fontSize: 16,
    color: '#999',
  },
});
