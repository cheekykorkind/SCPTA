import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Card,
} from 'react-native-elements';
import outStyles from '../../config/navStyles';

import { TrailCards }  from '../../config/Components/TrailCards';
import { food_crops } from '../../config/imagesSource';

/*
 * map함수의 index로 유통경로 번호 표시하고 bar 길이를 조정했다.
 * Trail_Show.js에서 card 갯수를 결정한다.
 * card에 변경적용하고 싶은 값이 있으면 Trail_show.js의 props로 내려보낸다.
 * TrailCards.js는 card 낱개의 UI만 담당한다.
 */
export default class Trail_Show extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: '개별 유통 경로 정보',
    headerTitleStyle: outStyles.navTitleText,
  });
  componentDidMount() {
    // console.log('이하는 trail show임');
    // console.log(this.props.screenProps);
  }

  // 숫자 i로 유통경로 번호 표시하고 bar 길이를 조정했다.
  // food_crops.name을 전달해서 Text에 표현해보자
  // u는 map의 base인 배열의 원소를 의미하고, i는 돌고있는 인덱스를 의미한다.
  // this.props.screenProps에는 소매업자 account, 소비자가 원하는 품목과 관련된
  // 유통경로 정보가 담겨있다.
	render() {
		return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
       {
         this.props.screenProps.map((u, i) => {
           return (
             <TrailCards
              key={i}
              cardNumber={i}
              wholeSaleCount={u.length}
              />
           );
         })
       }
      </ScrollView>
		);
	}
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  }
});
