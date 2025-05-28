import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');

const PackageBooking = () => {
  const { package: packageStr } = useLocalSearchParams();
  const item = packageStr ? JSON.parse(packageStr) : null;

  const [showForm, setShowForm] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [returnDate, setReturnDate] = useState(null);
  const [showReturnPicker, setShowReturnPicker] = useState(false);
  const [adults, setAdults] = useState('1');
  const [children, setChildren] = useState('0');
  const [infants, setInfants] = useState('0');
  const [promoCode, setPromoCode] = useState('');

  if (!item) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No Package Data Available</Text>
      </View>
    );
  }

  const pricePerPerson = 10000;
  const totalPersons = parseInt(adults || '0') + parseInt(children || '0');

  let discountPercent = 0;
  if (promoCode.toLowerCase() === 'save10') discountPercent = 10;
  else if (promoCode.toLowerCase() === 'save20') discountPercent = 20;

  const subtotal = pricePerPerson * totalPersons;
  const discountAmount = (subtotal * discountPercent) / 100;
  const totalPrice = subtotal - discountAmount;

 const onStartDateChange = (event, selectedDate) => {
  setShowStartPicker(false);
  if (event.type === 'set' && selectedDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      Alert.alert('Invalid Date', 'Start date cannot be today or in the past.');
      return;
    }
    setStartDate(selectedDate);
    if (returnDate && selectedDate > returnDate) setReturnDate(null);
  }
};

