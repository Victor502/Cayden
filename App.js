import 'react-native-gesture-handler';
import * as React from 'react';
import {Button, View, Text, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import DietScreen from './src/screens/DietScreen.js';
import MedicineScreen from './src/screens/MedicineScreen.js';
import DiaperScreen from './src/screens/DiaperScreen';
import ForgotPassword from './src/auth/ForgotPassword.js';
import SignIn from './src/auth/SignIn.js';
import Register from './src/auth/Register';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="ForgotPassword" component={ForgotPassword} />
        <Drawer.Screen name="SignIn" component={SignIn} />
        <Drawer.Screen name="Register" component={Register} />
        <Drawer.Screen name="Meds" component={MedicineScreen}  />
        <Drawer.Screen name="Diet" component={DietScreen} />
        <Drawer.Screen name="Diapers" component={DiaperScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
