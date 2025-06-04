import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  UIManager,
  LayoutAnimation,
  ScrollView,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TravellerDetails = ({adults}) => {
  

  const [travellers, setTravellers] = useState(
    Array.from({ length: adults }, (_, i) => ({
      expanded: i === 0,
      selectedTitle: '',
      selectedGender: '',
      dob: '',
      checked: false,
      showDatePicker: false,
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      contactNumber: '',
      email: '',
    }))
  );

  // modalVisible holds the index for which modal is open, or null
  const [modalVisible, setModalVisible] = useState({ title: null, gender: null });
  const titles = ['Mr', 'Mrs', 'Ms'];
  const genders = ['Male', 'Female', 'Other'];

  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTravellers((prev) =>
      prev.map((trav, i) =>
        i === index ? { ...trav, expanded: !trav.expanded } : trav
      )
    );
  };

  const toggleCheck = (index) => {
    setTravellers((prev) =>
      prev.map((trav, i) =>
        i === index ? { ...trav, checked: !trav.checked } : trav
      )
    );
  };

  const updateTravellerField = (index, field, value) => {
    setTravellers((prev) =>
      prev.map((trav, i) =>
        i === index ? { ...trav, [field]: value } : trav
      )
    );
  };

  const onDateChange = (index, event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setTravellers((prev) =>
      prev.map((trav, i) =>
        i === index
          ? {
              ...trav,
              showDatePicker: Platform.OS === 'ios',
              dob: `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${currentDate.getFullYear()}`,
            }
          : trav
      )
    );
  };

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Image
              source={require('../../assets/images/takeoff.png')}
              style={styles.icon}
            />
            <Text style={styles.sectionHeaderText}>Traveller Details</Text>
          </View>

          {travellers.map((traveller, index) => (
            <View key={index} style={styles.formContainer}>
              {/* Header Row */}
              <View style={[styles.fieldGroup, styles.checkboxRow]}>
                <TouchableOpacity
                  onPress={() => toggleCheck(index)}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <Ionicons
                    name={traveller.checked ? 'checkbox-outline' : 'square-outline'}
                    size={24}
                    color={traveller.checked ? '#007bff' : '#ccc'}
                  />
                  <Text style={{ marginLeft: 10, fontWeight: '500', color: '#333' }}>
                    Traveller {index + 1}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleExpand(index)}>
                  <Ionicons
                    name={traveller.expanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="#555"
                  />
                </TouchableOpacity>
              </View>

              {traveller.expanded && (
                <>
                  {/* Title Field (opens modal) */}
                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Title</Text>
                    <TouchableOpacity
                      style={styles.input}
                      onPress={() => setModalVisible({ ...modalVisible, title: index })}
                    >
                      <Text style={{ color: traveller.selectedTitle ? '#000' : '#888' }}>
                        {traveller.selectedTitle || 'Select Title'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* First Name */}
                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="First Name"
                      value={traveller.firstName}
                      onChangeText={(text) => updateTravellerField(index, 'firstName', text)}
                    />
                  </View>

                  {/* Last Name */}
                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Last Name"
                      value={traveller.lastName}
                      onChangeText={(text) => updateTravellerField(index, 'lastName', text)}
                    />
                  </View>

                  {/* Gender Field (opens modal) */}
                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Gender</Text>
                    <TouchableOpacity
                      style={styles.input}
                      onPress={() => setModalVisible({ ...modalVisible, gender: index })}
                    >
                      <Text style={{ color: traveller.selectedGender ? '#000' : '#888' }}>
                        {traveller.selectedGender || 'Select Gender'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Date of Birth */}
                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Date of Birth</Text>
                    <TouchableOpacity
                      style={styles.input}
                      onPress={() => updateTravellerField(index, 'showDatePicker', true)}
                    >
                      <Text style={{ color: traveller.dob ? '#000' : '#888' }}>
                        {traveller.dob || 'dd-mm-yyyy'}
                      </Text>
                    </TouchableOpacity>
                    {traveller.showDatePicker && (
                      <DateTimePicker
                        mode="date"
                        value={new Date()}
                        maximumDate={new Date()}
                        display="default"
                        onChange={(e, date) => onDateChange(index, e, date)}
                      />
                    )}
                  </View>

                  {/* Address */}
                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Address"
                      value={traveller.address}
                      onChangeText={(text) => updateTravellerField(index, 'address', text)}
                    />
                  </View>

                  {/* City */}
                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>City</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="City"
                      value={traveller.city}
                      onChangeText={(text) => updateTravellerField(index, 'city', text)}
                    />
                  </View>

                  {/* Contact Number */}
                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Contact Number</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Contact Number"
                      keyboardType="phone-pad"
                      value={traveller.contactNumber}
                      onChangeText={(text) => updateTravellerField(index, 'contactNumber', text)}
                    />
                  </View>

                  {/* Email */}
                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      keyboardType="email-address"
                      value={traveller.email}
                      onChangeText={(text) => updateTravellerField(index, 'email', text)}
                    />
                  </View>
                </>
              )}
            </View>
          ))}

        </View>
      </ScrollView>

      {/* Title Selection Modal */}
      <Modal
        visible={modalVisible.title !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible({ ...modalVisible, title: null })}
      >
        <TouchableOpacity
          style={modalStyles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible({ ...modalVisible, title: null })}
        >
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalTitle}>Select Title</Text>
            {titles.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  const idx = modalVisible.title;
                  const updated = [...travellers];
                  updated[idx].selectedTitle = item;
                  setTravellers(updated);
                  setModalVisible({ ...modalVisible, title: null });
                }}
                style={modalStyles.optionButton}
              >
                <Text style={modalStyles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Gender Selection Modal */}
      <Modal
        visible={modalVisible.gender !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible({ ...modalVisible, gender: null })}
      >
        <TouchableOpacity
          style={modalStyles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible({ ...modalVisible, gender: null })}
        >
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalTitle}>Select Gender</Text>
            {genders.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  const idx = modalVisible.gender;
                  const updated = [...travellers];
                  updated[idx].selectedGender = item;
                  setTravellers(updated);
                  setModalVisible({ ...modalVisible, gender: null });
                }}
                style={modalStyles.optionButton}
              >
                <Text style={modalStyles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default TravellerDetails;

const styles = StyleSheet.create({
  card: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  formContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fafafa',
  },
  sectionHeader: {
    backgroundColor: '#d0dff9',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    borderRadius: 99,
    backgroundColor: 'white',
    padding: 5,
    borderWidth: 2,
    borderColor: '#ffedd5',
  },
  fieldGroup: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },
  optionButton: {
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});
