import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
    </Stack>
  );
}
