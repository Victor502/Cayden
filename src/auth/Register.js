import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Platform, ScrollView} from 'react-native';
import {Form, Item, Input, Label, H2, Button, Text, Toast, Spinner} from 'native-base';
import config from '../assets/config/config.js';
import Utility from '../assets/Utility.js';
import PasswordTextBox from '../components/PasswordTextBox.js';
import * as EmailValidator from 'email-validator';
import AsyncStorage from '@react-native-community/async-storage';

// for local development
let url = Platform.OS === 'ios'? config.api.aurl : config.api.url

function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  //set button disabled until ready to register
  const [registerDisable, setRegisterDisable] = useState(true);
  const [validEmail, setValidEmail] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    checkValid();
    setValidEmail(EmailValidator.validate(email))
  });

  const register = async () => {
    setRegisterDisable(true);
      try {
        if (email && validEmail) {
          if (
            password &&
            password2 &&
            password === password2 &&
            password.length > 7
          ) {
            if (name.length > 2) {
              let res = await _register(email, name, password);
              console.log('res', res)
              setLoading(true)
              if (typeof res !== 'undefined') {
                await setToken(email);
                setLoading(false)
              }
              setLoading(false)
            } else {
              alert('Name is too short');
              setRegisterDisable(false);
            }
          } else {
            alert('Passwords need to be fixed');
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

  const _register = async (email, name, password) => {
    try {
      let res = await Utility.PostToServer(url + '/newuser', {
        name: name,
        email: email,
        pw: password,
      });
      if (typeof res.err !== 'undefined' && res.err === 0) {
        return res;
      } else {
        Toast.show({
              text: res.msg,
              textStyle: { textAlign: 'center', marginVertical: 5 },
              type: "danger"
            })
      }
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };

  const checkValid = () => {
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

  const passwordsNotMarch = () => {
    if (password !== password2) {
      return true;
    } else {
      return false;
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
    <ScrollView>
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
                placeholder={'name'}
                value={name}
              />
            </Item>
            <Item fixedLabel>
              <Label>Email</Label>
              <Input
                onChangeText={(text) => setEmail(text)}
                placeholder={'example@email.com'}
                value={email}
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
              value={password}
            />
            <PasswordTextBox
              icon="lock"
              label="Retype Password"
              onChange={(v) => setPassword2(v)}
              value={password2}
            />
          </Form>
          {email.length > 0 && !EmailValidator.validate(email) && (
            <Text style={{color: 'red'}}>Must be a valid Email address</Text>
          )}
          {name.length > 0 && name.length < 3 && (
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
      </ScrollView>
    </SafeAreaView>
  );
}

export default Register;
