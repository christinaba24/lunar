import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const GroupScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.groupInfo}>
          <Image
            source={{
              uri: "https://via.placeholder.com/100", // Replace with your image URL
            }}
            style={styles.groupImage}
          />
          <View style={styles.groupDetails}>
            <Text style={styles.groupName}>Night Nurses</Text>
            <Text style={styles.groupMembers}>82 members</Text>
            <TouchableOpacity style={styles.leaveButton}>
              <Text style={styles.leaveButtonText}>Leave</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.description}>
          Welcome to Night Nurses -- a place for night nurses to connect and
          support each other. Here, we get through that night shift together.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AAAAFF",
  },
  header: {
    height: 120,
    padding: 20,
    justifyContent: "center",
  },
  backButton: {
    width: 30,
  },
  backText: {
    fontSize: 24,
    color: "#333",
  },
  content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    flex: 1,
  },
  groupInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  groupImage: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.1,
    borderRadius: 18,
    position: "absolute", // paddingRight: 40,
  },
  groupDetails: {
    marginLeft: 15,
    flex: 1,
    marginLeft: 90,
  },
  groupName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  groupMembers: {
    fontSize: 14,
    color: "#888",
    marginVertical: 5,
  },
  leaveButton: {
    backgroundColor: "#000",
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  leaveButtonText: {
    color: "#fff",
    fontSize: 14,
  },

  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
  },
});

export default GroupScreen;
