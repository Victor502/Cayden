import React, {useEffect, useState, useContext} from 'react';
import {View, Text, Button, StyleSheet, SafeAreaView, Platform} from 'react-native';
import {Container, Header, Left, Body, Right, Icon, Title} from 'native-base';
import MyHeader from '../components/MyHeader.js';
import config from '../assets/config/config.js';
import Utility from '../assets/Utility';
import {AuthContext, StateContext} from '../context/context.js'

// for local development
let url = Platform.OS === 'ios'? config.api.aurl:config.api.url

function HomeScreen(props) {
  const [data, setData] = useState('What');
  useEffect(() => {
    // GetData();
  });
  // loginState, authActions
  const authActions = useContext(AuthContext)
  const loginState = useContext(StateContext)
  const {signOut} = authActions
  const {user} = loginState

  const GetData = async () => {
    try {
      console.log()
      const res = await Utility.GetFromServer(url + '/test');
      if (res.err === 0) {
        setData(res.msg);
      } else {
        setData('error', res.err);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const menu = () => {
    props.navigation.toggleDrawer();
  };
  console.log('home props', props, user)
  return (
    <Container>
      <MyHeader onMenuPress={menu} />
      <View style={style.container}>
        <Text style={style.header}>Cayden's Care</Text>
        <Text style={style.header}>{data}</Text>
        <Text style={style.header}>{user && user.name}</Text>
      <Button
        onPress={() => signOut()}
        title="LogOut"
      />
      </View>
    </Container>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 45,
  },
});

export default HomeScreen;
