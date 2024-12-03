import React from "react";
import {
  View,
  Text,
  TextInput,
  StatusBar,
  StyleSheet,
  Image,
} from "react-native";

import Theme from "@/assets/theme";
import wave from "@/assets/images/OnboardingPurpleWave.png";
import ContinueButton from "@/components/ContinueButton"; // Import the new component

const OccupationScreen: React.FC = () => {
  const handleContinue = () => {
    // Define what happens when the Continue button is pressed
    console.log("Continue pressed");
  };

  return (
    <View style={styles.container}>
      <Image source={wave} style={styles.waveImage} />
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.backButton}>Back</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>What's your occupation?</Text>
        <TextInput
          style={[styles.input, { fontFamily: "SF-Pro-Display-Regular" }]}
          placeholder="Type occupation"
          placeholderTextColor={Theme.colors.textGray}
        />
      </View>
      <ContinueButton
        buttonColor={Theme.colors.White} // Custom color for the button
        textColor={Theme.colors.PurpleMedium} // Custom color for the text
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Theme.colors.LightGray,
  },
  backButton: {
    color: Theme.colors.textBlack,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 160,
    alignItems: "flex-start",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Theme.colors.PurpleMedium,
    marginBottom: 24,
    fontFamily: "TestTiemposHeadline-Medium",
  },
  input: {
    width: "100%",
    height: 48,
    borderRadius: 30,
    backgroundColor: Theme.colors.White,
    borderColor: Theme.colors.textGray,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  waveImage: {
    position: "absolute",
    bottom: -20,
    width: "100%",
    resizeMode: "contain",
  },
});

export default OccupationScreen;
