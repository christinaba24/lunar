import { useState, useEffect } from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";
import db from "@/database/db";
import Theme from "@/assets/theme";
import Post from "@/components/Post";
import Loading from "@/components/Loading";
import timeAgo from "@/utils/timeAgo";

export default function GroupFeed({
  shouldNavigateToComments = false,
  onPostPress, // determine nav behavior
}) {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // const fetchPosts = async () => {
  //     try {
  //         setIsLoading(true);

  //     }
  // }
}
