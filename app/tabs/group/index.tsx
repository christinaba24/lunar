<<<<<<< Updated upstream
import Home from "./home";

export default function FeedScreen() {
  return <Home />;
}
=======
import { StyleSheet, View } from "react-native";
import Feed from "@/components/Feed";

export default function Page() {
  return (
    <View style={styles.container}>
      <Feed shouldNavigateToComments={true} onPostPress={undefined} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
});
>>>>>>> Stashed changes
