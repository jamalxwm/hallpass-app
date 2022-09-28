import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { React, useEffect, useState } from 'react';
import StarRating from 'react-native-star-rating-widget';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../.firebase';
import { Chip } from 'react-native-paper';
import Poppins from '../src/components/Poppins';
import { colors } from '../styles/base';
import { SafeAreaView } from 'react-native-safe-area-context';

const SingleTutor = ({
  route: {
    params: { tutor },
  },
  navigation,
}) => {
  const [rating, setRating] = useState(0);
  const [oldRating, setOldRating] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [arr, setArr] = useState([]);
  const [num, setNum] = useState(0);
  const [optimisticReview, setOptimisticReview] = useState([]);

  const reviews = tutor.tutorData.reviews;
  const tutorRef = doc(db, 'Tutors', tutor.id);

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
    const reviewRef = doc(db, 'Tutors', tutor.id);
    setDoc(reviewRef, { reviews: reviews }, { merge: true });
    setOptimisticReview((currReviews) => {
      return [...currReviews, newReview];
    });
    setNewReview('');
  };

  const handleSubmitRating = () => {
    const ratingRef = doc(db, 'Tutors', tutor.id);
    setDoc(ratingRef, { rating: rating }, { merge: true });
    getRating();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.all}>
          <View style={styles.topPage}>
            <Image
              style={styles.tinyLogo}
              source={{ uri: tutor.tutorData.image }}
            />
            <View style={styles.rightSide}>
              <Poppins
                text={[
                  tutor.tutorData.firstname,
                  ' ',
                  tutor.tutorData.lastname,
                ]}
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
                    text={[tutor.tutorData.inperson] && ['in person']}
                    style={styles.tutorLesson}
                    T12
                    M
                  />
                </Chip>
                <Chip
                  icon="laptop"
                  style={styles.lessonType}
                  onPress={() =>
                    navigation.navigate(
                      'Video Chat',
                      (options = {
                        title: tutor.tutorData.firstname,
                        headerStyle: {
                          backgroundColor: '#6869A6',
                        },
                      })
                    )
                  }
                >
                  <Poppins
                    text={[tutor.tutorData.virtual] && ['virtual']}
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
              <Poppins text={'View my work'} />
            </Chip>
            <Chip
              style={styles.messageButton}
              icon="map-marker"
              onPress={() => {
                navigation.navigate('MapScreen');
              }}
            >
              Map
            </Chip>
            <Chip
              icon="message"
              style={styles.messageButton}
              onPress={() => navigation.navigate('ChatScreen')}
            >
              <Poppins text={'Book'} />
            </Chip>
          </View>

          <Poppins text={[tutor.tutorData.bio]} style={styles.tutorBio} T14 R />

          <View
            style={{
              borderBottomColor: '#8071b5',
              marginBottom: 20,
              marginTop: 10,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />

          <View style={styles.starRating}>
            <Text style={styles.starRating}>{num || 0}</Text>
            <StarRating
              style={styles.starinput}
              rating={rating}
              onChange={setRating}
              starSize={40}
            ></StarRating>

            <TouchableOpacity onPress={handleSubmitRating} title="submit">
              <Poppins text="Submit" style={styles.submit2} T20 S />
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
              <Poppins text="Submit" style={styles.submit} T20 S />
            </TouchableOpacity>
          </View>
          {reviews && (
            <Poppins text="Reviews" style={styles.reviewHead} T20 S />
          )}
          {reviews &&
            reviews.map((review) => {
              return (
                <View style={styles.review}>
                  <Poppins key={review} text={[review]} />
                  <View style={styles.datestar}>
                    <Poppins style={styles.date} text={['16 September 2022']} />
                    <Chip style={styles.star} icon="star">
                      {Math.round(num) || 3}
                    </Chip>
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleTutor;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 160,
    height: 160,
    borderRadius: 15,
    flexDirection: 'column',
    marginTop: 15,
  },
  rightSide: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
  },
  topPage: {
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 10,
    marginTop: 10,
  },
  tutorName: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 20,
    lineHeight: 30,
  },
  tutorSkill: {
    fontSize: 16,
    textAlign: 'auto',
    color: 'grey',
    marginBottom: 35,
  },
  tutorLesson: {
    fontSize: 13,
  },
  lessonType: {
    marginTop: 5,
    width: 110,
    backgroundColor: '#f3f3f3',
  },
  viewMapBook: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
  },
  tutorBio: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 15,
  },
  starRating: {
    fontSize: 30,
    alignItems: 'center',
  },
  starinput: {
    marginLeft: 90,
  },
  reviewHead: {
    marginLeft: 20,
    fontSize: 16,
  },
  review: {
    display: 'flex',
    backgroundColor: 'white',
    marginLeft: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 20,
    width: 395,
    shadowColor: 'rgba(14, 14, 14, 0.12)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 32,
    elevation: 32,
  },
  star: {
    height: 40,
    width: 50,
    backgroundColor: colors.primary[10],
  },
  datestar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    marginTop: 19,
    color: 'grey',
  },
  messageButton: {
    height: 30,
    backgroundColor: colors.primary[10],
    height: 50,
  },
  textinput: {
    marginLeft: 15,
    width: 400,
    height: 40,
    borderRadius: 15,
    padding: 22,
    borderColor: '#8071b5',
    borderWidth: 1.5,
    backgroundColor: colors.primary[10],
  },
  submit: {
    marginTop: 10,
    marginLeft: 185,
    fontSize: 16,
    color: 'grey',
  },
  submit2: {
    marginTop: 10,
    fontSize: 16,
    color: 'grey',
    marginBottom: 20,
  },
});
