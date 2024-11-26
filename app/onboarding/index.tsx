import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OnboardingIndex() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Guard to avoid state updates on unmounted components

    const checkOnboardingStatus = async () => {
      try {
        const status = await AsyncStorage.getItem("onboardingComplete");
        if (status === "true" && isMounted) {
          router.replace("/"); // Navigate only if onboarding is complete
        } else if (isMounted) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    useEffect(() => {
      console.log("Navigating to index after onboarding...");
    }, []);

    checkOnboardingStatus();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Onboarding</Text>
      <Text style={styles.subtitle}>Let's get you started!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
  },
});
