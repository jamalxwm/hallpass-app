import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';

const Poppins = ({
  T30,
  T24,
  T20,
  T16,
  T12,
  B,
  S,
  M,
  R,
  L,
  text,
  style,
  ...rest
}) => {
  const [fontsLoaded] = useFonts({
    'poppins-bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'poppins-semibold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'poppins-medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'poppins-regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'poppins-light': require('../../assets/fonts/Poppins-Light.ttf'),
  });
  return (
    <Text
      style={[
        T30 && { fontSize: 30, lineHeight: 42 },
        T24 && { fontSize: 24, lineHeight: 32 },
        T20 && { fontSize: 20, lineHeight: 30 },
        T16 && { fontSize: 16, lineHeight: 24 },
        T12 && { fontSize: 12, lineHeight: 22 },
        B && { fontFamily: 'poppins-bold' },
        S && { fontFamily: 'poppins-semibold' },
        M && { fontFamily: 'poppins-medium' },
        R && { fontFamily: 'poppins-regular' },
        L && { fontFamily: 'poppins-light' },
        style,
      ]}
      {...rest}
    >
      {text}
    </Text>
  );
};

export default Poppins;

const styles = StyleSheet.create({});
