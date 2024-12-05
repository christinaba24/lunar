import { Text, View, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import PinFeed from "@/components/PinFeed";
import PinnedPostsFeed from "@/components/PinPostsFeed";
import Theme from "@/assets/theme";
import { TouchableOpacity } from "react-native";
import CollectionView from "./collections";

const CURRENT_USER_ID = "6bb59990-4f6b-4fd0-b475-64353b7e2abd";

export default function Pins() {
  const [activeTab, setActiveTab] = useState("all");
  const { collectionId } = useLocalSearchParams();
  // const collectionId = "ce66ee55-703a-4258-9f9a-8c6fbe52ed73";

  useEffect(() => {
    console.log("Collection ID:", collectionId);
  }, [collectionId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Theme.colors.White}
        />
        <Stack.Screen options={{ headerShown: false }} />
        {collectionId ? (
          // Render CollectionView if collectionId exists
          <CollectionView />
        ) : (
          // Default view with "All" and "Collections" tabs
          <>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>My Pins</Text>
            </View>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={styles.tab}
                onPress={() => setActiveTab("all")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "all" && styles.activeTabText,
                  ]}
                >
                  All
                </Text>
                {activeTab === "all" && <View style={styles.dot} />}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tab}
                onPress={() => setActiveTab("collections")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "collections" && styles.activeTabText,
                  ]}
                >
                  Collections
                </Text>
                {activeTab === "collections" && <View style={styles.dot} />}
              </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
              {activeTab === "all" ? (
                <PinnedPostsFeed userId={CURRENT_USER_ID} />
              ) : (
                <PinFeed userId={CURRENT_USER_ID} />
              )}
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.White,
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.White,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "TestTiemposHeadline-Medium",
    padding: 20,
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
  contentContainer: {
    flex: 1,
    width: "100%",
  },
});
