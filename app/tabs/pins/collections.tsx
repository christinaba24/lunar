import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import PinFeed from "@/components/PinFeed";

const CURRENT_USER_ID = "6bb59990-4f6b-4fd0-b475-64353b7e2abd";

export default function CollectionView() {
  const { collectionId, collectionName } = useLocalSearchParams();

  useEffect(() => {
    console.log("Collection ID:", collectionId);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{collectionName || "Collection"}</Text>
      <PinFeed userId={CURRENT_USER_ID} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    padding: 20,
  },
});
