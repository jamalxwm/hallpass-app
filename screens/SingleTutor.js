import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SingleTutor = ({
  route: {
    params: {
      tutor: { tutorData },
    },
  },
}) => {
  console.log(tutorData);
  return (
    <View>
      <Text>SingleTutor</Text>
    </View>
  );
};

export default SingleTutor;

const styles = StyleSheet.create({});
