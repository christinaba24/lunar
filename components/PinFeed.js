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
import CollectionPostsFeed from "./CollectionPostsFeed";
import health from "@/assets/images/health.png";
import cooking from "@/assets/images/cooking.png";
import family from "@/assets/images/family.png";
import store from "@/assets/images/store.png";
import sleep from "@/assets/images/sleep.png";
import backButton from "@/assets/icons/back button.png";
import Theme from "@/assets/theme";

export default function PinFeed({ userId }) {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchCollections();
    }
  }, [userId]);

  const fetchCollections = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const { data: collectionsData, error: collectionsError } = await db
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

      if (collectionsError) throw collectionsError;

      const processedCollections = collectionsData.map((collection) => ({
        id: collection.id,
        name: collection.name,
        timestamp: collection.timestamp,
        pinCount: collection.saved_posts?.length || 0,
      }));

      setCollections(processedCollections);
    } catch (err) {
      console.error("Error in fetchCollections:", err);
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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

  if (selectedCollection) {
    return (
      <View style={styles.container}>
        <View style={styles.collectionHeader}>
          <TouchableOpacity
            onPress={() => setSelectedCollection(null)}
            style={styles.backButton}
          >
            <Image source={backButton} style={styles.backButtonIcon} />
          </TouchableOpacity>
          <Text style={styles.collectionTitle}>{selectedCollection.name}</Text>
        </View>
        <CollectionPostsFeed
          userId={userId}
          collectionId={selectedCollection.id}
        />
      </View>
    );
  }

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

  const renderCollectionItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.collectionItem}
      onPress={() => setSelectedCollection(item)}
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
  collectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.LightGray,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  backButtonIcon: {
    width: 24,
    height: 24,
  },
  collectionTitle: {
    fontSize: 16,
    fontWeight: "normal",
    color: Theme.colors.textBlack,
    fontFamily: "TestTiemposHeadline-Medium",
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
