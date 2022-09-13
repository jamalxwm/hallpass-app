import { StyleSheet, Text, ScrollView, View, Button } from "react-native";
import { React, useEffect, useState } from "react";
import { db } from "../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { Chip, Card, Title } from "react-native-paper";

export const LearnerHome = ({ navigation }) => {
  const [tutors, setTutors] = useState([]);

  const tutorsCollectionRef = collection(db, "Tutors");

  const getAllTutors = async () => {
    const data = await getDocs(tutorsCollectionRef);
    const myArr = [];
    data.forEach((doc) => {
      myArr.push({ tutorData: doc.data(), id: doc.id });
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
      myArr.push({ tutorData: doc.data(), id: doc.id });
    });
    setTutors(myArr);
  };

  useEffect(() => {
    getAllTutors();
  }, []);

  return (
    <ScrollView style={styles.app}>
      <View style={styles.homemap}>
        <Chip icon="home" onPress={() => getAllTutors()}>
          All
        </Chip>
        <Chip
          icon="map-marker"
          onPress={() => {
            navigation.navigate("MapScreen");
          }}
        >
          Map view
        </Chip>
      </View>

      <Text style={styles.text}>Filter by popular lessons</Text>
      <ScrollView horizontal={true} style={styles.skills}>
        <Chip
          icon="human-female-dance"
          style={styles.skills}
          onPress={() => getTutors("dancing")}
        >
          Dancing
        </Chip>
        <Chip
          icon="code-braces-box"
          style={styles.skills}
          onPress={() => getTutors("programming")}
        >
          Programming
        </Chip>
        <Chip
          icon="google-translate"
          style={styles.skills}
          onPress={() => getTutors("spanish")}
        >
          Spanish
        </Chip>
        <Chip
          icon="chef-hat"
          style={styles.skills}
          onPress={() => getTutors("cooking")}
        >
          Cooking
        </Chip>
        <Chip
          icon="weight-lifter"
          style={styles.skills}
          onPress={() => getTutors("fitness")}
        >
          Fitness
        </Chip>
        <Chip
          icon="music"
          style={styles.skills}
          onPress={() => getTutors("music")}
        >
          Music
        </Chip>
      </ScrollView>

      {tutors.map((tutor) => {
        return (
          <Card
            style={[styles.tutors, styles.shadowProp]}
            onPress={() => {
              navigation.navigate("SingleTutor", { tutor });
            }}
          >
            <View
              key={tutor.id}
              onPress={() => {
                navigation.navigate("SingleTutor", { tutor });
              }}
            >
              <Card.Cover
                onPress={() => {
                  navigation.navigate("SingleTutor", { tutor });
                }}
                style={styles.tutorLogo}
                source={{ uri: tutor.tutorData.image }}
              />
              <Card.Content
                onPress={() => {
                  navigation.navigate("SingleTutor", { tutor });
                }}
              >
                <Title>{tutor.tutorData.firstname}</Title>
                <Text>I can teach {tutor.tutorData.skills}</Text>
              </Card.Content>
            </View>
          </Card>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  app: {
    backgroundColor: "#fafafa",
  },
  homemap: {
    display: "flex",
  },
  skills: {
    height: 50,
    marginLeft: 10,
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
  },
  tutors: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,
    padding: 15,
    borderRadius: 20,
  },
  tutorLogo: {
    width: 270,
    height: 130,
    borderRadius: 10,
  },
  shadowProp: {
    shadowColor: "#8b8b8b",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 2.2,
    shadowRadius: 3,
    elevation: 5,
  },
});
