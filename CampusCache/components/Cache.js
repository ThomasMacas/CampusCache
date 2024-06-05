import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc, getDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

function Cache(props) {

  const navigation = useNavigation();

  const handleActive = async () => {
    const killCodeRef = doc(db, "killCode", "killCode");
    const killCodeDoc = await getDoc(killCodeRef);
    const oldView = killCodeDoc.data().oldView;
    if (!oldView) {
      console.error("Error fetching data: oldView is null");
      return <View style={styles.basic}><Text>Error fetching data</Text></View>;
    }
    const oldDocRef = doc(db, "publicCache", oldView);
    await updateDoc(oldDocRef, {
      active: false
    });
    const currentDocRef = doc(db, "publicCache", props.title);
    await updateDoc(currentDocRef, {
      active: true
    });
    const KillDocRef = doc(db, "killCode", "killCode");
    await updateDoc(KillDocRef, {
      oldView: props.title
    });
    navigation.navigate('ViewCache');
  }

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={handleActive}>
      <View style={styles.titleDiv}><Text style={styles.title} >{props.title} </Text></View>
      <Text style={styles.text}>Difficulty: {props.difficulty} </Text>
      <Text style={styles.text}>Hint: {props.hints}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: 355,
    justifyContent: 'center',
    padding: 20,
    paddingHorizontal: 45,
  },
  titleDiv:{
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default Cache;
