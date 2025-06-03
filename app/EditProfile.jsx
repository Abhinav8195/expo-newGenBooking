import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { Entypo, Ionicons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const EditProfile = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Entypo name="chevron-left" size={26} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <Ionicons name="language" size={24} color="#247ba0" />
        </View>

        {/* Profile Picture */}
        <View style={styles.imageContainer}>
          <Image
            source={
              image
                ? { uri: image }
                : require('../assets/images/profile.png')
            }
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
            <Feather name="camera" size={18} color="#247ba0" />
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Full Name*</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor="#aaa"
          />

          <Text style={styles.label}>Username*</Text>
          <TextInput
            style={styles.input}
            placeholder="@username"
            placeholderTextColor="#aaa"
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="+1234567890"
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="info@bookypay.com"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
          />
        </View>

        {/* Buttons */}
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
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
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#247ba0',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 150,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  form: {
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: 'transparent',
    color: '#000',
  },
  updateButton: {
    backgroundColor: '#247ba0',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#247ba0',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelText: {
    color: '#247ba0',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});
