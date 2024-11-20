import { useState, useEffect } from "react";
import { StyleSheet, FlatList, RefreshControl, Text } from "react-native";
import db from "@/database/db";
import Theme from "@/assets/theme";
import Post from "@/components/Post";
import Loading from "@/components/Loading";
import timeAgo from "@/utils/timeAgo";

export default function GroupFeed({ shouldNavigateToComments = false }) {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const user_id = "6bb59990-4f6b-4fd0-b475-64353b7e2abd";

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get current user's ID for filtering (use later for pinned posts)
      //   const {
      //     data: { user },
      //   } = await db.auth.getUser();

      let query = db
        .from("posts_with_counts")
        .select("*")
        .order("timestamp", { ascending: false });

      const { data: postsData, error: postsError } = await query;

      if (postsError) {
        console.error("Error fetching posts:", postsError.message);
        setPosts([]);
        return;
      }

      // If we have posts and a logged-in user, fetch their votes
      if (postsData.length > 0) {
        const { data: votesData, error: votesError } = await db
          .from("likes")
          .select("post_id, vote")
          .eq("user_id", user_id);

        if (votesError) {
          console.error("Error fetching votes:", votesError.message);
        } else {
          // Create a map of post_id to vote value
          const votesMap = Object.fromEntries(
            votesData.map((vote) => [vote.post_id, vote.vote])
          );

          // Merge the votes into the posts data
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

  // Simplified handleVote that just updates the UI without making DB changes
  const handleVote = async (postId) => {
    try {
      // Optimistically update the UI
      setPosts((currentPosts) =>
        currentPosts.map((post) => {
          if (post.id === postId) {
            // Check if the user has already liked the post
            if (post.vote === 1) {
              post.vote -= 1; // Mark as unliked

              post.like_count -= 1; // Decrement like count
              return post; // If already liked, return as is
            }

            return {
              ...post,
              vote: 1, // Mark as liked
              like_count: post.like_count + 1, // Increment like count
            };
          }
          return post;
        })
      );

      // Ensure no duplicate likes exist in the database
      const { error: deleteError } = await db
        .from("likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user_id);

      // Add the new like
      const { error: insertError } = await db.from("likes").insert({
        post_id: postId,
        user_id: user_id,
      });

      if (deleteError) {
        console.error("Error deleting previous like:", deleteError);
        fetchPosts(); // Refresh posts in case of error
      }

      if (insertError) {
        console.error("Error inserting like:", insertError);
        fetchPosts(); // Refresh posts in case of error
      }
    } catch (err) {
      console.error("Error liking post:", err);
      fetchPosts(); // Refresh posts in case of error
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
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.White,
  },
  postsContainer: {
    width: "100%",
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