const onReturnDateChange = (event, selectedDate) => {
  setShowReturnPicker(false);
  if (event.type === 'set' && selectedDate) {
    if (selectedDate <= startDate) {
      Alert.alert('Invalid Date', 'Return date must be after start date.');
      return;
    }
    setReturnDate(selectedDate);
  }
};


  const handleConfirmBooking = () => {
  if (!name.trim() || !phone.trim() || !email.trim()) {
    Alert.alert('Error', 'Please fill all required fields.');
    return;
  }
  if (totalPersons <= 0) {
    Alert.alert('Error', 'Please add at least one adult or child.');
    return;
  }
  
  Alert.alert('Success', 'Your booking is confirmed!');
  setShowForm(false); 
};


  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <ScrollView
            style={styles.modalContent}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {!showForm ? (
              <>
                <Text style={styles.name}>{item.name}</Text>

                <View style={styles.ratingRow}>
                  {[1, 2, 3, 4].map((_, i) => (
                    <FontAwesome
                      key={i}
                      name="star"
                      size={18}
                      color="#FFD700"
                      style={{ marginRight: 4 }}
                    />
                  ))}
                  <FontAwesome name="star-half" size={18} color="#FFD700" />
                </View>

                <Text style={styles.price}>
                  Price: <Text style={{ fontWeight: 'bold' }}>₹{pricePerPerson} per person</Text>
                </Text>

                <Text style={styles.description}>{item.description}</Text>

                {item.duration && (
                  <Text style={styles.detail}>
                    <Text style={styles.detailLabel}>Duration: </Text>
                    {item.duration}
                  </Text>
                )}
                {item.location && (
                  <Text style={styles.detail}>
                    <Text style={styles.detailLabel}>Location: </Text>
                    {item.location}
                  </Text>
                )}

                {item.activities && (
                  <View style={{ marginTop: 10 }}>
                    <Text style={styles.detailLabel}>Activities:</Text>

                    {Array.isArray(item.activities) ? (
                      item.activities.map((activity, idx) => {
                        if (Array.isArray(activity)) {
                          return (
                            <View key={idx} style={{ marginVertical: 6 }}>
                              <Text style={styles.activityDay}>Day {idx + 1}:</Text>
                              {activity.map((act, i) => (
                                <Text key={i} style={styles.activityItem}>
                                  • {act}
                                </Text>
                              ))}
                            </View>
                          );
                        } else if (typeof activity === 'string') {
                          return (
                            <Text key={idx} style={styles.activityItem}>
                              • {activity}
                            </Text>
                          );
                        } else {
                          return null;
                        }
                      })
                    ) : typeof item.activities === 'object' ? (
                      Object.entries(item.activities).map(([day, acts], idx) => (
                        <View key={idx} style={{ marginVertical: 6 }}>
                          <Text style={styles.activityDay}>{day}:</Text>
                          {Array.isArray(acts)
                            ? acts.map((act, i) => (
                                <Text key={i} style={styles.activityItem}>
                                  • {act}
                                </Text>
                              ))
                            : null}
                        </View>
                      ))
                    ) : (
                      <Text style={styles.activityItem}>No activity info available</Text>
                    )}
                  </View>
                )}

                <TouchableOpacity
                  style={styles.bookBtn}
                  onPress={() => {
                    setConfirmed(false);
                    setShowForm(true);
                  }}
                >
                  <Text style={styles.bookBtnText}>Book Now</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.formTitle}>Booking Form</Text>

               <>
                <TextInput
                    style={styles.input}
                    placeholder="Name*"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone*"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email*"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <TouchableOpacity
                    onPress={() => setShowStartPicker(true)}
                    style={styles.datePickerBtn}
                >
                    <Text style={styles.datePickerLabel}>Start Date</Text>
                    <Text style={styles.datePickerText}>{startDate.toDateString()}</Text>
                </TouchableOpacity>

                {showStartPicker && (
                    <DateTimePicker
                    value={startDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    minimumDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                    onChange={onStartDateChange}
                    />
                )}

                <TouchableOpacity
                    onPress={() => setShowReturnPicker(true)}
                    style={styles.datePickerBtn}
                >
                    <Text style={styles.datePickerLabel}>Return Date</Text>
                    <Text style={styles.datePickerText}>
                    {returnDate ? returnDate.toDateString() : 'Optional'}
                    </Text>
                </TouchableOpacity>

                {showReturnPicker && (
                    <DateTimePicker
                    value={returnDate || new Date(startDate.getTime() + 86400000)}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    minimumDate={new Date(startDate.getTime() + 86400000)}
                    onChange={onReturnDateChange}
                    />
                )}

                <Text style={styles.personLabel}>Adults:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={adults}
                    onChangeText={(val) => {
                    if (/^\d*$/.test(val)) setAdults(val);
                    }}
                />
                <Text style={styles.personLabel}>Children:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={children}
                    onChangeText={(val) => {
                    if (/^\d*$/.test(val)) setChildren(val);
                    }}
                />
                <Text style={styles.personLabel}>Infants:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={infants}
                    onChangeText={(val) => {
                    if (/^\d*$/.test(val)) setInfants(val);
                    }}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Promo Code"
                    value={promoCode}
                    onChangeText={setPromoCode}
                    autoCapitalize="characters"
                />

                <TouchableOpacity
                    style={styles.bookBtnModal}
                    onPress={handleConfirmBooking}
                >
                    <Text style={styles.bookBtnText}>Confirm Booking</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.bookBtnModal, { backgroundColor: '#ccc', marginTop: 15 }]}
                    onPress={() => setShowForm(false)}
                >
                    <Text style={[styles.bookBtnText, { color: '#444' }]}>Cancel</Text>
                </TouchableOpacity>
                </>

              </>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default PackageBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fd',
  },
  image: {
    width: width,
    height: 300,
    resizeMode: 'cover',
  },
  modalOverlay: {
    position: 'absolute',
    top: 220,
    left: 15,
    right: 15,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
     borderTopRightRadius: 25,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 15,
  },
  modalContent: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2c3e50',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#4e91f9',
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    marginBottom: 14,
  },
  detail: {
    fontSize: 15,
    color: '#555',
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: '600',
    color: '#222',
  },
  activityDay: {
    fontWeight: '700',
    fontSize: 16,
    color: '#2d3436',
  },
  activityItem: {
    fontSize: 14.5,
    color: '#636e72',
    marginLeft: 10,
    marginTop: 3,
  },
  bookBtn: {
    marginTop: 25,
    backgroundColor: '#4e91f9',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#4e91f9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  bookBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#f9fbff',
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  datePickerBtn: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f0f4ff',
    borderRadius: 10,
    marginBottom: 15,
  },
  datePickerLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  datePickerText: {
    color: '#4e91f9',
    fontSize: 16,
    fontWeight: '500',
  },
  personLabel: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 6,
    color: '#444',
  },
  bookBtnModal: {
    backgroundColor: '#4e91f9',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  summaryText: {
    fontSize: 16,
    marginVertical: 6,
    color: '#34495e',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

