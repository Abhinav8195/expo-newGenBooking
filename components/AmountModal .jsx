import React, { useEffect, useState } from 'react';
import {
  View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';

const AmountModal = ({ visible, onClose, selectedCurrency, onConfirm }) => {
  const [inputAmount, setInputAmount] = useState('');
  const [convertedINR, setConvertedINR] = useState('');
  const [currencyRates, setCurrencyRates] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const USD_LIMIT = 250000;

  useEffect(() => {
    if (visible) {
      fetch('https://api.currencyfreaks.com/v2.0/rates/latest?apikey=YOUR_API_KEY')
        .then(res => res.json())
        .then(data => setCurrencyRates(data.rates))
        .catch(err => console.error('Rate fetch error', err));
    }
  }, [visible]);

  const handleAmountChange = (amount) => {
    setInputAmount(amount);
    if (!currencyRates || !selectedCurrency?.code || !currencyRates[selectedCurrency.code]) return;

    const selectedRate = parseFloat(currencyRates[selectedCurrency.code]);
    const inrRate = parseFloat(currencyRates['INR']);
    const usdRate = parseFloat(currencyRates['USD']);

    const inUSD = parseFloat(amount) * (usdRate / selectedRate);
    const inINR = parseFloat(amount) * (inrRate / selectedRate);
    setConvertedINR(inINR.toFixed(2));

    if (inUSD > USD_LIMIT) {
      setErrorMessage(
        `🚫 You’ve exceeded the annual limit of USD ${USD_LIMIT.toLocaleString()}.\n\nAs per RBI's Liberalised Remittance Scheme (LRS), an Indian resident can remit a maximum of USD ${USD_LIMIT.toLocaleString()} in a financial year.`
      );
    } else {
      setErrorMessage('');
    }
  };

  const handleConfirm = () => {
    if (!errorMessage && inputAmount) {
      onConfirm(inputAmount, convertedINR);
      setInputAmount('');
      setErrorMessage('');
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            <Text style={styles.title}>Enter Amount in {selectedCurrency?.code}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder={`e.g. 1000 ${selectedCurrency?.code}`}
              value={inputAmount}
              onChangeText={handleAmountChange}
            />

            {convertedINR !== '' && !errorMessage && (
              <Text style={styles.convertedText}>
                ₹ {convertedINR} INR
              </Text>
            )}

            {errorMessage !== '' && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            )}

            <TouchableOpacity
              style={[styles.confirmButton, errorMessage && styles.disabledButton]}
              onPress={handleConfirm}
              disabled={!!errorMessage}
            >
              <Text style={styles.confirmText}>Add Now</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  convertedText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0a7',
    marginBottom: 10,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
  },
  errorBox: {
    backgroundColor: '#FFEAEA',
    borderColor: '#FF5A5F',
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
  },
  errorText: {
    color: '#B00020',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});
export default AmountModal;
