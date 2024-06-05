import * as React from 'react';
import { View, Text, StyleSheet , TouchableOpacity} from 'react-native';

import LongLat from "../../components/LongLat";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import { db } from "../../firebase";

export default function ViewCache({ navigation }) {
  const [caches, loading, error] = useCollection(collection(db, "publicCache"));

  if (error) {
    console.error("Error fetching data: ", error);
    return <View><Text>Error fetching data</Text></View>;
  }

  if (loading) {
    return <View><Text>Loading...</Text></View>;
  }

  const activeCache = caches.docs.find(cache => cache.data().active);

  if (activeCache) {
    return (
        <View style={{ flex: 1 }}>
        <View>
            <Text style={styles.title}>
                {activeCache.data().title}
            </Text>
        </View>
        <View style={styles.line} />
            <View style={styles.cacheContainer}>
                <Text style={styles.hint}>
                    Hints
                </Text>
                <TouchableOpacity onPress={() => alert("TODO")}>
                  <Text style={styles.button}>Click for a Hint</Text>
                </TouchableOpacity>
            </View>
            <LongLat/>
        </View>
    );
  } else {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold' }}>No active caches found</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 32, 
        fontWeight: 'bold', 
        textAlign: 'center',
        marginBottom: 5,
        marginTop: 5,
    },

    hint: {
        textAlign: 'center',
        fontSize: 30, 
        fontWeight: 'bold', 
    },

    cacheContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: .50,
      },

    line: {
      backgroundColor: '#000',
      height: 2,
      marginBottom: 10,
      borderBottomWidth: 3,
    },

    button: {
      backgroundColor: '#2196F3',
      color: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 20,
      fontWeight: 'bold',
      fontSize: 16,
    }
  });