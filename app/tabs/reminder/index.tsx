import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  ScrollView,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Reminder from "@/components/Reminder";
import NewReminder from "@/components/NewReminder";
import Theme from "@/assets/theme";
import db from "@/database/db";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  const [isCalendarSyncModalVisible, setIsCalendarSyncModalVisible] = useState(false); // New state for calendar sync modal

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    const { data, error } = await db.from("reminders").select("*");
    if (error) {
      console.error("Error fetching reminders:", error);
    } else {
      // Filter reminders into Recurring and Other
      const recurring = data.filter((reminder) => reminder.recurring);
      const other = data.filter((reminder) => !reminder.recurring);
      setRecurringReminders(recurring);
      setOtherReminders(other);
    }
  };

  const handleSyncWithCalendar = (sync: boolean) => {
    // Implement calendar sync logic here
    console.log(sync ? "Syncing with calendar..." : "Not syncing with calendar.");
    setIsCalendarSyncModalVisible(false); // Close modal after choice
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
            <TouchableOpacity onPress={() => setIsCalendarSyncModalVisible(true)}>
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

      {/* Modal for new reminder */}
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
            fetchReminders(); // Refresh reminders after saving
          }}
        />
      </Modal>

      {/* Calendar Sync Modal */}
      <Modal
        visible={isCalendarSyncModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsCalendarSyncModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Would you like to sync with the calendar?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleSyncWithCalendar(true)}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleSyncWithCalendar(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimmed background
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    backgroundColor: Theme.colors.PurpleDark,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});
