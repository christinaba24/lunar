// import React from "react";
// import { View, Image, StyleSheet } from "react-native";
// import moonlogo1 from "../assets/icons/moonlogo1.png";
// import GroupHeader from "@/components/GroupHeader";
// import GroupFeed from "@/components/Feed";
// import Home from "./tabs/home"; // Correct import for default export

// export default function Index() {
//   return (
//     <View style={styles.container}>
//       <Home />
//       <GroupHeader />
//       <GroupFeed shouldNavigateToComments={true} />
//       <Image source={moonlogo1} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// import React from "react";
// // import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import Home from "./tabs/home";
// import GroupPage from "./tabs/group/details";
// import { Button } from "react-native";
// import { Link } from "expo-router";

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <Stack.Navigator initialRouteName="Home">
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="GroupPage" component={GroupPage} />
//     </Stack.Navigator>
//   );
// }

import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Link, useNavigation } from "expo-router";
import GroupPage from "./tabs/group/details";
import GroupHeader from "@/components/GroupHeader";
import { GroupScreen } from "@/components/GroupHeader";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Page!</Text>
      <Link href="/tabs/group/home" style={styles.button}>
        <Text>Go to Group Screen</Text>
      </Link>
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
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
});
