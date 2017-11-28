import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {StackNavigator} from 'react-navigation';

import PickItem_Search from './PickItem_Search';
import StatisticsAndTrail_TabNaviCover from './StatisticsAndTrail_TabNaviCover';

const RouteConfigs = {
    PickItem_Search: {screen:PickItem_Search},
    StatisticsAndTrail_TabNaviCover: {screen:StatisticsAndTrail_TabNaviCover},
}
const StackNavigatorConfig = {
    headerMode: 'float',
}
const PickItemStatisticsTrail = StackNavigator(RouteConfigs, StackNavigatorConfig);

export default class PickItem_Search_StackNaviCover extends Component {
  componentDidMount() {
      // console.log('this is PickItem_Search_StackNaviCover.js');
  }
  render() {
    return (
      <PickItemStatisticsTrail screenProps={this.props.navigation.state.params.retailTraderAddress} />
    );
  }
}
