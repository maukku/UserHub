import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

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
});
const App = () => {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${search}`);
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={text => setSearch(text)}
        placeholder="Enter a GitHub username"
      />
      <Button title="Search" onPress={handleSearch} />
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
