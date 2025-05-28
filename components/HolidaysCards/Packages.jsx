import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import { packagess } from '../../data';
import { FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { router } from 'expo-router';


const { width } = Dimensions.get('window');

const PackageCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.packageName}>{item.name}</Text>

        <View style={styles.ratingRow}>
          {[1, 2, 3, 4].map((_, i) => (
            <FontAwesome key={i} name="star" size={16} color="#FFD700" />
          ))}
          <FontAwesome name="star-half" size={16} color="#FFD700" />
        </View>

        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>

        <Animatable.View animation="pulse" iterationCount="infinite" iterationDelay={3000}>
  <TouchableOpacity style={styles.viewMoreBtn} onPress={() => router.push({
  pathname: '/PackageBooking',
  params: { package: JSON.stringify(item) },
})}
>
    <Text style={styles.viewMoreText}>View More</Text>
    <FontAwesome name="arrow-right" size={14} color="#007AFF" style={{ marginLeft: 6 }} />
  </TouchableOpacity>
</Animatable.View>

      </View>
    </View>
  );
};

const Packages = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Check Out Our Latest Packages</Text>
      <FlatList
        data={packagess}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
            <Animatable.View
                animation="fadeInUp"
                duration={800}
                delay={index * 150}
                useNativeDriver
            >
                <PackageCard item={item} />
            </Animatable.View>
            )}

        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Packages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    marginTop:-20
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0', 
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 4,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  priceTag: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,122,255,0.9)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  priceText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  cardBody: {
    padding: 14,
  },
  packageName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
    lineHeight: 20,
  },
  viewMoreBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#007AFF',
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f0f8ff',
  },
  viewMoreText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
