import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";
import Theme from "@/assets/theme";
import personIcon1 from "@/assets/images/personicon.png";
import personIcon2 from "@/assets/images/man.png";
import db from "@/database/db";
import health from "@/assets/images/health.png";
import cooking from "@/assets/images/cooking.png";
import family from "@/assets/images/family.png";
import store from "@/assets/images/store.png";
import sleep from "@/assets/images/sleep.png";

const CURRENT_USER_ID = "6bb59990-4f6b-4fd0-b475-64353b7e2abd";

export default function Post({
  shouldNavigateOnPress = false,
  id,
  username,
  timestamp,
  text,
  score,
  vote,
  commentCount,
  onVote,
  user_id,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isPinSheetVisible, setIsPinSheetVisible] = useState(false);
  const [collections, setCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);

  useEffect(() => {
    checkPinStatus();
  }, [id]);

  const checkPinStatus = async () => {
    try {
      const { data, error } = await db
        .from("saved_posts")
        .select("id")
        .eq("post_id", id)
        .eq("user_id", CURRENT_USER_ID)
        .limit(1);

      if (error) throw error;
      setIsPinned(data && data.length > 0);
    } catch (err) {
      console.error("Error checking pin status:", err);
    }
  };

  const submitVote = async (newVote) => {
    if (!onVote) return;
    try {
      setIsLoading(true);
      await onVote(id, newVote);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCollections = async () => {
    try {
      const { data, error } = await db
        .from("collections")
        .select("*")
        .eq("user_id", CURRENT_USER_ID)
        .order("timestamp", { ascending: false });

      if (error) throw error;
      setCollections(data);
    } catch (err) {
      console.error("Error fetching collections:", err);
    }
  };

  const getCollectionImage = (index) => {
    switch (index) {
      case 0:
        return sleep;
      case 1:
        return health;
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

  const createCollection = async () => {
    if (!newCollectionName.trim()) return;

    try {
      setIsLoading(true);
      const { data, error } = await db
        .from("collections")
        .insert([
          {
            name: newCollectionName.trim(),
            user_id: CURRENT_USER_ID,
          },
        ])
        .select();

      if (error) throw error;
      setCollections([...collections, data[0]]);
      setNewCollectionName("");
      setIsCreatingCollection(false);
    } catch (err) {
      console.error("Error creating collection:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToCollection = async (collectionId) => {
    try {
      setIsLoading(true);
      const { error } = await db.from("saved_posts").insert([
        {
          post_id: id,
          collection_id: collectionId,
          user_id: CURRENT_USER_ID,
        },
      ]);

      if (error) throw error;
      setIsPinned(true);
      setIsPinSheetVisible(false);
    } catch (err) {
      console.error("Error saving to collection:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinPress = () => {
    setIsPinSheetVisible(true);
    fetchCollections();
  };

  const profileIcon = user_id === CURRENT_USER_ID ? personIcon1 : personIcon2;

  const PinButton = ({ isPinned, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons
        size={20}
        name={isPinned ? "pin" : "pin-outline"}
        color={Theme.colors.PurpleMedium}
      />
    </TouchableOpacity>
  );

  const likeButton = onVote ? (
    <TouchableOpacity
      onPress={() => (vote > 0 ? submitVote(0) : submitVote(1))}
      style={styles.upvoteButton}
      disabled={isLoading}
    >
      <FontAwesome
        size={Theme.sizes.icons}
        name={vote > 0 ? "heart" : "heart-o"}
        color={vote > 0 ? Theme.colors.PurpleMedium : "#888"}
      />
    </TouchableOpacity>
  ) : (
    <View style={styles.upvoteButton}>
      <FontAwesome
        size={Theme.sizes.icons}
        name={vote > 0 ? "heart" : "heart-o"}
        color={vote > 0 ? Theme.colors.PurpleMedium : "#888"}
      />
    </View>
  );

  let post = (
    <TouchableOpacity style={styles.content} disabled={!shouldNavigateOnPress}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Image source={profileIcon} style={{ width: 30, height: 30 }} />
          <View style={styles.userInfo}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
        </View>
        <FontAwesome
          name="ellipsis-h"
          size={12}
          color="#8E8E8E"
          style={{ marginRight: 2, marginTop: 3 }}
        />
        <PinButton isPinned={isPinned} onPress={handlePinPress} />
      </View>
      <View style={styles.body}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.scoreContainer}>
          {likeButton}
          <Text style={styles.commentCount}>{score}</Text>
        </View>
        <View style={styles.comment}>
          <FontAwesome
            size={Theme.sizes.icons}
            name="comment-o"
            color={"#888"}
          />
          <Text style={styles.commentCount}>{commentCount}</Text>
        </View>
      </View>

      <Modal
        visible={isPinSheetVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsPinSheetVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsPinSheetVisible(false)}
        >
          <View style={styles.pinSheet}>
            <View style={styles.pinSheetHeader}>
              <Text style={styles.pinSheetTitle}>Pin to Collection</Text>
              <TouchableOpacity onPress={() => setIsPinSheetVisible(false)}>
                <FontAwesome name="times" size={20} color="#000" />
              </TouchableOpacity>
            </View>

            {isCreatingCollection ? (
              <View style={styles.createCollectionForm}>
                <TextInput
                  style={styles.input}
                  placeholder="Collection name"
                  value={newCollectionName}
                  onChangeText={setNewCollectionName}
                  autoFocus
                />
                <View style={styles.formButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {
                      setIsCreatingCollection(false);
                      setNewCollectionName("");
                    }}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.createButton,
                      !newCollectionName.trim() && styles.createButtonDisabled,
                    ]}
                    onPress={createCollection}
                    disabled={!newCollectionName.trim() || isLoading}
                  >
                    <Text style={styles.createButtonText}>Create</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.createNewButton}
                onPress={() => setIsCreatingCollection(true)}
              >
                <FontAwesome
                  name="plus"
                  size={20}
                  color={Theme.colors.PurpleMedium}
                />
                <Text style={styles.createNewButtonText}>
                  Create New Collection
                </Text>
              </TouchableOpacity>
            )}

            <View style={styles.collectionsList}>
              {collections.map((collection, index) => (
                <TouchableOpacity
                  key={collection.id}
                  style={styles.collectionItem}
                  onPress={() => saveToCollection(collection.id)}
                  disabled={isLoading}
                >
                  <View style={styles.collectionPreview}>
                    {getCollectionImage(index) ? (
                      <Image
                        source={getCollectionImage(index)}
                        style={styles.collectionImage}
                      />
                    ) : (
                      <View style={[styles.defaultCollectionPreview]} />
                    )}
                  </View>
                  <Text style={styles.collectionName}>{collection.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </TouchableOpacity>
  );

  if (shouldNavigateOnPress) {
    post = (
      <Link
        href={{
          pathname: "/tabs/group/details",
          params: {
            id,
            username,
            timestamp,
            text,
            score,
            commentCount,
            vote,
            user_id,
          },
        }}
        asChild
      >
        {post}
      </Link>
    );
  }

  return (
    <View
      style={[
        styles.container,
        !onVote && {
          borderWidth: 0,
          borderBottomWidth: 1,
          borderRadius: 0,
        },
      ]}
    >
      {post}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: Theme.colors.White,
    flexDirection: "row",
    borderColor: Theme.colors.LightGray,
    borderWidth: 2,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    gap: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "93%",
    justifyContent: "space-between",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
  },
  userInfo: {
    marginLeft: 8,
    flex: 1,
  },
  body: {
    width: "100%",
    flexDirection: "column",
  },
  footer: {
    flexDirection: "row",
    width: "25%",
    justifyContent: "space-between",
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 3,
  },
  pinContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
  comment: {
    flexDirection: "row",
    flex: 3,
  },
  text: {
    color: Theme.colors.textBlack,
    fontSize: Theme.sizes.body,
    fontFamily: "SF-Pro-Display-Regular",
    marginBottom: 7,
    width: "100%",
  },
  username: {
    color: Theme.colors.textSecondary,
    fontWeight: "bold",
    fontSize: Theme.sizes.headline,
    fontFamily: "SF-Pro-Display-Bold",
  },
  timestamp: {
    color: Theme.colors.textGray,
    fontFamily: "SF-Pro-Display-Regular",
    fontSize: Theme.sizes.callout,
  },
  commentCount: {
    color: Theme.colors.textGray,
    marginLeft: 8,
    fontFamily: "SF-Pro-Display-Regular",
    fontSize: Theme.sizes.callout,
  },
  upvoteButton: {
    paddingTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  pinSheet: {
    backgroundColor: Theme.colors.White,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: "80%",
  },
  pinSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.LightGray,
  },
  pinSheetTitle: {
    fontSize: Theme.sizes.title3,
    fontFamily: "SF-Pro-Display-Bold",
    color: Theme.colors.textBlack,
  },
  collectionsList: {
    paddingVertical: 8,
  },
  collectionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.LightGray,
  },
  collectionPreview: {
    width: 40,
    height: 40,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 12,
  },
  collectionImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  defaultCollectionPreview: {
    width: "100%",
    height: "100%",
    backgroundColor: Theme.colors.LightGray,
  },
  collectionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.LightGray,
  },
  collectionName: {
    fontSize: Theme.sizes.headline,
    fontFamily: "SF-Pro-Display-Regular",
    color: Theme.colors.textBlack,
  },
  createCollectionForm: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.LightGray,
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.colors.LightGray,
    borderRadius: 8,
    padding: 12,
    fontSize: Theme.sizes.body,
    fontFamily: "SF-Pro-Display-Regular",
  },
  formButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 12,
  },
  cancelButton: {
    padding: 8,
  },
  cancelButtonText: {
    color: Theme.colors.textGray,
    fontSize: Theme.sizes.callout,
    fontFamily: "SF-Pro-Display-Regular",
  },
  createButton: {
    backgroundColor: Theme.colors.PurpleMedium,
    padding: 8,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    color: Theme.colors.White,
    fontSize: Theme.sizes.callout,
    fontFamily: "SF-Pro-Display-Bold",
  },
  createNewButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.LightGray,
    gap: 12,
  },
  createNewButtonText: {
    color: Theme.colors.PurpleMedium,
    fontSize: Theme.sizes.headline,
    fontFamily: "SF-Pro-Display-Bold",
  },
});
