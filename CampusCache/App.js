import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EditCache from './navigation/screens/EditCache';
import Home from './navigation/screens/Home';
import ViewCache from './navigation/screens/ViewCache';
import Navbar from './navigation/Navbar';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Caches" component={Home} />
        <Stack.Screen name="Create" component={EditCache} />
        <Stack.Screen name="ViewCache" component={ViewCache} />
      </Stack.Navigator>
      <Navbar />
    </NavigationContainer>
  );
}

export default App;
