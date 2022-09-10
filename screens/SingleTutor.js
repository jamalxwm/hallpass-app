import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const SingleTutor = ({
  route: {
    params: { tutor:{tutorData} },
  },
}) => {
  console.log(tutorData);
  return (
    <View>
      <Text>SingleTutor</Text>
      <Image source={{ uri: tutor.tutorData.image }} />
    </View>
  );
};

export default SingleTutor;

const styles = StyleSheet.create({});
