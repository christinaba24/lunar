import React, { useState } from "react";
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
import theme from "@/assets/theme";

const windowWidth = Dimensions.get("window").width;

export const GroupScreen = () => {
  const router = useRouter();
  const [isMember, setIsMember] = useState(true); // Initial state: true means "Leave"

  const toggleMembership = () => {
    setIsMember((prevState) => !prevState);
  };

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
            <TouchableOpacity
              style={styles.leaveButton}
              onPress={toggleMembership}
            >
              <Text style={styles.leaveButtonText}>
                {isMember ? "Leave" : "Join"}
              </Text>
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
    height: 150, // header length
    padding: 20,
    justifyContent: "center",
  },
  backButton: {
    width: 20,
  },
  backText: {
    fontSize: 16,
    color: "#333",
    // paddingBottom: 10, // controls the spacing of back arrow
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
    fontFamily: "SF-Pro-Display-Regular",
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
    marginTop: -10, // controlling night nurses -> leave box
    fontFamily: "SF-Pro-Display-Regular",
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
    color: theme.colors.textBlack,
    lineHeight: 22,
  },
});

export default GroupScreen;
