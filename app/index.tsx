import { Text, View, Image } from "react-native";
// import MoonLogo1 from "@/icons/moonlogo1.svg";
import moonlogo1 from "../assets/icons/moonlogo1.png";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Lunar test</Text>
      <Image source={moonlogo1} />
    </View>
  );
}
