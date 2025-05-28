import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { LogBox, Text, View } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [isUserVerified, setIsUserVerified] = useState(true);


    useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isUserVerified ? <Redirect href={'/(tabs)/home'} /> : <Welcome />}
    </View>
  );
}
