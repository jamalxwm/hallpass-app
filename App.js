import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/UserEntryScreens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import UserEntryStack from './screens/UserEntryStack';
import { UserContext } from './src/contexts/user';
import { useState } from 'react';
import SingleTutor from './screens/SingleTutor';
import { LearnerHome } from './screens/LearnerHome';
import MapScreen from './screens/MapScreen';
import {
  useFonts,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_300Light,
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState([]);

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_300Light
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            name="UserEntry"
            options={{ headerShown: false }}
            component={UserEntryStack}
          />
          <Stack.Screen name="Home" component={LearnerHome} />
          <Stack.Screen name="SingleTutor" component={SingleTutor} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
