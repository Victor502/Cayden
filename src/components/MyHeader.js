import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import HeaderBackButton from './HeaderBackButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function MyHeader(props) {
  
  return (
        <Header style={{backgroundColor: '#add8e6'}} androidStatusBarColor={'#add8e6'} noShadow>
          <Left>
            <Button transparent onPress={props.onMenuPress}>
              <Icon name='menu' style={{color: '#fff'}}/>
            </Button>
          </Left>
          <Body>
            <Title style={{color: '#fff'}}>Cayden's Care</Title>
          </Body>
          <Right>
            {/* <Button transparent>
              <Icon name='menu' />
            </Button> */}
          </Right>
        </Header>
  );
}

const styles = StyleSheet.create({
  leftContent: {flex: 1},
  centerContent: {flex: 1},
  rightContent: {flex: 1},
});

export default MyHeader;
