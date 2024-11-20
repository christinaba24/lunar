import { StyleSheet, View, Text } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

import Theme from "@/assets/theme";
import Feed from "@/components/Feed";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import GroupScreen from "@/components/GroupHeader";

export default function Home() {
  return (
    <View style={styles.container}>
      <GroupScreen />
      <StatusBar style="light" />
      <Feed shouldNavigateToComments={true} />
      <Link href="/tabs/group/newpost" style={styles.postButtonContainer}>
        <View style={styles.postButton}>
          <FontAwesome size={32} name="plus" color={Theme.colors.textBlack} />
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.White,
  },
  titleView: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    justifyContent: "space-between",
    width: "20%",
  },
  titleText: {
    color: Theme.colors.textBlack,
    fontSize: Theme.sizes.title1,
    fontWeight: "bold",
  },
  postButtonContainer: {
    position: "absolute",
    right: 8,
    bottom: 8,
  },
  postButton: {
    backgroundColor: Theme.colors.PurpleMedium,
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    // FontAwesome 'plus' icon is a bit off-center, so we manually center it by
    // tweaking the padding
    paddingTop: 2,
    paddingLeft: 1,
  },
});
