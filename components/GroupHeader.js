import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

import nurses from "@/assets/images/nurses.png";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// navigation . go back or href
// link object

export const GroupScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText} onPress={() => router.back()}>
            ←
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.groupInfo}>
          <Image source={nurses} style={styles.groupImage} />
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
    height: 90,
    padding: 20,
    justifyContent: "center",
  },
  backButton: {
    width: 20,
  },
  backText: {
    fontSize: 16,
    color: "#333",
  },
  content: {
    backgroundColor: "#fff",
    padding: 20,
    flex: 1,
  },
  groupInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  groupImage: {
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    borderRadius: 16,
    position: "absolute",
    top: -30,
    borderColor: "#fff",
    borderWidth: 4,
  },

  groupDetails: {
    flex: 1,
    marginLeft: 110,
    // position: "absolute",
    // marginBottom:
  },
  groupName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  groupMembers: {
    fontSize: 12,
    color: "#888",
    marginVertical: 5,
    paddingBottom: 5,
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
