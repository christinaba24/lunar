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

  const fetchPosts = async () => {
    try {
      setIsLoading(true);

      // Get current user's ID for filtering (use later for pinned posts)
      const {
        data: { user },
      } = await db.auth.getUser();

      let query = db
        .from("posts_with_counts")
        .select("*")
        .order("timestamp", { ascending: false });

      // If we're fetching only the user's posts, add a filter
      if (fetchUsersPostsOnly && user) {
        query = query.eq("user_id", user.id);
      }

      const { data: postsData, error: postsError } = await query;

      if (postsError) {
        console.error("Error fetching posts:", postsError.message);
        setPosts([]);
        return;
      }

      // If we have posts and a logged-in user, fetch their votes
      if (postsData.length > 0 && user) {
        const { data: votesData, error: votesError } = await db
          .from("likes")
          .select("post_id, vote")
          .eq("user_id", user.id);

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
      console.error("Unexpected error fetching posts:", err);
      setPosts([]);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleVote = async (postId, vote) => {
    try {
      setPosts((currentPosts) =>
        currentPosts.map((post) => {
          if (post.id === postId) {
            const oldVote = post.vote || 0;
            // Calculate the score difference
            const scoreDiff = newVote - oldVote;
            return {
              ...post,
              vote: newVote,
              like_count: post.like_count + scoreDiff,
            };
          }
          return post;
        })
      );
      const { error: deleteError } = await db
        .from("likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user.id);

      if (newVote !== 0) {
        const { error: insertError } = await db.from("likes").insert({
          post_id: postId,
          user_id: user.id,
          vote: newVote,
        });

        if (insertError) {
          console.error("Error inserting vote:", insertError);
          fetchPosts();
        }
      }

      if (deleteError) {
        console.error("Error deleting vote:", deleteError);
        fetchPosts();
      }
    } catch (err) {
      console.error("Error submitting vote:", err);
      fetchPosts();
    }
  };

  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  return (
    <FlatList
      data={posts}
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
          onPress={() => {
            if (onPostPress) {
              onPostPress(item); // Call the provided onPostPress handler
            }
          }}
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
  },
});
