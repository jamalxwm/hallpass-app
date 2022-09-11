import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";

const SingleTutor = ({
  route: {
    params: {
      tutor: { tutorData },
    },
  },
}) => {
  const reviews = tutorData.reviews;

  return (
    <View>
      <Image style={styles.tinyLogo} source={{ uri: tutorData.image }} />
      <Text>
        {tutorData.firstname} {tutorData.lastname}
      </Text>
      <Text>{tutorData.skills}</Text>
      {tutorData.inperson && <Text>in person</Text>}
      {tutorData.virtual && <Text>virtual</Text>}
      <Text>{tutorData.bio}</Text>

      {reviews && <Text>Reviews:</Text>}
      {reviews &&
        reviews.map((review) => {
          return <Text key={review}>{review}</Text>;
        })}
    </View>
  );
};

export default SingleTutor;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 200,
    height: 200,
  },
});
