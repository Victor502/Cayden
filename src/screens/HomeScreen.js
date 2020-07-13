import React from 'react';
import {View, Text, Button, StyleSheet, SafeAreaView} from 'react-native';
import Header from '../components/Header.js';

function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={style.container}>
      <Header
        onMenuPress={() => navigation.openDrawer()}
        centerComponent={<Text style={{textAlign: 'center'}}>LOGO</Text>}
        rightComponent={<Text style={{textAlign: 'center'}}>Helper</Text>}
      />
      <View style={style.container}>
        <Text style={style.header}>Cayden's Care</Text>
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
