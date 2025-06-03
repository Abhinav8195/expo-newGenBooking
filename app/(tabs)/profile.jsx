import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { router } from 'expo-router';

const Profile = () => {
  const [emailAds, setEmailAds] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>My Profile</Text>

        {/* Profile Header Card */}
        <Animatable.View animation="fadeInDown" duration={800} style={styles.profileCard}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onPress={() =>router.push('/EditProfile')}
          >
            <View style={styles.profileRow}>
              <Image source={require('../../assets/images/profile.png')} style={styles.profileImage} />
              <View>
                <Text style={styles.profileName}>Abhinav Bhatia</Text>
                <Text style={styles.profileEmail}>abhinavbhatgia7460@gmail.com</Text>
              </View>
            </View>
            <MaterialIcons name="edit" size={24} color="white" />
          </TouchableOpacity>
        </Animatable.View>

        {/* First Section */}
        <Animatable.View animation="fadeInUp" delay={200} duration={600} style={styles.card}>
          <MenuItem title="My Account" subtitle="Make changes to your account" icon="person-outline" />
          <MenuItem title="My Bookings" subtitle="Manage your process of booking" icon="bookmark-outline" />
          <MenuItem
            title="Receive email ads"
            subtitle="Manage your email ads"
            icon="mail-outline"
            right={<Switch value={emailAds} onValueChange={setEmailAds} />}
          />
          <MenuItem title="My Interest" subtitle="Further manage your interest" icon="heart-outline" />
          <MenuItem title="Log out" subtitle="Logout this account to add another" icon="log-out-outline" />
        </Animatable.View>

        {/* Second Section */}
        <Animatable.View animation="fadeInUp" delay={400} duration={600} style={styles.card}>
          <MenuItem title="Help & Support" icon="help-circle-outline" />
          <MenuItem title="About App" icon="information-circle-outline" />
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItem = ({ title, subtitle, icon, right }) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuLeft}>
      <Ionicons
        name={icon}
        size={22}
        color="#247ba0"
        style={{ backgroundColor: '#f4f8fa', padding: 5, borderRadius: 99 }}
      />
      <View>
        <Text style={styles.menuText}>{title}</Text>
        {subtitle && <Text style={styles.subText}>{subtitle}</Text>}
      </View>
    </View>
    {right ? right : <Ionicons name="chevron-forward" size={20} color="#aaa" />}
  </TouchableOpacity>
);

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontWeight: '500',
    fontSize: 30,
    marginBottom: 20,
  },
  profileCard: {
    backgroundColor: '#247ba0',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: 'white',
    fontSize: 14,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 8,
    marginBottom: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center', 
    gap: 12,
    flex: 1,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  subText: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
});
