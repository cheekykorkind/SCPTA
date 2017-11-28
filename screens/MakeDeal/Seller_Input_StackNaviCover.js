import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {StackNavigator} from 'react-navigation';

import Seller_Input from './Seller_Input';
import Buyer_Input from './Buyer_Input';

const RouteConfigs = {
    Seller_Input: {screen:Seller_Input},  //  StackNavigator의 결과로 보여질 첫화면
    Buyer_Input: {screen:Buyer_Input},  //  nevigate()로 이동할수있는 화면
}

const SellerAndInputComponent = StackNavigator(RouteConfigs);  //  대문자 써야 component로 인식한다.

export default class Seller_Input_StackNaviCover extends Component {
  componentDidMount() {
      // console.log('this is Seller_Input_StackNaviCover.js');
      // console.log(this.props.navigation.state.params.user);
  }
  render() {
    return (
      <SellerAndInputComponent screenProps={this.props.navigation.state.params.user} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
