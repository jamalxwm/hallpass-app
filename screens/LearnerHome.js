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
import { Chip, Card, Title } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export const LearnerHome = ({ navigation }) => {
  const [tutors, setTutors] = useState([]);

  const tutorsCollectionRef = collection(db, "Tutors");

  const getAllTutors = async () => {
    const data = await getDocs(tutorsCollectionRef);
    const myArr = [];
    data.forEach((doc) => {
      myArr.push(doc.data());
    });
    setTutors(myArr);
  };

  const getTutors = async (skill) => {
    const testQuery = query(
      tutorsCollectionRef,
      where("skills", "array-contains", skill)
    );
    const data = await getDocs(testQuery);
    const myArr = [];
    data.forEach((doc) => {
      myArr.push(doc.data());
    });
    setTutors(myArr);
  };

  useEffect(() => {
    getAllTutors();
  }, []);

  return (
    <ScrollView>
      <Chip
        icon="information"
        style={styles.skillfilter}
        onPress={() => getAllTutors()}
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
          <Card>
            <Card.Cover style={styles.tinyLogo} source={{ uri: tutor.image }} />
            <Card.Content>
              <Title>{tutor.firstname}</Title>
              <Text>{tutor.skills}</Text>
            </Card.Content>
            <Chip
              onPress={() => {
                navigation.navigate("SingleTutor");
              }}
            />
          </Card>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
