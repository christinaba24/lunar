import { useState, useEffect } from "react";
import { StyleSheet, FlatList, Text, RefreshControl } from "react-native";
import db from "@/database/db";
import Theme from "@/assets/theme";
import Post from "@/components/Post";
import Loading from "@/components/Loading";
import timeAgo from "@/utils/timeAgo";

export default function CollectionPostsFeed({ userId, collectionId }) {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCollectionPosts();
  }, [userId, collectionId]);

  const fetchCollectionPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get saved posts for this specific collection, ordered by most recent pins first
      const { data: savedPosts, error: savedPostsError } = await db
        .from("saved_posts")
        .select("post_id, timestamp")
        .eq("user_id", userId)
        .eq("collection_id", collectionId)
        .order("timestamp", { ascending: false });

      if (savedPostsError) throw savedPostsError;

      if (savedPosts.length === 0) {
        setPosts([]);
        return;
      }

      const postIds = savedPosts.map(post => post.post_id);

      // Fetch full post data for saved posts
      const { data: postsData, error: postsError } = await db
        .from("posts_with_counts")
        .select("*")
        .in("id", postIds);

      if (postsError) throw postsError;

      // Get user's votes for these posts
      const { data: votesData, error: votesError } = await db
        .from("likes")
        .select("post_id, vote")
        .eq("user_id", userId)
        .in("post_id", postIds);

      if (votesError) throw votesError;

      // Create maps for votes and pin timestamps
      const votesMap = Object.fromEntries(
        votesData.map(vote => [vote.post_id, vote.vote])
      );
      const pinTimestampMap = Object.fromEntries(
        savedPosts.map(post => [post.post_id, post.timestamp])
      );

      // Combine post data with votes and sort by pin timestamp
      const postsWithVotes = postsData
        .map(post => ({
          ...post,
          vote: votesMap[post.id] || 0,
          pinTimestamp: pinTimestampMap[post.id]
        }))
        .sort((a, b) => {
          // Sort by pin timestamp (most recent first)
          return new Date(b.pinTimestamp) - new Date(a.pinTimestamp);
        });

      setPosts(postsWithVotes);
    } catch (err) {
      console.error("Error fetching collection posts:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleVote = async (postId, newVote) => {
    try {
      setPosts(currentPosts =>
        currentPosts.map(post => {
          if (post.id === postId) {
            const voteChange = newVote - (post.vote || 0);
            return {
              ...post,
              vote: newVote,
              like_count: post.like_count + voteChange
            };
          }
          return post;
        })
      );

      if (newVote === 0) {
        await db
          .from("likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", userId);
      } else {
        await db
          .from("likes")
          .upsert({
            post_id: postId,
            user_id: userId,
            vote: newVote
          });
      }
    } catch (err) {
      console.error("Error updating vote:", err);
      fetchCollectionPosts(); // Refresh on error
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
          shouldNavigateOnPress={true}
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
            fetchCollectionPosts();
          }}
          tintColor={Theme.colors.textPrimary}
        />
      }
      ListEmptyComponent={
        <Text style={styles.emptyText}>No posts in this collection yet</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  postsContainer: {
    width: "100%"
  },
  posts: {
    gap: 10,
    padding: 10
  },
  errorText: {
    color: "red",
    padding: 20,
    textAlign: "center"
  },
  emptyText: {
    textAlign: "center",
    padding: 20,
    color: Theme.colors.textSecondary
  }
});