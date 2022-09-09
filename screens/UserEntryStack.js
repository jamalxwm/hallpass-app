import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './UserEntryScreens/LoginScreen';
import CreateNameScreen from './UserEntryScreens/CreateNameScreen';
import { UserContext } from '../src/contexts/user';
import CreateUserSubjectScreen from './UserEntryScreens/CreateUserSubjectScreen';

const Stack = createNativeStackNavigator();

const UserEntryStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CreateName" component={CreateNameScreen} />
      <Stack.Screen name="CreateSubject" component={CreateUserSubjectScreen} />
    </Stack.Navigator>
  );
};

export default UserEntryStack;

const styles = StyleSheet.create({});
