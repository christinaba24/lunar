import { Tabs, useSegments } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import Theme from "@/assets/theme"; // Use your custom theme if available

export default function Layout() {
  const segments = useSegments();
  const [currentTab, setCurrentTab] = useState("feed");

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: Theme.colors.White,
          borderTopWidth: 0, // Remove top border for a cleaner look
        },
        tabBarActiveTintColor: Theme.colors.PurpleMedium || "#ffa500", // Purple for active icons
        tabBarInactiveTintColor: Theme.colors.White || "#ffffff", // White for inactive icons
        tabBarLabelStyle: {
          fontSize: 12, // Adjust text size
        },
        tabBarIconStyle: {
          marginBottom: -4, // Adjust icon spacing
        },
        tabBarIcon: ({ size, color }) => {
          let iconName;
          if (route.name === "feed") {
            iconName = "home";
          } else if (route.name === "profile") {
            iconName = "user";
          }
          return <FontAwesome size={size} name={"home"} color={color} />; // idk
        },
      })}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
