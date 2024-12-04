import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const GroupCard = ({ title, members, mainPhoto, backgroundPhoto }) => {
  return (
    <View style={styles.card}>
      {/* Background image covering the top 50% of the card */}
      <Image source={backgroundPhoto} style={styles.backgroundImage} />

      {/* Main photo centered in the middle of the card, in front of the background */}
      <Image source={mainPhoto} style={styles.mainImage} />

      {/* Group title and members info */}
      <View style={styles.detailsContainer}>
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
    width: "100%",
    height: 250, // Adjust height to fit both images and text
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginBottom: 20,
    position: "relative",
    shadowColor: "#000", // Add shadow for a slight depth effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  backgroundImage: {
    width: "100%",
    height: "50%", // The background image covers the top half
    resizeMode: "cover",
    position: "absolute", // Position it above everything else
    top: 0,
  },
  mainImage: {
    position: "absolute",
    top: "40%", // Move it up so it's centered with 40% of the height
    left: "50%",
    transform: [{ translateX: -40 }, { translateY: -40 }],
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#fff",
    zIndex: 2, // Ensure the main photo is on top of the background image
  },
  detailsContainer: {
    position: "absolute",
    bottom: 10, // Position it towards the bottom of the card
    left: 15,
    right: 15,
    backgroundColor: "#fff", // White background for the text container
    padding: 10,
    borderRadius: 10, // Rounded corners for the text box
    shadowColor: "#000", // Add shadow for a slight depth effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  membersContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  membersText: {
    fontSize: 14,
    color: "#444",
    marginLeft: 5,
  },
});

export default GroupCard;
