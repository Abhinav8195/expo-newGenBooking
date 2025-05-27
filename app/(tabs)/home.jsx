import { StyleSheet, Text, TouchableOpacity, View, Animated, Image, ScrollView } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Entypo } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SearchBar from '../../components/HomeComponents/SearchBar';
import { SliderOPtions } from '../../data';
import SliderOptions from '../../components/HomeComponents/SliderOptions';
import Service from '../../components/HomeComponents/Service';
const Home = () => {
  const notifications = true;

  // Animation refs
  const locationTranslateX = useRef(new Animated.Value(-100)).current;
  const notificationTranslateX = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(locationTranslateX, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(notificationTranslateX, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.topRow}>
        <Animated.View style={{ transform: [{ translateX: locationTranslateX }] }}>
          <Image source={require('../../assets/images/logo.png')} style={{width:100,height:30,resizeMode:'contain'}} />
        </Animated.View>

        <Animated.View style={{ transform: [{ translateX: notificationTranslateX }] }}>
          <TouchableOpacity>
            <View style={{ position: 'relative' }}>
              <MaterialIcons name="notifications" size={26} color="#247ba0" />
              {notifications && (
                <View style={styles.badge} />
              )}
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <View style={{ borderBottomWidth: 1, borderColor: '#ccc', marginTop: -5 }} />
      <ScrollView>

          <SearchBar />
          <Service/>
        <SliderOptions SliderOPtions={SliderOPtions} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  topRow: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    backgroundColor: 'red',
    borderRadius: 4,
  },
});
