// import React from "react";
// import { View, Text, Button, StyleSheet } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../types/types"; // Adjust path as necessary

// type CompleteOnboardingProps = NativeStackScreenProps<
//   RootStackParamList,
//   "complete"
// >;

// export default function CompleteOnboarding({
//   navigation,
// }: CompleteOnboardingProps) {
//   const finishOnboarding = async () => {
//     await AsyncStorage.setItem("onboardingComplete", "true");
//     navigation.replace("home"); // Navigate to the home screen
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>You're All Set!</Text>
//       <Button title="Go to Home" onPress={finishOnboarding} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
// });

import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function CompleteOnboarding() {
  const router = useRouter();

  const finishOnboarding = async () => {
    try {
      // Save the onboarding completion status
      await AsyncStorage.setItem("onboardingComplete", "true");

      console.log("Onboarding Completed!");
      // Navigate to the home page
      router.replace("../tabs/home");
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You're All Set!</Text>
      <Button title="Finish" onPress={finishOnboarding} />
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
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
});
