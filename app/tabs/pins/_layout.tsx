import { Text, View, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import PinFeed from "@/components/PinFeed";
import Theme from "@/assets/theme";

const CURRENT_USER_ID = "6bb59990-4f6b-4fd0-b475-64353b7e2abd";

export default function Pins() {
  console.log("Pins component - Current User ID:", CURRENT_USER_ID);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Theme.colors.White}
        />
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.headerContainer}>
          <Text style={styles.header}>My Pins</Text>
        </View>
        <PinFeed userId={CURRENT_USER_ID} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.White,
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.White,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "TestTiemposHeadline-Medium",
    padding: 20,
  },
});
