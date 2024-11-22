import { StyleSheet, Text, View, Image } from "react-native";
import Theme from "@/assets/theme";
import personIcon1 from "@/assets/images/personicon.png"; // Import personIcon1

export default function Comment({ username, timestamp, text }) {
  // Use the hard-coded user_id from Feed.js
  const user_id = "6bb59990-4f6b-4fd0-b475-64353b7e2abd";

  // Optionally, if you have a function to get the icon based on user_id
  // For now, we'll directly use personIcon1 as per your requirement

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          {/* Replace FontAwesome icon with personIcon1 */}
          <Image source={personIcon1} style={styles.personIcon} />
          <Text style={styles.username}>{username}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.comment}>{text}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.timestamp}>{timestamp}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    padding: 24,
    backgroundColor: Theme.colors.backgroundSecondary,
    flexDirection: "row",
  },
  content: {
    flex: 1,
    gap: 8,
    marginRight: 16,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center", // Ensure vertical alignment
  },
  body: {
    width: "100%",
  },
  footer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  text: {
    color: Theme.colors.textBlack,
    fontWeight: "bold",
    fontSize: Theme.sizes.textMedium,
  },
  username: {
    color: Theme.colors.textSecondary,
    fontWeight: "bold",
    marginLeft: 8,
  },
  comment: {
    color: Theme.colors.textBlack,
    fontSize: Theme.sizes.body,
  },
  timestamp: {
    color: Theme.colors.textSecondary,
  },
  personIcon: {
    width: 20,
    height: 20,
    borderRadius: Theme.sizes.icons / 2,
  },
});
