import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { React, useEffect, useState } from "react";
import { db } from "../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { Chip } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export const LearnerHome = ({navigation}) => {
  const [tutors, setTutors] = useState([]);

  const navigation = useNavigation();

  const tutorsCollectionRef = collection(db, "Tutors");

  const getTutors = async (skill) => {
    if (!skill) {
      const data = await getDocs(tutorsCollectionRef);
      const myArr = [];
      data.forEach((doc) => {
        myArr.push(doc.data(), doc.id);
      });
      setTutors(myArr);
    }
    const testQuery = query(
      tutorsCollectionRef,
      where("skills", "array-contains", skill)
    );
    const data = await getDocs(testQuery);
    const myArr = [];
    data.forEach((doc) => {
      myArr.push(doc.data(), doc.id);
    });
    setTutors(myArr);
  };

  useEffect(() => {
    getTutors();
  }, []);

  return (
    <ScrollView>
      <Chip
        icon="information"
        style={styles.skillfilter}
        onPress={() => getTutors()}
      >
        All
      </Chip>
      <Chip
        icon="information"
        style={styles.skillfilter}
        onPress={() => getTutors("dancing")}
      >
        Dancing
      </Chip>
      <Chip
        icon="information"
        style={styles.skillfilter}
        onPress={() => getTutors("programming")}
      >
        Programming
      </Chip>
      <Chip
        icon="information"
        style={styles.skillfilter}
        onPress={() => getTutors("spanish")}
      >
        Spanish
      </Chip>
      <Chip
        icon="information"
        style={styles.skillfilter}
        onPress={() => getTutors("cooking")}
      >
        Cooking
      </Chip>
      {tutors.map((tutor) => {
        return (
          <View>
            <Image style={styles.tinyLogo} source={{ uri: tutor.image }} />
            <Text>{tutor.firstname}</Text>
            <Text>{tutor.skills}</Text>
            <Button
              title="view tutor"
              onPress={(e) => {
                e.preventDefault() && navigation.replace("SingleTutor");
              }}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 80,
    height: 80,
  },
  skillfilter: {
    width: 150,
  },
});
