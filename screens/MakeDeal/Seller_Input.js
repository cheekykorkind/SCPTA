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
  AppRegistry,
  AsyncStorage,
} from 'react-native';
import outStyles from '../../config/navStyles';
import { inputCheck, } from '../../config/modules/InputCheck';

import { DealRequirementVO } from '../../config/data';  // 리눅스 처럼 경로를 계산한다.

import get1ETHrate from '../../config/Components/ETHtoKRWexchange_module';
import LoadingSpinnerHOC  from '../../config/Components/LoadingSpinnerHOC';
const ScreenName = LoadingSpinnerHOC(KeyboardAvoidingView);  //  다른데서View다

export default class Seller_Input extends Component {

  constructor(props){
    super(props);
    this.state = {
      logging: false,
      scanState: false,
      sellerAddressState: true,
      offsetY: new Animated.Value(0),
      VO: DealRequirementVO,  // 구매자가 거래 정보를 입력하는 UI에 대한 VO이다.
    }

    // 키보드를 피하기 위한 함수들
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
    this._foucsEnd = this._foucsEnd.bind(this);
    this._upperfoucsStart = this._upperfoucsStart.bind(this);

    // TextInput 입력, 출력 함수들
    this._setTextInput2 = this._setTextInput2.bind(this);
    this._setTextInput3 = this._setTextInput3.bind(this);
    this._setTextInput4 = this._setTextInput4.bind(this);
    this._setTextInput5 = this._setTextInput5.bind(this);
    this._goNextPage = this._goNextPage.bind(this);
    /* _ETHexchangeRate 함수를 주석처리한 이유
      navigationOptions에 넣으려면
      this.props.navigation.setParams시점에서 .bind(this)를 사용하고,
      UI Component를 <ExchangeKRWtoETH /> 같이 사용하면 안된다.
    */
    // this._ETHexchangeRate = this._ETHexchangeRate.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: '판매자가 입력합니다.',
      headerTitleStyle: outStyles.navTitleText,
      headerRight: (
        <TouchableOpacity
          onPress={ () => navigation.state.params.insideHeaderRight()}
        >
          <Image
            source={require('../../config/images/exchangeETH.png')}
            style={styles.img_resize}
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

  // navigationOptions의 headerRight에 값을 전달에 활용할 함수
  componentDidMount() {
    // console.log('this is Seller_Input.js');
    // console.log(this.props.screenProps);
    this.props.navigation.setParams({
      insideHeaderRight: this._ETHexchangeRate.bind(this),
    });

    // DB에서 판매자 address를 가져옴. 없으면 입력하게 한다.
    AsyncStorage.getItem("myQR").then((value) => {
      if(value===null){ //  QR코드 없음
        this.setState({sellerAddressState: true});
      }else{  //  QR코드 있음
        this.setState({
          sellerAddressState: false,
          VO: Object.assign({}, this.state.VO, {
            sellerAddress: value,
          }),
        });
      }
    }).catch((error) => {
      alert(error + 'DB 에러');
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
  _setTextInput2(text){ //  송금액
    this.setState({
      VO: Object.assign({}, this.state.VO, {
        remittance: text,
      }),
    });
  }
  _setTextInput3(text){ // 품목명
    this.state.VO.itemName = text;
  }
  _setTextInput4(text){ //  수량
    this.state.VO.sumOfItem = text;
  }
  _setTextInput5(text){ //  판매자 가상화폐 account
    this.state.VO.sellerAddress = text;
  }
  _ETHexchangeRate(currentKRW){
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
  _goNextPage(){
    if(inputCheck('address', this.state.VO.sellerAddress) && inputCheck('remittance',this.state.VO.remittance)
     && inputCheck('itemName', this.state.VO.itemName) && inputCheck('sumOfItem', this.state.VO.sumOfItem)){
      this.setState({ logging: true });
      setTimeout(() => {
        this.setState({ logging: false });
        this.props.navigation.navigate('Buyer_Input', { sellerInfo: this.state.VO }),
        50
      });
    }
  }

	render() {
    return (
      <ScreenName
        spinner={this.state.logging}
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
            		placeholder = "송금액"
            		placeholderTextColor = "#9a73ef"
            		autoCapitalize = "none"
            		onChangeText = {this._setTextInput2}
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
            		placeholder = "품목명"
            		placeholderTextColor = "#9a73ef"
            		autoCapitalize = "none"
            		onChangeText = {this._setTextInput3}
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
            		placeholder = "수량"
            		placeholderTextColor = "#9a73ef"
            		autoCapitalize = "none"
            		onChangeText = {this._setTextInput4}
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
            		placeholder = "판매자 가상화폐 account"
            		placeholderTextColor = "#9a73ef"
            		autoCapitalize = "none"
                editable = {this.state.sellerAddressState}
                value={
                  this.state.VO.sellerAddress === 's' ? null : this.state.VO.sellerAddress
                }
            		onChangeText = {this._setTextInput5}
            		/>
            </View>

      			<TouchableOpacity
      				style = {styles.submitButton}
              onPress = {() => { this._goNextPage(); }}
      			  >
      				<Text style = {styles.submitButtonText}> Submit </Text>
      			</TouchableOpacity>
      		</Animated.View>
      	</KeyboardAvoidingView>
      </ScreenName>
    );
	}
}
// value={this.state.VO.sellerAddress}

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center', //  이거 있어야만 KeyboardAvoidingView 된다
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
    flex: 1,
    // height: 40,
    // width: '15%',
    resizeMode: 'contain',
    margin: 0,
  },
});
