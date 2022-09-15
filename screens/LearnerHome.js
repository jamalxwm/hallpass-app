import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { React, useEffect, useState, useContext } from 'react';
import { db } from '../firebase';
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  getDoc,
} from 'firebase/firestore';
import { Chip, Card, Title } from 'react-native-paper';
import { UserContext } from '../src/contexts/user';
import { useTransitionProgress } from 'react-native-screens';
import { SafeAreaView } from 'react-native-safe-area-context';
import Poppins from '../src/components/Poppins';
import { colors } from '../styles/base';

export const LearnerHome = ({ navigation }) => {
  const [tutors, setTutors] = useState([]);
  const [user, setUser] = useState({});
  const [loading, isLoading] = useState(true);
  const { loggedInUser } = useContext(UserContext);

  const tutorsCollectionRef = collection(db, 'Tutors');
  const loggedInUserRef = doc(db, 'users', `${loggedInUser}`);

  const getUser = async () => {
    const data = await getDoc(loggedInUserRef);
    setUser(data.data());
    isLoading(false);
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
      where('skills', 'array-contains', skill)
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
    <SafeAreaView>
      <ScrollView style={styles.app}>
        <View style={styles.user}>
          {!loading && (
            <View style={styles.homemap}>
              <Card.Cover
                style={styles.userlogo}
                source={{ uri: user.avatarUrl }}
              />
              <View style={styles.greetingWrapper}>
                <Poppins
                  text={'Welcome back'}
                  style={{ color: '#6F757D' }}
                  T14
                  M
                />
                <Poppins
                  text={`${user.name.first}!`}
                  style={colors.neutral[100]}
                  T20
                  B
                />
              </View>
            </View>
          )}

          <Chip
            style={styles.map}
            icon="map-marker"
            onPress={() => {
              navigation.navigate('MapScreen');
            }}
          >
            Map
          </Chip>
        </View>
        <View style={styles.bannerContainer}>
          <Image
            style={styles.banner}
            source={require('../assets/images/Banner.png')}
          />
        </View>
        <View style={styles.homemap}>
          <Poppins
            text={'Popular categories'}
            style={{ color: colors.neutral[100] }}
            T16
            S
          />

          <TouchableOpacity>
            <Poppins
              text={'See all'}
              style={{ color: colors.primary[100] }}
              onPress={() => getAllTutors()}
              T14
              S
            />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} style={styles.skills}>
          <Chip
            icon="music"
            style={styles.skill}
            onPress={() => getTutors('music')}
          >
            <Poppins
              text={'Music'}
              style={{ color: colors.neutral[100] }}
              T14
              M
            />
          </Chip>
          <Chip
            icon="code-braces-box"
            style={styles.skill}
            onPress={() => getTutors('programming')}
          >
            <Poppins
              text={'Programming'}
              style={{ color: colors.neutral[100] }}
              T14
              M
            />
          </Chip>
          <Chip
            icon="chef-hat"
            style={styles.skill}
            onPress={() => getTutors('cooking')}
          >
            Cooking
          </Chip>
          <Chip
            icon="palm-tree"
            style={styles.skill}
            onPress={() => getTutors('travel')}
          >
            <Poppins
              text={'Travel'}
              style={{ color: colors.neutral[100] }}
              T14
              M
            />
          </Chip>
          <Chip
            icon="human-female-dance"
            style={styles.skill}
            onPress={() => getTutors('dancing')}
          >
            <Poppins
              text={'Dancing'}
              style={{ color: colors.neutral[100] }}
              T14
              M
            />
          </Chip>
          <Chip
            icon="weight-lifter"
            style={styles.skill}
            onPress={() => getTutors('fitness')}
          >
            <Poppins
              text={'Fitness'}
              style={{ color: colors.neutral[100] }}
              T14
              M
            />
          </Chip>
        </ScrollView>
        <Poppins
          text={'Recommended for you'}
          style={{ color: colors.neutral[100], paddingLeft: 15 }}
          T16
          S
        />
        {tutors.map((tutor) => {
          return (
            <Card
              key={tutor.id}
              style={[styles.tutors, styles.shadowProp]}
              onPress={() => {
                navigation.navigate('SingleTutor', { tutor });
              }}
            >
              <View style={styles.cardContent}>
                <Card.Cover
                  style={styles.tutorLogo}
                  source={{ uri: tutor.tutorData.image }}
                />
                <Card.Content>
                  <Poppins text={`Learn ${tutor.tutorData.skills}`} T16 S />
                  <Poppins
                    text={`${tutor.tutorData.firstname} ${tutor.tutorData.lastname}`}
                    style={{ color: colors.neutral[60] }}
                    T14
                    R
                  />
                </Card.Content>
              </View>
            </Card>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app: {
    backgroundColor: '#fafafa',
  },
  banner: {
    resizeMode: 'contain',
    width: '105%',
    height: 332,
    marginTop: -15,
    marginBottom: -100,
  },
  bannerContainer: {
    alignItems: 'center',
  },
  homemap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skills: {
    height: 50,
  },
  skill: {
    backgroundColor: colors.primary[10],
    marginLeft: 10,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 50,
  },
  seeall: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#6c5ae8',
  },
  cardContent: {
    flex: 1,
    width: '100%'
  },
  tutors: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 280,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    padding: 16,
    borderRadius: 24,
  },
  tutorLogo: {
    flex: 1,
    width: 360,
    borderRadius: 16,
    marginBottom: 10,
  },
  shadowProp: {
    shadowColor: 'rgba(14, 14, 14, 0.12)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 32,
    elevation: 32,
  },
  tutorname: {
    color: 'grey',
    fontSize: 15,
    marginTop: 5,
  },
  skillname: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  map: {
    backgroundColor: '#f0eefd',
    height: 50,
    width: 80,
    marginTop: 5,
    marginRight: 5,
  },
  userlogo: {
    borderRadius: 50,
    height: 48,
    width: 48,
    marginRight: 5,
  },
});
