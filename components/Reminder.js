import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import db from "@/database/db";

const Reminder = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    const { data, error } = await db.from('reminders').select('*');
    if (error) {
      console.error('Error fetching reminders:', error);
    } else {
      console.log('Fetched reminders:', data); // Add this line for debugging
      setReminders(data);
    }
  };

  const formatRecurringDays = (reminder) => {
    const dayAbbreviations = {
      sunday: 'Sun',
      monday: 'Mon',
      tuesday: 'Tue',
      wednesday: 'Wed',
      thursday: 'Thu',
      friday: 'Fri',
      saturday: 'Sat',
    };
  
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const activeDays = days
      .filter(day => reminder[day]) // Check if the day is active (true)
      .map(day => dayAbbreviations[day]); // Map to the abbreviated form
  
    return activeDays.length ? activeDays.join(', ') : 'No Days Selected';
  };

  const formatDetails = (reminder) => {
    // Format Time
    const formatTo12Hour = (timeString) => {
      const [hours, minutes] = timeString.split(":").map(Number);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12; // Convert to 12-hour format
      return `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    };
  
    // Format Date
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
      const formattedDate = date.toLocaleDateString('en-US', options); // 10/15/24
      return formattedDate;
    };
  
    // Format the time for recurring reminders with 12-hour format
    const formattedTime = reminder.recurring 
      ? `Every ${formatRecurringDays(reminder)} at ${formatTo12Hour(reminder.time)}`
      : `${formatDate(reminder.date)} at ${formatTo12Hour(reminder.time)}`;
  
    return formattedTime;
  };

  return (
    <View style={styles.container}>
      {reminders.map((reminder) => (
        <View key={reminder.id} style={styles.reminderBox}>
          <Text style={styles.title}>{reminder.title}</Text>
          <Text style={styles.time}>{formatDetails(reminder)}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  reminderBox: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  time: {
    fontSize: 14,
    color: '#555',
  },
});

export default Reminder;