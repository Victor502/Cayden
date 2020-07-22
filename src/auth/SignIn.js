import React, {useState, useEffect, useContext} from 'react';
import {View, SafeAreaView} from 'react-native';
import {Form, Item, Input, Label, H2, Button, Text, Spinner} from 'native-base';
import config from '../assets/config/config.js';
import Utility from '../assets/Utility.js';
import PasswordTextBox from '../components/PasswordTextBox.js';
import * as EmailValidator from 'email-validator';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../context/context.js';
import {_signIn, setToken} from './AuthHelpers';

// for local development
let url = Platform.OS === 'ios' ? config.api.aurl : config.api.url;

function SignIn(props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {signIn} = useContext(AuthContext)

  const loginHandler = (email, password) => {
    setLoading(true);
    console.log('log in');
    signIn(email, password)
    setLoading(false);

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
              <Input onChangeText={(text) => setEmail(text)} value={email} />
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
          onPress={() => loginHandler(email, password)}
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
