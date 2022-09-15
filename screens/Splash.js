import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import SplashLogo from '../src/components/SplashLogo';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Splash() {
  const [appIsReady, setAppIsReady] = useState(false);

  let customFonts = {
    'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'poppins-semibold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'poppins-medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'poppins-regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'poppins-light': require('../assets/fonts/Poppins-Light.ttf'),
  };

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(customFonts);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);
  const navigation = useNavigation();

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      navigation.replace('Splash Animation', (options = { animation: 'none' }));
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#524ffc',
      }}
      onLayout={onLayoutRootView}
    >
      <SplashLogo />
      <StatusBar hidden="true" />
    </View>
  );
}
