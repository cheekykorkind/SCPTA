import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Animated
} from 'react-native'
import {
  Card,
  ListItem,
  Button,
  Badge
} from 'react-native-elements'

export class TrailCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barWidth: new Animated.Value(0),
      barContainerWidth: 0,
      badgeWidth: 0,
      badgeMaginLeft: new Animated.Value(0),
    };
    this._initAnimateStateValues = this._initAnimateStateValues.bind(this);
    this._animateBar = this._animateBar.bind(this);
  }
  _animateBar(moveValue) {
    const badgeMaginLeft = this.state.barContainerWidth*0.05 + moveValue - this.state.badgeWidth/2;
    Animated.parallel([
      Animated.timing(this.state.barWidth, {
        toValue: moveValue,
      }),
      Animated.timing(this.state.badgeMaginLeft, {
        toValue: badgeMaginLeft,
      }),
    ]).start();
  }
  // Bar를 감싸고 있는 View가 그려질때 호출되서 값들을 초기화 한다.
  _initAnimateStateValues(e){
    // 이 빈setState가 없으면 this.state.badgeWidth랑 this.state.barContainerWidth를
    // 초기화한 값이 View가 그려질때 반영되지 않는다. 이유 불명.
    this.setState({ });
    this.state.badgeWidth = e.nativeEvent.layout.width * 0.2;
    this.state.barContainerWidth = e.nativeEvent.layout.width;
    // View가 생성되는 순간에 animation을 반영하는 유일한 방법이
    // 여기다가 초기화용 animation함수를 실행하는 것이다.
    // this.props.wholeSaleCount*0.1 한건 자연수를 0 < x < 1 으로 만들어서
    // bar 길이에 반영하려고 하기 때문이다.
    this._animateBar(e.nativeEvent.layout.width*this.props.wholeSaleCount*0.1);
  }

	render() {
    const barStyles = {
      backgroundColor: 'darkorange',
      height: 40,
      width: this.state.barWidth,
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
    };
    const badgeStyles = {
      width: this.state.badgeWidth,
      marginLeft: this.state.badgeMaginLeft,
    };
		return (
      <Card
       containerStyle={styles.container}
       dividerStyle={styles.noDivider}
       >
        <Text style={styles.wholeSaleName}>
          유통 경로 {this.props.cardNumber+1}
        </Text>
        <Text style={styles.wholeSaleCount}>
          {this.props.wholeSaleCount}회
        </Text>
        <Text style={styles.wholeSaleInfo}>
          생산자와 소매상사이에 있었던 도매 횟수를 의미합니다.
        </Text>
        <View onLayout={(event) => this._initAnimateStateValues(event)}>
          <Animated.View style={badgeStyles}>
            <Badge
              textStyle = {styles.badgeText}
              value = {this.props.wholeSaleCount+'회'}
              />
          </Animated.View>
          <View style={styles.barCover}>{/*barCover가 margin 5%적용중이다.*/}
            <Animated.View style={barStyles}/>
          </View>
        </View>
      </Card>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    marginBottom: 15,
    backgroundColor: 'white',
    borderColor: '#e1e8ee',
    borderWidth: 1,
    padding: 15,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 0.5,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  noDivider:{ //  이거 추가하면 카드에서 회색줄 가는거 없앨수있다.
    display: 'none'
  },
  wholeSaleName:{ //  card title에 적용
    textAlign: 'center',
    color: '#4f9deb',
    fontSize: 30,  //  normalizeText.js생성하고 import 필요
    ...Platform.select({  //  import Platform 필요
      ios: {
        fontFamily: 'Sans Serif Black',
        fontWeight: '800',
      },
      android: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
      },
    }),
  },
  wholeSaleCount:{ //  card 내부 text에 적용
    textAlign: 'center',
    fontSize: 40,
    ...Platform.select({
      ios: {
        fontFamily: 'Sans Serif Bold',
        fontWeight: '700',
      },
      android: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
      },
    }),
  },
  wholeSaleInfo: { //  card 내부 text에 적용
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    color: 'darkgray',
    ...Platform.select({
      ios: {
        fontWeight: '600',
      },
      android: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
      },
    }),
  },
  // 이하는 Bar 관련 style이다.
  badgeText:{
    color: 'orange',
  },
  barCover: {
    marginHorizontal: '5%',
    backgroundColor: 'darkgray',
  },
});
