import 'react-native-gesture-handler';
import React, {useState, useEffect, useMemo, useReducer} from 'react';
import {SafeAreaView, LogBox} from 'react-native';
import {Text, Spinner, Root, Toast} from 'native-base';
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
import {AuthContext, StateContext} from './src/context/context.js';
import {initialState, loginReducer} from './src/context/authReducer';
import config from './src/assets/config/config.js';
import {
  getUserInfo,
  getAccessToken,
  _signIn,
  setToken,
} from './src/auth/AuthHelpers.js';
import AsyncStorage from '@react-native-community/async-storage';

// @TODO: This is to hide a Warning caused by NativeBase after upgrading to RN 0.62
LogBox.ignoreLogs([
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
])
// ------- END OF WARNING SUPPRESSION

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [appState, dispatch] = useReducer(loginReducer, initialState);

  useEffect(() => {
    let userToken;
    let user;
    //check if user is logged in or out
    async function getToken() {
      dispatch({type: 'LOADING', loading: true})
      userToken = await AsyncStorage.getItem(
        config.storage.key_prefix + 'local_token',
      );
      user = await getUserInfo(userToken);
      if (typeof userToken !== 'undefined') {
        dispatch({type: 'RETRIEVE_TOKEN', token: userToken, user: user});
      } else {
        dispatch({type: 'LOGOUT'});
      }
      return userToken;
    }
    getToken();
  }, []);

  const authActions = useMemo(
    () => ({
      signIn: async (email, password) => {
        let userToken;
        userToken = null;
        if (email && password) {
          try {
            // setIsLoading(true)
            // dispatch({type: 'LOADING', loading: true})
            let user = await _signIn(email, password);
            console.log(user)
            if (typeof user !== 'undefined' && user && user.err !== 403) {
              dispatch({type: 'LOADING', loading: true})
              let setTokenRes = await setToken(email);
              userToken = await getAccessToken(setTokenRes);
              dispatch({type: 'LOGIN', user: user, token: userToken});
            } else {
              Toast.show({
              text: user.msg,
              textStyle: { textAlign: 'center', marginVertical: 5 },
              type: "danger"
            })
            }
          } catch (err) {
            console.log(err);
            Toast.show({
              text: err.message,
              textStyle: { textAlign: 'center', marginVertical: 5 },
              type: "danger"
            })
          }
        } else {
          console.log('not good log in');
          Toast.show({
              text: 'Email and Password are Required!\nPlease try Again!',
              textStyle: { textAlign: 'center', marginVertical: 5 },
              type: "danger"
            })
        }
      },
      signOut: async () => {
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
    }),
    [],
  );

  if (appState.isLoading) {
    return (
      <SafeAreaView style={{alignItems: 'center', marginTop: '30%'}}>
        <Spinner color={'#72bcd4'} />
        <Text style={{color: '#72bcd4', fontSize: 24}}>Loading...</Text>
      </SafeAreaView>
    );
  }

  // add drawerContent File for log out
  return (
    <Root>
    <AuthContext.Provider value={authActions}>
      <StateContext.Provider value={appState}>
        <NavigationContainer>
          {appState.userToken !== null ? (
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
      </StateContext.Provider>
    </AuthContext.Provider>
    </Root>
  );
}
