// import React from "react";
// import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { RootStackParamList } from "./types";

// type WelcomeProps = NativeStackScreenProps<RootStackParamList, "Welcome">;

// export default function Welcome({ navigation }: WelcomeProps) {
//   return (
//     <View style={styles.container}>
//       <Image
//         source={require("../../assets/images/splash-icon.png")}
//         style={styles.image}
//       />
//       <Text style={styles.title}>Welcome to Lunar</Text>
//       <TouchableOpacity
//         style={styles.signupButton}
//         onPress={() => navigation.navigate("SignUp")}
//       >
//         <Text style={styles.signupText}>Sign up</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.signinButton}
//         onPress={() => navigation.navigate("SignIn")}
//       >
//         <Text style={styles.signinText}>Sign in</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
//         <Text style={styles.forgotPassword}>Forgot Password?</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#A3A8F0",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   image: {
//     width: 150,
//     height: 150,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 40,
//   },
//   signupButton: {
//     backgroundColor: "#FFFFFF",
//     padding: 15,
//     borderRadius: 10,
//     width: "80%",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   signupText: {
//     color: "#000000",
//     fontSize: 16,
//   },
//   signinButton: {
//     backgroundColor: "#000000",
//     padding: 15,
//     borderRadius: 10,
//     width: "80%",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   signinText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//   },
//   forgotPassword: {
//     color: "#000000",
//     fontSize: 14,
//     marginTop: 10,
//   },
// });
// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// export default function Welcome() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to Lunar</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
// });
