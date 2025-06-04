import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Marquee } from '@animatereactnative/marquee';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Header from '../../components/Header';

const allFlags = ['🇫🇷','🇪🇸','🇺🇸','🇹🇷','🇮🇹','🇲🇽','🇬🇧','🇩🇪','🇹🇭','🇨🇳','🇬🇷','🇦🇹','🇯🇵','🇦🇪','🇭🇰','🇭🇷','🇵🇹','🇷🇺','🇮🇩','🇸🇬','🇳🇱','🇸🇦','🇰🇷','🇨🇭','🇮🇪','🇧🇷','🇨🇦','🇮🇳','🇲🇾','🇻🇳'];
const flags1 = allFlags.slice(0, Math.ceil(allFlags.length / 2));
const flags2 = allFlags.slice(Math.ceil(allFlags.length / 2));

const popularCountries = [
  { name: 'Sri Lanka', flag: '🇱🇰' },
  { name: 'Thailand', flag: '🇹🇭' },
  { name: 'Singapore', flag: '🇸🇬' },
  { name: 'Malaysia', flag: '🇲🇾' },
  { name: 'Dubai', flag: '🇦🇪' },
  { name: 'Vietnam', flag: '🇻🇳' },
];

const countries = [
  { name: 'Sri Lanka', flag: '🇱🇰', apps: '1,000+', refund: true },
  { name: 'Thailand', flag: '🇹🇭', apps: '10,000+', refund: false },
  { name: 'Singapore', flag: '🇸🇬', apps: '5,000+', refund: true },
  { name: 'Malaysia', flag: '🇲🇾', apps: '2,500+', refund: true },
  { name: 'Dubai', flag: '🇦🇪', apps: '12,000+', refund: false },
  { name: 'Vietnam', flag: '🇻🇳', apps: '3,000+', refund: true },
  { name: 'France', flag: '🇫🇷', apps: '8,000+', refund: true },
  { name: 'Japan', flag: '🇯🇵', apps: '4,500+', refund: false },
  { name: 'USA', flag: '🇺🇸', apps: '20,000+', refund: false },
  { name: 'Spain', flag: '🇪🇸', apps: '7,000+', refund: true },
];

export default function VisaHomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header/>

      <Marquee spacing={10} speed={0.5} repeatSpacer={30}>
        <View style={styles.flagRow}>
          {flags1.map((flag, index) => (
            <Text key={index} style={styles.flag}>{flag}</Text>
          ))}
        </View>
      </Marquee>
      <Marquee spacing={10} speed={0.4} repeatSpacer={30}>
        <View style={styles.flagRow}>
          {flags2.map((flag, index) => (
            <Text key={index} style={styles.flag}>{flag}</Text>
          ))}
        </View>
      </Marquee>

      <Text style={styles.welcomeText}>WELCOME ABHINAV</Text>
      <Text style={styles.title}>Your Visa, Our Priority: Seamless and Secure</Text>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Where are you going?"
        />
      </View>

      <View style={styles.highlights}>
        <Text style={styles.highlight}>
          <AntDesign name="checkcircle" size={15} color="#6c2bd9" /> 99% Approval Rate
        </Text>
        <Text style={styles.highlight}>
          <AntDesign name="checkcircle" size={15} color="#6c2bd9" /> 24x7 Customer Service
        </Text>
      </View>

      {/* Popular Destinations */}
      <Text style={styles.subTitle}>Popular Destinations</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.popularScroll}>
        {popularCountries.map((item, index) => (
          <View key={index} style={styles.popularCard}>
            <Text style={styles.popularFlag}>{item.flag}</Text>
            <Text style={styles.popularName}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Most-visited Countries */}
      <Text style={styles.sectionTitle}>Most-visited Countries</Text>
      {countries.map((country, i) => (
        <TouchableOpacity
          key={i}
          style={styles.card}
          onPress={() => router.push('/VisaDetails')}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.flag}>{country.flag}</Text>
            <Text style={styles.cardTitle}>{country.name}</Text>
            <View style={styles.evisaTag}>
              <Text style={styles.evisaText}>E-VISA</Text>
            </View>
          </View>
          <Text style={styles.visaText}>Get your visa by 31 May</Text>
          <Text style={styles.detailText}>
            99.9% Approval Rate • {country.apps} Applications Processed
          </Text>
          <Text style={styles.priceText}>
            ₹ 1 per Adult + ₹ 295 service fees
          </Text>
          {country.refund && (
            <Text style={styles.refundText}>💸 100% Refund if Application Rejected</Text>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8fbff',
    padding: 16,
  },
  header: {
    paddingVertical: 10,
  },
  flagRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 30,
    margin: 6,
  },
  welcomeText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    marginTop: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004aad',
    marginBottom: 10,
  },
  searchBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 10,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  highlights: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  highlight: {
    color: '#6c2bd9',
    fontWeight: '500',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    color: '#222',
  },
  popularScroll: {
    marginBottom: 16,
  },
  popularCard: {
    backgroundColor: '#e7f7ff',
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: 18,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popularFlag: {
    fontSize: 28,
  },
  popularName: {
    marginTop: 6,
    fontWeight: '500',
    fontSize: 14,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  evisaTag: {
    backgroundColor: '#f0f0f5',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  evisaText: {
    fontSize: 12,
    color: '#444',
  },
  visaText: {
    color: 'green',
    fontWeight: '500',
    marginTop: 8,
  },
  detailText: {
    color: '#444',
    marginTop: 4,
  },
  priceText: {
    marginTop: 8,
    fontWeight: '600',
    fontSize: 14,
  },
  refundText: {
    marginTop: 8,
    backgroundColor: '#d4f9f2',
    padding: 8,
    borderRadius: 6,
    color: '#007f73',
    fontWeight: '500',
  },
});
