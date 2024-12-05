import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import db from "@/database/db";
import Loading from "./Loading";
import health from "@/assets/images/health.png";
import cooking from "@/assets/images/cooking.png";
import family from "@/assets/images/family.png";
import store from "@/assets/images/store.png";
import sleep from "@/assets/images/sleep.png";
import Theme from "@/assets/theme";

export default function PinFeed({ userId }) {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log("PinFeed mounted with userId:", userId);
    if (userId) {
      fetchCollections();
    }
  }, [userId]);

  const fetchCollections = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      console.log("Fetching collections for user:", userId);

      const { data: collectionsData, error: collectionsError } = await db
        .from("collections")
        .select("*")
        .eq("user_id", userId);

      if (collectionsError) {
        console.error("Error fetching collections:", collectionsError);
        setErrorMessage(collectionsError.message);
        return;
      }

      console.log("Raw collections found:", collectionsData);

      if (collectionsData && collectionsData.length > 0) {
        const { data, error } = await db
          .from("collections")
          .select(
            `
            id,
            name,
            timestamp,
            saved_posts (
              post_id
            )
          `
          )
          .eq("user_id", userId)
          .order("timestamp", { ascending: false });

        if (error) {
          console.error("Error fetching collections with posts:", error);
          setErrorMessage(error.message);
          return;
        }

        console.log("Collections with saved posts:", data);

        const processedCollections = data.map((collection) => ({
          id: collection.id,
          name: collection.name,
          timestamp: collection.timestamp,
          pinCount: collection.saved_posts?.length || 0,
        }));

        console.log("Processed collections:", processedCollections);
        setCollections(processedCollections);
      } else {
        console.log("No collections found for user");
        setCollections([]);
      }
    } catch (err) {
      console.error("Error in fetchCollections:", err);
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCollectionItem = ({ item, index }) => {
    const getImageSource = (index) => {
      switch (index) {
        case 0:
          return health;
        case 1:
          return sleep;
        case 2:
          return cooking;
        case 3:
          return family;
        case 4:
          return store;
        default:
          return null;
      }
    };

    return (
      <TouchableOpacity
        style={styles.collectionItem}
        onPress={() => {
          console.log("Collection pressed:", item);
        }}
      >
        <View style={styles.imageContainer}>
          {getImageSource(index) ? (
            <Image
              source={getImageSource(index)}
              style={styles.collectionImage}
            />
          ) : (
            <View
              style={[
                styles.defaultImage,
                { backgroundColor: Theme.colors.LightGray },
              ]}
            />
          )}
        </View>

        <View style={styles.collectionInfo}>
          <Text style={styles.collectionName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.pinCount}>
            {item.pinCount} {item.pinCount === 1 ? "pin" : "pins"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  if (errorMessage) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Error: {errorMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={collections}
        renderItem={renderCollectionItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No collections yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.White,
  },
  listContainer: {
    padding: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  collectionItem: {
    width: 181,
  },
  imageContainer: {
    width: 181,
    height: 128,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 8,
  },
  collectionImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  defaultImage: {
    width: "100%",
    height: "100%",
    backgroundColor: Theme.colors.LightGray,
  },
  collectionInfo: {
    paddingHorizontal: 4,
  },
  collectionName: {
    fontSize: Theme.sizes.headline,
    fontFamily: "SF-Pro-Display-Bold",
    color: Theme.colors.textBlack,
    marginBottom: 4,
  },
  pinCount: {
    fontSize: Theme.sizes.callout,
    fontFamily: "SF-Pro-Display-Regular",
    color: Theme.colors.textGray,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: Theme.sizes.headline,
    fontFamily: "SF-Pro-Display-Regular",
    color: Theme.colors.textGray,
  },
});
