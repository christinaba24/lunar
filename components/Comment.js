import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Theme from "@/assets/theme";
import personIcon1 from "@/assets/images/personicon.png";
// import popup from "@/assets/images/popup.png";
import NewReminder from "@/components/NewReminder"; // Import NewReminder component

export default function Comment({ username, timestamp, text }) {
  const [isModalVisible, setIsModalVisible] = useState(false); // State for popup visibility
  const [isNewReminderVisible, setIsNewReminderVisible] = useState(false); // State for NewReminder modal
  const [imageWidth, setImageWidth] = useState(0); // State for storing image width
  const user_id = "6bb59990-4f6b-4fd0-b475-64353b7e2abd";

  // Find the index of the phrase "Smile Dentist Sunnyvale" in the comment
  const targetPhrase = "Smile Dentist Sunnyvale";
  const parts = text.split(targetPhrase);

  // Handle showing and hiding the popup
  const handleTextPress = () => {
    setIsModalVisible(true);
  };

  const handleOutsidePress = () => {
    setIsModalVisible(false);
  };

  // Handle touch on image to determine which half was clicked
  const handleImagePress = (event) => {
    const { locationX } = event.nativeEvent; // Get touch coordinates

    if (locationX < imageWidth / 2) {
      // If the left half is clicked, show the NewReminder modal
      setIsNewReminderVisible(true);
    }
  };

  // Get image width via onLayout event
  const handleImageLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setImageWidth(width); // Store the width in state
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image source={personIcon1} style={styles.personIcon} />
          <View style={styles.userInfo}>
            <View style={styles.userHeader}>
              <Text style={styles.username}>{username}</Text>
              <Text style={styles.timestamp}>{timestamp}</Text>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <Text style={styles.comment}>
            {/* Render parts with highlighted background color only for targetPhrase */}
            {parts[0]}
            <Text style={styles.highlightedText} onPress={handleTextPress}>
              {targetPhrase}
            </Text>
            {parts[1]}
          </Text>
        </View>
      </View>

      {/* Modal for displaying the popup image
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={handleOutsidePress}
      >
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={styles.modalOverlay}>
            {/* Touchable image inside the modal to detect click
            <TouchableWithoutFeedback onPress={handleImagePress}>
              <Image
                source={popup}
                style={styles.popupImage}
                onLayout={handleImageLayout}  // Get image dimensions on layout
              />
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* NewReminder Modal
      <Modal
        visible={isNewReminderVisible}
        transparent={true}
        animationType="fade"
        onRequestClos ={() => setIsNewReminderVisible(false)}
      >
        <NewReminder
          title="Smile Dentist Sunnyvale"
          onClose={() => setIsNewReminderVisible(false)}
          onSave={() => {
            setIsNewReminderVisible(false);
            // Optionally fetch reminders if needed
          }}
        />
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    padding: 24,
    backgroundColor: Theme.colors.backgroundSecondary,
    flexDirection: "row",
  },
  content: {
    flex: 1,
    gap: 8,
    marginRight: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
  },
  userInfo: {
    flex: 1,
    marginLeft: 8,
  },
  userHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  body: {
    width: "100%",
  },
  username: {
    color: Theme.colors.textSecondary,
    fontWeight: "bold",
    fontSize: Theme.sizes.headline,
    fontFamily: "SF-Pro-Display-Bold",
  },
  timestamp: {
    color: Theme.colors.textGray, // Changed to match Post component
    fontSize: Theme.sizes.callout,
    fontFamily: "SF-Pro-Display-Regular",
  },
  comment: {
    color: Theme.colors.textBlack,
    fontSize: Theme.sizes.body,
  },
  personIcon: {
    width: 30,
    height: 30,
    borderRadius: Theme.sizes.icons / 2,
  },
  highlightedText: {
    backgroundColor: "rgba(138, 43, 226, 0.2)",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: -94,
    left: -10,
  },
  popupImage: {
    width: 270,
    height: 200,
    resizeMode: "contain",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.13,
    shadowRadius: 4,
  },
});
