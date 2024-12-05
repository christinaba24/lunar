import { useState, useEffect } from "react";
import { StyleSheet, FlatList, RefreshControl, Text } from "react-native";
import db from "@/database/db";
import Theme from "@/assets/theme";
import Post from "@/components/Post";
import Loading from "@/components/Loading";
import timeAgo from "@/utils/timeAgo";

export default function GroupFeed({
  shouldNavigateToComments = false,
  topPosts = false, // Determines whether to fetch top or new posts
}) {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const user_id = "6bb59990-4f6b-4fd0-b475-64353b7e2abd";

  // Fetch posts whenever `topPosts` changes
  useEffect(() => {
    fetchPosts();
  }, [topPosts]); // Add `topPosts` as a dependency

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      let query = await db
        .from("posts_with_counts")
        .select("*")
        .order("timestamp", { ascending: false });

      if (topPosts) {
        // Fetch top posts (sorted by like_count)
        query = db
          .from("posts_with_counts")
          .select("*")
          .order("like_count", { ascending: false });
      }

      const { data: postsData, error: postsError } = await query;

      if (postsError) {
        console.error("Error fetching posts:", postsError.message);
        setPosts([]);
        return;
      }

      if (postsData.length > 0) {
        const { data: votesData, error: votesError } = await db
          .from("likes")
          .select("post_id, vote")
          .eq("user_id", user_id);

        if (votesError) {
          console.error("Error fetching votes:", votesError.message);
        } else {
          const votesMap = Object.fromEntries(
            votesData.map((vote) => [vote.post_id, vote.vote])
          );

          const postsWithVotes = postsData.map((post) => ({
            ...post,
            vote: votesMap[post.id] || 0,
          }));

          setPosts(postsWithVotes);
          return;
        }
      }

      setPosts(postsData);
    } catch (error) {
      console.error("Unexpected error in fetchPosts:", error);
      setError(`Unexpected error: ${error.message}`);
      setPosts([]);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleVote = async (postId) => {
    try {
      setPosts((currentPosts) =>
        currentPosts.map((post) => {
          if (post.id === postId) {
            if (post.vote === 1) {
              post.vote -= 1;
              post.like_count -= 1;
              return post;
            }
            return {
              ...post,
              vote: 1,
              like_count: post.like_count + 1,
            };
          }
          return post;
        })
      );

      const { error: deleteError } = await db
        .from("likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user_id);

      const { error: insertError } = await db.from("likes").insert({
        post_id: postId,
        user_id: user_id,
      });

      if (deleteError || insertError) {
        console.error("Error updating vote:", deleteError || insertError);
        fetchPosts(); // Refresh in case of error
      }
    } catch (err) {
      console.error("Error liking post:", err);
      fetchPosts(); // Refresh in case of error
    }
  };

  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <FlatList
      data={posts || []}
      renderItem={({ item }) => (
        <Post
          shouldNavigateOnPress={shouldNavigateToComments}
          id={item.id}
          username={item.username}
          timestamp={timeAgo(item.timestamp)}
          text={item.text}
          score={item.like_count}
          vote={item.vote}
          commentCount={item.comment_count}
          onVote={handleVote}
          user_id={item.user_id}
        />
      )}
      contentContainerStyle={styles.posts}
      style={styles.postsContainer}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
            fetchPosts();
          }}
          tintColor={Theme.colors.textPrimary}
        />
      }
      ListEmptyComponent={<Text style={styles.emptyText}>No posts found</Text>}
    />
  );
}

const styles = StyleSheet.create({
  postsContainer: {
    width: "100%",
    gap: 10,
  },
  posts: {
    gap: 10,
    padding: 10,
  },
  errorText: {
    color: "red",
    padding: 20,
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    padding: 20,
    color: Theme.colors.textSecondary,
  },
});
