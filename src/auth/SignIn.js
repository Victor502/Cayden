import React, {useState, useEffect} from 'react';
import {View, SafeAreaView} from 'react-native';
import {Form, Item, Input, Label, H2, Button, Text, Spinner} from 'native-base';
import config from '../assets/config/config.js';
import Utility from '../assets/Utility.js';
import PasswordTextBox from '../components/PasswordTextBox.js';
import * as EmailValidator from 'email-validator';
import AsyncStorage from '@react-native-community/async-storage';

// for local development
let url = Platform.OS === 'ios'? config.api.aurl : config.api.url

function SignIn(props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const startLoginProcess = () => {
    console.log('startloginprocess');
    return async () => {
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
            dispatch({
              type: TYPES.SET_USER,
              payload: user_data.user,
            });
            dispatch({
              type: TYPES.SET_LOGGEDIN_STATE,
              payload: true,
            });
            console.log('signed in success');
          }
        }
      } catch (err) {
        console.log('Start login process catch', err);
        throw new Error(err);
      }
    };
  };

  signIn = async () => {
    // setLoading(true)
    if (email && password) {
      try {
        setLoading(true);
        await _signIn(email, password);
        await setToken(this.state.email);
        setLoading(false);

        //set logged in to true
        // this._redirect();
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
  };

  _signIn = async (email, password) => {
    try {
      //      console.log("posttoserver login", email, password);
      let res = await Utility.PostToServer(config.api.url + '/login', {
        email: email,
        pwd: password,
      });
      if (
        typeof res.err !== 'undefined' &&
        res.err === 0 &&
        typeof res.user !== 'undefined' &&
        res.user
      ) {
        //        console.log('_signin', res.user)
        return res.user;
      } else {
        throw new Error(res.err);
      }
    } catch (e) {
      alert('Email or Password was wrong!\nPlease try Again!');
      throw new Error(e);
    }
  };

  const setToken = async (email) => {
    console.log('settoken pre');
    let token = Utility.GenerateToken();

    console.log('settoken', token);
    await AsyncStorage.setItem(
      config.storage.key_prefix + 'local_token',
      token,
    );
    await Utility.PostToServer(config.api.url + '/token', {
      token: token,
      email: email,
    });
  };

  getAccessToken = async () => {
    let token = null;
    token = await AsyncStorage.getItem(
      config.storage.key_prefix + 'local_token',
    );
    if (typeof token === 'undefined') {
      token = null;
    }
    return token;
  };

  getUserInfo = async (token) => {
    try {
      let user = null;
      user = await this.nonFacebookLogin(token);
      return user;
    } catch (e) {
      return null;
    }
  };

  nonFacebookLogin = async (token) => {
    if (typeof token !== 'undefined' && token) {
      try {
        let json = await Utility.GetFromServer(
        url + '/userinfo?token=' + token,
        );
        //console.log('nonfacebooklogin json: ',json)
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

  if (loading) {
    return (
      <SafeAreaView style={{alignItems: 'center', marginTop: '30%'}}>
        <Spinner color={'#72bcd4'} />
        <Text style={{color: '#72bcd4', fontSize: 24}}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View style={{marginTop: '25%', padding: 30}}>
        <View style={{alignItems: 'center'}}>
          <H2>Please Sign In</H2>
        </View>
        <View style={{marginTop: 20}}>
          <Form>
            <Item fixedLabel>
              <Label>Email</Label>
              <Input
                onChangeText={(text) => setEmail(text)}
                placeholder={email}
              />
            </Item>

            <PasswordTextBox
              icon="lock"
              label="Password"
              onChange={(v) => setPassword(v)}
            />
          </Form>
          <Text
            style={{alignSelf: 'flex-end', marginRight: 30, marginTop: 5}}
            onPress={() => props.navigation.navigate('ForgotPassword')}>
            Forgot Password?
          </Text>
        </View>
      </View>
      <View style={{marginHorizontal: 30}}>
        <Button
          block
          onPress={signIn}
          disabled={false}
          style={{backgroundColor: '#add8e6'}}>
          <Text>SIGN IN</Text>
        </Button>
      </View>
      <View style={{alignSelf: 'center', marginHorizontal: 30, marginTop: 15}}>
        <Text>
          Don't have an Account?
          <Text
            onPress={() => props.navigation.navigate('Register')}
            style={{color: '#72bcd4', fontWeight: 'bold'}}>
            {' '}
            Signup Here!
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default SignIn;
