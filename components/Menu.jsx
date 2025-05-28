import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Menu = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      {/* Profile Section */}
      <View style={styles.profileCard}>
        <Image
          source={require('../assets/images/profile.png')} 
          style={styles.avatar}
        />
        <View style={{ flexShrink: 1 }}>
          <Text style={styles.greeting}>Hi Abhianv</Text>
          <Text style={styles.email} numberOfLines={1} ellipsizeMode="tail">
            abhianvbhatia143@gmail.com
          </Text>
        </View>
      </View>

      {/* Shortcuts */}
      <View style={styles.rowBox}>
        <MenuShortcut icon="account-circle-outline" label="My Account" color="#007AFF" />
        <MenuShortcut icon="headset" label="Support" color="#34C759" />
        <MenuShortcut icon="bell-outline" label="Notifications" color="#FF9500" />
      </View>

      {/* My Trips */}
      <Section title="My Trips">
        <MenuItem icon="briefcase-outline" label="View/Manage Trips" color="#5856D6" />
        <MenuItem icon="heart-outline" label="Wishlist" color="#FF2D55" />
      </Section>

      {/* Rewards */}
      <Section title="Rewards">
        <MenuItem icon="gift-outline" label="Gift Cards" color="#FF9500" />
        <MenuItem icon="account-multiple-plus-outline" label="Refer & Earn" color="#34C759" />
        <MenuItem icon="wallet-giftcard" label="Holidays Refer & Earn" color="#AF52DE" />
      </Section>

      {/* List Your Property */}
      <Section title="List Your Property">
        <MenuItem icon="home-plus-outline" label="List your Hotel or Homestay" color="#007AFF" />
      </Section>

      {/* Settings */}
      <Section title="Settings">
        <MenuItem icon="translate" label="Language English" color="#5AC8FA" />
        <MenuItem icon="flag-outline" label="Country India" color="#FF3B30" />
        <MenuItem icon="currency-inr" label="Currency INR" color="#FFCC00" />
        <MenuItem icon="message-alert-outline" label="Communication Preferences" color="#8E8E93" />
      </Section>

      {/* Travel Assistance */}
      <Section title="Travel Assistance">
        <MenuItem icon="airplane" label="Web Check-in" color="#007AFF" />
        <MenuItem icon="file-document-outline" label="PNR Status Check" color="#34C759" />
      </Section>

      {/* Legal */}
      <Section title="Legal">
        <MenuItem icon="shield-check-outline" label="Privacy Policy" color="#AF52DE" />
        <MenuItem icon="file-document" label="Terms & Conditions" color="#FF2D55" />
      </Section>

      {/* Social Media */}
      <Section title="Follow Us">
        <View style={styles.socialRow}>
          <MaterialCommunityIcons name="facebook" size={24} color="#3b5998" />
          <MaterialCommunityIcons name="twitter" size={24} color="#1DA1F2" />
          <MaterialCommunityIcons name="instagram" size={24} color="#C13584" />
          <MaterialCommunityIcons name="youtube" size={24} color="#FF0000" />
        </View>
      </Section>
    </ScrollView>
  );
};

const MenuShortcut = ({ icon, label, color }) => (
  <TouchableOpacity style={styles.shortcut}>
    <MaterialCommunityIcons name={icon} size={24} color={color || '#444'} />
    <Text style={styles.shortcutText} numberOfLines={1} ellipsizeMode="tail">
      {label}
    </Text>
  </TouchableOpacity>
);

const MenuItem = ({ icon, label, color }) => (
  <TouchableOpacity style={styles.item}>
    <MaterialCommunityIcons name={icon} size={22} color={color || '#333'} />
    <Text style={styles.itemText} numberOfLines={1} ellipsizeMode="tail">
      {label}
    </Text>
    <MaterialCommunityIcons name="chevron-right" size={22} color="#999" />
  </TouchableOpacity>
);

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
    padding: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5f6ff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#bbb',
    marginRight: 12,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  email: {
    fontSize: 14,
    color: '#666',
    maxWidth: 180,
  },
  rowBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    marginBottom: 20,
  },
  shortcut: {
    alignItems: 'center',
    width: 80,
  },
  shortcutText: {
    fontSize: 12,
    marginTop: 6,
    color: '#444',
    textAlign: 'center',
  },
  section: {
    marginBottom: 22,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#111',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    gap: 12,
  },
  itemText: {
    fontSize: 15,
    color: '#222',
    flexShrink: 1,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingBottom: 10,
  },
});
