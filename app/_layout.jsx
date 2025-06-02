import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {


   const [loaded] = useFonts({
    'regular': require('../assets/fonts/NotoSerifDivesAkuru-Regular.ttf'),
  });
  return(
     <GestureHandlerRootView >
    <SafeAreaView style={{ flex: 1}}>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
    <Toast />
    </SafeAreaView>
    </GestureHandlerRootView>
  );
}
