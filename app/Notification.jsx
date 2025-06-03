import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { Entypo, Ionicons } from '@expo/vector-icons';

const alertsData = [
  { id: '1', text: 'Your Property has been Approved', time: '12:34 pm', image: 'https://randomuser.me/api/portraits/men/10.jpg' },
  { id: '2', text: 'Your Request has been Sent Successfully', time: '10:56 pm', image: 'https://randomuser.me/api/portraits/women/20.jpg' },
  { id: '3', text: 'Your Message has been Delivered', time: '07:43 pm', image: 'https://randomuser.me/api/portraits/men/30.jpg' },
];

const messagesData = [
  { id: '1', name: 'Mark Stewart', message: 'Sounds good catch you later mate', time: 'Just Now', image: 'https://randomuser.me/api/portraits/men/11.jpg' },
  { id: '2', name: 'Joshua Marshall', message: "I'll send the rest over tomorrow...", time: '12:15 pm', image: 'https://randomuser.me/api/portraits/men/12.jpg' },
  { id: '3', name: 'Borrie Jhonson', message: 'When are we heading to the point...', time: '09:55 pm', image: 'https://randomuser.me/api/portraits/men/13.jpg' },
  { id: '4', name: 'Sarah Steve', message: 'Thanks :)', time: '08:45 pm', image: 'https://randomuser.me/api/portraits/women/21.jpg' },
];

const Notification = () => {
  const [activeTab, setActiveTab] = useState('alerts');

  const renderAlerts = () => (
    <FlatList
      data={alertsData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.itemRow}>
          <Image source={{ uri: item.image }} style={styles.avatar} />
          <View style={styles.textContent}>
            <Text style={styles.alertText}>{item.text}</Text>
            <Text style={styles.alertTime}>{item.time}</Text>
          </View>
        </View>
      )}
    />
  );

  const renderMessages = () => (
    <FlatList
      data={messagesData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.itemRow}>
          <Image source={{ uri: item.image }} style={styles.avatar} />
          <View style={styles.textContent}>
            <Text style={styles.messageName}>{item.name}</Text>
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
          </View>
        </View>
      )}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Entypo name="chevron-left" size={26} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <Ionicons name="language" size={24} color="#247ba0" />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab('alerts')} style={styles.tab}>
          <Text style={[styles.tabText, activeTab === 'alerts' && styles.activeTabText]}>
            Latest Alerts
          </Text>
          {activeTab === 'alerts' && <View style={styles.activeUnderline} />}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('messages')} style={styles.tab}>
          <Text style={[styles.tabText, activeTab === 'messages' && styles.activeTabText]}>
            Messages
          </Text>
          {activeTab === 'messages' && <View style={styles.activeUnderline} />}
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'alerts' ? renderAlerts() : renderMessages()}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tab: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  activeUnderline: {
    marginTop: 6,
    height: 2,
    width: '100%',
    backgroundColor: 'black',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
  textContent: {
    flex: 1,
  },
  alertText: {
    fontSize: 15,
    color: '#000',
    fontWeight:'600'
  },
  alertTime: {
    fontSize: 13,
    color: '#666',
    marginTop: 3,
  },
  messageName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000',
  },
  messageText: {
    color: '#444',
    marginTop: 2,
  },
  messageTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});
