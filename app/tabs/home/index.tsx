import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import db from "@/database/db";
import Theme from "@/assets/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import GroupCard from "@/components/GroupCard";
import homeTopImage from "../../../assets/images/hometop.png";
import momMain from "../../../assets/images/moms.png";
import momBack from "../../../assets/images/paloalto.png";
import nursesMain from "../../../assets/images/nurses.png";
import nursesBack from "../../../assets/images/hospital.png";
import lgbtqMain from "../../../assets/images/lgbtq.png";
import lgbtqBack from "../../../assets/images/pride.png";
import gymMain from "../../../assets/images/gymmain.png";
import gymBack from "../../../assets/images/gymback.png";
import partMain from "../../../assets/images/clock.png";
import partBack from "../../../assets/images/parttime.png";

import Feed from "@/components/Feed";

export default function Home() {
  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState("top");

  const CURRENT_USER_ID = "6bb59990-4f6b-4fd0-b475-64353b7e2abd";
  const router = useRouter();

  // Fetch the username when the component mounts
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const { data, error } = await db
          .from("users")
          .select("*")
          .eq("id", CURRENT_USER_ID)
          .single();

        if (error) {
          console.error("Error fetching username: ", error);
          return;
        }

        if (data) {
          setUsername(data.username);
        }
      } catch (error) {
        console.error("Error fetching username: ", error);
      }
    };

    fetchUsername();
  }, []);

  // Example data for group cards
  const groups = [
    {
      id: "1",
      title: "Palo Alto Moms",
      members: 50,
      mainPhoto: momMain,
      backgroundPhoto: momBack,
    },
    {
      id: "2",
      title: "Night Nurses",
      members: 82,
      mainPhoto: nursesMain,
      backgroundPhoto: nursesBack,
    },
    {
      id: "3",
      title: "Gym Rats",
      members: 143,
      mainPhoto: gymMain,
      backgroundPhoto: gymBack,
    },
    {
      id: "4",
      title: "LGBTQ+",
      members: 541,
      mainPhoto: lgbtqMain,
      backgroundPhoto: lgbtqBack,
    },
    {
      id: "5",
      title: "Part-Time",
      members: 96,
      mainPhoto: partMain,
      backgroundPhoto: partBack,
    },
  ];

  return (
    <FlatList
      style={{ backgroundColor: Theme.colors.White }}
      data={groups}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <>
          <Image source={homeTopImage} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.header}>Hello, {username || "User"}!</Text>
            <Text style={styles.statement}>
              Closer connections, no matter the hour.
            </Text>
          </View>

          {/* Search Box */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchBox}
              placeholder="Search"
              placeholderTextColor="#888"
            />
            <MaterialCommunityIcons
              name="magnify"
              size={18}
              color="white"
              style={styles.searchIcon}
            />
          </View>

          <Text style={styles.subHeader}>My Groups</Text>

          {/* Horizontal Scroll View for Group Cards */}
          <FlatList
            data={groups}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item: group }) => (
              <TouchableOpacity
                style={styles.cardWrapper}
                onPress={() => router.push(`/tabs/group/home?id=${group.id}`)}
              >
                <GroupCard
                  title={group.title}
                  members={group.members}
                  mainPhoto={group.mainPhoto}
                  backgroundPhoto={group.backgroundPhoto}
                />
              </TouchableOpacity>
            )}
          />
        </>
      }
      ListFooterComponent={
        <>
          <Text style={styles.subHeader}>Trending Posts</Text>
          <View style={styles.postContainer}>
            <Feed
              shouldNavigateToComments={true}
              topPosts={activeTab === "top"}
            />
          </View>
        </>
      }
      renderItem={null}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: 260,
    resizeMode: "cover",
  },
  textContainer: {
    paddingTop: 207,
    padding: 20,
  },
  header: {
    fontSize: 26,
    color: "#4747BA",
    fontWeight: "bold",
    fontFamily: "TestTiemposHeadline-Medium",
  },
  statement: {
    fontSize: 13,
    color: "#444",
    marginTop: 5,
  },
  subHeader: {
    fontSize: 15,
    padding: 20,
    fontWeight: "600",
    fontFamily: "TestTiemposHeadline-Medium",
    paddingBottom: 0,
    paddingTop: 0,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 17,
    marginBottom: 18,
  },
  searchBox: {
    flex: 1,
    height: 35,
    borderRadius: 20,
    paddingLeft: 15,
    backgroundColor: "#f0f0f0",
    fontSize: 16,
  },
  searchIcon: {
    position: "absolute",
    right: 3,
    backgroundColor: Theme.colors.PurpleMedium,
    borderRadius: 20,
    padding: 5,
  },
  scrollContainer: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 17,
  },
  cardWrapper: {
    marginRight: 7,
    width: 160,
  },
  postContainer: {
    width: "100%",
    padding: 20,
    paddingTop: 15,
  },
});
