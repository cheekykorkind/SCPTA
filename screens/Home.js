import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
} from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgWidth: new Animated.Value(0),
      imgHeight: new Animated.Value(0),

    };
    this._initImgBoxSize = this._initImgBoxSize.bind(this);
    this._animateImgSize = this._animateImgSize.bind(this);
  }
  _initImgBoxSize(e){ //  이미지 사이즈는 조정되는데 그림자체가 짤린다.
    this._animateImgSize(e.nativeEvent.layout.width*0.7, e.nativeEvent.layout.height*0.7);
  }
  _animateImgSize(widthValue, heightValue){
    Animated.parallel([
      Animated.timing(this.state.imgWidth, {
        toValue: widthValue,
      }),
      Animated.timing(this.state.imgHeight, {
        toValue: heightValue,
      }),
    ]).start();
  }

  render() {
    const { navigate } = this.props.navigation;
    const img_resize = {
      resizeMode: 'contain',
      margin: 0,
      width: this.state.imgWidth,
      height: this.state.imgHeight
    };

    return (
			<View style={styles.container}>
				<View style={styles.level1_center_box}>{/*네모 4개를 감싸는 뷰*/}
					<View
            style={styles.level2_left}
            >{/*왼쪽 네모 2개를 감싸는 뷰*/}
						<TouchableOpacity // 왼쪽 위 네모
              style={[styles.raised, styles.level3_leftTop]}
							onPress={() => navigate('Seller_Input_StackNaviCover', { user: true })}
              onLayout={(event) => this._initImgBoxSize(event)}
							>
							<Animated.Image
								source={require('../config/images/makeDeal2.png')}
								style={img_resize}
								></Animated.Image>
							<Text>거래하기</Text>
						</TouchableOpacity>

						<TouchableOpacity //  왼쪽 아래 네모
              style={[styles.raised, styles.level3_leftBottom]}
							onPress={() => navigate('RealTimeWholesaleMarketPrice_Check', { user: 'Lucy' })}
              onLayout={(event) => this._initImgBoxSize(event)}
							>
							<Animated.Image
								source={require('../config/images/realTimeCheck2.png')}
								style={img_resize}
								></Animated.Image>
							<Text>실시간 도매시장 경매가격 확인</Text>
						</TouchableOpacity>
					</View>

					<View
            style={styles.level2_right}
            >{/*오른쪽 네모 2개를 감싸는 뷰*/}
						<TouchableOpacity //  오른쪽 위 네모
              style={[styles.raised, styles.level3_rightTop]}
							onPress={() => navigate('DistributionStructure_Search_StackNaviCover', { user: 'Lucy' })}
              onLayout={(event) => this._initImgBoxSize(event)}
							>
							<Animated.Image
								source={require('../config/images/DistributionCheck2.png')}
								style={img_resize}
								></Animated.Image>
							<Text>유통이력 조회</Text>
						</TouchableOpacity>
						<TouchableOpacity //  오른쪽 아래 네모
              style={[styles.raised, styles.level3_rightBottom]}
              onPress={() => navigate('MyQRcode_show', { user: 'Lucy' })}
              onLayout={(event) => this._initImgBoxSize(event)}
              >
              <Animated.Image
                source={require('../config/images/makeDealImg/address1.png')}
                style={img_resize}
                ></Animated.Image>
              <Text>내 QR 코드 보여주기</Text>
						</TouchableOpacity>
					</View>
				</View>

			</View>
    );
  }
}

var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  level1_center_box: {
    height: windowHeight * .8,
    width: windowWidth * .95,
    // borderColor: 'black',
    // borderWidth: 1,
    flexDirection: 'row',
    // backgroundColor: 'blueviolet'
  },
  level2_left: {
    flex: 1,
    paddingHorizontal: 3,
    flexDirection: 'column',
  },
  level2_right: {
    flex: 1,
    paddingHorizontal: 3,
    flexDirection: 'column',
  },
  level3_leftTop: {
    flex: 0.45,
    marginVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: 'black',
    // borderWidth: 1,
    backgroundColor: 'mediumpurple'
  },
  level3_leftBottom: {
    flex: 0.55,
    marginVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: 'black',
    // borderWidth: 1,
    backgroundColor: 'orange'
  },
  level3_rightTop: {
    flex: 0.55,
    marginVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: 'black',
    // borderWidth: 1,
    backgroundColor: 'dodgerblue'
  },
  level3_rightBottom: {
    flex: 0.45,
    marginVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: 'black',
    // borderWidth: 1,
    backgroundColor: 'deepskyblue'
  },
  raised: { //  그림자 효과
  ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        backgroundColor: '#fff',
        elevation: 2,
      },
    }),
    borderRadius: 5,
  },
});
// 왼쪽위 mediumpurple, 왼쪽아래 orange, 오른쪽 위 dodgerblue, 오른쪽 아래 deepskyblue
