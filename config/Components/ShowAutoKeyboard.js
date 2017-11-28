import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  Modal,
  Button,
  Text,
} from 'react-native';
import { inputCheck, } from '../../config/modules/InputCheck';

import Autocomplete from 'react-native-autocomplete-input';

import { food_crops } from '../imagesSource';

import { Web3VO } from '../../config/web3MetaInfo';
import {
  getDistributionChannelsData,
} from '../modules/getDistributionChannelsData';
// import {
//   unmarshalledDistributionChannelsData,
// } from '../modules/unmarshallDistributionChannelsData';

export class ShowAutoKeyboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,

      query: '',
      foods: '',
    }
    this._toggleModal = this._toggleModal.bind(this);
    this._findFood = this._findFood.bind(this);
    this._goNext = this._goNext.bind(this);
  }
  componentDidMount() {
    this.setState({
      foods: food_crops,
    });
  }

  _toggleModal(visible) {
     this.setState({ modalVisible: visible });
  }

  //  다음 쪽으로 가는 함수이다.
  // this.state.query는 Textinput에 쓰여있는 값을 의미한다.
  _goNext(){
    let checking = this._findFood(this.state.query);
    let compare = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    if(checking.length === 1 && compare(this.state.query, checking[0].name)){
      let obj = new Object();
      obj.retailTraderAddress = this.props.useNavigation.retailTraderAddress;
      obj.itemName = checking[0].name;

      if(inputCheck('itemName', obj.itemName)){
        getDistributionChannelsData(obj)
        .then((result1) => {
          let md = new Object();
          md.distributionChannels = result1;
          md.itemName = checking[0].name;
  
          setTimeout(() => {
            this.setState({ modalVisible: false });
            this.props.useNavigation.navi.navigate(
              'StatisticsAndTrail_TabNaviCover',
              { _md: md }
            ),
            100
          });
        });
      }
    }else{
      alert('없는 값');
    }
  }

  _findFood(query) {
    if (query === '') {
      return [];
    }

    const { foods } = this.state; //  this.state.foods를 짧게 쓰기 위한 방법이다.
    const regex = new RegExp(`${query.trim()}`, 'i');
    const results = foods.filter(food => food.name.search(regex) >= 0);

    // 자동완성 단어가 rice, glut_rice처럼 떠서 rice 눌러도 안지워지는걸 막기 위한 부분
    for(let i = 0; i < results.length; i++){
      if(results[i].name === query){
        const correctType = new Array();
        correctType.push(results[i]);
        return correctType;
      }
    }
    return results;
  }

  render() {
    const foods = this._findFood(this.state.query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <View style = {styles.container}>
        <Modal animationType = {"slide"} transparent = {true}
          visible = {this.state.modalVisible}
          onRequestClose={() => { this._toggleModal(!this.state.modalVisible) }}
          >
          <View style = {styles.modal}>
            <View style = {styles.AutoCompletecontainer}>
              <Autocomplete //  자동완성 키보드 부분
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor = "#9a73ef"
                containerStyle={styles.autocompleteInner}
                data={foods.length === 1 && comp(this.state.query, foods[0].name) ? [] : foods}
                defaultValue={this.state.query}
                onChangeText={text => this.setState({ query: text })}
                placeholder="농산물 품목을 입력하세요."
                renderItem={({ name }) => (
                  <TouchableOpacity onPress={() => this.setState({ query: name })}>
                    <Text style={styles.itemText}>
                      {name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style = {styles.submitKeyboard}>
              <Button
                title='완료'
                onPress = {this._goNext}
                color='#7a42f4'
                />
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          onPress = {() => {this._toggleModal(true)}}
          >
          <Image
            source={require('../images/ic_search_black_48dp.png')}
            style={styles.img_resize}
            />
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: { //  반투명해지는 영역이다. margin 건들지 말자.
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
    // position: 'absolute',
  },
  AutoCompletecontainer:{
    flex: 4,
    top: 20,
    marginHorizontal: 5,
  },
  submitKeyboard: { //  <AutoCompleteText/> 값을 제출할 버튼 스타일
    flex: 1,
    top: 20,
    marginHorizontal: 5,
    // position: 'absolute',
  },
  autocompleteInner: {  //  autocomplete 스타일
    flex: 1,
    zIndex: 1,
  },
  text: {
    color: '#3f2949',
    marginTop: 10
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  img_resize: {
    flex: 1,
    resizeMode: 'contain',
    margin: 0,
    // width: this.state.imgWidth,
    // height: this.state.imgHeight
  },
});
