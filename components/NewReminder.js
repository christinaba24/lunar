import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Use Picker from @react-native-picker/picker
import db from "@/database/db"; // Assuming db is correctly configured for your database

const NewReminder = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [repeat, setRepeat] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reminderType, setReminderType] = useState(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [tempReminderType, setTempReminderType] = useState(reminderType);

  const handleSave = async () => {
    if (title.trim()) {
      const { error } = await db.from('reminders').insert([{ title, repeat, selectedDays, selectedDate, selectedTime, reminderType }]);
      if (!error) {
        onSave(); // Call onSave if the save was successful
      } else {
        console.error('Error saving reminder:', error);
      }
    } else {
      console.warn('Title cannot be empty');
    }
  };

  const toggleDaySelection = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
    );
  };

  const togglePickerVisibility = () => {
    setTempReminderType(reminderType); // Sync temporary value with the current value
    setPickerVisible(true); // Show picker
  };

  const handlePickerChange = (itemValue) => {
    setReminderType(itemValue);
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelAddText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Create a reminder</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.cancelAddText}>   Add</Text>
          </TouchableOpacity>
        </View>

        {/* Title Input Field */}
        <View style={styles.inputContainer}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter reminder title"
            style={styles.input}
          />
          <MaterialCommunityIcons
            name="link" // Icon name for location
            size={24}
            color="#828282"
            style={[styles.locationIcon, { right: 25 }]}
          />
          <MaterialCommunityIcons
            name="map-marker-outline" // Icon name for location
            size={24}
            color="#828282"
            style={styles.locationIcon}
          />
        </View>

        {/* Repeat Section */}
        <View style={styles.repeatSection}>
          <TouchableOpacity onPress={() => setRepeat(!repeat)}>
            <Text style={styles.repeatText}>{repeat ? 'Disable Repeat' : 'Enable Repeat'}</Text>
          </TouchableOpacity>
          {repeat && (
            <View style={styles.daysContainer}>
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                <TouchableOpacity key={day} onPress={() => toggleDaySelection(day)}>
                  <Text style={selectedDays.includes(day) ? styles.selectedDay : styles.day}>{day}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Date and Time Selection */}
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>Date</Text>
            <TouchableOpacity
              disabled={repeat}
              onPress={() => setPickerVisible(true)} // Toggle picker visibility
            >
              <Text style={styles.dateText}>{selectedDate ? selectedDate : 'Select Date'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>Time</Text>
            <TextInput
              style={styles.timeText}
              value={selectedTime}
              placeholder="Select Time"
              onChangeText={setSelectedTime}
            />
          </View>
        </View>

        {/* Reminder Type Section */}
        <TouchableOpacity onPress={togglePickerVisibility} style={styles.pickerContainer}>
          <Text style={styles.pickerText}>{reminderType ? reminderType : 'Select Type'}</Text>
        </TouchableOpacity>

        {/* Conditionally Render Picker Below */}
        {pickerVisible && (
            <Modal transparent={true} animationType="fade">
            <TouchableOpacity 
                style={styles.modalOverlay} 
                onPress={() => setPickerVisible(false)}
            />
            <View style={styles.pickerPopup}>
                <Picker
                selectedValue={reminderType}
                onValueChange={(itemValue) => setTempReminderType(itemValue)}
                itemStyle={{fontSize: 15}}
                >
                <Picker.Item label="Select Type" value="" />
                <Picker.Item label="Wellbeing" value="Wellbeing" />
                <Picker.Item label="Food and Cooking" value="Food and Cooking" />
                <Picker.Item label="Family" value="Family" />
                <Picker.Item label="Sleep" value="Sleep" />
                </Picker>
                <TouchableOpacity
                    onPress={() => {
                    setReminderType(tempReminderType); // Confirm selection
                    setPickerVisible(false); // Close picker
                    }}
                    style={styles.okButton}
                    >
                    <Text style={styles.okButtonText}>OK</Text>
                </TouchableOpacity>
            </View>
            </Modal>
            )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  cancelAddText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
    paddingVertical: 5,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
    marginRight: 10,
  },
  locationIcon: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  repeatSection: {
    marginBottom: 20,
  },
  repeatText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  day: {
    fontSize: 14,
    padding: 5,
    margin: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  selectedDay: {
    fontSize: 14,
    padding: 5,
    margin: 5,
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: 5,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateContainer: {
    flex: 1,
    alignItems: 'center',
  },
  timeContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  pickerWrapper: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#dbdbdb',
    paddingTop: 10,
  },
  picker: {
    width: '100%',
    height: 50,
  },
  timeText: {
    fontSize: 14,
    color: '#333',
  },
  pickerContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
  },
  pickerPopup: {
    position: 'absolute',
    alignSelf: 'center', // Center horizontally
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    width: '60%', // Adjust width as needed
    bottom: '42%',
  },
  okButton: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    color: 'blue',
  },
});

export default NewReminder;