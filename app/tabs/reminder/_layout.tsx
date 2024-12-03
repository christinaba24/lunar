import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import Reminder from "@/components/Reminder";
import Theme from "@/assets/theme";
import db from "@/database/db";
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Reminder {
    id: number;
    title: string;
    type: string;
    recurring: boolean;
    time: string;
    date?: string;
    sunday?: boolean;
    monday?: boolean;
    tuesday?: boolean;
    wednesday?: boolean;
    thursday?: boolean;
    friday?: boolean;
    saturday?: boolean;
}

export default function Layout() {
  const [recurringReminders, setRecurringReminders] = useState<Reminder[]>([]);
  const [otherReminders, setOtherReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    const { data, error } = await db.from('reminders').select('*');
    if (error) {
      console.error('Error fetching reminders:', error);
    } else {
      // Filter reminders into Recurring and Other
      const recurring = data.filter(reminder => reminder.recurring);
      const other = data.filter(reminder => !reminder.recurring);
      setRecurringReminders(recurring);
      setOtherReminders(other);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.White} />
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.overall}>
        <View style={styles.headerContainer}>
            <Text style={styles.header}>My Reminders</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity>
                <MaterialCommunityIcons 
                    name="plus-circle-outline" 
                    size={27} 
                    color="#A2A2A2" 
                    style={styles.icon}
                />
                </TouchableOpacity>
                <TouchableOpacity>
                <MaterialCommunityIcons 
                    name="calendar-month-outline" 
                    size={27} 
                    color="#A2A2A2" 
                    style={styles.icon}
                />
                </TouchableOpacity>
            </View>
        </View>
          {/* Recurring Section */}
          {recurringReminders.length > 0 && (
            <>
              <Text style={styles.subHeader}>Recurring</Text>
              {recurringReminders.map(reminder => (
                <Reminder key={reminder.id} reminder={reminder} />
              ))}
            </>
          )}

          {/* Other Section */}
          {otherReminders.length > 0 && (
            <>
              <Text style={styles.subHeader}>Other</Text>
              {otherReminders.map(reminder => (
                <Reminder key={reminder.id} reminder={reminder} />
              ))}
            </>
          )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.White,
  },
  overall: {
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "TestTiemposHeadline-Medium",
  },
  subHeader: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 15,
    fontFamily: "TestTiemposHeadline-Medium",
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
});