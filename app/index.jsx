import { Redirect } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [isUserVerified, setIsUserVerified] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      {isUserVerified ? <Redirect href={'/(tabs)/home'} /> : <Welcome />}
    </View>
  );
}
