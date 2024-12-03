// import React from "react";
// import { Stack } from "expo-router";

// export default function OnboardingLayout() {
//   return (
//     <Stack>
//       {/* Default onboarding screen */}
//       <Stack.Screen name="index" options={{ headerShown: false }} />
//       {/* Additional onboarding steps */}
//       <Stack.Screen name="complete" options={{ headerShown: false }} />
//     </Stack>
//   );
// }

// import React from "react";
// import { View, Text, Button, StyleSheet } from "react-native";
// import { useRouter } from "expo-router";

// export default function CompleteOnboarding() {
//   const router = useRouter();

//   const finishOnboarding = () => {
//     console.log("Onboarding Completed!");
//     router.replace("/tabs/home"); // Navigate to home page
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>You're All Set!</Text>
//       <Button title="Finish" onPress={finishOnboarding} />
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
import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack>
      {/* Main onboarding entry point */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="occupation" options={{ headerShown: false }} />
      <Stack.Screen name="location" options={{ headerShown: false }} />
      <Stack.Screen name="describeYourself" options={{ headerShown: false }} />
      <Stack.Screen name="joinGroups" options={{ headerShown: false }} />
      <Stack.Screen name="identity" options={{ headerShown: false }} />
      <Stack.Screen name="complete" options={{ headerShown: false }} />
    </Stack>
  );
}
