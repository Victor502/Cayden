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
import {initialState, loginReducer} from './src/context/authReducer';
import config from './src/assets/config/config.js';
import {
  getUserInfo,
  getAccessToken,
  _signIn,
  setToken,
} from './src/auth/AuthHelpers.js';
import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
/**
  const startLoginProcess = async () => {
    console.log('startloginprocess 2');
    try {
      // Check if signed in before
      let access_token = await getAccessToken();
      console.log('get token', access_token);
      // access_token == true mean that we have signed in before
      if (access_token) {
        // Get user info from login to facebook or backend
        let user = await getUserInfo(access_token);
        console.log('here');
        console.log('user', user);
        // Check if user and required field is present and not undefined (but this should not happen)
        if (
          typeof user !== 'undefined' &&
          user &&
          typeof user.email !== 'undefined' &&
          typeof user.name !== 'undefined' &&
          user.email &&
          user.name
        ) {
          console.log('user is real');
          dispatch({
            type: 'LOGIN',
            userToken: access_token,
            user: user,
            isLoading: false,
          });
          // dispatch({
          //   type: 'LOGIN',
          // });
          console.log('signed in success');
        } else {
          console.log('no user');
          dispatch({type: 'LOGOUT'});
        }
      } else {
        dispatch({
          type: 'LOGOUT',
        });
      }
    } catch (err) {
      console.log('Start login process catch', err);
      throw new Error(err);
    }
  };
*/
  const [loginState, dispatch] = useReducer(loginReducer, initialState);

  useEffect(() => {
    let userToken;
    let user;
    //check if user is logged in or out
    async function getToken() {
      userToken = await AsyncStorage.getItem(
        config.storage.key_prefix + 'local_token',
      );
      user = await getUserInfo(userToken)
    if (typeof userToken !== 'undefined') {
      console.log('user', user, loginState)
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken, user: user});
    } else {
      dispatch({type: 'LOGOUT'})
    }
      return userToken;
    }
    getToken()
  }, []);

  const authActions = useMemo(
    () => ({
      signIn: async (email, password) => {
        // setIsLoading(false)
        let userToken;
        userToken = null;
        if (email && password) {
          try {
            // setIsLoading(true)
            let user = await _signIn(email, password);
            let setTokenRes = await setToken(email);
            userToken = await getAccessToken(setTokenRes);
            dispatch({type: 'LOGIN', user: user, token: userToken});
          } catch (err) {
            console.log(err);
          }
        } else {
          console.log('not good log in');
        }
      },
      signOut: async () => {
        // setUserToken(null)
        // setIsLoading(false)
          try {
            await AsyncStorage.removeItem(
              config.storage.key_prefix + 'local_token',
            );
          } catch (e) {
            console.log(e);
          }
          console.log('Done.');
    
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        // setUserToken('yhgt');
        // setIsLoading(false);
      },
      user: loginState.user
    }),
    [],
  );

  if (loginState.isLoading) {
    return (
      <SafeAreaView style={{alignItems: 'center', marginTop: '30%'}}>
        <Spinner color={'#72bcd4'} />
        <Text style={{color: '#72bcd4', fontSize: 24}}>Loading...</Text>
      </SafeAreaView>
    );
  }

  // add drawerContent File for log out
  return (
    <AuthContext.Provider value={authActions}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
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
