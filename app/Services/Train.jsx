import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Entypo, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import { LinearGradient } from 'expo-linear-gradient';
import { Marquee } from '@animatereactnative/marquee';

const Train = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [note, setNote] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [tempDate, setTempDate] = useState(tomorrow);
  const [tempTime, setTempTime] = useState(new Date());

  const ChooseUs = [
    {
      id: 1,
      title: 'Cheap Trains in Europe and Asia',
      Subtitle: 'Promotions and discounts to get cheap train tickets',
      image: 'https://nextgentrip.com/images/1ny5512000dkon9p3A3E5.png_.webp'
    },
    {
      id: 2,
      title: 'Live Fares and Times',
      Subtitle: 'View rail status, departure info and compare prices',
      image: 'https://nextgentrip.com/images/1ny5c12000dkolhv7B2D7.png_.webp'
    },
    {
      id: 3,
      title: 'E-tickets Available',
      Subtitle: 'Digital tickets on your phone for contactless travel',
      image: 'https://nextgentrip.com/images/1ny4g12000dkolhv536C3.png_.webp'
    },
    {
      id: 4,
      title: 'Trusted Operators',
      Subtitle: 'We bring all train operators together for easier rail travel',
      image: 'https://nextgentrip.com/images/1ny4v12000dkomd640BC9.png_.webp'
    }
  ];
  const imageList=[
    require('../../assets/images/p1.png'),
    require('../../assets/images/p2.png'),
    require('../../assets/images/p3.png'),
    require('../../assets/images/p4.png'),
     require('../../assets/images/p5.png'),
    require('../../assets/images/p6.png'),

  ]

  const openDateModal = () => {
    setTempDate(date || tomorrow);
    setShowDatePicker(true);
  };

  const openTimeModal = () => {
    setTempTime(time || new Date());
    if (!date) {
      Alert.alert('Select Date First', 'Please select booking date before time.');
      return;
    }
    setShowTimePicker(true);
  };

  const confirmDate = () => {
    if (tempDate >= tomorrow) {
      setDate(tempDate);
      setShowDatePicker(false);
    } else {
      Alert.alert('Invalid Date', 'Please select a date from tomorrow onwards.');
    }
  };

  const confirmTime = () => {
    const now = new Date();
    const chosenDateTime = new Date(date);
    chosenDateTime.setHours(tempTime.getHours(), tempTime.getMinutes());
    if (chosenDateTime > now) {
      setTime(tempTime);
      setShowTimePicker(false);
    } else {
      Alert.alert('Invalid Time', 'Please select a future time.');
    }
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (!name.trim()) return Alert.alert('Required', 'Please enter your name');
    if (!email.trim()) return Alert.alert('Required', 'Please enter your email');
    if (!/\S+@\S+\.\S+/.test(email)) return Alert.alert('Invalid Email', 'Please enter a valid email');
    if (!pickup.trim()) return Alert.alert('Required', 'Please enter pick-up destination');
    if (!drop.trim()) return Alert.alert('Required', 'Please enter drop destination');
    if (!date) return Alert.alert('Required', 'Please select booking date');
    if (!time) return Alert.alert('Required', 'Please select booking time');

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Inquiry Sent',
        text2: `Thank you, ${name}! Your train booking inquiry has been sent.`,
        position: 'bottom',
        visibilityTime: 4000,
        autoHide: true,
        onHide: () => router.back(),
      });
    }, 5000);
  };

  const formatDate = (d) => d ? d.toLocaleDateString() : 'Select Date';
  const formatTime = (t) => t ? t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select Time';

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Fixed Header */}
      <View style={[styles.header, { paddingHorizontal: 20}]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Train Booking</Text>
        <TouchableOpacity>
          <Ionicons name="language" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Form */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 20}}
          >
            <Text style={styles.headingText}>
              Travel in Style:{"\n"}
              <Text style={{ fontWeight: '700' }}>Luxury Train for Every Explorer</Text>
            </Text>

            <TextInput placeholder="Full Name" style={styles.input} value={name} onChangeText={setName} autoCapitalize="words" />
            <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

            <View style={styles.row}>
              <TextInput placeholder="Pick-up Destination" style={[styles.input, styles.halfInput]} value={pickup} onChangeText={setPickup} autoCapitalize="words" />
              <TextInput placeholder="Drop Destination" style={[styles.input, styles.halfInput]} value={drop} onChangeText={setDrop} autoCapitalize="words" />
            </View>

            <View style={styles.row}>
              <TouchableOpacity style={[styles.input, styles.halfInput, styles.picker]} onPress={openDateModal}>
                <Text style={{ color: date ? '#000' : '#999' }}>{formatDate(date)}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.input, styles.halfInput, styles.picker]} onPress={openTimeModal}>
                <Text style={{ color: time ? '#000' : '#999' }}>{formatTime(time)}</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Additional Note (Optional)"
              style={[styles.input, { height: 80 }]}
              value={note}
              onChangeText={setNote}
              multiline
            />

            {loading ? (
              <TouchableOpacity style={styles.Trainbutton} disabled>
                <Image source={require('../../assets/images/train.gif')} style={{ width: 130, height: 60, resizeMode: 'cover' }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleSubmit}>
                <LinearGradient
                  colors={['#3B82F6', '#6366F1', '#8B5CF6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.buttonText}>Send Inquiry</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}

            <View style={{ marginVertical: 30 }}>
              <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#279695', textDecorationLine: 'underline' }}>
                Why Book Train Tickets with NextGen?
              </Text>
            </View>

            {ChooseUs.map(item => (
              <View key={item.id} style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.Subtitle}</Text>
              </View>
            ))}



            <View style={{marginVertical:10}}>
                <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',color:'#279695',textDecorationLine: 'underline'}}>Trusted Partners</Text>
                <Marquee spacing={10} speed={0.5}>
                    <View style={{display:'flex',flexDirection:'row',gap:10}}>
                    {
                    imageList.map((image, index) => (
                        <Image key={index} source={image} style={{ width: 100, height: 100, borderRadius: 10,resizeMode:'contain',marginHorizontal:10 }} />
                    ))
                }
                </View>
                </Marquee>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Date Modal */}
      <Modal isVisible={showDatePicker} onBackdropPress={() => setShowDatePicker(false)} useNativeDriver>
        <View style={styles.modalContent}>
          <DateTimePicker
            value={tempDate}
            mode="date"
            display="spinner"
            minimumDate={tomorrow}
            onChange={(e, d) => d && setTempDate(d)}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={() => setShowDatePicker(false)} style={styles.modalBtn}>
              <Text style={styles.modalBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmDate} style={styles.modalBtn}>
              <Text style={[styles.modalBtnText, { fontWeight: 'bold' }]}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Time Modal */}
      <Modal isVisible={showTimePicker} onBackdropPress={() => setShowTimePicker(false)} useNativeDriver>
        <View style={styles.modalContent}>
          <DateTimePicker
            value={tempTime}
            mode="time"
            display="spinner"
            is24Hour={false}
            onChange={(e, t) => t && setTempTime(t)}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={() => setShowTimePicker(false)} style={styles.modalBtn}>
              <Text style={styles.modalBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmTime} style={styles.modalBtn}>
              <Text style={[styles.modalBtnText, { fontWeight: 'bold' }]}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Train;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 60,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headingText: {
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 28,
    color: '#222',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 15,
    color: '#222',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
    marginRight: 10,
  },
  picker: {
    justifyContent: 'center',
  },
  gradientButton: {
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  Trainbutton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  modalBtn: {
    marginLeft: 15,
  },
  modalBtnText: {
    fontSize: 16,
    color: '#007AFF',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
