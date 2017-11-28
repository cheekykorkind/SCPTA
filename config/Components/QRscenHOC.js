import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Dimensions
} from 'react-native';

import Spinner from 'react-native-spinkit';
import QRCodeScanner from 'react-native-qrcode-scanner';

/*
 QR 스캐너가 필요한 부분만 HOC하려고 했는데 잘 안되서 전 화면을
 대상으로 했다.
*/

const selectRender = (condition, LoadingUI) => {
  if (condition) {
    return LoadingUI;
  } else {
    return null;
  }
};

export default (Comp: ReactClass<*>) => {
  return ({ spinner, scanState, QRmethod, closingModal,children, ...props }: Object) => (
    <View style={{ flex: 1 }}>
      <Comp {...props}>
        {children}
      </Comp>
      {selectRender(spinner,
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
      )}
			{selectRender(scanState,
        <Modal animationType = {"fade"} transparent = {false}
          visible = {scanState}
          onRequestClose = {closingModal}>
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
            <QRCodeScanner onRead = {QRmethod}/>
          </View>
        </Modal>
      )}
    </View>
  );
};
