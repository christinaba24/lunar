import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
      <Link href="/tabs/group/home?id=someValue" style={styles.button}>
        <Text style={styles.buttonText}>Go to Group Screen</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  text: {
    fontSize: 18,
    color: "#555",
  },
  button: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff", // White text for better readability
  },
});
