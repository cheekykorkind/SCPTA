import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  Image,
  Animated,
  Keyboard,
  AppRegistry
} from 'react-native';
import outStyles from '../../config/navStyles';
import { inputCheck, } from '../../config/modules/InputCheck';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { default as Web3 } from 'web3';

import { Web3VO } from '../../config/web3MetaInfo';
import {
  getBalance,
  unlockMyAccount,
  sendMyTx,
  getContractInstance,
} from '../../config/modules/web3SendTx';

import get1ETHrate from '../../config/Components/ETHtoKRWexchange_module';
import { getTxDate, } from '../../config/modules/DateModule';

import QRscenHOC from '../../config/Components/QRscenHOC';
const QRpart = QRscenHOC(KeyboardAvoidingView);  //  로딩 스피너도 같이 담당한다.

export default class Buyer_Input extends Component {
  constructor(props){
    super(props);
    this.state = {
      logging: false,
      scanState: false,
      scanedData: '',
      offsetY: new Animated.Value(0),
      VO: this.props.navigation.state.params.sellerInfo,  // 구매자가 거래 정보를 입력하는 UI에 대한 VO이다.
    }

    // 키보드를 피하기 위한 함수들
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
    this._foucsEnd = this._foucsEnd.bind(this);
    this._upperfoucsStart = this._upperfoucsStart.bind(this);

    // TextInput 입력, 출력 함수들
    this._setTextInput5 = this._setTextInput5.bind(this);
    this._setTextInput6 = this._setTextInput6.bind(this);
    this._ETHexchangeRate = this._ETHexchangeRate.bind(this);

    this._scanSucces = this._scanSucces.bind(this);
    this._startScan = this._startScan.bind(this);
    this._endScan = this._endScan.bind(this);

    this._submitTx = this._submitTx.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: '구매자가 입력합니다.',
      headerTitleStyle: outStyles.navTitleText,
      headerRight: (
        <TouchableOpacity
          onPress={ () => navigation.state.params.insideHeaderRight()}
        >
          <Image
            source={require('../../config/images/exchangeETH.png')}
            style={styles.headerRight_img_resize}
          />
        </TouchableOpacity>
      ),
    };
  };

  // keyboard 올라오는 이벤트를 위한 함수들
  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      insideHeaderRight: this._ETHexchangeRate.bind(this),
    });
  }

  // keyboard 올라오는 이벤트를 위한 함수들1
  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  // keyboard 올라왔을때 실행
  _keyboardDidShow (e) {
    if(this.refs.TextInput2.isFocused() ||
    this.refs.TextInput3.isFocused()){
      this._upperfoucsStart(e.endCoordinates.height);
    }
  }
  // keyboard 내려갔을때 실행
  _keyboardDidHide(){
    if(this.refs.TextInput2.isFocused() ||
    this.refs.TextInput3.isFocused()){
      this._foucsEnd();
    }else{
      this._foucsEnd();
    }
  }

  _foucsEnd() {
    Animated.timing(
      this.state.offsetY,
      { toValue: 0 }
    ).start();
  }
  _upperfoucsStart(keyBrdHeight) {
    Animated.timing(
      this.state.offsetY,
      { toValue: +keyBrdHeight*0.8}
    ).start();
  }

  _setTextInput5(text){
    this.state.VO.buyerAddress = text;
  }
  _setTextInput6(text){
    this.state.VO.buyerPassWord = text;
  }
  _ETHexchangeRate(){
    if(inputCheck('remittance', this.state.VO.remittance)){
      this.setState({ logging: true });
      let exchangedKRW = 0;
      get1ETHrate().then((currentKRW) => {
        exchangedKRW = this.state.VO.remittance / currentKRW;
        alert(
          `거래액은 \nKRW(원) : ${this.state.VO.remittance}\nETH(이더) : ${exchangedKRW}\n입니다.`
        );
        this.setState({ logging: false });
      });
    }
  }

  _scanSucces(e) {  //  QR 스캐너가 값을 읽을때 사용하는 함수
    this.setState({
      scanedData: e.data,
      VO: Object.assign({}, this.state.VO, {
        buyerAddress: e.data,
      }),
      scanState: false
    });
  }
  _startScan(){ //  Textinput이 onFocus상태일때 QR 스캐너로 진입시키는 함수
    this.setState({
      scanState: true
    });
  }
  _endScan(){
    this.setState({
      scanState: false
    });
  }
  // this.state.VO.wireTransfer = getTxDate();
  // this.state.VO.remittance; //  Seller_Input에서 전송받음.
  // this.state.VO.itemName; //  Seller_Input에서 전송받음.
  // this.state.VO.sumOfItem; //  Seller_Input에서 전송받음.
  // this.state.VO.sellerAddress; //  Seller_Input에서 전송받음.
  // this.state.VO.buyerAddress;
  // this.state.VO.buyerPassWord; // web3 unlock에 쓰자.
  // alert(`날짜 : ${this.state.VO.wireTransfer} \n송금액 : ${this.state.VO.remittance} \n품목명 : ${this.state.VO.itemName} \n수량 : ${this.state.VO.sumOfItem} \n판매자 주소 : ${this.state.VO.sellerAddress} \n구매자 주소 : ${this.state.VO.buyerAddress} \n구매자 비밀번호 : ${this.state.VO.buyerAddress}`);
  _submitTx(){
    this.state.VO.wireTransfer = getTxDate();
    let obj = new Object();
    obj.IPaddress = Web3VO.slaveIP;
    const web3a = new Web3(new Web3.providers.HttpProvider(obj));
    obj.abi = Web3VO.abi;
    obj.smartContractAddress = Web3VO.smartContractAddress;
    obj.fromAddress = this.state.VO.buyerAddress;
    obj.fromAddressPass = this.state.VO.buyerPassWord;

    unlockMyAccount(obj)
    .then((result1) => {
    	return sendMyTx(obj);
    })
    .then((getTxHash) => {
      if(inputCheck('address', this.state.VO.buyerAddress)){
        return new Promise((resolve, reject) => {
          getContractInstance(obj).sendCurrentTx(
      		getTxHash,
      		this.state.VO.sellerAddress,  //  판매자 account
      		this.state.VO.buyerAddress, // 구매자 account
      		this.state.VO.itemName, //  품목명
      		this.state.VO.sumOfItem, // 총 수량
      		this.state.VO.remittance, // 송금액
      		this.state.VO.wireTransfer, // 거래일시
      		{from: obj.fromAddress, gas: 2000000}, (error, result) => {
            if(!error){
              // console.log(result);
              resolve(true);
            }else{
              reject(Error(error));
            }
          });
        });
      }
    })
    .catch((errors) => {
      throw new Error(errors);
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
      		<Animated.View
      			style={[
      				{ transform: [{translateY: this.state.offsetY}] }
      			]}
      		  >
            <View style={styles.textInputContainer}>
            	<Image
            		source={require('../../config/images/makeDealImg/remittance1.png')}
            		style={styles.img_resize}
            		/>
            	<TextInput style = {styles.textInput}
            		ref='TextInput2'
            		underlineColorAndroid = '#7a42f4'
            		// placeholder = "송금액"
            		placeholderTextColor = "#9a73ef"
            		autoCapitalize = "none"
            		editable = {false}
                value={this.state.VO.remittance}
            		/>
            </View>
            <View style={styles.textInputContainer}>
            	<Image
            		source={require('../../config/images/makeDealImg/itemName1.png')}
            		style={styles.img_resize}
            		/>
            	<TextInput style = {styles.textInput}
            		ref='TextInput3'
            		underlineColorAndroid = '#7a42f4'
            		// placeholder = "품목명"
            		placeholderTextColor = "#9a73ef"
            		autoCapitalize = "none"
            		editable = {false}
                value={this.state.VO.itemName}
            		/>
            </View>
            <View style={styles.textInputContainer}>
            	<Image
            		source={require('../../config/images/makeDealImg/sumOfItem1.png')}
            		style={styles.img_resize}
            		/>
            	<TextInput style = {styles.textInput}
            		ref='TextInput4'
            		underlineColorAndroid = '#7a42f4'
            		// placeholder = "수량"
            		placeholderTextColor = "#9a73ef"
            		autoCapitalize = "none"
            		editable = {false}
                value={this.state.VO.sumOfItem}
            		/>
            </View>
            <View style={styles.textInputContainer}>
              <Image
            		source={require('../../config/images/makeDealImg/address1.png')}
            		style={styles.img_resize}
            		/>
            	<TextInput style = {styles.textInput}
            		ref='TextInput5'
            		underlineColorAndroid = '#7a42f4'
            		placeholder = "구매자 가상화폐 account"
            		placeholderTextColor = "#9a73ef"
            		autoCapitalize = "none"
                onFocus={ () => this._startScan() }
            		onChangeText = {this._setTextInput5}
                value={this.state.scanedData}
            		/>
            </View>
            <View style={styles.textInputContainer}>
            	<Image
            		source={require('../../config/images/makeDealImg/privateKey1.png')}
            		style={styles.img_resize}
            		/>
              <TextInput style = {styles.textInput}
                ref='TextInput6'
                underlineColorAndroid = '#7a42f4'
                placeholder = "구매자 account 비밀번호"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this._setTextInput6}
                />
            </View>

      			<TouchableOpacity
      				style = {styles.submitButton}
              onPress = {()=>{this._submitTx()}}
      			  >
      				<Text style = {styles.submitButtonText}> Submit </Text>
      			</TouchableOpacity>
      		</Animated.View>
      	</KeyboardAvoidingView>
      </QRpart>
    );
	}
}

// onPress = {()=>{alert(this.state.buyerAddress)}}

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center', //  이거 있어야만 KeyboardAvoidingView 된다
  },
	textInputContainer: {
    margin: 5,
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
    width: windowWidth * 0.78,
    margin: 0,
    marginTop: 18,
    textAlign:'center',
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
  },
  img_resize: {
    flex: 0.7,
    resizeMode: 'contain',
    margin: 0,
  },
  headerRight_img_resize: {
    flex: 1,
    resizeMode: 'contain',
    margin: 0,
  },
});
