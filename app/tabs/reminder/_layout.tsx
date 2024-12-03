import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";  // Import Stack for setting screen title
import Reminder from "@/components/Reminder";  // Import the Reminder component
import Theme from "@/assets/theme";

export default function Layout() {
  return (
    <View style={styles.container}>
      {/* Setting the screen title */}
      <Stack.Screen options={{ title: "Reminders" }} />
      
      {/* Main content of the screen */}
      <Text style={styles.header}>My Reminders</Text>
      
      {/* Scrollable list of reminders */}
      <ScrollView>
        <Reminder />  {/* Render the Reminder component */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Theme.colors.White,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "TestTiemposHeadline-Medium",  // Make sure this font is properly linked
  },
});