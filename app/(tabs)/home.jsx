import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SearchBar from '../../components/HomeComponents/SearchBar';
import { SliderOPtions } from '../../data';
import SliderOptions from '../../components/HomeComponents/SliderOptions';
import Service from '../../components/HomeComponents/Service';
import Menu from '../../components/Menu';

const { width } = Dimensions.get('window');

const Home = () => {
  const notifications = true;

  const locationTranslateX = useRef(new Animated.Value(-100)).current;
  const notificationTranslateX = useRef(new Animated.Value(100)).current;

  const menuTranslateX = useRef(new Animated.Value(-width)).current;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const openMenu = () => {
    setIsMenuOpen(true);
    Animated.timing(menuTranslateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(menuTranslateX, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsMenuOpen(false);
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <Animated.View style={{ transform: [{ translateX: locationTranslateX }] }}>
          <TouchableOpacity onPress={openMenu}>
            <Entypo name="menu" size={26} color="#247ba0" />
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        </View>

        <Animated.View style={{ transform: [{ translateX: notificationTranslateX }] }}>
          <TouchableOpacity>
            <View style={{ position: 'relative' }}>
              <MaterialIcons name="notifications" size={26} color="#247ba0" />
              {notifications && <View style={styles.badge} />}
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <View style={{ borderBottomWidth: 1, borderColor: '#ccc', marginTop: -5 }} />

      {/* Main Scrollable Content */}
      <ScrollView>
        <SearchBar />
        <Service />

        <Animated.View
          style={[
            styles.adventureContainer,
            {
              opacity: locationTranslateX.interpolate({
                inputRange: [-100, 0],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  translateY: locationTranslateX.interpolate({
                    inputRange: [-100, 0],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.adventureText}>Where can your next adventure</Text>
            <Text style={styles.adventureHeading}>Takes you ?</Text>
          </View>
          <Image
            source={require('../../assets/images/icon1.png')}
            style={styles.adventureImage}
          />
        </Animated.View>

        <SliderOptions SliderOPtions={SliderOPtions} />
      </ScrollView>

      {/* Overlay Menu & Backdrop */}
      {isMenuOpen && <Pressable style={styles.backdrop} onPress={closeMenu} />}

      <Animated.View
        style={[
          styles.menuDrawer,
          { transform: [{ translateX: menuTranslateX }] },
        ]}
      >
        <Menu onClose={closeMenu} />
      </Animated.View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 0,
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
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
  adventureContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  adventureText: {
    fontSize: 17,
    color: 'gray',
    fontWeight: 'bold',
  },
  adventureHeading: {
    fontSize: 29,
    color: '#047c7c',
    fontWeight: 'bold',
  },
  adventureImage: {
    width: 140,
    height: 150,
    resizeMode: 'cover',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 1,
  },
  menuDrawer: {
    ...StyleSheet.absoluteFillObject,
    width: '70%',
    backgroundColor: 'white',
    zIndex: 2,
  },
});
