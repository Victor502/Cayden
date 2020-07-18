import 'react-native-gesture-handler';
import React, {useState, useEffect, useMemo, useReducer} from 'react';
import {SafeAreaView} from 'react-native';
import {Text, Spinner} from 'native-base';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import DietScreen from './src/screens/DietScreen.js';
import MedicineScreen from './src/screens/MedicineScreen.js';
import DiaperScreen from './src/screens/DiaperScreen';
import ForgotPassword from './src/auth/ForgotPassword.js';
import SignIn from './src/auth/SignIn.js';
import Register from './src/auth/Register';
import {AuthContext} from './src/context/context.js';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000);
  })
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null)

  const initialState = {
    isLoading: true,
    user: null,
    userToken: null
  }

  const loginReducer = () => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          user: action.user,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          isLoading: false,
          user: null,
          userToken: null,
        };
      case 'REGISTER':
        return {
          ...prevState,
          isLoading: false,
          user: action.user,
          userToken: action.token,
        };
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialState)


  const authContext = useMemo(() => ({
    signIn: () => {

    },
    signOut: () => {
      
    },
    signUp: () => {
   
    }
  }), [])


  if (isLoading) { return (
      <SafeAreaView style={{alignItems: 'center', marginTop: '30%'}}>
        <Spinner color={'#72bcd4'} />
        <Text style={{color: '#72bcd4', fontSize: 24}}>Loading...</Text>
      </SafeAreaView>
    );}
  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      {false ? (
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Meds" component={MedicineScreen} />
          <Drawer.Screen name="Diet" component={DietScreen} />
          <Drawer.Screen name="Diapers" component={DiaperScreen} />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
    </AuthContext.Provider>
  );
}
