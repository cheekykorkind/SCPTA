import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, } from 'react-native';
import { SmoothLine } from 'react-native-pathjs-charts';

import { Web3VO } from '../../config/web3MetaInfo';
import {
  unmarshalledDistributionChannelsData,
} from '../modules/unmarshallDistributionChannelsData';

// import { valueSourceCover } from '../ChartDataSource';

export class StatisticsChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 총 유통 경로 수, 경로 당 평균 도매 횟수,
      // 경로 당 개당 평균 도매 가격, 개당 평균 도매 가격을 배열로 저장한다.
      unmarshalledData: unmarshalledDistributionChannelsData(this.props.screenProps),
    };
  }
  /*
    x축은 각 유통 경로를 의미한다.
    y축은 각 유통 경로의 평균 도매가를 의미한다.
    this.props.screenProps은 distributionChannels[] 배열이다.
  */
  render() {
    let DCDatas = this.state.unmarshalledData;
    let valueSourceCover = new Array();
    let valueSource = new Array();
    valueSourceCover[0] = valueSource;
    for(let i = 0; i < DCDatas.totalChannelsLength; i++){
      valueSource.push({
        "x": i,
        "y": Number(DCDatas.avgPrices_perChannel[i]),
      });
    }

    let data = valueSourceCover;

    let options = {
      height: Dimensions.get('window').height * 0.4,
      width: Dimensions.get('window').width * 0.7,
      color: '#deb887', //  string으로 색 설정이 안됨. burlywood
      margin: {
        top: 20,
        left: 45,
        bottom: 25,
        right: 20,
      },
      animate: {
        type: 'delayed',
        duration: 200
      },
      axisX: {
        showAxis: true, //  그래프 테두리 아래쪽의 선을 의미함.
        showLines: false, //  그래프 내부의 Y축 표시선을 의미함
        showLabels: true,  //  그래프 옆에 나오는 글씨표시여부를 의미함
        showTicks: true, // 그래프 테두리의 점 표시여부를 의미함
        zeroAxis: false,  // data안의 모든 x값을 더해서 0이 되는 지점에 그래프 내부 중심에 X축 굵은 선을 표시한다.
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 14,
          fontWeight: true,
          fill: 'black'
        }
      },
      axisY: {
        showAxis: false, //  그래프 테두리 왼쪽의 선을 의미함.
        showLines: true, //  그래프 내부의 X축 표시선을 의미함
        showLabels: true,  //  그래프 옆에 나오는 글씨표시여부를 의미함
        showTicks: false, // 그래프 테두리의 점 표시여부를 의미함
        zeroAxis: false,  // data안의 모든 y값을 더해서 0이 되는 지점에 그래프 내부 중심에 Y축 굵은 선을 표시한다.
        orient: 'left',  //  그래프 테두리를 기준으로 왼쪽 or 오른쪽에 label을 위치시킬지를 의미함
        label: {
          fontFamily: 'Arial',
          fontSize: 14,
          fontWeight: true,
          fill: 'black', //  글자색
        }
      }
    }
    /*
      총 유통 경로 수 = distributionChannels.length
      경로 당 평균 도매 횟수 = distributionChannels[0].length + ...[마지막].length / distributionChannels.length
      경로 당 개당 평균 도매 가격 = distributionChannels[]의 모든 도매가의 합 / 총 품목 갯수
      개당 평균 도매 가격 = 모든 도매가의 합 / 총 품목 갯수
    */
    return (
      <View style={styles.container}>
        <SmoothLine data={data} options={options} xKey='x' yKey='y' />
        <Text>총 유통 경로 수 : {this.state.unmarshalledData.totalChannelsLength}</Text>
        <Text>경로 당 평균 도매 횟수 : {this.state.unmarshalledData.avgCounts_perChannel}</Text>
        <Text>개당 평균 도매 가격 : {this.state.unmarshalledData.avgPrices}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'gray',
    // marginTop: 200
  },
});
