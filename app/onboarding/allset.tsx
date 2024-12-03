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

export default function AllSetIndex() {
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
        <Image source={twoIcons} style={styles.twoicons} />
      </View>

      <Text style={styles.headerText}>Congrats, you're all set!</Text>

      <Text style={styles.subText}>
        Just a few more questions to get you started...
      </Text>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => router.push("./occupation")}
      >
        <Text style={styles.continueButtonText}>Start</Text>
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
    paddingTop: 40,
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
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
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
