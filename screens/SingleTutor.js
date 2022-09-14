import { StyleSheet, Text, View, Image, TextInput, Button } from "react-native";
import { React, useEffect, useState } from "react";
import StarRating from "react-native-star-rating-widget";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const SingleTutor = ({
  route: {
    params: { tutor },
  },
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
      <View style={styles.header}>
        <Image
          style={styles.tinyLogo}
          source={{ uri: tutor.tutorData.image }}
        />
        <Text style={styles.tutorName}>
          {tutor.tutorData.firstname} {tutor.tutorData.lastname}
        </Text>
      </View>
      <Text style={styles.tutorSkill}>{tutor.tutorData.skills}</Text>
      {tutor.tutorData.inperson && (
        <Text style={styles.tutorLesson}>in person</Text>
      )}
      {tutor.tutorData.virtual && (
        <Text style={styles.tutorLesson}>virtual</Text>
      )}

      <Text style={styles.tutorBio}>
        {tutor.tutorData.bio} {"\n"}
      </Text>
      <View style={styles.starRating}>
        <Text style={styles.starRating}>{num || 0}</Text>
        <StarRating
          rating={rating}
          onChange={setRating}
          starSize={40}
        ></StarRating>
        <Button onPress={handleSubmitRating} title="submit" />
      </View>
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
    width: 180,
    height: 180,
    borderRadius: 100,
    borderColor: "#5F5CF0",
    borderWidth: 2,
  },
  header: {
    flexDirection: "row",
  },

  tutorName: {
    fontWeight: "bold",
    fontSize: "25",
    paddingTop: 30,
    paddingBottom: 10,
    color: "#5F5CF0",
  },
  tutorSkill: {
    fontSize: "20",
    fontWeight: "bold",
    textAlign: "auto",
  },
  tutorLesson: {
    fontSize: "17",
    fontStyle: "italic",
    paddingBottom: 15,
  },
  tutorBio: {
    borderColor: "#7875FC",
    borderWidth: 2,
    paddingTop: 20,
    fontSize: 15,
    borderRadius: 20,
  },
  starRating: {
    fontSize: 35,
    paddingTop: 25,
    alignItems: "center",
  },
  all: {
    justifyContent: "center",
    alignItems: "center",
  },
});
