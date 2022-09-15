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
import { colors } from '../../styles/base';
import Logo from '../../src/components/Logo';
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
      <View style={styles.logoContainer}>
        <Logo height={91} width={85} />
        <View>
          <Poppins
            text={'Login. Learn anything.'}
            style={{ color: colors.primary[100], marginTop: 10 }}
            T24
            B
          />
        </View>
      </View>

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
          <Poppins text={'Login'} style={{ color: '#FFFFFF' }} T16 S />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Poppins
            text={'Register'}
            style={{ color: colors.primary[100] }}
            T16
            S
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    flex: 0.5,
    marginBottom: 10,
  },
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
    fontFamily: 'Poppins_500Medium',
    color: colors.neutral[100],
    backgroundColor: colors.primary[10],
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 32,
    marginTop: 5,
    height: 48,
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
  },
  buttonOutlineText: {
    color: '#524ffc',
    fontWeight: '700',
    fontSize: 16,
  },
});
