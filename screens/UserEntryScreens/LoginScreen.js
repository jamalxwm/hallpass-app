import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../../firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../src/contexts/user';
import { typography, colors } from '../../styles/base';
import Poppins from '../../src/components/Poppins';



const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);


  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setLoggedInUser(uid);
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        navigation.navigate('UserEntry', {
          screen: 'CreateName',
        });
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        navigation.replace('Home');
      })
      .catch((error) => alert(error.message));
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>

        <TextInput
          placeholder="Email"
          value={email}
          keyboardType={'email-address'}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Poppins text={'Login'} style={{color: colors.primary[10]}} T16 S/> 
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    //fontFamily: 'Medium',
    color: '#152946',
    backgroundColor: '#F0F0FF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 32,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#524ffc',
    height: 48,
    width: 327,
    justifyContent: 'center',
    borderRadius: 32,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#524ffc',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    //fontFamily: 'semibold',
  },
  buttonOutlineText: {
    color: '#524ffc',
    fontWeight: '700',
    fontSize: 16,
    //fontFamily: 'semibold'
  },
});
