import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Stack, useRouter } from "expo-router";

import Theme from "@/assets/theme";
import ContinueButton from "@/components/ContinueButton";
import GrayStatusBar from "@/assets/images/OnboardingStatusBarGray.png";
import PurpleStatusBar from "@/assets/images/OnboardingStatusBarPurple.png";
import verifications from "@/assets/images/verifications.png";

const { width } = Dimensions.get("window");

const IdentityScreen: React.FC = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push("./calendar");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backText} onPress={() => router.back()}>
            ←
          </Text>
        </TouchableOpacity>
        <Image source={GrayStatusBar} />
        <Image source={GrayStatusBar} />
        <Image source={GrayStatusBar} />
        <Image source={PurpleStatusBar} />
        <Image source={GrayStatusBar} />
        <TouchableOpacity onPress={handleContinue}>
          <Text style={styles.headerText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Verify your Identity</Text>
        <Text style={styles.caption}>
          To get verified, input your work email address or upload a letter of
          employment
        </Text>
        <Image source={verifications} style={styles.image} />
      </View>
      <ContinueButton
        buttonColor={Theme.colors.PurpleMedium} // Custom color for the button
        textColor={Theme.colors.White} // Custom color for the text
        onPress={handleContinue} // Pass the function to handle button press
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.White,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    top: 50,
  },
  headerText: {
    color: Theme.colors.textBlack,
    fontFamily: "SF-Pro-Display-Bold",
    fontSize: 15,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 180,
    alignItems: "flex-start",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: Theme.colors.PurpleMedium,
    marginBottom: 10,
    fontFamily: "TestTiemposHeadline-Medium",
  },
  caption: {
    fontSize: 15,
    color: Theme.colors.textGray,
    fontFamily: "SF-Pro-Display-Regular",
    marginBottom: 24,
    marginLeft: 5,
    alignSelf: "center",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 48,
    borderRadius: 30,
    backgroundColor: Theme.colors.White,
    borderColor: Theme.colors.textGray,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  waveImage: {
    position: "absolute",
    bottom: -70,
    width: "100%",
    resizeMode: "contain",
  },
  backText: {
    fontSize: 25,
    color: "#000s",
  },
  image: {
    width: width * 0.8,
    height: width * 0.8 * (3 / 4),
    resizeMode: "contain",
    alignSelf: "center",
  },
});

export default IdentityScreen;
