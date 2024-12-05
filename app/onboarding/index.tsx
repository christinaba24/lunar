import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import twoicons from "@/assets/icons/twoicons.png";
import Theme from "@/assets/theme";
import starBottom from "@/assets/icons/starbottom.png";
import starRight from "@/assets/icons/starright.png";

export default function OnboardingIndex() {
  const router = useRouter();

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem("onboardingComplete", "true");
      router.replace("/onboarding/occupation");
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={starRight} style={styles.starRight} />

      <View style={styles.iconsContainer}>
        <Image source={twoicons} style={styles.twoIcons} />
      </View>

      <Text style={styles.title}>Welcome to Lunar</Text>

      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => router.push("./onboarding/email")}
      >
        <Text style={styles.signupButtonText}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signinButton}
        onPress={() => router.push("./tabs/home")}
      >
        <Text style={styles.signinButtonText}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotPasswordButton}
        onPress={() => router.push("/")}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
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
    padding: 20,
  },
  twoIcons: {
    resizeMode: "contain",
    marginBottom: 20,
    overflow: "visible",
    height: 120,
  },
  iconsContainer: {
    alignItems: "center",
    position: "absolute",
    top: 110,
    paddingHorizontal: 100,
    paddingVertical: 100,
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
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 80,
    color: "#000",
    fontFamily: "TestTiemposHeadline-Medium",
  },
  signupButton: {
    backgroundColor: "transparent",
    borderWidth: 1.3,
    borderColor: "#000",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 80,
    marginBottom: 15,
  },
  signupButtonText: {
    color: Theme.colors.textBlack,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "SF-Pro-Display-Bold",
  },
  signinButton: {
    backgroundColor: "#000",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 85,
    marginBottom: 15,
  },
  signinButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "SF-Pro-Display-Bold",
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
});
