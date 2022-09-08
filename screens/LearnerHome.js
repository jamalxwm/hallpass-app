import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { Chip } from "react-native-paper";

export const LearnerHome = () => {
  const [tutors, setTutors] = useState([]);

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

  // create dropdown with all of the filter options
  // get options from skills collection
  // use firebase queries, query the tutor collection for the skills key

  return (
    <View>
      <Chip icon="information" onPress={() => getTutors()}>
        All!
      </Chip>
      <Chip icon="information" onPress={() => getTutors("dancing")}>
        Dancing
      </Chip>
      <Chip icon="information" onPress={() => getTutors("programming")}>
        Programming
      </Chip>
      <Chip icon="information" onPress={() => getTutors("spanish")}>
        Spanish
      </Chip>
      <Chip icon="information" onPress={() => getTutors("cooking")}>
        Cooking
      </Chip>

      {tutors.map((tutor) => {
        return (
          <View>
            {/* <Image
              style={styles.tinyLogo}
              source={{
                uri: tutor.image.toString(),
              }}
            /> */}
            <Text>{tutor.firstname}</Text>

            <Text>{tutor.skills}</Text>
          </View>
        );
      })}
      <Text>LearnerHome</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
