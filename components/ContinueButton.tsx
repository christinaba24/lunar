import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

interface ContinueButtonProps {
  buttonColor: string;
  textColor: string;
  onPress: () => void;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({
  buttonColor,
  textColor,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonColor }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>Continue</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignSelf: "center",
    marginBottom: 40,
    width: "55%",
  },
  text: {
    fontSize: 18,
    fontFamily: "SF-Pro-Display-Bold",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ContinueButton;
