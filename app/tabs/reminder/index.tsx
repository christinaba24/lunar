import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Modal,
  ScrollView,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
} from "react-native";
import Reminder from "@/components/Reminder";
import NewReminder from "@/components/NewReminder";
import Theme from "@/assets/theme";
import db from "@/database/db";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import calendarSync from "../../../assets/images/calendarsync.png";

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

export default function ReminderScreen() {
  const [recurringReminders, setRecurringReminders] = useState<Reminder[]>([]);
  const [otherReminders, setOtherReminders] = useState<Reminder[]>([]);
  const [isNewReminderVisible, setIsNewReminderVisible] = useState(false);
  const [isCalendarOverlayVisible, setIsCalendarOverlayVisible] = useState(false);
  const translateY = useRef(new Animated.Value(500)).current; // Start off-screen

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    const { data, error } = await db.from("reminders").select("*");
    if (error) {
      console.error("Error fetching reminders:", error);
    } else {
      const recurring = data.filter((reminder) => reminder.recurring);
      const other = data.filter((reminder) => !reminder.recurring);
      setRecurringReminders(recurring);
      setOtherReminders(other);
    }
  };

  const showCalendarOverlay = () => {
    setIsCalendarOverlayVisible(true);
    Animated.timing(translateY, {
      toValue: 0, // Fully visible
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const hideCalendarOverlay = () => {
    Animated.timing(translateY, {
      toValue: 500, // Slide down to hide
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setIsCalendarOverlayVisible(false);
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.White} />
      <ScrollView style={styles.overall}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>My Reminders</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => setIsNewReminderVisible(true)}>
              <MaterialCommunityIcons
                name="plus-circle-outline"
                size={27}
                color="#A2A2A2"
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={showCalendarOverlay}>
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
            {recurringReminders.map((reminder) => (
              <Reminder key={reminder.id} reminder={reminder} />
            ))}
          </>
        )}

        {/* Other Section */}
        {otherReminders.length > 0 && (
          <>
            <Text style={styles.subHeader}>Other</Text>
            {otherReminders.map((reminder) => (
              <Reminder key={reminder.id} reminder={reminder} />
            ))}
          </>
        )}
      </ScrollView>

      <Modal
        visible={isNewReminderVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsNewReminderVisible(false)}
      >
        <NewReminder
          onClose={() => setIsNewReminderVisible(false)}
          onSave={() => {
            setIsNewReminderVisible(false);
            fetchReminders();
          }}
        />
      </Modal>

      {/* Calendar Sync Overlay */}
      {isCalendarOverlayVisible && (
        <Modal transparent={true} animationType="none">
        <TouchableOpacity style={styles.overlay}>
          <Animated.View style={[styles.animatedContainer, { transform: [{ translateY }] },]}>
            <TouchableOpacity onPress={hideCalendarOverlay}>
              <Image source={calendarSync} style={styles.calendarImage} />
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
      )}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  animatedContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  calendarImage: {
    flex: 1,
    justifyContent: "flex-end",
    width: 393,
    height: 860,
    resizeMode: "contain",
  },
  overlayText: {
    marginTop: 20,
    fontSize: 16,
    color: "#333",
  },
});
