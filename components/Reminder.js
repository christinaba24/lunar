import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Reminder = ({ reminder }) => {
  // Early return if reminder is undefined
  if (!reminder) {
    return null;
  }

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
      .filter(day => reminder[day])
      .map(day => dayAbbreviations[day]);
  
    return activeDays.length ? activeDays.join(', ') : 'No Days Selected';
  };

  const formatDetails = (reminder) => {
    const formatTo12Hour = (timeString) => {
      const [hours, minutes] = timeString.split(":").map(Number);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      return `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    };
  
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
      return date.toLocaleDateString('en-US', options);
    };
  
    const formattedTime = reminder.recurring 
      ? `Every ${formatRecurringDays(reminder)} at ${formatTo12Hour(reminder.time)}`
      : `${formatDate(reminder.date)} at ${formatTo12Hour(reminder.time)}`;
  
    return formattedTime;
  };

  const getTypeColor = (type) => {
    const colors = {
      Wellbeing: '#98c7cb',
      'Food and Cooking': '#f7da67',
      Family: '#9c9cff',
      Sleep: '#57b3ff',
    };
    return colors[type] || '#9E9E9E';
  };

  const getTypeIcon = (type) => {
    const icons = {
      Wellbeing: 'heart',
      'Food and Cooking': 'silverware-fork-knife',
      Family: 'account-group',
      Sleep: 'bed',
    };
    return icons[type] || 'help-circle';
  };

  return (
    <View style={styles.reminderBox}>
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
  );
};

const styles = StyleSheet.create({
  reminderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5,
    paddingLeft: 5,
    marginBottom: 35,
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