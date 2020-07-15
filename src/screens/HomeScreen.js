import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, SafeAreaView} from 'react-native';
import Header from '../components/Header.js';
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
        console.log(res)
      if (res.err === 0) {
        setData(res.msg)
      } else {
        setData(res.err)
      }
    } catch(e) {
      console.log(e)
    }
  }
  return (
    <SafeAreaView style={style.container}>
      <Header
        onMenuPress={() => navigation.openDrawer()}
        centerComponent={<Text style={{textAlign: 'center'}}>LOGO</Text>}
        rightComponent={<Text style={{textAlign: 'center'}}>Helper</Text>}
      />
      <View style={style.container}>
        <Text style={style.header}>Cayden's Care</Text>
        <Text style={style.header}>{data}</Text>
      </View>
    </SafeAreaView>
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
