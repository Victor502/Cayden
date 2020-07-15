import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import HeaderBackButton from './HeaderBackButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function MyHeader(props) {
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
    // <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
      // </Container>
  );
}

const styles = StyleSheet.create({
  leftContent: {flex: 1},
  centerContent: {flex: 1},
  rightContent: {flex: 1},
});

export default MyHeader;
