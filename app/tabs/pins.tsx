import { View, StyleSheet } from "react-native";
import PinFeed from "@/components/PinFeed";
import Theme from "@/assets/theme";

// Define the current user_id constant (same as in your Post.js)
const CURRENT_USER_ID = "6bb59990-4f6b-4fd0-b475-64353b7e2abd";

export default function Pins() {
  return (
    <View style={styles.container}>
      <PinFeed userId={CURRENT_USER_ID} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.White,
  },
});