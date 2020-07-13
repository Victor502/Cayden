import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import HeaderBackButton from './HeaderBackButton';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Header(props) {
  const MenuOption = () => {
    return (
      <View>
        <Text style={{textAlign: 'center'}} onPress={props.onMenuPress}>
          Hamburger
        </Text>
        {/* <MaterialCommunityIcons
          name="menu"
          size={40}
          color="black"
          onPress={props.onMenuPress}
        /> */}
      </View>
    );
  };
  const leftButton = () => {
    if (props.leftComponent === 'back-button') {
      return <Text>Back button</Text>;
    } else {
      return <MenuOption />;
    }
  };
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
      }}>
      <View style={styles.leftContent}>{leftButton()}</View>
      <View style={styles.centerContent}>{props.centerComponent}</View>
      <View style={styles.rightContent}>{props.rightComponent}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  leftContent: {flex: 1},
  centerContent: {flex: 1},
  rightContent: {flex: 1},
});

export default Header;
