import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import DiscoverPlace from '../../components/CruisesOffers/DiscoverPlace';
import WhyUs from '../../components/CruisesOffers/WhyUs';


const Cruise = () => {
  const router = useRouter();

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

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const d = selectedDate;
      const formatted = `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${d.getFullYear()}`;
      setBookingDate(formatted);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
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
   <LinearGradient
  colors={['#5796ad', '#5796ad', '#5796ad', '#ffffff']}
  style={styles.container}
>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Image with Back Icon */}
          <View style={styles.imageContainer}>
            <Animated.Image
              source={require('../../assets/images/cruise1.png')}
              style={[
                styles.image,
                {
                  opacity: headingAnim,
                  transform: [
                    {
                      translateX: headingAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-100, 0],
                      }),
                    },
                  ],
                },
              ]}
            />
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Header and Form */}
          <View style={styles.content}>
            <Animated.Text
              style={[
                styles.heading,
                {
                  opacity: headingAnim,
                  transform: [
                    {
                      translateY: headingAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              Travel in Style Luxury Cruise for Every Explorer
            </Animated.Text>

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
          </View>

          <DiscoverPlace/>
          <WhyUs/>
        </ScrollView>

      
        {/* Date Modal */}
<Modal transparent visible={showDatePicker} animationType="fade">
  <Pressable style={styles.modalOverlay} onPress={() => setShowDatePicker(false)}>
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

{/* Time Modal */}
<Modal transparent visible={showTimePicker} animationType="fade">
  <Pressable style={styles.modalOverlay} onPress={() => setShowTimePicker(false)}>
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

      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Cruise;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 6,
    borderRadius: 20,
  },
  content: {
    padding: 20,
  },
  heading: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 20,
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
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

