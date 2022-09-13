import { React, useEffect, useState, useContext, useRef } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Icon } from "react-native";
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
      myArr.push(doc.data());
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
              coordinate={{
                latitude: tutor.location.latitude ? tutor.location.latitude : 0,
                longitude: tutor.location.longitude
                  ? tutor.location.longitude
                  : 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <MapView.Callout
                key={Date.now()}
                tooltip={true}
                style={{ backgroundColor: "#ffffff" }}
                onPress={() => {
                  navigation.navigate("SingleTutor");
                }}
              >
                <View
                  style={styles.callout}
                  onPress={() => {
                    navigation.navigate("SingleTutor");
                  }}
                >
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse et sollicitudin purus, quis feugiat magna.
                  </Text>
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
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse et sollicitudin purus, quis feugiat magna.
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
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  callout: {
    width: 100,
  },
});
