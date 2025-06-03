import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { Entypo, Ionicons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Header from '../../components/Header';

const dummyEsimPlans = [
  {
    id: '1',
    country: 'USA',
    data: '5GB',
    validity: '15 Days',
    price: '$15',
    image: 'https://flagcdn.com/w320/us.png',
  },
  {
    id: '2',
    country: 'UK',
    data: '10GB',
    validity: '30 Days',
    price: '$25',
    image: 'https://flagcdn.com/w320/gb.png',
  },
  {
    id: '3',
    country: 'Japan',
    data: '3GB',
    validity: '10 Days',
    price: '$12',
    image: 'https://flagcdn.com/w320/jp.png',
  },
];

const popularCountries = ['USA', 'UK', 'Japan', 'France', 'Germany', 'India'];

const Esim = () => {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const filteredPlans = dummyEsimPlans.filter((plan) =>
    plan.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}

      <Header title={'E-sim'} />

      {/* Title */}
      <Text style={styles.heading}>eSIM for Travel</Text>
      <Text style={styles.subheading}>
        Buy eSIMs for your destination country and stay connected on the go!
      </Text>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchInner}>
          <Feather name="search" size={18} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by country..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#888"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 160 }} showsVerticalScrollIndicator={false}>
        {/* Popular Tags */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          {popularCountries.map((country, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSearch(country)}
              style={styles.tag}
            >
              <Text style={styles.tagText}>{country}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Offers */}
        <Animatable.View animation="pulse" iterationCount="infinite" duration={3000}>
          <View style={styles.offerBox}>
            <Ionicons name="gift" size={24} color="#FF6F00" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.offerTitle}>Limited Time Offer</Text>
              <Text style={styles.offerSubtitle}>Get 20% OFF on your first eSIM</Text>
            </View>
          </View>
        </Animatable.View>

        {/* Why Choose Section */}
        <View style={styles.whyBox}>
          <Text style={styles.whyTitle}>Why Choose Our eSIM?</Text>
          <View style={styles.benefitItem}>
            <Ionicons name="wifi" size={18} color="#4B5563" />
            <Text style={styles.benefitText}>Instant Activation</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="shield-checkmark" size={18} color="#4B5563" />
            <Text style={styles.benefitText}>Reliable Global Coverage</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="cash-outline" size={18} color="#4B5563" />
            <Text style={styles.benefitText}>Affordable Plans</Text>
          </View>
        </View>

        {/* eSIM Plan Cards or No Plan Message */}
        {filteredPlans.length === 0 ? (
          <View style={styles.noPlanContainer}>
               
                <Image
                source={require('../../assets/images/esim.gif')}
                style={styles.noPlanImage}
                resizeMode="contain"
                />
                <Text style={styles.noPlanText}>No plans available right now.</Text>
                <Text style={{ color: '#999', fontSize: 14, marginTop: 4 }}>
                Please check back later or try a different country.
                </Text>
            </View>
        ) : (
          filteredPlans.map((item) => {
            const isSelected = selectedId === item.id;
            return (
              <Animatable.View
                key={item.id}
                animation="fadeInUp"
                delay={100}
                duration={500}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.planCard, isSelected && styles.selectedCard]}
                  onPress={() => setSelectedId(item.id)}
                >
                  <Image source={{ uri: item.image }} style={styles.flag} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.country}>{item.country}</Text>
                    <Text style={styles.details}>
                      {item.data} • {item.validity}
                    </Text>
                  </View>
                  <Text style={styles.price}>{item.price}</Text>
                </TouchableOpacity>
              </Animatable.View>
            );
          })
        )}
      </ScrollView>

      {/* Continue Button */}
      {selectedId && (
        <TouchableOpacity style={styles.continueBtn} onPress={() => alert('Continue to payment')}>
          <LinearGradient
            colors={['#3B82F6', '#6366F1', '#8B5CF6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBtn}
          >
            <Text style={styles.continueText}>Continue with Selected Plan</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Esim;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subheading: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  searchWrapper: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  searchInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 10,
  },
  tag: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    height: 36,
    justifyContent: 'center',
  },
  tagText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  offerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF4E5',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6F00',
  },
  offerTitle: {
    fontWeight: '600',
    fontSize: 15,
  },
  offerSubtitle: {
    fontSize: 13,
    color: '#444',
  },
  whyBox: {
    marginBottom: 20,
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
  },
  whyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitText: {
    marginLeft: 8,
    color: '#4B5563',
    fontSize: 14,
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  selectedCard: {
    borderColor: '#007AFF',
    backgroundColor: '#EAF4FF',
  },
  flag: {
    width: 40,
    height: 30,
    borderRadius: 4,
  },
  country: {
    fontSize: 16,
    fontWeight: '600',
  },
  details: {
    fontSize: 13,
    color: '#444',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  continueBtn: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradientBtn: {
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  noPlanContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  noPlanImage: {
    width: 100,
    height: 100,
  },
  noPlanText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
});
