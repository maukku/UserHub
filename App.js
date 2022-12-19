import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import UserHubLogo from './Components/UserHubLogo';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  userContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 5,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});

const App = () => {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${search}`);
      if (!response.ok) {
        let errorMessage = response.statusText;
        if (response.status === 404) {
          errorMessage = 'User not found';
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
  

  return (
    <View style={styles.container}>
     <UserHubLogo></UserHubLogo>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={text => setSearch(text)}
        placeholder="Enter a GitHub username"
      />
      <Button title="Search" onPress={handleSearch} />
      {error && <Text style={styles.error}>Error: {error}</Text>}
      {user && (
        <View style={styles.userContainer}>
          <Text style={styles.userInfo}>Username: {user.login}</Text>
          <Text style={styles.userInfo}>Name: {user.name}</Text>
          <Text style={styles.userInfo}>Location: {user.location}</Text>
        </View>
      )}
    </View>
  );
};

export default App;
