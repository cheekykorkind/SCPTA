import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  AppRegistry,
  TextInput,
  Button,
  Text
} from 'react-native';

import QRCode from 'react-native-qrcode';

function selectRender(condi, yesUI, noUI){
  if(condi){
    return yesUI;
  }else{
    return noUI;
  }
}

export default (Comp: ReactClass<*>) => {
  return ({ haveQR, QRstr, ETHnum, KRWnum, children, ...props }: Object) => (
    <View style={{
      flex: 1,
    }}>
      {selectRender(haveQR,
        <View style={styles.container}>
          <QRCode
          value={QRstr}
          size={250}
          bgColor='Black'
          fgColor='white'/>
          <Text style={styles.qrText}>내 QR 코드 {QRstr}</Text>
          <Text style={styles.qrText}>보유이더 : {ETHnum} ETH</Text>
          <Text style={styles.qrText}>원으로 환산 : {KRWnum} 원</Text>
        </View>
        ,
        <Comp {...props}>
          {children}
        </Comp>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
   },
  qrText:{
    fontSize: 20,
    textAlign: 'center',
  }
});
