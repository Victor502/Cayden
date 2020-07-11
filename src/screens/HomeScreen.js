import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View style={style.container}>
      <Text style={style.header}>Cayden's Care</Text>
    </View>
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
