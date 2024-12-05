import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Use Picker from @react-native-picker/picker
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import db from "@/database/db"; // Assuming db is correctly configured for your database
import Theme from "@/assets/theme";

const NewReminder = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [repeat, setRepeat] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reminderType, setReminderType] = useState(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [tempReminderType, setTempReminderType] = useState(reminderType);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const handleSave = async () => {
    if (title.trim()) {
      const { error } = await db.from('reminders').insert([{ title, repeat, selectedDays, selectedDate, selectedTime, type: reminderType }]);
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

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
    setSelectedTime(time);
    hideTimePicker();
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
          <View style={styles.toggleContainer}>
            <Text style={styles.repeatText}>Repeat</Text>
            <Switch
              value={repeat}
              onValueChange={(value) => setRepeat(value)}
              thumbColor={repeat ? "#ffffff" : "#f4f3f4"}
              trackColor={{ false: "#767577", true: Theme.colors.PurpleMedium }}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }} 
            />
          </View>
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
          <TouchableOpacity onPress={showDatePicker} disabled={repeat}>
            <View style={styles.dateBox}>
              <MaterialCommunityIcons 
                name="calendar" 
                size={20} 
                color={repeat ? "#D3D3D3" : "#828282"} 
                style={styles.calendarIcon} 
              />
              <TextInput
                color={repeat ? "#D3D3D3" : "#595959"} 
                value={selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
                editable={!repeat} // Disable editing if repeat toggle is on
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={showTimePicker}>
            <View style={styles.dateBox}>
              <MaterialCommunityIcons 
                name="clock" 
                size={20} 
                color="#828282" 
                style={styles.calendarIcon} 
              />
              <TextInput
                style={styles.dateInput}
                value={selectedTime ? selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select Time'}
                editable={false}
                onPress={showTimePicker}
              />
            </View>
          </TouchableOpacity>
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
              selectedValue={tempReminderType} // Use tempReminderType here
              onValueChange={(itemValue) => setTempReminderType(itemValue)} // Update tempReminderType as the user scrolls
              itemStyle={{ fontSize: 15 }}
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

      {/* Date Picker Modal */}
      <DateTimePickerModal
        date={selectedDate ? selectedDate : new Date()}
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      {/* Time Picker Modal */}
      <DateTimePickerModal
        date={selectedTime ? selectedTime : new Date()}
        isVisible={timePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
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
  calendarIcon: {
    marginRight: 8,
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
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    width: 152,
  },
  dateInput: {
    color: "#595959",
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Make sure they align vertically
    width: '100%', // Ensure it takes up full width
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  day: {
    fontSize: 14,
    padding: 5,
    margin: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedDay: {
    fontSize: 14,
    padding: 5,
    margin: 5,
    backgroundColor: Theme.colors.PurpleDark,
    color: 'white',
    borderRadius: 5,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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