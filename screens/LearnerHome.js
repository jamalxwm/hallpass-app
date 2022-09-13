import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { React, useEffect, useState, useContext } from "react";
import { db } from "../firebase";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { Chip, Card, Title } from "react-native-paper";
import { UserContext } from "../src/contexts/user";
import { useTransitionProgress } from "react-native-screens";

export const LearnerHome = ({ navigation }) => {
  const [tutors, setTutors] = useState([]);
  const [user, setUser] = useState({});
  const [loading, isLoading] = useState(true)
  const { loggedInUser } = useContext(UserContext);

  const tutorsCollectionRef = collection(db, "Tutors");
  const loggedInUserRef = doc(db, "users", `${loggedInUser}`);

  const getUser = async () => {
    const data = await getDoc(loggedInUserRef);
    setUser(data.data());
    console.log(useTransitionProgress)
    isLoading(false)
  };

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
    getUser();
  }, []);

  return (
    <ScrollView style={styles.app}>
      <View style={styles.homemap}>
        {!loading && (
          <Text>
          Welcome Back! {"\n"} {user.name.first}
        </Text>  
        )}
       
        <Chip icon="home" onPress={() => getAllTutors()} />

        <Chip
          style={styles.map}
          icon="map-marker"
          onPress={() => {
            navigation.navigate("MapScreen");
          }}
        >
          Map view
        </Chip>
      </View>

      <View style={styles.homemap}>
        <Text style={styles.popcat}>Filter by popular categories</Text>
        <TouchableOpacity>
          <Text style={styles.seeall} onPress={() => getAllTutors()}>
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} style={styles.skills}>
        <Chip
          icon="human-female-dance"
          style={styles.skill}
          onPress={() => getTutors("dancing")}
        >
          Dancing
        </Chip>
        <Chip
          icon="code-braces-box"
          style={styles.skill}
          onPress={() => getTutors("programming")}
        >
          Programming
        </Chip>
        <Chip
          icon="google-translate"
          style={styles.skill}
          onPress={() => getTutors("spanish")}
        >
          Spanish
        </Chip>
        <Chip
          icon="chef-hat"
          style={styles.skill}
          onPress={() => getTutors("cooking")}
        >
          Cooking
        </Chip>
        <Chip
          icon="weight-lifter"
          style={styles.skill}
          onPress={() => getTutors("fitness")}
        >
          Fitness
        </Chip>
        <Chip
          icon="music"
          style={styles.skill}
          onPress={() => getTutors("music")}
        >
          Music
        </Chip>
      </ScrollView>

      <Text style={styles.recommended}>Recommended</Text>
      {tutors.map((tutor) => {
        return (
          <Card
            style={[styles.tutors, styles.shadowProp]}
            onPress={() => {
              navigation.navigate("SingleTutor", { tutor });
            }}
          >
            <View key={tutor.id}>
              <Card.Cover
                style={styles.tutorLogo}
                source={{ uri: tutor.tutorData.image }}
              />
              <Card.Content>
                <Text style={styles.skillname}>
                  Learn {tutor.tutorData.skills}
                </Text>
                <Text style={styles.tutorname}>
                  {tutor.tutorData.firstname} {tutor.tutorData.lastname}
                </Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  skills: {
    height: 50,
  },
  skill: {
    backgroundColor: "#9487ee",
    marginLeft: 10,
  },
  popcat: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  seeall: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#6c5ae8",
  },
  recommended: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 20,
  },

  tutors: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 20,
  },
  tutorLogo: {
    width: 290,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  shadowProp: {
    shadowColor: "#8b8b8b",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 2.2,
    shadowRadius: 3,
    elevation: 5,
  },
  tutorname: {
    color: "grey",
    fontSize: 15,
    marginTop: 5,
  },
  skillname: {
    fontSize: 15,
    fontWeight: "bold",
  },
  map: {
    backgroundColor: "#d1d1d1",
  },
});
