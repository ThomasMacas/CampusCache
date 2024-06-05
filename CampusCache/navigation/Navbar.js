import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();

  const goToEditCache = () => {
    navigation.navigate('Create');
  }

  const goToHome = () => {
    navigation.navigate('Caches');
  }

  const goToViewCache = () => {
    navigation.navigate('ViewCache');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToHome}>
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToEditCache}>
        <Text style={styles.text}>Create</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToViewCache}>
        <Text style={styles.text}>View</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 80,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1C479A',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: -60,
  },
});

export default Navbar;
