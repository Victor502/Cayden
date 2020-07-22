import React, {useReducer} from 'react'
import config from '../assets/config/config.js';
import Utility from '../assets/Utility.js';
import AsyncStorage from '@react-native-community/async-storage';
import {initialState, loginReducer} from '../context/authReducer';

// for local development
let url = Platform.OS === 'ios'? config.api.aurl : config.api.url

export const startLoginProcess = async () => {
  console.log('startloginprocess 1');

    try {
      // Check if signed in before
      let access_token = await getAccessToken();
      console.log('get token', access_token);
      // access_token == true mean that we have signed in before
      if (access_token) {
        // Get user info from login to facebook or backend
        let user = await getUserInfo(access_token);

        // Check if user and required field is present and not undefined (but this should not happen)
        if (
          typeof user !== 'undefined' &&
          user &&
          typeof user.email !== 'undefined' &&
          typeof user.name !== 'undefined' &&
          user.email &&
          user.name
        ) {
            
        //   dispatch({
        //     type: TYPES.SET_USER,
        //     payload: user_data.user,
        //   });
        //   dispatch({
        //     type: TYPES.SET_LOGGEDIN_STATE,
        //     payload: true,
        //   });
          console.log('signed in success');
        }
      }
    } catch (err) {
      console.log('Start login process catch', err);
      throw new Error(err);
    }

};

export const signIn = async (email, password) => {
  // setLoading(true)
  if (email && password) {
    try {
    //   setLoading(true);
      await _signIn(email, password);
      await setToken(email);
    //   setLoading(false);

      //set logged in to true
      // this._redirect();
    //   startLoginProcess()
    } catch (err) {
    //   setLoading(false);
      console.log(err);
    }
  }
};

export const _signIn = async (email, password) => {
  try {
    //      console.log("posttoserver login", email, password);
    let res = await Utility.PostToServer(url + '/login', {
      email: email,
      pwd: password,
    });
    if (
      typeof res.err !== 'undefined' &&
      res.err === 0 &&
      typeof res.user !== 'undefined' &&
      res.user
    ) {
      console.log('_signin', res.user)
      return res.user;
    } else {
      throw new Error(res.err);
    }
  } catch (e) {
    alert('Email or Password was wrong!\nPlease try Again!');
    throw new Error(e);
  }
};

export const setToken = async (email) => {
  console.log('settoken pre');
  let token = Utility.GenerateToken();
  console.log('settoken', token);
  await AsyncStorage.setItem(config.storage.key_prefix + 'local_token', token);
  await Utility.PostToServer(url + '/token', {
    token: token,
    email: email,
  });
};

export const getAccessToken = async () => {
  let token = null;
  token = await AsyncStorage.getItem(config.storage.key_prefix + 'local_token');
  if (typeof token === 'undefined') {
    token = null;
  }
  return token;
};

export const getUserInfo = async (token) => {
  try {
    let user = null;
    user = await nonFacebookLogin(token);
    return user;
  } catch (e) {
    return null;
  }
};

export const nonFacebookLogin = async (token) => {
  if (typeof token !== 'undefined' && token) {
    try {
      let json = await Utility.GetFromServer(url + '/userinfo?token=' + token);
      // console.log('nonfacebooklogin json: ',json)
      return json;
    } catch (e) {
      console.log('error nonfacebooklogin', e);
      throw new Error(e);
    }
  } else {
    console.log('no token');
    throw new Error('no token');
  }
};
