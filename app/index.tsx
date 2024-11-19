import { Text, View, Image } from "react-native";
// import MoonLogo1 from "@/icons/moonlogo1.svg";
import moonlogo1 from "../assets/icons/moonlogo1.png";
import { Header } from "react-native/Libraries/NewAppScreen";
import GroupHeader from "@/components/GroupHeader";
import GroupFeed from "@/components/Feed";
import React from "react";

export default function Index() {
  // const handlePostPress = (post) => {
  //   console.log("Post pressed", post);
  // };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Text>Lunar test</Text> */}
      {/* <Header /> */}
      <GroupHeader />
      <GroupFeed shouldNavigateToComments={true} />
      <Image source={moonlogo1} />
    </View>
  );
}
