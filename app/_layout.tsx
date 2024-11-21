// import { Stack } from "expo-router";
// import { useFonts } from "expo-font";

// export default function RootLayout() {
//   const [fontsLoaded] = useFonts({
//     "SF-Pro-Display-Regular": require("../assets/fonts/SF-Pro-Display-Regular.otf"),
//     "SF-Pro-Display-Bold": require("../assets/fonts/SF-Pro-Display-Bold.otf"),
//     "TestTiemposHeadline-Black": require("../assets/fonts/TestTiemposHeadline-Black.otf"),
//     "TestTiemposHeadline-Light": require("../assets/fonts/TestTiemposHeadline-Light.otf"),
//     "TestTiemposHeadline-Medium": require("../assets/fonts/TestTiemposHeadline-Medium.otf"),
//   });
//   return <Stack />;
// }

import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "SF-Pro-Display-Regular": require("../assets/fonts/SF-Pro-Display-Regular.otf"),
    "SF-Pro-Display-Bold": require("../assets/fonts/SF-Pro-Display-Bold.otf"),
    "TestTiemposHeadline-Black": require("../assets/fonts/TestTiemposHeadline-Black.otf"),
    "TestTiemposHeadline-Light": require("../assets/fonts/TestTiemposHeadline-Light.otf"),
    "TestTiemposHeadline-Medium": require("../assets/fonts/TestTiemposHeadline-Medium.otf"),
  });

  if (!fontsLoaded) {
    return null; // Optional: Add a loading spinner here if necessary
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false, // This hides the header for all screens in the Stack
      }}
    />
  );
}
