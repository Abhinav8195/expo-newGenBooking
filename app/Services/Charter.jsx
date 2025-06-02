import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  TextInput,
  Modal,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import DiscoverPlace from '../../components/CruisesOffers/DiscoverPlace'; 
import DateTimePicker from 'react-native-modal-datetime-picker';
import WhyUs from '../../components/CruisesOffers/WhyUs';

const Charter = () => {
  const navigation = useNavigation();
  const headingAnim = useRef(new Animated.Value(0)).current;
  const formAnim = useRef(new Animated.Value(0)).current;

  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(headingAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(formAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleDateChange = (_event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const d = selectedDate;
      const formatted = `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${d.getFullYear()}`;
      setBookingDate(formatted);
    }
  };

  const handleTimeChange = (_event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const t = selectedTime;
      const formatted = `${t.getHours().toString().padStart(2, '0')}:${t
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
      setBookingTime(formatted);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1,backgroundColor:'white' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <View style={{ position: 'relative' }}>
            <Image
              source={require('../../assets/images/a1.jpeg')}
              style={{ width: '100%', height: 300, resizeMode: 'cover' }}
            />
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Fly High, Fly Private</Text>

          <Animated.View
            style={[
              styles.form,
              {
                opacity: formAnim,
                transform: [
                  {
                    translateY: formAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.label}>Name</Text>
            <TextInput
              placeholder="Enter your full name"
              style={styles.input}
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter your email address"
              style={styles.input}
              placeholderTextColor="#999"
              keyboardType="email-address"
            />

            <Text style={styles.label}>Pickup Destination</Text>
            <TextInput
              placeholder="E.g., New York, NY"
              style={styles.input}
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Drop Destination</Text>
            <TextInput
              placeholder="E.g., Boston, MA"
              style={styles.input}
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Booking Date</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                placeholder="dd-mm-yyyy"
                style={styles.input}
                placeholderTextColor="#999"
                value={bookingDate}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>

            <Text style={styles.label}>Booking Time</Text>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <TextInput
                placeholder="--:--"
                style={styles.input}
                placeholderTextColor="#999"
                value={bookingTime}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>

            <Text style={styles.label}>Additional Notes</Text>
            <TextInput
              placeholder="Let us know any specific requests or preferences"
              style={[styles.input, { height: 80 }]}
              placeholderTextColor="#999"
              multiline
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => Alert.alert('Inquiry Submitted!')}
            >
              <Text style={styles.buttonText}>Submit Inquiry</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Date Picker Modal */}
          <Modal transparent visible={showDatePicker} animationType="fade">
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setShowDatePicker(false)}
            >
              <View style={styles.pickerModal}>
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                  style={{ backgroundColor: 'white' }}
                />
              </View>
            </Pressable>
          </Modal>

          {/* Time Picker Modal */}
          <Modal transparent visible={showTimePicker} animationType="fade">
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setShowTimePicker(false)}
            >
              <View style={styles.pickerModal}>
                <DateTimePicker
                  value={new Date()}
                  mode="time"
                  display="spinner"
                  onChange={handleTimeChange}
                  style={{ backgroundColor: 'white' }}
                />
              </View>
            </Pressable>
          </Modal>
        </View>
        <DiscoverPlace/>
        <WhyUs/>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Charter;

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 10,
    left: 15,
    padding: 8,
    borderRadius: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    marginTop: -70,
    fontFamily: 'regular',
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginTop: -5,
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#5796ad',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerModal: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
