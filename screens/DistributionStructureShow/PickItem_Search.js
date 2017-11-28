import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native'
import {
  Card,
} from 'react-native-elements';
import outStyles from '../../config/navStyles';
import { inputCheck, } from '../../config/modules/InputCheck';

import { ShowAutoKeyboard }  from '../../config/Components/ShowAutoKeyboard';
import { food_crops } from '../../config/imagesSource';

import { Web3VO } from '../../config/web3MetaInfo';
import {
  getDistributionChannelsData,
} from '../../config/modules/getDistributionChannelsData';

import LoadingSpinnerHOC  from '../../config/Components/LoadingSpinnerHOC';
const ScreenName = LoadingSpinnerHOC(View);  //  다른데서View다

/* imagesSource.js에 있는 JSON array에서 값을 받아와서 Card로 출력한다.
 * image 컴포넌트에 경로지정할때, static한 변수만 사용해야해서
 * imagesSource.js에 const 변수를 따로 만들고 JSON array에 포함시키는 방법을 택했다.
 */

// 자동완성에서 다음 페이지로 값 넘기는거 꼬이면 이름 바꾸기
var addressAndItem = new Object();

export default class PickItem_Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logging: false,
      _retailTraderAddress: this.props.screenProps,
    };
    this._goNextPage = this._goNextPage.bind(this);

    addressAndItem.retailTraderAddress = this.props.screenProps;
  }

  static navigationOptions = ({ navigation }) => {
    // var addressAndItem쓴건 headerRight에 넘기는 유일한 방법이었음.
    addressAndItem.navi = navigation;
    return {
      title: '조회할 품목 선택',
      headerTitleStyle: outStyles.navTitleText,
      headerRight: (
        <ShowAutoKeyboard useNavigation={addressAndItem}/>
      ),
    };
  };

  _goNextPage(foodName){
    let obj = new Object();
    obj.retailTraderAddress = this.state._retailTraderAddress;
    obj.itemName = foodName;

    if(inputCheck('itemName', obj.itemName)){
      this.setState({ logging: true });
      getDistributionChannelsData(obj)
      .then((result1) => {
        let md = new Object();
        md.distributionChannels = result1;
        md.itemName = obj.itemName;

        setTimeout(() => {
          this.setState({ logging: false });
          this.props.navigation.navigate(
            'StatisticsAndTrail_TabNaviCover',
            { _md: md }
          ),
          100
        });
      });
    }
  }

	render() {
		return (
      <ScreenName
        spinner={this.state.logging}
        style={styles.container}
      >
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
             {
              food_crops.map((u, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style = {styles.cardContainer}
                    onPress={() => { this._goNextPage(u.name); }}
                    >
                      <Card
                        title={u.name}
                        containerStyle={styles.cardInner}
                        >
                        <View style={{flex:1}}>
                          <Image
                            source={u.img[i]}
                            style={styles.img_resize}
                            />
                        </View>
                      </Card>
                  </TouchableOpacity>
                 );
               })
             }
          </ScrollView>
        </View>
      </ScreenName>
		);
	}
}


const windowSize = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    // backgroundColor: 'blue'
  },
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
  cardContainer:{
    width: windowSize.width *0.9,
    height: windowSize.height * 0.35,
    padding: 0,
  },
  cardInner:{
    width: windowSize.width *0.9,
    height: windowSize.height * 0.35,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin:0,
  },

  img_resize: {
    width: windowSize.width *0.8,
    height: windowSize.height * 0.25,
    margin: 0,
    resizeMode: 'contain',
  },
  activityIndicator: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     height: 80
  },
});
