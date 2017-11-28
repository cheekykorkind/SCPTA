import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { TabNavigator } from "react-navigation";
import outStyles from '../../config/navStyles';

import Statistics_Show from './Statistics_Show';
import Trail_Show from './Trail_Show';

import { Web3VO } from '../../config/web3MetaInfo';
import {
  unmarshalledDistributionChannelsData,
} from '../../config/modules/unmarshallDistributionChannelsData';

const StatisticsAndTrail = TabNavigator({
  Statistics_Show: { screen: Statistics_Show },
  Trail_Show: { screen: Trail_Show }
});
/*
  this.props.navigation.state.params._distributionChannels에
  distributionChannels[] 배열이 들어있다.
*/
export default class StatisticsAndTrail_TabNaviCover extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params._md.itemName,
    headerTitleStyle: outStyles.navTitleText,
  });
// this.props.navigation.state.params._addressAndItem.retailTraderAddress
// this.props.navigation.state.params._addressAndItem.itemName
// this.props.navigation.state.params._distributionChannels
  componentDidMount() {
    // console.log('this is StatisticsAndTrail_TabNaviCover.js');
    // console.log(this.props.navigation.state.params._md.distributionChannels);
  }
  render() {
    return (
      <StatisticsAndTrail screenProps={this.props.navigation.state.params._md.distributionChannels} />
    );
  }
}
