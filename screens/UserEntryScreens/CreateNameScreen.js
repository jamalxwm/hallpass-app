import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../src/contexts/user';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../.firebase';



const CreateNameScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { loggedInUser } = useContext(UserContext);

  const navigation = useNavigation();

  const handleTutorReg = async () => {
    const docPath = doc(db, 'users', loggedInUser);
    await updateDoc(docPath, {
      name: { first: firstName, last: lastName },
      isTutor: true,
    }).then(navigation.navigate('CreateSubject'));
  };
  const handleLearnerReg = async () => {
    const docPath = doc(db, 'users', loggedInUser);
    await updateDoc(docPath, {
      name: { first: firstName, last: lastName },
      isLearner: true,
    }).then(navigation.navigate('CreateSubject'));
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Text>{loggedInUser}</Text>

        <TextInput
          placeholder="First name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleTutorReg} style={styles.button}>
          <Text style={styles.buttonText}>Tutor</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLearnerReg} style={[styles.button, styles.buttonOutlineText]}>
          <Text style={styles.buttonText}>Learner</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateNameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
});
