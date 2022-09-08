import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

export const LearnerHome = () => {
  const [tutors, setTutors] = useState([]);

  const tutorsCollectionRef = collection(db, "Tutors");
  const testQuery = query(tutorsCollectionRef, where("skills", "array-contains", "piano"));

  useEffect(() => {
    const getTutors = async () => {
      // if !skill get everything, else firestore query
      const data = await getDocs(testQuery);
      const myArr = [];
      data.forEach((doc) => {
        myArr.push(doc.data(), doc.id);
      });
      console.log(myArr);

      setTutors(myArr);
    };
    getTutors();
  }, []);

  // create dropdown with all of the filter options
  // get options from skills collection
  // use firebase queries, query the tutor collection for the skills key

  return (
    <View>
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
