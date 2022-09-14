import { React, useEffect, useState, useContext, useRef } from "react";
import MapView from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Icon,
  Button,
  TouchableOpacity,
} from "react-native";
import { db } from "../firebase";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import { UserContext } from "../src/contexts/user";

export default function MapScreen({ navigation }) {
  const { loggedInUser } = useContext(UserContext);
  const [tutors, setTutors] = useState([]);
  const [user, setUser] = useState([]);

  const tutorsCollectionRef = collection(db, "Tutors");
  const loggedInUserRef = doc(db, "users", `${loggedInUser}`);

  const getLoggedInUser = async () => {
    const data = await getDoc(loggedInUserRef);
    setUser(data.data());
  };

  const getAllTutors = async () => {
    const data = await getDocs(tutorsCollectionRef);
    const myArr = [];
    data.forEach((doc) => {
      myArr.push({ tutorData: doc.data(), id: doc.id });
    });
    setTutors(myArr);
  };

  useEffect(() => {
    getLoggedInUser();
    getAllTutors();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 53.472129756411235,
          longitude: -2.2376019200350616,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {tutors.map((tutor) => {
          return (
            <MapView.Marker
              key={tutor.id}
              coordinate={{
                latitude: tutor.tutorData.location.latitude
                  ? tutor.tutorData.location.latitude
                  : 0,
                longitude: tutor.tutorData.location.longitude
                  ? tutor.tutorData.location.longitude
                  : 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <MapView.Callout
                tooltip={true}
                style={{ backgroundColor: "#ffffff" }}
                onPress={() => {
                  navigation.navigate("SingleTutor", { tutor });
                }}
              >
                <View style={styles.callout}>
                  <Text style={styles.tutorName}>
                    {tutor.tutorData.firstname} {tutor.tutorData.lastname}
                  </Text>
                  <Text style={styles.properties}>Skills: </Text>
                  <Text>
                    {tutor.tutorData.skills.map((skill) => {
                      return (
                        <Text key={skill} style={styles.skill}>{skill.toString()}</Text>
                      );
                    })}{" "}
                  </Text>

                  <Text style={styles.properties}>
                    In-person lessons: {tutor.tutorData.inperson ? "✅" : "❌"}{" "}
                    {"\n"}
                  </Text>

                  <TouchableOpacity style={styles.profileButton}>
                    <Text style={styles.button}>
                      Click here to view my profile!
                    </Text>
                  </TouchableOpacity>
                </View>
              </MapView.Callout>
            </MapView.Marker>
          );
        })}
        <MapView.Marker
          coordinate={{
            latitude: user?.homeLocation?.gpsEnabledLocation?.lat
              ? user?.homeLocation?.gpsEnabledLocation?.lat
              : 0,
            longitude: user?.homeLocation?.gpsEnabledLocation?.long
              ? user?.homeLocation?.gpsEnabledLocation?.long
              : 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          pinColor={"green"}
          key={`${Date.now()}`}
        >
          <MapView.Callout
            key={Date.now()}
            tooltip={true}
            style={{ backgroundColor: "#ffffff" }}
          >
            <View style={styles.callout}>
              <Text style={styles.userName}>
                Hey {user?.name?.first} {user?.name?.last}, you are here!
              </Text>
            </View>
          </MapView.Callout>
        </MapView.Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  callout: {
    backgroundColor: "#7875FC",
    borderRadius: 15,
    padding: 20,
    width: 150,
  },
  properties: {
    fontWeight: "bold",
    fontSize: 15,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  tutorName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  skill: {
    fontSize: 16,
  },
  profileButton: {
    backgroundColor: "#5F5CF0",
    borderRadius: 10,
    color: "red",
    width: 115,
    padding: 10,
  },
  button: {
    textAlign: "center",
    fontSize: 12,
  },
});
