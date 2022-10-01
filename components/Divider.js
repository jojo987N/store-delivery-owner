import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Divider() {
  return <View style={styles.divider}></View>;
}

const styles = StyleSheet.create({
  divider: {
    marginVertical: 20,
    borderBottomWidth: 0.3,
    marginHorizontal: 20,
    borderBottomColor: "grey",
  },
});
