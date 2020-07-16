import React, {useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Form, Item, Input, Label, H2} from 'native-base';
import PasswordTextBox from '../components/PasswordTextBox.js';

function Register(Prop) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  console.log(name, email, password, password2);

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
              <Input onChangeText={(text) => setName(text)} />
            </Item>
            <Item fixedLabel>
              <Label>Email</Label>
              <Input onChangeText={(text) => setEmail(text)} />
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
          {password !== password2 && (
            <Text style={{color: 'red'}}>Passwords do not match</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Register;
