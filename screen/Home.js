import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import UserHubLogo from "../Components/UserHubLogo";
import { useNavigation } from "@react-navigation/native";

import { useState, useEffect } from "react";

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,

    marginBottom: 20,
    padding: 10,
  },
  button: {
    width: "80%",
  },
  userContainer: {
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    width: "80%",

    borderColor: "gray",
    padding: 20,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 5,
    padding: 5,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },

  error: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },
});

export default function Home() {
  const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [repos, setRepos] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${search}`);
      if (!response.ok) {
        let errorMessage = response.statusText;
        if (response.status === 404) {
          errorMessage = "User not found";
        }
        throw new Error(errorMessage);
      }
      const userData = await response.json();
      setUser(userData);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      const fetchRepos = async () => {
        try {
          const response = await fetch(
            `https://api.github.com/users/${user.login}/repos`
          );
          const repos = await response.json();
          setRepos(repos);
        } catch (error) {
          console.error(error);
        }
      };
      fetchRepos();
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <UserHubLogo />
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Enter a GitHub username"
      />
      <Button style={styles.button} title="Search" onPress={handleSearch} />
      {error && <Text style={styles.error}>{error}</Text>}
      {user && (
        <TouchableOpacity
          style={styles.userContainer}
          onPress={() => {
            navigation.navigate("Repositories", { repos, user });
          }}
        >
          <Text style={styles.userInfo}>Username: {user.login}</Text>
          <Text style={styles.userInfo}>Name: {user.name}</Text>
          <Text style={styles.userInfo}>Location: {user.location}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
