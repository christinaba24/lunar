import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const GroupCard = ({ title, members, mainPhoto, backgroundPhoto }) => {
  return (
    <View style={styles.card}>
      {/* Top half with background image and purple overlay */}
      <View style={styles.topHalf}>
        <Image source={backgroundPhoto} style={styles.backgroundImage} />
        <View style={styles.overlay} />
      </View>

      {/* Main photo spanning across background and bottom half */}
      <Image source={mainPhoto} style={styles.mainImage} />

      {/* Bottom half with group title and members */}
      <View style={styles.bottomHalf}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.membersContainer}>
          <MaterialCommunityIcons name="account-group" size={20} color="#444" />
          <Text style={styles.membersText}>{members} members</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%", // Use full width of the wrapper (controlled via cardWrapper)
  height: 180,   // Reduce the height for a shorter card
  borderRadius: 20,
  overflow: "hidden",
  backgroundColor: "#fff",
  marginBottom: 20,
  },
  topHalf: {
    height: "50%", // Proportional height for background
    width: "100%",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(74, 0, 124, 0.5)", // Purple overlay with low opacity
  },
  mainImage: {
    position: "absolute",
    top: "40%", // Adjust position relative to card size
    left: "50%",
    transform: [{ translateX: -40 }, { translateY: -40 }],
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#fff",
  },
  bottomHalf: {
    backgroundColor: "#fff",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  membersContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  membersText: {
    fontSize: 14,
    color: "#444",
    marginLeft: 5,
  },
});

export default GroupCard;
