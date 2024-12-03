// // import React, { useEffect, useState } from "react";
// // import { Stack } from "expo-router";
// // import { useFonts } from "expo-font";
// // import AsyncStorage from "@react-native-async-storage/async-storage";

// // export default function RootLayout() {
// //   const [fontsLoaded] = useFonts({
// //     "SF-Pro-Display-Regular": require("../assets/fonts/SF-Pro-Display-Regular.otf"),
// //     "SF-Pro-Display-Bold": require("../assets/fonts/SF-Pro-Display-Bold.otf"),
// //     "TestTiemposHeadline-Black": require("../assets/fonts/TestTiemposHeadline-Black.otf"),
// //     "TestTiemposHeadline-Light": require("../assets/fonts/TestTiemposHeadline-Light.otf"),
// //     "TestTiemposHeadline-Medium": require("../assets/fonts/TestTiemposHeadline-Medium.otf"),
// //   });

// //   const [isOnboardingComplete, setOnboardingComplete] = useState(false);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchOnboardingStatus = async () => {
// //       try {
// //         const status = await AsyncStorage.getItem("onboardingComplete");
// //         console.log("Onboarding status:", status); // Log the status for debugging
// //         setOnboardingComplete(status === "true");
// //       } catch (error) {
// //         console.error("Error fetching onboarding status:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchOnboardingStatus();
// //   }, []);

// //   useEffect(() => {
// //     console.log("isOnboardingComplete:", isOnboardingComplete);
// //     console.log("loading:", loading);
// //   }, [isOnboardingComplete, loading]);

// //   if (!fontsLoaded || loading) {
// //     return null; // Optional: Add a loading spinner here if necessary
// //   }
// //   console.log(
// //     "initialRouteName:",
// //     loading ? null : isOnboardingComplete ? "index" : "onboarding"
// //   );

// //   return (
// //     <Stack
// //       screenOptions={{
// //         headerShown: false,
// //       }}
// //       initialRouteName={
// //         loading ? undefined : isOnboardingComplete ? "index" : "onboarding"
// //       }
// //     >
// //       <Stack.Screen name="onboarding" options={{ headerShown: false }} />
// //       <Stack.Screen name="index" options={{ headerShown: false }} />
// //     </Stack>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import { Stack } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function RootLayout() {
//   const [isOnboardingComplete, setOnboardingComplete] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOnboardingStatus = async () => {
//       const status = await AsyncStorage.getItem("onboardingComplete");
//       setOnboardingComplete(status === "true");
//       setLoading(false);
//     };

//     fetchOnboardingStatus();
//   }, []);

//   if (loading) {
//     return null; // Optional: Add a loading spinner here if necessary
//   }

//   return (
//     <Stack
//       screenOptions={{
//         headerShown: false,
//       }}
//       initialRouteName={isOnboardingComplete ? "tabs" : "onboarding"}
//     >
//       <Stack.Screen name="onboarding" options={{ headerShown: false }} />
//       <Stack.Screen name="tabs" options={{ headerShown: false }} />
//     </Stack>
//   );
// }

// new!!!

import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "SF-Pro-Display-Regular": require("../assets/fonts/SF-Pro-Display-Regular.otf"),
    "SF-Pro-Display-Bold": require("../assets/fonts/SF-Pro-Display-Bold.otf"),
    "TestTiemposHeadline-Black": require("../assets/fonts/TestTiemposHeadline-Black.otf"),
    "TestTiemposHeadline-Light": require("../assets/fonts/TestTiemposHeadline-Light.otf"),
    "TestTiemposHeadline-Medium": require("../assets/fonts/TestTiemposHeadline-Medium.otf"),
  });

  const [isOnboardingComplete, setOnboardingComplete] = useState<
    boolean | null
  >(null); // Null indicates the loading state

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const status = await AsyncStorage.getItem("onboardingComplete");
        setOnboardingComplete(status === "true");
      } catch (error) {
        console.error("Error fetching onboarding status:", error);
        setOnboardingComplete(false); // Default to not complete on error
      }
    };

    checkOnboardingStatus();
  }, []);

  // Show a loading indicator while fonts or onboarding status is loading
  if (!fontsLoaded || isOnboardingComplete === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      // Dynamically set the initial route based on onboarding status
      initialRouteName={isOnboardingComplete ? "tabs" : "onboarding"}
    >
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="tabs" options={{ headerShown: false }} />
    </Stack>
  );
}
