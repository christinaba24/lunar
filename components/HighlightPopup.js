import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const HighlightPopup = ({ isVisible, onClose, onAddReminder, onAddToCalendar, highlightedText }) => {
  const router = useRouter(); // Get the router instance for navigation

  // Function to handle Add Reminder action
  const handleAddReminder = () => {
    onClose(); // Close the popup
    onAddReminder(); // Call the onAddReminder function from parent
    // Navigate to the "New Reminders" screen
    router.push("/NewReminders"); // Ensure the route is correct
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.popup}>
        <Text style={styles.highlightedText}>
          Highlighted Text: {highlightedText} {/* Display selected text */}
        </Text>
        <TouchableOpacity onPress={handleAddReminder} style={styles.option}>
          <Text>Add Reminder</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onAddToCalendar} style={styles.option}>
          <Text>Add to Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={styles.moreOption}>
          <Text>More ➡</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  moreOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  highlightedText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default HighlightPopup;