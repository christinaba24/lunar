import { Stack, useRouter } from "expo-router";
import Theme from "@/assets/theme";
import { Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const HeaderText: React.FC<{
  title: string; // The title must be a string
  disabled?: boolean; // Optional boolean for the disabled state
  onPress?: () => void; // Optional function for the onPress handler
}> = ({ title, disabled = false, onPress }) => (
  <Pressable onPress={onPress}>
    <Text
      style={{
        fontSize: 17,
        color: Theme.colors.textBlack,
        opacity: disabled ? 0.5 : 1,
        paddingHorizontal: 16,
      }}
    >
      {title}
    </Text>
  </Pressable>
);

export default function FeedLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Theme.colors.White,
        },
        headerTintColor: Theme.colors.textBlack,
        headerTitleStyle: {
          color: Theme.colors.textBlack,
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "40%",
                justifyContent: "space-between",
              }}
            ></View>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="newpost"
        options={{
          presentation: "modal",
          headerStyle: {
            backgroundColor: Theme.colors.PurpleLight,
          },
          headerTitle: () => (
            <Text
              style={{
                color: Theme.colors.textBlack,
                fontSize: Theme.sizes.title2,
                fontWeight: "bold",
              }}
            >
              New Post
            </Text>
          ),
          headerLeft: () => (
            <HeaderText
              title="Cancel"
              disabled={false}
              onPress={() => router.back()}
            />
          ),
          headerRight: () => null,
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: "Comments",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
