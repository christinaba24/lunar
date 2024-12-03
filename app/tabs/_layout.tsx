// import { Tabs, useSegments } from "expo-router";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { useEffect, useState } from "react";
// import Theme from "@/assets/theme"; // Use your custom theme if available

// export default function Layout() {
//   //   const segments = useSegments();
//   //   const [currentTab, setCurrentTab] = useState("feed");

//   // Update the active tab dynamically based on the route
//   //   useEffect(() => {
//   //     if (segments[0] === "profile" || segments[1] === "details") {
//   //       setCurrentTab("profile");
//   //     } else if (segments[0] === "feed") {
//   //       setCurrentTab("feed");
//   //     }
//   //   }, [segments]);

//   // return (
//   //   <Tabs
//   //   //   screenOptions={({ route }) => ({
//   //   //     tabBarStyle: {
//   //   //       backgroundColor: Theme.colors.backgroundPrimary || "#1c1c1e", // Dark background
//   //   //       borderTopWidth: 0, // Remove top border for a cleaner look
//   //   //     },
//   //   //     tabBarActiveTintColor: Theme.colors.iconHighlighted || "#ffa500", // Orange for active icons
//   //   //     tabBarInactiveTintColor: Theme.colors.textSecondary || "#ffffff", // White for inactive icons
//   //   //     tabBarLabelStyle: {
//   //   //       fontSize: 12, // Adjust text size
//   //   //     },
//   //   //     tabBarIconStyle: {
//   //   //       marginBottom: -4, // Adjust icon spacing
//   //   //     },
//   //   //     tabBarIcon: ({ size, color }) => {
//   //   //       let iconName;
//   //   //       if (route.name === "feed") {
//   //   //         iconName = "home";
//   //   //       } else if (route.name === "profile") {
//   //   //         iconName = "user";
//   //   //       }
//   //   //       return <FontAwesome size={size} name={iconName} color={color} />;
//   //   //     },
//   //   //   })}
//   //   >
//   //     <Tabs.Screen
//   //       name="/group/home"
//   //       options={{
//   //         title: "Home",
//   //         headerShown: false,
//   //       }}
//   //     />
//   //     <Tabs.Screen
//   //       name="group"
//   //       options={{
//   //         title: "Home",
//   //         headerShown: false,
//   //       }}
//   //     />
//   //     <Tabs.Screen
//   //       name="home"
//   //       options={{
//   //         title: "Home",
//   //         headerShown: false,
//   //       }} // is this supposed to be here
//   //     />
//   //   </Tabs>
//   // );
//   return (
//     <Tabs>
//       <Tabs.Screen
//         name="/group/home"
//         options={{
//           title: "Home",
//           headerShown: false,
//         }}
//       />
//       <Tabs.Screen
//         name="group"
//         options={{
//           title: "Group",
//           headerShown: false,
//         }}
//       />
//     </Tabs>
//   );
// }

import React from "react";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="group/home"
        options={{
          title: "Group Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="group"
        options={{
          title: "Group",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="reminder"
        options={{
          title: "Reminder",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
