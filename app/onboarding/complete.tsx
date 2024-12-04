// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   TextInput,
// } from "react-native";
// import { useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import singlestar from "@/assets/icons/twoicons.png";
// import starBottom from "@/assets/icons/starbottom.png";
// import starRight from "@/assets/icons/starright.png";

// export default function AllSetIndex() {
//   const router = useRouter();

//   const finishOnboarding = async () => {
//     try {
//       // Save the onboarding completion status
//       await AsyncStorage.setItem("onboardingComplete", "true");

//       console.log("Onboarding Completed!");
//       // Navigate to the home page
//       router.replace("../tabs/home");
//     } catch (error) {
//       console.error("Error completing onboarding:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.backButton}>
//         <Text style={styles.backText} onPress={() => router.back()}>
//           ←
//         </Text>
//       </TouchableOpacity>
//       <Image source={starRight} style={styles.starRight} />

//       <View style={styles.iconsContainer}>
//         <Image source={singlestar} style={styles.singlestar} />
//       </View>

//       <Text style={styles.headerText}>Lunar</Text>

//       <Text style={styles.subText}>Closer Connections, No Matter the Hour</Text>

//       <Image source={starBottom} style={styles.starBottom} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#9C9CFF",
//     paddingTop: 10,
//     paddingHorizontal: 30,
//   },
//   backButton: {
//     position: "absolute",
//     top: 60,
//     left: 20,
//   },
//   backText: {
//     fontSize: 25,
//     color: "#000",
//   },
//   iconsContainer: {
//     alignItems: "center",
//     position: "absolute",
//     top: 110,
//     paddingHorizontal: 110,
//     paddingVertical: 80,
//   },
//   singlestar: {
//     resizeMode: "contain",
//     width: 190,
//     height: 190,
//     marginBottom: 40,
//   },
//   starBottom: {
//     position: "absolute",
//     bottom: 0,
//   },
//   starRight: {
//     position: "absolute",
//     right: 0,
//     top: 0,
//   },
//   headerText: {
//     fontSize: 36,
//     fontWeight: "bold",
//     marginBottom: 12,
//     color: "#000",
//     fontFamily: "TestTiemposHeadline-Medium",
//     alignItems: "center",
//   },
//   subText: {
//     fontSize: 16,
//     marginBottom: 25,
//     color: "#000",
//     fontFamily: "SF-Pro-Display-Regular",
//     alignItems: "flex-start",
//   },
//   inputText: {
//     backgroundColor: "transparent",
//     borderWidth: 1.3,
//     borderColor: "#000",
//     borderRadius: 25,
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     marginBottom: 15,
//   },
//   continueButton: {
//     backgroundColor: "#000",
//     borderRadius: 25,
//     paddingVertical: 15,
//     paddingHorizontal: 140,
//     marginBottom: 15,
//   },
//   continueButtonText: {
//     color: "#FFF",
//     fontSize: 16,
//     fontFamily: "SF-Pro-Display-Bold",
//   },
// });

import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import singlestar from "@/assets/icons/twoicons.png";
import starBottom from "@/assets/icons/starbottom.png";
import starRight from "@/assets/icons/starright.png";

export default function AllSetIndex() {
  const router = useRouter();

  useEffect(() => {
    const completeOnboardingAndNavigate = async () => {
      try {
        // Save the onboarding completion status
        await AsyncStorage.setItem("onboardingComplete", "true");

        // Delay navigation for 3 seconds
        setTimeout(() => {
          router.replace("../tabs/home");
        }, 3000); // 3000ms = 3 seconds
      } catch (error) {
        console.error("Error completing onboarding:", error);
      }
    };

    completeOnboardingAndNavigate();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backText} onPress={() => router.back()}>
          ←
        </Text>
      </TouchableOpacity>
      <Image source={starRight} style={styles.starRight} />

      <View style={styles.iconsContainer}>
        <Image source={singlestar} style={styles.singlestar} />
      </View>

      <Text style={styles.headerText}>Lunar</Text>

      <Text style={styles.subText}>Closer Connections, No Matter the Hour</Text>

      <Image source={starBottom} style={styles.starBottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9C9CFF",
    paddingTop: 10,
    paddingHorizontal: 30,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  backText: {
    fontSize: 25,
    color: "#000",
  },
  iconsContainer: {
    alignItems: "center",
    position: "absolute",
    top: 110,
    paddingHorizontal: 110,
    paddingVertical: 80,
  },
  singlestar: {
    resizeMode: "contain",
    width: 190,
    height: 190,
    marginBottom: 40,
  },
  starBottom: {
    position: "absolute",
    bottom: 0,
  },
  starRight: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  headerText: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#000",
    fontFamily: "TestTiemposHeadline-Medium",
    alignItems: "center",
  },
  subText: {
    fontSize: 16,
    marginBottom: 25,
    color: "#000",
    fontFamily: "SF-Pro-Display-Regular",
    alignItems: "flex-start",
  },
  inputText: {
    backgroundColor: "transparent",
    borderWidth: 1.3,
    borderColor: "#000",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  continueButton: {
    backgroundColor: "#000",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 140,
    marginBottom: 15,
  },
  continueButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "SF-Pro-Display-Bold",
  },
});
