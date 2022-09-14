import { StyleSheet, Text, View, Image, TextInput, Button } from "react-native";
import { React, useState } from "react";
import StarRating from "react-native-star-rating-widget";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const SingleTutor = ({
  route: {
    params: { tutor },
  },
}) => {
  const [rating, setRating] = useState(0);
  //const [reviews, setReviews]= useState([])
  const [newReview, setNewReview] = useState("");

  const reviews = tutor.tutorData.reviews;

  const handleAddReview = () => {
    reviews.push(newReview);
    const reviewRef = doc(db, "Tutors", tutor.id);
    setDoc(reviewRef, { reviews: reviews }, { merge: true });
  };

  const handleSubmitRating = () => {
    const ratingRef = doc(db, "Tutors", tutor.id);
    setDoc(ratingRef, { rating: rating }, { merge: true });
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
      <Text>
        {tutor.tutorData.bio} {"\n"}
      </Text>
      <Text>{tutor.tutorData.rating}</Text>
      <StarRating
        rating={rating}
        onChange={setRating}
        starSize={30}
      ></StarRating>
      <Button onPress={() => handleSubmitRating()} title="submit" />

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
});
