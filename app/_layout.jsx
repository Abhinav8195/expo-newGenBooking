import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';


export default function RootLayout() {
  return(
    <SafeAreaView style={{ flex: 1}}>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
    <Toast />
    </SafeAreaView>
  );
}
