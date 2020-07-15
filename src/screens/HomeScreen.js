import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, SafeAreaView} from 'react-native';
import { Container, Header, Left, Body, Right, Icon, Title } from 'native-base';
import MyHeader from '../components/MyHeader.js';
import config from '../assets/config/config.js'
import Utility from '../assets/Utility'

function HomeScreen({navigation}) {
  const [data, setData] = useState('What');
  useEffect(() => {
    GetData()
  });

  const GetData = async () => {
    try {
      const res = await Utility.GetFromServer(config.api.url + '/test')
      if (res.err === 0) {
        setData(res.msg)
      } else {
        setData('error',res.err)
      }
    } catch(e) {
      console.log(e)
    }
  }
  return (
    <Container>
      <MyHeader/>
      <View style={style.container}>
        <Text style={style.header}>Cayden's Care</Text>
        <Text style={style.header}>{data}</Text>
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
