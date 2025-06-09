  import React, { useEffect, useRef, useState } from 'react';
  import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Image,
    Alert,
    Pressable,
    TouchableOpacity,
    Modal,
    TextInput,
  } from 'react-native';
  import * as Location from 'expo-location';
  import Carousel from 'react-native-reanimated-carousel';
  import Header from '../../components/Header';
  import ActionSheet from 'react-native-actions-sheet';
  import CurrencyActionSheet from '../../components/CurrencyActionSheet';
  import FullScreenCurrencyModal from '../../components/FullScreenCurrencyModal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';

  const FOREX_CURRENCIES = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'NZD', name: 'New Zealand Dollar' },
    { code: 'SGD', name: 'Singapore Dollar' },
  ];

  const CURRENCY_TO_COUNTRY_CODE = {
    USD: 'us',
    EUR: 'eu',
    GBP: 'gb',
    JPY: 'jp',
    AUD: 'au',
    CAD: 'ca',
    CHF: 'ch',
    CNY: 'cn',
    NZD: 'nz',
    SGD: 'sg',
  };


  const getCountryCodeFromCurrency = (currencyCode) => {
  if (CURRENCY_TO_COUNTRY_CODE[currencyCode]) {
    return CURRENCY_TO_COUNTRY_CODE[currencyCode];
  }
  if (currencyCode && currencyCode.length >= 2) {
    return currencyCode.slice(0, 2).toLowerCase();
  }
  return null;
};



  const Forex = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const actionSheetRef = useRef(null);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(FOREX_CURRENCIES[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [amountModalVisible, setAmountModalVisible] = useState(false);
  const [inputCurrencyAmount, setInputCurrencyAmount] = useState('');
  const [convertedAmountINR, setConvertedAmountINR] = useState(null);
  const MAX_AMOUNT_USD = 250000;
const [modalError, setModalError] = useState('');

const fetchConversionRate = async (amount) => {
  try {
    const res = await fetch('https://api.currencyfreaks.com/v2.0/rates/latest?apikey=10af4b7ae4f24b15bd363b216bcad4de');
    const data = await res.json();

    const rateINR = parseFloat(data.rates['INR']);
    const rateSelected = parseFloat(data.rates[selectedCurrency.code]);

    if (!rateINR || !rateSelected) {
      Alert.alert('Error', 'Could not fetch currency rates.');
      return;
    }

    const inrAmount = (rateINR / rateSelected) * parseFloat(amount);
    setConvertedAmountINR(inrAmount.toFixed(2));
  } catch (err) {
    console.error('Conversion error:', err);
    Alert.alert('Error', 'Failed to convert amount.');
  }
};

    const getCurrentLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location permission is required to show your city.');
          return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        let address = await Location.reverseGeocodeAsync(loc.coords);
        if (address.length > 0) {
          const { city, region, country } = address[0];
          setLocation(`${city || region || ''}, ${country || ''}`);
        }
      } catch (err) {
        console.error('Location Error:', err);
      }
    };



    useEffect(() => {
      getCurrentLocation();
    }, []);

    useEffect(() => {
      fetch('https://api.currencyfreaks.com/v2.0/rates/latest?apikey=10af4b7ae4f24b15bd363b216bcad4de')
        .then((res) => res.json())
        .then((data) => {
          if (!data || !data.rates) return;

          const rateINR = parseFloat(data.rates['INR']);
          const result = FOREX_CURRENCIES.map(({ code, name }) => {
            const rateCurrency = parseFloat(data.rates[code]);
            if (!rateCurrency) return null;

            const rateToINR = rateINR / rateCurrency;
            return {
              code,
              name,
              rate: rateToINR,
              day: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
            };
          }).filter(Boolean);

          setRates(result);
        })
        .catch((error) => console.error('Fetch error:', error))
        .finally(() => setLoading(false));
    }, []);

    const handleLocationSelected = (locationStr) => {
      setLocation(locationStr);
    };

      const handleBuyNow = () => {
    if (!amount) {
      setError('Please enter an amount.');
      return;
    }
    setError('');
    console.log('Proceed to buy with amount:', amount);
  };

   useEffect(() => {
    if (inputCurrencyAmount && !isNaN(inputCurrencyAmount)) {
      fetchConversionRate(inputCurrencyAmount);
      setAmount(inputCurrencyAmount); 
    } else {
      setConvertedAmountINR(null);
      setAmount('');
    }
  }, [inputCurrencyAmount, selectedCurrency]);

  const handleInputChange = (text) => {
  const regex = /^[0-9]*\.?[0-9]*$/;
  if (text === '' || regex.test(text)) {
    if (text !== '' && rates.length > 0) {
      const rateINR = rates.find(r => r.code === 'USD')?.rate;
      const selectedRate = rates.find(r => r.code === selectedCurrency.code)?.rate;

      if (rateINR && selectedRate) {
        const amountInUSD = (parseFloat(text) * selectedRate) / rateINR;

        if (amountInUSD > MAX_AMOUNT_USD) {
          setModalError('As per government regulations, you can carry up to USD 250,000 during international travel in a financial year. Carrying amounts beyond this limit is not permitted. Please reduce the amount accordingly.');
        } else {
          setModalError('');
        }
      }
    } else {
      setModalError('');
    }
    setInputCurrencyAmount(text);
  }
};


    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <Header title="🌐 Forex & Currency" />
        </View>

        <View style={styles.centerContent}>
          <View style={styles.carouselRow}>
            <View style={styles.carouselWrapper}>
              {loading ? (
                <ActivityIndicator size="large" color="#1E88E5" />
              ) : (
                <Carousel
                  width={180}
                  height={100}
                  data={rates}
                  scrollAnimationDuration={600}
                  autoPlay
                  autoPlayInterval={4000}
                  loop
                  renderItem={({ item }) => {
                    const countryCode = CURRENCY_TO_COUNTRY_CODE[item.code];
                    const flagUrl = `https://flagcdn.com/w40/${countryCode}.png`;
                    return (
                      <View style={styles.card}>
                        <Text style={styles.day}>{item.day}</Text>
                        <View style={styles.flagAndName}>
                          <Image source={{ uri: flagUrl }} style={styles.flag} resizeMode="contain" />
                          <Text style={styles.code}>{item.name}</Text>
                        </View>
                        <Text style={styles.rate}>₹{item.rate?.toFixed(2)}</Text>
                      </View>
                    );
                  }}
                />
              )}
            </View>

            <Image
              source={require('../../assets/images/money.gif')}
              style={styles.sideGif}
            />
          </View>

          {/* Location Section */}
          <Pressable
            onPress={() => actionSheetRef.current?.show()}
            style={styles.locationWrapper}
          >
            <Image
              source={require('../../assets/images/scooter.gif')}
              style={styles.locationIcon}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.locationText}>
                Delivery by <Text style={styles.highlight}>Tomorrow 9:00 PM</Text> at{' '}
                <Text style={styles.locationHighlight}>
                  {location || 'your location...'}
                </Text>
              </Text>
            </View>
          </Pressable>
        </View>

          
        {/* Currency Dropdown */}
        <View style={{backgroundColor:'white',padding:10,marginTop:20,borderRadius:15}}>
                 <TouchableOpacity style={styles.dropdown} onPress={() => setModalVisible(true)} android_ripple={{color: '#ddd'}}>
          {(() => {
            const countryCode = getCountryCodeFromCurrency(selectedCurrency?.code);
            const flagUrl = countryCode ? `https://flagcdn.com/w40/${countryCode}.png` : null;
            if (flagUrl) {
              return (
                <Image
                  source={{ uri: flagUrl }}
                  style={styles.flag}
                  resizeMode="contain"
                />
              );
            } else {
              return (
                <View style={[styles.flag, { backgroundColor: '#ddd', justifyContent:'center', alignItems:'center' }]}>
                  <Text style={{ fontSize: 10, color: '#555' }}>No Flag</Text>
                </View>
              );
            }
          })()}
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.label}>Currency</Text>
            <Text style={styles.value}>{selectedCurrency?.name || 'Select Currency'}</Text>
          </View>
          <Text style={styles.arrow}>▾</Text>
        </TouchableOpacity>

        {/* Amount Entry */}
        <TouchableOpacity style={[styles.dropdown, { marginTop: 10, gap: 10 }]} onPress={() => setAmountModalVisible(true)}>
          <View style={{ borderRadius: 99, borderWidth: 1, padding: 2, borderColor: '#1E88E5' }}>
            <MaterialCommunityIcons name="equal" size={10} color="#1E88E5" />
          </View>
          <View>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#1E88E5' }}>Enter Amount</Text>
            <Text style={{ fontSize: 13, fontWeight: '600' }}>
              {amount ? `Added: ${selectedCurrency.code} ${amount}` : 'Add amount to get the best rates'}
            </Text>
          </View>
        </TouchableOpacity>


        <TouchableOpacity
        onPress={handleBuyNow}
        style={{ borderRadius: 10, marginTop: 12, overflow: 'hidden' }}
      >
        <LinearGradient
          colors={['#1E88E5', '#42A5F5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ paddingVertical: 12, alignItems: 'center' }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>Buy Now</Text>
        </LinearGradient>
      </TouchableOpacity>
          
        </View>





        <ActionSheet ref={actionSheetRef}>
          <CurrencyActionSheet
            actionSheetRef={actionSheetRef}
            getCurrentLocation={getCurrentLocation}
            onLocationSelected={handleLocationSelected}
          />
        </ActionSheet>

  <FullScreenCurrencyModal
    visible={modalVisible}
    onClose={() => setModalVisible(false)}
    onSelect={(currency) => setSelectedCurrency(currency)}
  />

<Modal
  visible={amountModalVisible}
  animationType="slide"
  transparent
  onRequestClose={() => setAmountModalVisible(false)}
>
  <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
    <View
      style={{
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 25,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 10,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: '800', marginBottom: 24, textAlign: 'center', color: '#1E293B' }}>
        💱 {selectedCurrency.code} to INR
      </Text>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        {/* Currency Input */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: '600', marginBottom: 8, fontSize: 14, color: '#475569' }}>
            {selectedCurrency.code}
          </Text>
          <TextInput
            placeholder="e.g. 100"
            keyboardType="numeric"
              value={inputCurrencyAmount}
  onChangeText={handleInputChange}
            style={{
              borderWidth: 1,
               borderColor: modalError ? '#E53935' : '#E2E8F0',
              borderRadius: 14,
              padding: 14,
              fontSize: 16,
              backgroundColor: '#F8FAFC',
              color: '#1E293B',
            }}
          />
        </View>

        {/* Converted INR */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: '600', marginBottom: 8, fontSize: 14, color: '#475569' }}>INR</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#E2E8F0',
              borderRadius: 14,
              padding: 14,
              backgroundColor: '#ECFDF5',
              justifyContent: 'center',
              height: 54,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#059669' }}>
              ₹ {convertedAmountINR ? convertedAmountINR : '--'}
            </Text>
          </View>
        </View>
      </View>

      {modalError ? (
 <View style={{ backgroundColor: '#FDECEA', padding: 6, borderRadius: 6, marginTop: 8 }}>
  <Text style={{ color: '#E53935', fontWeight: '600', textAlign: 'center', fontSize: 12 }}>
    {modalError}
  </Text>
</View>

) : null}

      {/* Done Button */}
          <TouchableOpacity
        onPress={() => {
          if (!modalError) setAmountModalVisible(false);
        }}
        disabled={!!modalError}
        style={{
          marginTop: 28,
          backgroundColor: modalError ? '#AAA' : '#1E88E5',
          paddingVertical: 14,
          borderRadius: 99,
          alignItems: 'center',
          shadowColor: '#1E88E5',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: modalError ? 0 : 0.3,
          shadowRadius: 10,
          elevation: modalError ? 0 : 5,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>Done</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>


      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F3F4F6',
      padding: 16,
    },
    headerWrapper: {
      marginBottom: 12,
    },
    centerContent: {
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 6,
    },
    carouselRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    carouselWrapper: {
      width: '70%',
    },
    sideGif: {
      width: 90,
      height: 90,
      borderRadius: 12,
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 16,
      padding: 12,
      width: 170,
      height: 90,
      justifyContent: 'space-between',
    },
    day: {
      fontSize: 12,
      color: '#888',
      fontWeight: '600',
    },
    flagAndName: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
    },
    flag: {
      width: 24,
      height: 16,
      marginRight: 8,
      borderRadius: 4,
    },
    code: {
      fontSize: 14,
      fontWeight: '600',
      color: '#111',
    },
    rate: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#1E88E5',
    },
    locationWrapper: {
      marginTop: 20,
      backgroundColor: '#E3F2FD',
      borderRadius: 16,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      elevation: 4,
      shadowColor: '#000',
      shadowOpacity: 0.07,
      shadowRadius: 6,
    },
    locationIcon: {
      width: 38,
      height: 38,
      borderRadius: 10,
    },
    locationText: {
      fontSize: 14,
      fontWeight: '500',
      color: '#444',
      flexWrap: 'wrap',
    },
    locationHighlight: {
      color: '#1E88E5',
      textDecorationLine: 'underline',
    },
    highlight: {
      color: '#E53935',
      fontWeight: '700',
    },
    dropdown: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F3F4F6',
      padding:10,
      borderRadius: 14,
      borderWidth:1,
      borderColor:'#ccc'
    },
    flag: {
      width: 32,
      height: 20,
      borderRadius: 4,
      backgroundColor: '#eee',
    },
    label: {
      fontSize: 12,
      fontWeight: '600',
      color: '#666',
    },
    value: {
      fontSize: 16,
      fontWeight: '700',
      color: '#222',
      marginTop: 2,
    },
    arrow: {
      fontSize: 20,
      color: '#888',
      marginLeft: 10,
    },
    
  });

  export default Forex;
