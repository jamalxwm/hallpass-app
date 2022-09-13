import { StyleSheet, Dimensions } from 'react-native';
import {
  useFonts,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_300Light,
} from '@expo-google-fonts/poppins';
import * as Font from 'expo-font';


export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
};

export const colors = StyleSheet.create({
  primary: {
    100: '#524ffc',
    80: '#7875fc',
    60: '#9e9cfd',
    40: '#c3c2fe',
    20: '#e9e9ff',
    10: '#f0f0ff',
  },
  secondary: {
    100: '#4285fa',
    80: '#689efb',
    60: '#8eb6fc',
    40: '#b5cffd',
    20: '#dbe8fe',
    10: '#eef4ff',
  },
  tertiary: {
    100: '#f89f93',
    80: '#8de2ef',
    70: '#4f5a80',
    60: '#6bb6fb',
  },
  neutral: {
    1: '#152946',
    2: '#43536b',
    3: '#727e90',
    4: '#a1a9b5',
    5: '#b8bec7',
    10: '#CDD2D8',
  },
});

