import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Platform} from 'react-native';
import {Form, Item, Input, Label, H2, Button, Text} from 'native-base';
import config from '../assets/config/config.js';
import Utility from '../assets/Utility.js';
import PasswordTextBox from '../components/PasswordTextBox.js';
import * as EmailValidator from 'email-validator';
import AsyncStorage from '@react-native-community/async-storage';

// for local development
let url = Platform.OS === 'ios'? config.api.aurl : config.api.url

function Register(props) {
  const [name, setName] = useState('name');
  const [email, setEmail] = useState('example@email.com');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  //set button disabled until ready to register
  const [registerDisable, setRegisterDisable] = useState(true);
  const [validEmail, setValidEmail] = useState(false);

  useEffect(() => {
    checkValid();
    setValidEmail(EmailValidator.validate(email))
  });

  register = async () => {
    setRegisterDisable(true);
      try {
        if (email && validEmail) {
          if (
            password &&
            password2 &&
            password === password2 &&
            password.length > 6
          ) {
            if (name.length > 2) {
              await this._register(email, name, password);
              await setToken(email);
              //pass this in
              // await this.props.startLoginProcess();
            } else {
              alert('Name is too short');
              setRegisterDisable(false);
            }
          } else {
            alert('Passwords are mismatched');
            setRegisterDisable(false);
          }
        } else {
          alert('Invalid email');
          setRegisterDisable(false);
        }
      } catch (e) {
        setRegisterDisable(false);
        console.log(e);
      }
  };

  _register = async (email, name, password) => {
    try {
      let res = await Utility.PostToServer(url + '/newuser', {
        name: name,
        email: email,
        pw: password,
      });
      if (typeof res.err !== 'undefined' && res.err === 0) {
        return res;
      } else {
        console.log('Registration error : ', res.msg);
        let message = 'error';
        if (res.msg.indexOf('duplicate')) {
          message = email + ' already exists';
        }
        throw new Error(res.err);
      }
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };

  checkValid = () => {
    if (
      EmailValidator.validate(email) &&
      password === password2 &&
      password.length > 6 &&
      name.length > 2
    ) {
      setRegisterDisable(false);
    } else {
      setRegisterDisable(true);
    }
  };
  // set logged in token
  const setToken = async (email) => {
    console.log('settoken pre');
    let token = Utility.GenerateToken();

    console.log('settoken', token);
    await AsyncStorage.setItem(
      config.storage.key_prefix + 'local_token',
      token,
    );
    await Utility.PostToServer(url + '/token', {
      token: token,
      email: email,
    });
  };

  console.log(name, email, password, password2);
  const passwordsNotMarch = () => {
    if (password !== password2) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <SafeAreaView>
      <View style={{marginTop: '25%', padding: 30}}>
        <View style={{alignItems: 'center'}}>
          <H2>Hello, Welcome to Cayden's Care</H2>
          <H2>Please Register to proceed</H2>
        </View>
        <View style={{marginTop: 20}}>
          <Form>
            <Item fixedLabel>
              <Label>Name</Label>
              <Input
                onChangeText={(text) => setName(text)}
                placeholder={name}
              />
            </Item>
            <Item fixedLabel>
              <Label>Email</Label>
              <Input
                onChangeText={(text) => setEmail(text)}
                placeholder={email}
              />
            </Item>
          </Form>
        </View>
        <View>
          <Form>
            <PasswordTextBox
              icon="lock"
              label="Password"
              onChange={(v) => setPassword(v)}
            />
            <PasswordTextBox
              icon="lock"
              label="Retype Password"
              onChange={(v) => setPassword2(v)}
            />
          </Form>
          {!EmailValidator.validate(email) && (
            <Text style={{color: 'red'}}>Must be a valid Email address</Text>
          )}
          {name.length < 3 && (
            <Text style={{color: 'red'}}>Please enter a name</Text>
          )}
          {password !== '' && password.length < 8 && (
            <Text style={{color: 'red'}}>
              Password too short (8 characters minimum)
            </Text>
          )}
          {passwordsNotMarch() && (
            <Text style={{color: 'red'}}>Passwords do not match</Text>
          )}
        </View>
      </View>
      <View style={{marginHorizontal: 30}}>
        <Button
          block
          onPress={register}
          disabled={registerDisable}
          style={{backgroundColor: registerDisable ? 'lightgrey' : '#add8e6'}}>
          <Text>REGISTER</Text>
        </Button>
      </View>
      <View style={{marginTop: 80, alignSelf: 'center'}}>
        <Text
          onPress={() => props.navigation.goBack()}
          style={{fontSize: 24, color: '#72bcd4'}}>
          Go Back
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default Register;
