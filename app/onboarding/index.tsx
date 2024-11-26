import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types"; // Adjust path as necessary

type OnboardingProps = NativeStackScreenProps<RootStackParamList, "onboarding">;

export default function Onboarding({ navigation }: OnboardingProps) {
  const completeOnboarding = async () => {
    navigation.replace("complete"); // Navigate to the "complete" screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Lunar!</Text>
      <Button title="Get Started" onPress={completeOnboarding} />
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
    fontSize: 24,
    marginBottom: 20,
  },
});

// import React from "react";
// import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// export default function Onboarding() {
//   const handleSignUp = () => {
//     console.log("Navigate to Sign Up");
//     // Add your navigation logic here, e.g., navigation.navigate("SignUp");
//   };

//   const handleSignIn = () => {
//     console.log("Navigate to Sign In");
//     // Add your navigation logic here, e.g., navigation.navigate("SignIn");
//   };

//   const handleForgotPassword = () => {
//     console.log("Navigate to Forgot Password");
//     // Add your navigation logic here, e.g., navigation.navigate("ForgotPassword");
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require("../../assets/images/splash-icon.png")} // Adjust the image path as necessary
//         style={styles.image}
//       />
//       <Text style={styles.title}>Welcome to Lunar</Text>
//       <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
//         <Text style={styles.signupText}>Sign up</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.signinButton} onPress={handleSignIn}>
//         <Text style={styles.signinText}>Sign in</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={handleForgotPassword}>
//         <Text style={styles.forgotPassword}>Forgot Password?</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#A3A8F0", // Light purple background
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
//     color: "#000", // Black text
//     marginBottom: 40,
//   },
//   signupButton: {
//     backgroundColor: "#FFFFFF", // White button
//     padding: 15,
//     borderRadius: 10,
//     width: "80%",
//     alignItems: "center",
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: "#000", // Black border
//   },
//   signupText: {
//     color: "#000", // Black text
//     fontSize: 16,
//   },
//   signinButton: {
//     backgroundColor: "#000000", // Black button
//     padding: 15,
//     borderRadius: 10,
//     width: "80%",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   signinText: {
//     color: "#FFFFFF", // White text
//     fontSize: 16,
//   },
//   forgotPassword: {
//     color: "#000000", // Black text
//     fontSize: 14,
//     marginTop: 10,
//   },
// });
