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
import twoIcons from "@/assets/icons/twoicons.png";
import starBottom from "@/assets/icons/starbottom.png";
import starRight from "@/assets/icons/starright.png";

export default function VerifyIndex() {
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
        <Image source={twoIcons} style={styles.twoIcons} />
      </View>

      <Text style={styles.headerText}>Verify email</Text>

      <View style={styles.verifyContainer}>
        <TextInput
          style={styles.inputText}
          maxLength={1}
          keyboardType="number-pad"
        >
          <Text style={styles.inputText}></Text>
        </TextInput>
        <TextInput
          style={styles.inputText}
          maxLength={1}
          keyboardType="number-pad"
        >
          <Text style={styles.inputText}></Text>
        </TextInput>
        <TextInput
          style={styles.inputText}
          maxLength={1}
          keyboardType="number-pad"
        >
          <Text style={styles.inputText}></Text>
        </TextInput>
        <TextInput
          style={styles.inputText}
          maxLength={1}
          keyboardType="number-pad"
        >
          <Text style={styles.inputText}></Text>
        </TextInput>
        <TextInput
          style={styles.inputText}
          maxLength={1}
          keyboardType="number-pad"
        >
          <Text style={styles.inputText}></Text>
        </TextInput>
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => router.push("./allset")}
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
    paddingHorizontal: 100,
    paddingVertical: 100,
  },
  twoIcons: {
    resizeMode: "contain",
    marginBottom: 20,
    overflow: "visible",
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
  verifyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputText: {
    backgroundColor: "transparent",
    borderWidth: 1.3,
    borderColor: "#000",
    borderRadius: 8,
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
