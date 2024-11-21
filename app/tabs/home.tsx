<<<<<<< Updated upstream
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Page!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});
=======
// import { StyleSheet, View } from "react-native";

// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { StatusBar } from "expo-status-bar";
// import { Link } from "expo-router";

// import Theme from "@/assets/theme";
// import Feed from "@/components/Feed";

// export default function Home() {
//   return (
//     <View style={styles.container}>
//       <StatusBar style="light" />
//       <Feed shouldNavigateToComments={true} fetchUsersPostsOnly={false} />
//       <Link href="/tabs/feed/newpost" style={styles.postButtonContainer}>
//         <View style={styles.postButton}>
//           <FontAwesome size={32} name="plus" color={Theme.colors.textPrimary} />
//         </View>
//       </Link>
//     </View>
//   );
// }

import React from "react";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}
>>>>>>> Stashed changes
