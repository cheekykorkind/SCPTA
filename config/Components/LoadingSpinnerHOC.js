import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Dimensions
} from 'react-native';

import Spinner from 'react-native-spinkit';

const selectRender = (condition, UIcontent) => {
  if (condition) {
    return UIcontent;
  } else {
    return null;
  }
};

export default (Comp: ReactClass<*>) => {
  //  중괄호 안에 선언된 변수는 Object 타입이라는 것이다.
  return ({ spinner, children, ...props }: Object) => (
    <View style={{ flex: 1 }}>
      <Comp {...props}>
        {children}
      </Comp>
      {spinner &&
          <Modal animationType = {"fade"} transparent = {true}
            visible = {true}
            onRequestClose = {() => {}}>
            <View style={{
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
              position: 'absolute',
              margin: 0,
              padding: 0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}>
              <Spinner
                isVisible={true}
                size={100}
                type={'WanderingCubes'}
                color={'#FFFFFF'}/>
            </View>
          </Modal>
        }
    </View>
  );
};
