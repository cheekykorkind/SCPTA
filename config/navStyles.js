
/* 네비게이션 헤더의 Text 스타일을 관리한다.
 * 1. route.js에서 navigationOptions headerTitleStyle에
 *   스타일을 일관적으로 적용하기 위한 파일이다.
 * 2. route.js에 const styles를 만들면 실행 순서에 영향을 받아서
 *   route.js 코드 읽는데 불편해서 따로 만들었다.
 */

import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  navTitleText: {
    fontSize: 20,
    alignSelf: 'center',
  },
  tabLabelText:{
    fontSize: 15,
    color: 'black',
    alignSelf: 'center',
  },
  tabContainer:{
    backgroundColor: 'white',
  },
  tabIndicator:{
    backgroundColor: 'darkgrey',
  },
});

export default styles;
