import { Stack, useRouter } from "expo-router";
import Theme from "@/assets/theme";
import { Pressable, Text, View, ScrollView, StyleSheet } from "react-native";
import Reminder from "@/components/Reminder";

export default function Reminders() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Reminders" }} />
      <Text style={styles.header}>My Reminders</Text>
      <ScrollView>
        <Reminder />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
