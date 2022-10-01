import { View, Text, StyleSheet } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <LottieView
        style={{
          height: 200,
          alignSelf: "center",
          width: 200,
        }}
        source={require("../assets/animations/waiting.json")}
        autoPlay
        speed={2}
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});
