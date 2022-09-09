import { StyleSheet, Text, View, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const CreateUserSubjectScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View>
      <Text>{location}</Text>
    </View>
  );
};

export default CreateUserSubjectScreen;

const styles = StyleSheet.create({});
