import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import outStyles from '../../config/navStyles';
import { inputCheck, } from '../../config/modules/InputCheck';

import QRscenHOC from '../../config/Components/QRscenHOC';
const QRpart = QRscenHOC(KeyboardAvoidingView);  //  로딩 스피너도 같이 담당한다.

export default class DistributionStructure_Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      logging: false,
      scanState: false,
      scanedData: '',
      sellerAddress: '',
    }
    this._goNextPage = this._goNextPage.bind(this);

    this._scanSucces = this._scanSucces.bind(this);
    this._startScan = this._startScan.bind(this);
    this._endScan = this._endScan.bind(this);
  }
	static navigationOptions = ({ navigation }) => ({
    title: '판매자 가상화폐 주소 입력',
    headerTitleStyle: outStyles.navTitleText,
	});

  /* Promise, await 비동기를 잘못사용한 가능성을 배제할수 없으나 원하는 기능인
   * 다음화면으로 넘어가기전까지 로딩화면 보여주기는 동작하지 않았다.
   * 그러나 setTimeout을 사용하면 시간값과 관계없이 내가 원하는 동작을 보여주었다.
   * 이유는 불명이다. 함수 호출순서와 js파일이 바뀌면서 컨텍스트가 바뀌고
   * 함수가 강제 종료되면서 Spinner가 꺼지는 것으로 추정해본다.
   */
   _goNextPage(){
     if(inputCheck('address',this.state.sellerAddress)){
       this.setState({ logging: true });
       setTimeout(() => {
         this.setState({ logging: false });
         this.props.navigation.navigate('PickItem_Search_StackNaviCover', {
            retailTraderAddress: this.state.sellerAddress
         }), 500
       });
     }
   }
  _scanSucces(e) {  //  QR 스캐너가 값을 읽을때 사용하는 함수
    this.setState({
      scanedData: e.data,
      sellerAddress: e.data,
      scanState: false
    });
  }
  _startScan(){ //  Textinput이 onFocus상태일때 QR 스캐너로 진입시키는 함수
    this.setState({
      scanState: true
    });
  }
  _endScan(){ //  QR 스캔이 종료될때 실행되는 함수
    this.setState({
      scanState: false
    });
  }

	render() {
		return (
      <QRpart
        spinner={this.state.logging}
        scanState={this.state.scanState}
        QRmethod={this._scanSucces}
        closingModal={this._endScan}
        style={styles.container}
      >
        <KeyboardAvoidingView
      		style={styles.container}
      		behavior="padding"
        	>
          <View style={styles.textInputContainer}>
            <Image
              source={require('../../config/images/makeDealImg/address1.png')}
              style={styles.img_resize}
              />
            <TextInput style = {styles.textInput}
              ref='TextInput5'
              underlineColorAndroid = '#7a42f4'
              placeholder = "판매자 가상화폐 주소"
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText={(text) => { this.setState({sellerAddress: text}) }}
              onFocus={ () => this._startScan() }
              value={this.state.scanedData}
              />
          </View>
          <TouchableOpacity
            style = {styles.submitButton}
            onPress={() => { this._goNextPage(); }}
            >
            <Text style = {styles.submitButtonText}> Submit </Text>
          </TouchableOpacity>
      	</KeyboardAvoidingView>
      </QRpart>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop:'10%',
    // justifyContent: 'center', //  이거 있어야만 KeyboardAvoidingView 된다
   },
  textInputContainer: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 0,
  },
  img_resize: {
    height: 40,
    width: '15%',
   	resizeMode: 'contain',
    margin: 0,
  },
  textInput: {
    height: 40,
    width: '85%',
    margin: 0,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    marginTop: 15,
    marginHorizontal: 15,
    height: 40,
  },
  submitButtonText:{
    textAlign:'center',
    color: 'white',
  }
});
