import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import db from "@/database/db";
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Importing the icons

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

  const getTypeColor = (type) => {
    const colors = {
      Wellbeing: '#98c7cb',  // Green
      'Food and Cooking': '#f7da67', // Orange
      Family: '#9c9cff', // Blue
      Sleep: '#57b3ff', // Purple
    };
    return colors[type] || '#9E9E9E'; // Default color if type is not found
  };

  const getTypeIcon = (type) => {
    const icons = {
      Wellbeing: 'heart',
      'Food and Cooking': 'silverware-fork-knife',
      Family: 'account-group',
      Sleep: 'bed',
    };
    return icons[type] || 'help-circle'; // Default icon if type is not found
  };

  return (
    <View style={styles.container}>
      {reminders.map((reminder) => (
        <View key={reminder.id} style={styles.reminderBox}>
          <View 
            style={[styles.iconContainer, { backgroundColor: getTypeColor(reminder.type) }]}
          >
            <MaterialCommunityIcons 
              name={getTypeIcon(reminder.type)} 
              size={17} 
              color="white" 
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{reminder.title}</Text>
            <Text style={styles.time}>{formatDetails(reminder)}</Text>
          </View>
          <TouchableOpacity>
            <MaterialCommunityIcons 
              name="dots-horizontal" 
              size={24} 
              color="#A2A2A2" 
            />
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
    marginBottom: 35,
    flexDirection: 'row',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
    color: '#555',
  },
});

export default Reminder;