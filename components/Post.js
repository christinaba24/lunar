import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";
import Theme from "@/assets/theme";
import personIcon1 from "@/assets/images/personicon.png";
import personIcon2 from "@/assets/images/man.png";

// Define the current user_id constant
const CURRENT_USER_ID = "6bb59990-4f6b-4fd0-b475-64353b7e2abd"; // Replace this with the actual user_id for the logged-in user

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
  user_id, // Add user_id as a prop
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPinned, setIsPinned] = useState(false); // Add state for pinned status

  const submitVote = async (newVote) => {
    try {
      setIsLoading(true);
      await onVote(id, newVote);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePin = () => setIsPinned(!isPinned); // Function to toggle pin state

  const likeButton = (
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
  );

  // Dynamically determine the icon based on user_id
  const profileIcon = user_id === CURRENT_USER_ID ? personIcon1 : personIcon2;

  const PinButton = ({ isPinned, onToggle }) => {
    return (
      <TouchableOpacity onPress={onToggle}>
        <MaterialCommunityIcons
          size={20}
          name={isPinned ? "pin" : "pin-outline"}
          color={Theme.colors.PurpleMedium}
        />
      </TouchableOpacity>
    );
  };

  let post = (
    <TouchableOpacity style={styles.content} disabled={!shouldNavigateOnPress}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          {/* Use the dynamically selected icon */}
          <Image source={profileIcon} style={{ width: 30, height: 30 }} />
          <Text style={styles.username}>{username}</Text>
        </View>
        <PinButton isPinned={isPinned} onToggle={togglePin} />
      </View>
      <View style={styles.body}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
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
    </TouchableOpacity>
  );

  if (shouldNavigateOnPress) {
    post = (
      <Link
        href={{
          pathname: "/tabs/group/details",
          params: {
            id: id,
            username: username,
            timestamp: timestamp,
            text: text,
            score: score,
            commentCount: commentCount,
            vote: vote,
          },
        }}
        asChild={true}
        style={styles.content}
      >
        {post}
      </Link>
    );
  }

  return <View style={styles.container}>{post}</View>;
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
    alignItems: "center",
    width: "93%",
    justifyContent: "space-between",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
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
  text: {
    color: Theme.colors.textBlack,
    fontSize: Theme.sizes.body,
    fontFamily: "SF-Pro-Display-Regular",
    marginBottom: 7,
  },
  username: {
    color: Theme.colors.textSecondary,
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: Theme.sizes.headline,
    fontFamily: "SF-Pro-Display-Bold",
  },
  timestamp: {
    color: Theme.colors.textGray,
    fontFamily: "SF-Pro-Display-Regular",
    fontSize: Theme.sizes.callout,
    flex: 2,
  },
  comment: {
    flexDirection: "row",
    flex: 3,
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
});
