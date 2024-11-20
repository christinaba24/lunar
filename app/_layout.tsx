import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "SF-Pro-Display-Regular": require("../assets/fonts/SF-Pro-Display-Regular.otf"),
    "SF-Pro-Display-Bold": require("../assets/fonts/SF-Pro-Display-Bold.otf"),
  });
  return <Stack />;
}
