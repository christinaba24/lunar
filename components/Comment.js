import { StyleSheet, Text, View, Image } from "react-native";
import Theme from "@/assets/theme";
import personIcon1 from "@/assets/images/personicon.png";

export default function Comment({ username, timestamp, text }) {
  const user_id = "6bb59990-4f6b-4fd0-b475-64353b7e2abd";

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image source={personIcon1} style={styles.personIcon} />
          <View style={styles.userInfo}>
            <View style={styles.userHeader}>
              <Text style={styles.username}>{username}</Text>
              <Text style={styles.timestamp}>{timestamp}</Text>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <Text style={styles.comment}>{text}</Text>
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
    alignItems: "flex-start",
    width: "100%",
  },
  userInfo: {
    flex: 1,
    marginLeft: 8,
  },
  userHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  body: {
    width: "100%",
  },
  username: {
    color: Theme.colors.textSecondary,
    fontWeight: "bold",
    fontSize: Theme.sizes.headline,
    fontFamily: "SF-Pro-Display-Bold",
  },
  timestamp: {
    color: Theme.colors.textGray,  // Changed to match Post component
    fontSize: Theme.sizes.callout,
    fontFamily: "SF-Pro-Display-Regular",
  },
  comment: {
    color: Theme.colors.textBlack,
    fontSize: Theme.sizes.body,
  },
  personIcon: {
    width: 30,
    height: 30,
    borderRadius: Theme.sizes.icons / 2,
  },
});