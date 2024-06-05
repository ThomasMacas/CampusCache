import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as Location from 'expo-location';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';

const LongLat = () => {
  const [location, setLocation] = useState(null);
  const [distanceinKm, setDistanceinKm] = useState(null);

  const deg2rad = (deg) => {
    return deg * (Math.PI/180)
  }

  const distance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2-lat1);  // deg2rad below
    const dLon = deg2rad(lon2-lon1); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance.toFixed(2);
  }

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    // GET KILL CODE -> oldView
    const killCodeRef = doc(db, "killCode", "killCode");
    const killCodeDoc = await getDoc(killCodeRef);
    const oldView = killCodeDoc.data().oldView;
    if (!oldView) {
      console.error("Error fetching data: oldView is null");
      return <View style={styles.basic}><Text>Error fetching data</Text></View>;
    }
    // Get Long and Lat of KillCode
    const currentRef = doc(db, "publicCache", oldView);
    const currentRefDoc = await getDoc(currentRef);
    let curLong = currentRefDoc.data().longitude;
    let curLat = currentRefDoc.data().latitude;
    if (!curLong) {
      console.error("Error fetching data: longitude is null");
      return <View style={styles.basic}><Text>Error fetching data</Text></View>;
    }
    if (!curLat) {
      console.error("Error fetching data: longitude is null");
      return <View style={styles.basic}><Text>Error fetching data</Text></View>;
    }

    const distInKm = distance(curLong, curLat, location.coords.latitude, location.coords.longitude);
    setDistanceinKm(distInKm);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Current Latitude: {location?.coords?.latitude}</Text>
      <Text>Current Longitude: {location?.coords?.longitude}</Text>
      {distanceinKm && <Text>Distance from Cache (inKm): {distanceinKm}</Text>}
      <Button title="Get Distance" onPress={getLocationAsync} />
    </View>
  );
};

export default LongLat;
