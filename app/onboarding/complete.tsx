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

export default function CompleteOnboarding() {
  const finishOnboarding = () => {
    console.log("Onboarding Completed!"); // Final logic here
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
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});
