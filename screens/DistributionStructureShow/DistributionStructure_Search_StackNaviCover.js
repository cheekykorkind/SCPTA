import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {StackNavigator} from 'react-navigation';

import DistributionStructure_Search from './DistributionStructure_Search';
import PickItem_Search_StackNaviCover from './PickItem_Search_StackNaviCover';

const RouteConfigs = {
    DistributionStructure_Search: {screen:DistributionStructure_Search},
    PickItem_Search_StackNaviCover: {screen:PickItem_Search_StackNaviCover},
}
const StackNavigatorConfig = {
    headerMode: 'none',
}

const DistributionStructureAndPickItem = StackNavigator(RouteConfigs, StackNavigatorConfig);

export default class DistributionStructure_Search_StackNaviCover extends Component {
  componentDidMount() {
      // console.log('this is DistributionStructure_Search_StackNaviCover.js');
  }
  render() {
    return (
			<DistributionStructureAndPickItem screenProps={'sdfsdfs'} />
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
