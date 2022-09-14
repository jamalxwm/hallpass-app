import { StyleSheet, Text, View, Image, TextInput, Button } from "react-native";
import { React, useEffect, useState } from "react";
import StarRating from "react-native-star-rating-widget";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Chip } from "react-native-paper";

const SingleTutor = ({
  route: {
    params: { tutor },
  },
  navigation,
}) => {
  const [rating, setRating] = useState(0);
  const [oldRating, setOldRating] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [arr, setArr] = useState([]);
  const [num, setNum] = useState(0);
  const [optimisticReview, setOptimisticReview] = useState([]);

  const reviews = tutor.tutorData.reviews;
  const tutorRef = doc(db, "Tutors", tutor.id);

  const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

  const getRating = async () => {
    const tutorData = await getDoc(tutorRef);
    if (oldRating.length >= 10) setOldRating([]);
    arr.push(tutorData.data().rating);
    setOldRating(arr);
    setNum(Math.round(average(oldRating) * 10) / 10);
  };

  useEffect(() => {
    getRating();
  }, []);

  const handleAddReview = () => {
    reviews.push(newReview);
    const reviewRef = doc(db, "Tutors", tutor.id);
    setDoc(reviewRef, { reviews: reviews }, { merge: true });
    setOptimisticReview((currReviews) => {
      return [...currReviews, newReview];
    });
    setNewReview("");
  };

  const handleSubmitRating = () => {
    const ratingRef = doc(db, "Tutors", tutor.id);
    setDoc(ratingRef, { rating: rating }, { merge: true });
    getRating();
  };

  return (
    <View style={styles.all}>
      <Image style={styles.tinyLogo} source={{ uri: tutor.tutorData.image }} />
      <Text>
        {tutor.tutorData.firstname} {tutor.tutorData.lastname}
      </Text>
      <Text>{tutor.tutorData.skills}</Text>
      {tutor.tutorData.inperson && <Text>in person</Text>}
      {tutor.tutorData.virtual && <Text>virtual</Text>}
      <Chip
        style={styles.map}
        icon="map-marker"
        onPress={() => {
          navigation.navigate("MapScreen");
        }}
      >
        Map
      </Chip>
      <Text>
        {tutor.tutorData.bio} {"\n"}
      </Text>
      <Text>{num || 0}</Text>
      <StarRating
        rating={rating}
        onChange={setRating}
        starSize={30}
      ></StarRating>
      <Button onPress={handleSubmitRating} title="submit" />

      <View>
        <TextInput
          value={newReview}
          onChangeText={(newReview) => {
            {
              setNewReview(newReview);
            }
          }}
          placeholder="add a review"
          style={{
            height: 45,
            width: 300,
            borderWidth: 1,
            padding: 10,
            margin: 5,
          }}
        />
        <Button onPress={() => handleAddReview()} title="submit" />
      </View>

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
  all: {
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    backgroundColor: "#f0eefd",
    height: 50,
    width: 80,
    marginTop: 5,
    marginRight: 5,
  },
});
