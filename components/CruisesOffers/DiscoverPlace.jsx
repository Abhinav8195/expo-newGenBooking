import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { cruiseOfferCard } from '../../data';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const DiscoverPlace = () => {
  const navigation = useNavigation();

  const renderCard = ({ item, index }) => (
    <Animatable.View animation="fadeInUp" delay={index * 100} useNativeDriver>
      <View
        style={styles.card}
        onPress={() => navigation.navigate('CruiseDetail', { cruise: item })}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
          <Text style={styles.price}>
            Starting from: <Text style={styles.priceValue}>₹ {item.price}</Text>
          </Text>
          <TouchableOpacity style={styles.buttonWrapper}>
            <LinearGradient
              colors={['#ff7e5f', '#feb47b']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.exploreButton}
            >
              <Text style={styles.exploreText}>{item.button}</Text>
              <Icon name="arrow-forward-circle" size={20} color="#fff" style={{ marginLeft: 8 }} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading1}>Top Destination</Text>
      <Text style={styles.heading2}>Discover Your Love</Text>
      <FlatList
        data={cruiseOfferCard}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
          scrollEnabled={false}
      />
    </View>
  );
};

export default DiscoverPlace;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4f8',
    flex: 1,
  },
  heading1: {
    color: '#888',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
  heading2: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    gap: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 6,
    color: '#333',
  },
  description: {
    color: '#666',
    marginBottom: 10,
    fontSize: 14,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 12,
  },
  priceValue: {
    color: '#ff6b6b',
  },
  buttonWrapper: {
    alignSelf: 'flex-start',
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    shadowColor: '#feb47b',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  exploreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
