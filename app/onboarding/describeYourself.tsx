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

const describeYourselfScreen: React.FC = () => {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleContinue = () => {
    router.push("./joinGroups");
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
        ? { backgroundColor: Theme.colors.PurpleMedium }
        : {},
    ];
  };

  const getButtonTextStyle = (option: string): any => {
    return [
      styles.buttonText,
      selectedOptions.includes(option)
        ? { color: Theme.colors.White }
        : { color: Theme.colors.textGray },
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
        <Text style={styles.title}>How would you describe yourself?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={getButtonStyle("Parent")}
            onPress={() => handleOptionPress("Parent")}
          >
            <Text style={getButtonTextStyle("Parent")}>Parent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getButtonStyle("Healthy")}
            onPress={() => handleOptionPress("Healthy")}
          >
            <Text style={getButtonTextStyle("Healthy")}>Healthy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getButtonStyle("Fitness Guru")}
            onPress={() => handleOptionPress("Fitness Guru")}
          >
            <Text style={getButtonTextStyle("Fitness Guru")}>Fitness Guru</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getButtonStyle("New to Shifts")}
            onPress={() => handleOptionPress("New to Shifts")}
          >
            <Text style={getButtonTextStyle("New to Shifts")}>
              New to Shifts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getButtonStyle("LGBTQ+")}
            onPress={() => handleOptionPress("LGBTQ+")}
          >
            <Text style={getButtonTextStyle("LGBTQ+")}>LGBTQ+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getButtonStyle("Work-life Balance")}
            onPress={() => handleOptionPress("Work-life Balance")}
          >
            <Text style={getButtonTextStyle("Work-life Balance")}>
              Work-life Balance
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getButtonStyle("Student")}
            onPress={() => handleOptionPress("Student")}
          >
            <Text style={getButtonTextStyle("Student")}>Student</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getButtonStyle("Part-Time")}
            onPress={() => handleOptionPress("Part-Time")}
          >
            <Text style={getButtonTextStyle("Part-Time")}>Part-Time</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getButtonStyle("Veteran Worker")}
            onPress={() => handleOptionPress("Veteran Worker")}
          >
            <Text style={getButtonTextStyle("Veteran Worker")}>
              Veteran Worker
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getButtonStyle("Custom")}
            onPress={() => handleOptionPress("Custom")}
          >
            <Text style={getButtonTextStyle("Custom")}>Custom</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 200,
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  button: {
    backgroundColor: Theme.colors.White,
    borderColor: Theme.colors.textGray,
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    width: "47%",
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

export default describeYourselfScreen;
