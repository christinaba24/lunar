import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Stack, useRouter } from "expo-router";

import Theme from "@/assets/theme";
import wave from "@/assets/images/OnboardingPurpleWave.png";
import ContinueButton from "@/components/ContinueButton";
import GrayStatusBar from "@/assets/images/OnboardingStatusBarGray.png";
import PurpleStatusBar from "@/assets/images/OnboardingStatusBarPurple.png";

const JoinGroupsScreen: React.FC = () => {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleContinue = () => {
    router.push("./identity");
  };

  const handleOptionPress = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const getButtonStyle = (option: string): any => {
    return [
      styles.button,
      selectedOptions.includes(option)
        ? {
            backgroundColor: Theme.colors.PurpleMedium,
            color: Theme.colors.White,
          }
        : { backgroundColor: Theme.colors.White, color: Theme.colors.textGray },
    ];
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
        <Image source={PurpleStatusBar} />
        <Image source={GrayStatusBar} />
        <Image source={GrayStatusBar} />
        <TouchableOpacity onPress={handleContinue}>
          <Text style={styles.headerText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Join groups from your interests!</Text>
        <View style={styles.buttonContainer}>
          {[
            "Night Nurses",
            "Palo Alto Moms",
            "LGBTQ+",
            "Stanford Hospital",
            "Gym Rats",
            "Bay Area Nurses",
            "Part-time",
          ].map((option) => (
            <TouchableOpacity
              key={option}
              style={getButtonStyle(option)}
              onPress={() => handleOptionPress(option)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedOptions.includes(option)
                    ? { color: Theme.colors.White } // Set text color to white when selected
                    : { color: Theme.colors.textGray }, // Default text color
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <ContinueButton
        buttonColor={Theme.colors.PurpleMedium}
        textColor={Theme.colors.White}
        onPress={handleContinue}
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
    paddingTop: 150,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Theme.colors.PurpleMedium,
    marginBottom: 35,
    fontFamily: "TestTiemposHeadline-Medium",
  },
  buttonContainer: {
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 24,
    width: "80%",
  },
  button: {
    backgroundColor: Theme.colors.White,
    borderColor: Theme.colors.textGray,
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    width: "100%",
  },
  buttonText: {
    fontSize: 15,
    fontFamily: "SF-Pro-Display-Regular",
    textAlign: "center",
  },
  waveImage: {
    position: "absolute",
    bottom: -70,
    width: "100%",
    resizeMode: "contain",
  },
  backText: {
    fontSize: 25,
    color: Theme.colors.textBlack,
  },
});

export default JoinGroupsScreen;
