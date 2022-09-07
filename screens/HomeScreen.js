import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, doc, getDocs } from 'firebase/firestore';
db;

const HomeScreen = () => {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, 'users');

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);
  const navigation = useNavigation();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigation.replace('Login'))
      .catch((error) => alert(error.message));
  };
  return (
    <View style={styles.container}>
      {users.map((user) => {
        return (
          <View>
            <Text>{user.first_name}</Text>
          </View>
        );
      })}
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
