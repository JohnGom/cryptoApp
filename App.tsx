/**
 * Crypto App - Main Application
 *
 * @format
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/pages/Home';
import DetailScreen from './src/pages/Detail';
import { RootStackParamList } from './src/pages/Detail';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Crypto Tracker' }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({ route }) => ({ title: route.params.coin.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
