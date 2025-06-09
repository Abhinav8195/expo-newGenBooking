import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CurrencyActionSheet = ({ actionSheetRef, getCurrentLocation, onLocationSelected }) => {
  const [pincode, setPincode] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState('');

  const fetchAddressFromPincode = async () => {
    setError('');
    if (pincode.length !== 6) {
      setError('Please enter a valid 6-digit pincode.');
      return;
    }

    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();

      if (data[0].Status === 'Success') {
        const postOffice = data[0].PostOffice[0];
        const locationStr = `${postOffice.Name}, ${postOffice.District}, ${postOffice.State}`;
        onLocationSelected(locationStr);
        actionSheetRef.current?.hide();
        setPincode('');
        setShowInput(false);
      } else {
        setError('Pincode not found.');
      }
    } catch (error) {
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <View style={styles.sheetContainer}>
      <Text style={styles.heading}>📍 Choose how you want to set your location</Text>

      <View style={styles.optionRow}>
        <Pressable
          style={styles.optionCard}
          onPress={() => {
            actionSheetRef.current?.hide();
            getCurrentLocation();
          }}
        >
          <Text style={styles.optionEmoji}>📌</Text>
          <Text style={styles.optionLabel}>Use Current Location</Text>
        </Pressable>

        <Pressable
          style={styles.optionCard}
          onPress={() => setShowInput(!showInput)}
        >
          <Text style={styles.optionEmoji}>🏷️</Text>
          <Text style={styles.optionLabel}>Enter Pincode</Text>
        </Pressable>
      </View>

      {showInput && (
        <View style={styles.inputSection}>
          <TextInput
            placeholder="Enter 6-digit Pincode"
            value={pincode}
            onChangeText={setPincode}
            keyboardType="numeric"
            style={styles.input}
            maxLength={6}
          />
          {!!error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity onPress={fetchAddressFromPincode}>
            <LinearGradient
              colors={['#ff416c', '#ff4b2b']}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Get Address</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.serviceNote}>
        ✅ We currently serve in: Delhi, Mumbai, Bangalore, Hyderabad, Pune & more
      </Text>

      <Pressable style={styles.cancelBtn} onPress={() => actionSheetRef.current?.hide()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </Pressable>
    </View>
  );
};

export default CurrencyActionSheet;

const styles = StyleSheet.create({
  sheetContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#222',
    textAlign: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  optionCard: {
    flex: 1,
    backgroundColor: '#fdf1f1',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  optionEmoji: {
    fontSize: 24,
    marginBottom: 6,
  },
  optionLabel: {
    fontSize: 14,
    color: '#d32f2f',
    fontWeight: '500',
  },
  inputSection: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  gradientButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 4,
  },
  serviceNote: {
    marginTop: 20,
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  cancelBtn: {
    marginTop: 16,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: '#999',
  },
});
