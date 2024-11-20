// import { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Alert,
//   Keyboard,
//   Pressable,
// } from "react-native";
// import { useNavigation, useRouter } from "expo-router";
// import db from "@/database/db";
// import Theme from "@/assets/theme";

// export default function NewPost() {
//   const [username, setUsername] = useState(null);
//   const [inputText, setInputText] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const navigation = useNavigation();

//   const submitPost = async () => {
//     if (!inputText.trim() || isLoading) return;

//     try {
//       setIsLoading(true);

//       const {
//         data: { user },
//       } = await db.auth.getUser();

//       const { error } = await db.from("posts").insert({
//         user_id: user?.id || null,
//         username: "Anonymous",
//         text: inputText.trim(),
//       });

//       if (error) {
//         console.error("Error submitting post:", error);
//         Alert.alert("Error", "Failed to submit post. Please try again.");
//         return;
//       }

//       Alert.alert("Success", "Post submitted successfully.");
//       router.back();
//     } catch (err) {
//       console.error("Error submitting post:", err);
//       Alert.alert("Error", "An unexpected error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <Pressable
//           onPress={submitPost}
//           disabled={!inputText.trim() || isLoading}
//         >
//           <Text
//             style={{
//               fontSize: 17,
//               color:
//                 !inputText.trim() || isLoading
//                   ? Theme.colors.White,
//                   : Theme.colors.PurpleMedium,
//               opacity: 1,
//               paddingHorizontal: 16,
//             }}
//           >
//             Submit
//           </Text>
//         </Pressable>
//       ),
//     });
//   }, [inputText, isLoading, navigation]);

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         value={inputText}
//         onChangeText={setInputText}
//         placeholder="What do you want to share?"
//         placeholderTextColor={Theme.colors.textSecondary}
//         multiline
//         autoFocus
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: Theme.colors.backgroundPrimary,
//   },
//   nameInputContainer: {
//     width: "100%",
//     padding: 16,
//     gap: 8,
//   },
//   nameInputPrompt: {
//     color: Theme.colors.textPrimary,
//   },
//   nameInput: {
//     color: Theme.colors.textSecondary,
//   },
//   headerButtonTextPrimary: {
//     fontSize: 18,
//     color: Theme.colors.textHighlighted,
//   },
//   input: {
//     color: Theme.colors.textPrimary,
//     backgroundColor: Theme.colors.backgroundSecondary,
//     flex: 1,
//     width: "100%",
//     padding: 16,
//   },
// });
