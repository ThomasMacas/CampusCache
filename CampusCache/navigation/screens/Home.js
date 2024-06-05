import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import Cache from "../../components/Cache";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";

const image = require('../../public/geo.jpg');

export default function Home({ navigation }) {
    const [caches, loading, error] = useCollection(
        collection(db, "publicCache")
    );
    if (error) {
        console.error("Error fetching data: ", error);
        return <View style={styles.basic}><Text>Error fetching data</Text></View>;
    }
    
    if (loading) {
      return <View style={styles.basic}><Text>Loading...</Text></View>;
    }

    return (
        <ScrollView style = {styles.contentcontainer}>
        <ImageBackground source={image} style={styles.image} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>        
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity>
                <Text style={{ fontSize: 26, fontWeight: 'bold' }}>
                    {caches && (
                        <View>
                            {caches.docs.map((cache, index) => (
                                <View style={styles.cache} key={index}>
                                    <Cache
                                        title = {cache.data().title}
                                        longitude={cache.data().longitude}
                                        latitude={cache.data().latitude}
                                        hints={cache.data().hints}
                                        difficulty={cache.data().difficulty}
                                    />
                                </View>
                            ))}
                        </View>
                    )}
                </Text>
            </TouchableOpacity>
        </View> 
        </View>
        </ImageBackground>
        </ScrollView>       
    );
}

const styles = StyleSheet.create({
    cache: {
        marginTop: 10,
    },
    basic:{
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 30,
    },
    container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    paddingBottom: 100,
    },
    contentcontainer: {
        overflow: 'auto',
        flex: 1,
        flexGrow: 1,
        paddingTop: 0,
    },
    image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    },
});
