import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  list: {
    width: "100%",
  },
  title: {
    fontSize: 30,
    padding:20
  },
  repoName: {
    fontSize: 18,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#42daf5",
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderStyle: "solid",
  },
});

const Repositories = ({ route }) => {
  const { repos, user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.login}'s repositories</Text>
      <ScrollView style={styles.list}>
        {repos.map((repo) => (
          <Text style={styles.repoName} key={repo.id}>
            {repo.name}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default Repositories;
