import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import twoicons from "@/assets/icons/twoicons.png";
import starBottom from "@/assets/icons/starbottom.png";
import starRight from "@/assets/icons/starright.png";

export default function EmailIndex() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backText} onPress={() => router.back()}>
          ←
        </Text>
      </TouchableOpacity>
      <Image source={starRight} style={styles.starRight} />

      <View style={styles.iconsContainer}>
        <Image source={twoicons} style={styles.twoicons} />
      </View>

      <Text style={styles.headerText}>Enter email</Text>

      <TextInput style={styles.inputText}>
        <Text style={styles.inputText}>Enter your email</Text>
      </TextInput>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => router.push("./password")}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
      <Image source={starBottom} style={styles.starBottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#9C9CFF",
    paddingTop: 70,
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
  twoicons: {
    resizeMode: "contain",
    width: 170,
    height: 170,
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#000",
    fontFamily: "TestTiemposHeadline-Medium",
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
    paddingHorizontal: 130,
    marginBottom: 15,
  },
  continueButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "SF-Pro-Display-Bold",
  },
});
