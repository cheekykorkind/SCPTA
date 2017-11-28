import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { SmoothLine } from 'react-native-pathjs-charts';
import outStyles from '../../config/navStyles';

import { StatisticsChart }  from '../../config/Components/StatisticsChart';

export default class Statistics_Show extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: '통계 정보',
    headerTitleStyle: outStyles.navTitleText,
  });
  componentDidMount() {
    // console.log('이하는 statistics show임');
    // console.log(this.props.screenProps);
  }
  /*
    this.props.screenProps에 담긴 distributionChannels[]을
    screenProps으로 통째로 넘긴다.
  */
  render() {
    return (
      <View style={styles.container}>
        <StatisticsChart screenProps={this.props.screenProps}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'gray',
    // marginTop: 200
  },
});
