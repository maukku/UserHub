import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
});

const UserHubLogo = () => (
  <View style={styles.container}>
    <Text style={styles.text}>UserHub</Text>
  </View>
);

export default UserHubLogo;
