import React, {useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Form, Item, Input, Label, H2, Button} from 'native-base';

function ForgotPassword(props) {
  const [email, setEmail] = useState('');
  const submitForgottenPW = () => {
    console.log('forgot what');
  };
  return (
    <SafeAreaView>
      <View style={{marginTop: '25%', padding: 30}}>
        <View style={{alignItems: 'center'}}>
          <H2>Please enter your email</H2>
        </View>
        <View style={{marginTop: 20}}>
          <Form>
            <Item fixedLabel>
              <Label>Email</Label>
              <Input
                onChangeText={(text) => setEmail(text)}
                placeholder={'your@email.com'}
                value={email}
              />
            </Item>
          </Form>
        </View>
      </View>
      <View style={{marginHorizontal: 30}}>
        <Button
          block
          onPress={() => submitForgottenPW()}
          disabled={false}
          style={{backgroundColor: '#add8e6'}}>
          <Text>SUBMIT</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default ForgotPassword;
