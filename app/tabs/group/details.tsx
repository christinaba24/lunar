import { useState } from "react";
import {
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import db from "@/database/db";

import Theme from "@/assets/theme";
import Post from "@/components/Post";
import CommentFeed from "@/components/CommentFeed";

export default function Details() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //const user_id = "6bb59990-4f6b-4fd0-b475-64353b7e2abd";

  // Get the post details from the route params
  const { id, username, timestamp, text, score, vote, commentCount, user_id } =
    useLocalSearchParams();

  const submitComment = async () => {
    try {
      setIsLoading(true);

      //   // Get the current user's ID
      //   const {
      //     data: { user },
      //   } = await db.auth.getUser();

      // Insert the new comment
      const { error } = await db.from("comments").insert({
        post_id: id,
        user_id: user_id,
        username: "Anonymous",
        text: inputText,
      });

      if (error) {
        console.error("Error submitting comment:", error);
        Alert.alert("Error", "Failed to submit comment. Please try again.");
        return;
      }

      // Clear the input and dismiss keyboard
      setInputText("");
      Keyboard.dismiss();
    } catch (err) {
      console.error("Unexpected error submitting comment:", err);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitDisabled = isLoading || inputText.length === 0;

  return (
    console.log(timestamp),
    (
      <View style={styles.container}>
        <Post
          id={id}
          username={username}
          timestamp={timestamp}
          text={text}
          score={score}
          vote={vote}
          commentCount={commentCount}
          onVote={undefined}
          user_id={user_id}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 65 : 0}
          style={styles.keyboardContainer}
        >
          <CommentFeed postId={id} />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder={"Write a comment..."}
              placeholderTextColor={Theme.colors.textGray}
              editable={!isLoading}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={submitComment}
              disabled={submitDisabled}
            >
              <FontAwesome
                size={24}
                name="send"
                color={
                  submitDisabled
                    ? Theme.colors.textGray
                    : Theme.colors.PurpleMedium
                }
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.White,
  },
  keyboardContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 8,
    alignItems: "center",
  },
  input: {
    paddingLeft: 12,
    marginRight: 8,
    height: 48,
    borderRadius: 24,
    color: Theme.colors.textBlack,
    backgroundColor: Theme.colors.LightGray,
    flex: 1,
  },
  sendButton: {
    padding: 4,
  },
});
