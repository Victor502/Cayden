import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

function MedicineScreen({navigation}) {
  return (
    <View style={style.container}>
      <Text style={style.header}>Cayden's Meds</Text>
      <Button
        onPress={() => navigation.navigate('Home')}
        title="Go to Home Screen"
      />
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

export default MedicineScreen;
