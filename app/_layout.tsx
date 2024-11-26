import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "SF-Pro-Display-Regular": require("../assets/fonts/SF-Pro-Display-Regular.otf"),
    "SF-Pro-Display-Bold": require("../assets/fonts/SF-Pro-Display-Bold.otf"),
    "TestTiemposHeadline-Black": require("../assets/fonts/TestTiemposHeadline-Black.otf"),
    "TestTiemposHeadline-Light": require("../assets/fonts/TestTiemposHeadline-Light.otf"),
    "TestTiemposHeadline-Medium": require("../assets/fonts/TestTiemposHeadline-Medium.otf"),
  });

  const [isOnboardingComplete, setOnboardingComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOnboardingStatus = async () => {
      const status = await AsyncStorage.getItem("onboardingComplete");
      setOnboardingComplete(status === "true");
      setLoading(false);
    };

    fetchOnboardingStatus();
  }, []);

  if (!fontsLoaded || loading) {
    return null; // Optional: Add a loading spinner here if necessary
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      // initialRouteName="onboarding"
      initialRouteName={isOnboardingComplete ? "home" : "onboarding"}
    >
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
}

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
//       initialRouteName={isOnboardingComplete ? "home" : "onboarding"}
//     >
//       <Stack.Screen name="onboarding" options={{ headerShown: false }} />
//       <Stack.Screen name="home" options={{ headerShown: false }} />
//     </Stack>
//   );
// }
