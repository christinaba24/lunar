import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Keyboard,
  Pressable,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import db from "@/database/db";
import Theme from "@/assets/theme";

export default function NewPost() {
  const [username, setUsername] = useState(null);
  const [inputText, setInputText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false); // State for the toggle
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();
  const user_id = "6bb59990-4f6b-4fd0-b475-64353b7e2abd";
  const other_user_id = "2bbcaafe-ead1-4542-9ca6-7560bca59855";

  const submitPost = async () => {
    if (!inputText.trim() || isLoading) return;

    try {
      setIsLoading(true);
      const { data, error: userError } = await db
        .from("users")
        .select("username")
        .eq("id", user_id);

      if (userError || !data || data.length === 0) {
        throw new Error("User not found");
      }

      const username = data[0].username;

      const { error } = await db.from("posts").insert({
        user_id: isAnonymous ? other_user_id : user_id,
        username: isAnonymous ? "Anonymous" : username, // Use the toggle state
        text: inputText.trim(),
      });

      if (error) {
        console.error("Error submitting post:", error);
        Alert.alert("Error", "Failed to submit post. Please try again.");
        return;
      }

      Alert.alert("Success", "Post submitted successfully.");
      router.back();
    } catch (err) {
      console.error("Error submitting post:", err);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={submitPost}
          disabled={!inputText.trim() || isLoading}
        >
          <Text
            style={{
              fontSize: 17,
              color:
                !inputText.trim() || isLoading
                  ? Theme.colors.White
                  : Theme.colors.PurpleDark,
              opacity: 1,
              paddingHorizontal: 16,
            }}
          >
            Submit
          </Text>
        </Pressable>
      ),
    });
  }, [inputText, isLoading, navigation]);

  const handleToggle = () => {
    setIsAnonymous((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <Pressable onPress={handleToggle} style={styles.toggleButton}>
          <Text style={[styles.toggleText, isAnonymous && styles.activeText]}>
            Anonymous
          </Text>
          <View
            style={[
              styles.toggleSwitch,
              isAnonymous ? styles.switchOn : styles.switchOff,
            ]}
          >
            <View
              style={[
                styles.toggleCircle,
                isAnonymous ? styles.circleOn : styles.circleOff,
              ]}
            />
          </View>
        </Pressable>
      </View>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="What do you want to share?"
        placeholderTextColor={Theme.colors.textGray}
        multiline
        autoFocus
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.White,
  },
  toggleContainer: {
    width: "100%",
    padding: 16,
    alignItems: "flex-start",
  },
  toggleButton: {
    flexDirection: "row",
    backgroundColor: "#EDEBFF",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  toggleText: {
    fontSize: 16,
    color: "#7A5AF8",
    marginRight: 8,
  },
  activeText: {
    color: Theme.colors.PurpleDark,
  },
  toggleSwitch: {
    width: 40,
    height: 20,
    borderRadius: 20,
    justifyContent: "center",
    backgroundColor: "#CFCFCF",
  },
  switchOn: {
    backgroundColor: Theme.colors.PurpleDark,
  },
  switchOff: {
    backgroundColor: "#CFCFCF",
  },
  toggleCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Theme.colors.White,
    position: "absolute",
  },
  circleOn: {
    left: 22,
  },
  circleOff: {
    left: 2,
  },
  input: {
    color: Theme.colors.textBlack,
    backgroundColor: Theme.colors.White,
    flex: 1,
    width: "100%",
    padding: 16,
  },
});
