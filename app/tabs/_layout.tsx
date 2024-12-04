import FontAwesome5 from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import React from "react";
import { Tabs } from "expo-router";
import theme from "@/assets/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.PurpleMedium,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: theme.colors.White,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "SF-Pro-Display-Light",
        },
      }}
    >
      <Tabs.Screen
        name="group"
        options={{
          title: "Group Home",
          headerShown: false,
          href: null,
        }}
      />
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" color={color} size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore/index"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="compass" color={color} size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="tabs/pins"
        options={{
          title: "Pins",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={20}
              name={"pin-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reminder/index"
        options={{
          title: "Reminders",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="bell-outline"
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={25}
            />
          ),
        }}
      />
    </Tabs>
  );
}
