import React from "react";
import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack>
      {/* Default onboarding screen */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* Additional onboarding steps */}
      <Stack.Screen name="complete" options={{ headerShown: false }} />
    </Stack>
  );
}
