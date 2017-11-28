import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
  AsyncStorage,
} from 'react-native';
import { inputCheck, } from '../../config/modules/InputCheck';

import { Web3VO } from '../../config/web3MetaInfo';
import { getBalance,} from '../../config/modules/web3SendTx';
import get1ETHrate from '../../config/Components/ETHtoKRWexchange_module';

import QRCode from 'react-native-qrcode';

import QRregistHOC from '../../config/Components/QRregistHOC';
const QRScreen = QRregistHOC(View);

  /* 내 QR코드를 만드는 페이지이다.
   * 1. AsyncStorage를 HOC으로 조회시켜서
   *   저장된 QR string이 없으면 AsyncStorage에 QR string을 저장하게 한다.
   * 2. AsyncStorage를 HOC으로 조회시켜서
   *  저장된 QR string이 있으면 AsyncStorage의 QR string으로 QR코드를 만든다.
   */

export default class MyQRcode_show extends Component {
  constructor(props){
    super(props);
    this.state = {
      haveQR: false,
      QRstring: '',
      ETHBalance: 0,
      KRWBalance: 0,
    }
    this._generateQR = this._generateQR.bind(this);
    this._setTextInput = this._setTextInput.bind(this);
    this._finishInputText = this._finishInputText.bind(this);
  }

  /* 1 ETH 는 399115.653902원 이런식으로 나옴.
    x이더는 주어진다.
    1이더 : 399115.653902원 = x이더 : y원
    399115.653902 * x = 1 * y
    y = 399115.653902 * x
  */
  // testnum.toFixed(0); // 100 출력
  // testnum.toFixed(5); // 99.98765 출력

  componentWillMount(){
    AsyncStorage.getItem("myQR").then((value) => {
      if(value===null){ //  QR코드 없음
        this.setState({haveQR: false});
        throw new Error('Address를 입력하십시오.');
      }else{  //  QR코드 있음
        this.setState({
          haveQR: true,
          QRstring: value
        });
				return value;
      }
    })
		.then((myAddress) => {
			let obj = new Object();
			obj.IPaddress = Web3VO.slaveIP;
			obj.selectedAccount = myAddress;
			return obj;
		})
		.then((_obj) => {
      // 해당 account 잔고 조회
			return getBalance(_obj);
		})
		.then((ETHresult) => {
      // 이더리움(ETH) 잔고량 저장
			this.setState({
        ETHBalance: ETHresult
      });
		})
		.then(() => {
      // 1 ETH와 교환되는 원화(KRW)량을 알려줌.
      return get1ETHrate();
    })
    .then((krw) => {
      // ETH를 KRW으로 변환하고 저장함.
      let calKRW = (this.state.ETHBalance * krw).toFixed(0);
      this.setState({
        KRWBalance: calKRW
      });
    })
		.catch((error) => {
      alert(error);
    });
  }

  _setTextInput(text){
    this.setState({ QRstring: text });
  }
  _finishInputText(){
    if(inputCheck('address', this.state.QRstring)){
      AsyncStorage.setItem('myQR', this.state.QRstring).then(() => {
        alert('저장성공');
      }).catch((error) => {
        alert(error);
      });
    }
  }
  _generateQR(){
    this.setState({ logging: true });
  }

	render() {
		return (
      <QRScreen
        haveQR={this.state.haveQR}
        QRstr={this.state.QRstring}
        ETHnum={this.state.ETHBalance}
        KRWnum={this.state.KRWBalance}
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
              underlineColorAndroid = '#7a42f4'
              placeholder = "본인의 가상화폐 account를 입력합니다."
              placeholderTextColor = "#9a73ef"
              autoCapitalize = "none"
              onChangeText = {this._setTextInput}
              />
          </View>
          <TouchableOpacity
            style = {styles.submitButton}
            onPress={() => { this._finishInputText(); }}
            >
            <Text style = {styles.submitButtonText}> 내 QR 코드 만들기 </Text>
          </TouchableOpacity>
      	</KeyboardAvoidingView>
      </QRScreen>
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
