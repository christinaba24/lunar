import { Text, View } from "react-native";
import MoonLogo1 from "@/icons/moonlogo1.svg";

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
      <MoonLogo1 width={100} height={100} />
    </View>
  );
}
