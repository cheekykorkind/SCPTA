import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import {StackNavigator} from 'react-navigation';

import Home from './screens/Home';
import Seller_Input_StackNaviCover from './screens/MakeDeal/Seller_Input_StackNaviCover';
import DistributionStructure_Search_StackNaviCover from './screens/DistributionStructureShow/DistributionStructure_Search_StackNaviCover';
import RealTimeWholesaleMarketPrice_Check from './screens/RealTimeWholesaleMarketPriceShow/RealTimeWholesaleMarketPrice_Check';
import MyQRcode_show from './screens/MyQRcodeShow/MyQRcode_show';


const RouteConfigs = {
    Home: {screen:Home}, //  StackNavigator의 결과로 보여질 첫화면
    Seller_Input_StackNaviCover: {screen:Seller_Input_StackNaviCover},  //  nevigate()로 이동할수있는 화면
    DistributionStructure_Search_StackNaviCover: {screen:DistributionStructure_Search_StackNaviCover},
    RealTimeWholesaleMarketPrice_Check: {screen:RealTimeWholesaleMarketPrice_Check},
    MyQRcode_show: {screen:MyQRcode_show},
}

const StackNavigatorConfig = {
    headerMode: 'none',
}

const HomeComponent = StackNavigator(RouteConfigs, StackNavigatorConfig)

AppRegistry.registerComponent('SCPTA', () => HomeComponent);
