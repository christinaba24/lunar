import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

import Theme from "@/assets/theme";
import Feed from "@/components/Feed";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import GroupScreen from "@/components/GroupHeader";

export default function Home() {
  const [activeTab, setActiveTab] = useState("top"); // State to track the active tab ("top" or "new")

  return (
    <View style={styles.container}>
      <GroupScreen />
      <StatusBar style="light" />

      {/* Tab navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab("top")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "top" && styles.activeTabText,
            ]}
          >
            Top
          </Text>
          {activeTab === "top" && <View style={styles.dot} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab("new")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "new" && styles.activeTabText,
            ]}
          >
            New
          </Text>
          {activeTab === "new" && <View style={styles.dot} />}
        </TouchableOpacity>
      </View>

      {/* Feed component */}
      <View style={styles.postContainer}>
        <Feed shouldNavigateToComments={true} topPosts={activeTab === "top"} />
      </View>

      {/* New post button */}
      <Link href="./newpost" style={styles.postButtonContainer}>
        <View style={styles.postButton}>
          <FontAwesome size={32} name="plus" color={Theme.colors.White} />
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
  tabContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  tab: {
    marginRight: 16,
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "normal",
    color: Theme.colors.textGray,
    fontFamily: "TestTiemposHeadline-Medium",
  },
  activeTabText: {
    color: Theme.colors.textBlack,
    fontFamily: "TestTiemposHeadline-Medium",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 3,
    backgroundColor: Theme.colors.textBlack,
    marginTop: 4,
  },
  postContainer: {
    flex: 1,
    width: "100%",
  },
  postButtonContainer: {
    position: "absolute",
    right: 8,
    bottom: 8,
  },
  postButton: {
    backgroundColor: Theme.colors.PurpleMedium,
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    // FontAwesome 'plus' icon is a bit off-center, so we manually center it by
    // tweaking the padding
    paddingTop: 2,
    paddingLeft: 1,
  },
});
