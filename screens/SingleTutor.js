import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { React, useEffect, useState } from "react";
import StarRating from "react-native-star-rating-widget";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Chip } from "react-native-paper";
import Poppins from "../src/components/Poppins";
import { colors } from "../styles/base";

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
    <ScrollView>
      <View style={styles.all}>
        <View style={styles.topPage}>
          <Image
            style={styles.tinyLogo}
            source={{ uri: tutor.tutorData.image }}
          />
          <View style={styles.rightSide}>
            <Poppins
              text={[tutor.tutorData.firstname, " ", tutor.tutorData.lastname]}
              style={styles.tutorName}
              T20
              S
            />
            <Poppins
              text={[tutor.tutorData.skills]}
              style={styles.tutorSkill}
              T14
              R
            />
            <TouchableOpacity>
              <Chip icon="account" style={styles.lessonType}>
                <Poppins
                  text={[tutor.tutorData.inperson] && ["in person"]}
                  style={styles.tutorLesson}
                  T12
                  M
                />
              </Chip>
              <Chip icon="laptop" style={styles.lessonType}>
                <Poppins
                  text={[tutor.tutorData.virtual] && ["virtual"]}
                  style={styles.tutorLesson}
                  T12
                  M
                />
              </Chip>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.viewMapBook}>
          <Chip
            icon="play-box"
            style={styles.messageButton}
            onPress={() => Linking.openURL(tutor.tutorData.links)}
          >
            <Poppins text={"View my work"} />
          </Chip>
          <Chip
            style={styles.messageButton}
            icon="map-marker"
            onPress={() => {
              navigation.navigate("MapScreen");
            }}
          >
            Map
          </Chip>
          <Chip icon="message" style={styles.messageButton}>
            <Poppins text={"Book"} />
          </Chip>
        </View>

        <Poppins text={[tutor.tutorData.bio]} style={styles.tutorBio} T14 R />

        <View style={styles.starRating}>
          <Text style={styles.starRating}>{num || 0}</Text>
          <StarRating
            rating={rating}
            onChange={setRating}
            starSize={40}
          ></StarRating>

          <TouchableOpacity onPress={handleSubmitRating} title="submit">
            <Poppins text="Submit" style={styles.tutorSkill} T20 S />
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            style={styles.textinput}
            value={newReview}
            onChangeText={(newReview) => {
              {
                setNewReview(newReview);
              }
            }}
            placeholder="add a review"
          />
          <TouchableOpacity onPress={() => handleAddReview()} title="submit">
            <Poppins text="Submit" style={styles.tutorSkill} T20 S />
          </TouchableOpacity>
        </View>
        {reviews && <Poppins text="Reviews" style={styles.reviewHead} T20 S />}
        {reviews &&
          reviews.map((review) => {
            return (
              <View style={styles.review}>
                <Poppins key={review} text={[review]} />
                <View style={styles.datestar}>
                  <Poppins style={styles.date} text={["16 September 2022"]} />
                  <Chip style={styles.star} icon="star">
                    {Math.round(num) || 3}
                  </Chip>
                </View>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
};

export default SingleTutor;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 15,
    flexDirection: "column",
    marginTop: 15,
  },
  rightSide: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
  },
  topPage: {
    flexDirection: "row",
    marginBottom: 20,
    marginLeft: 10,
  },
  tutorName: {
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 20,
    lineHeight: 30,
  },
  tutorSkill: {
    fontSize: 16,
    textAlign: "auto",
    color: "grey",
    marginBottom: 15,
  },
  tutorLesson: {
    fontSize: 13,
  },
  lessonType: {
    marginTop: 5,
    width: 110,
    backgroundColor: "#f3f3f3",
  },
  viewMapBook: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
  },
  tutorBio: {
    fontSize: 16,
    margin: 7.8,
    marginTop: 20,
  },
  starRating: {
    fontSize: 30,
    alignItems: "center",
  },
  reviewHead: {
    marginLeft: 15,
    fontSize: 16,
  },
  review: {
    display: "flex",
    backgroundColor: "white",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 20,
    width: 340,
    shadowColor: "#757575",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 2.2,
    shadowRadius: 3,
    elevation: 5,
  },
  star: {
    height: 40,
    width: 50,
    backgroundColor: colors.primary[10],
  },
  datestar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    marginTop: 19,
    color: "grey",
  },
  messageButton: {
    height: 30,
    backgroundColor: colors.primary[10],
    height: 40,
  },
  textinput: {
    height: 34,
    width: 300,
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    marginLeft: 15,
    borderColor: "gray",
  },
});
