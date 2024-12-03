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
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    
    const activeDays = days
      .filter(day => reminder[day] === true) // Ensure exact matching boolean
      .map(day => day.charAt(0).toUpperCase() + day.slice(1));
  
    return activeDays.length ? activeDays.join(', ') : 'No Days Selected';
  };

  const formatTime = (reminder) => {
    if (reminder.recurring) {
      return `Every ${formatRecurringDays(reminder)} at ${reminder.time}`;
    }
    return `${reminder.date} at ${reminder.time}`;
  };

  return (
    <View style={styles.container}>
      {reminders.map((reminder) => (
        <View key={reminder.id} style={styles.reminderBox}>
          <Text style={styles.title}>{reminder.title}</Text>
          <Text style={styles.time}>{formatTime(reminder)}</Text>
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