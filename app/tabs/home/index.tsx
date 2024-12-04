import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import db from "@/database/db";
import homeTopImage from "../../../assets/images/hometop.png";
import Theme from "@/assets/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Home() {
  const [username, setUsername] = useState("");

  const CURRENT_USER_ID = "6bb59990-4f6b-4fd0-b475-64353b7e2abd";

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

  return (
    <View style={styles.container}>
      <Image source={homeTopImage} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.header}>Hello, {username || "Jane"}!</Text>
        <Text style={styles.subHeader}>Closer connections, no matter the hour.</Text>
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
      
      <Link href="/tabs/group/home?id=someValue" style={styles.button}>
        <Text style={styles.buttonText}>Go to Group Screen</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
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
  subHeader: {
    fontSize: 13,
    color: "#444",
    marginTop: 5,
  },
  button: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 20,
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
});
