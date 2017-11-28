/*
  총 유통 경로 수 = distributionChannels.length
  경로 당 평균 도매 횟수 = distributionChannels[0].length + ...[마지막].length / distributionChannels.length
  경로 당 개당 평균 도매 가격 = distributionChannels[]의 모든 도매가의 합 / 총 품목 갯수
  개당 평균 도매 가격 = 모든 도매가의 합 / 총 품목 갯수

  (3) [Array(3), Array(2), Array(1)]
    0: (3) [Array(7), Array(7), Array(7)]
    1: (2) [Array(7), Array(7)]
    2: [Array(7)]

*/
// 총 유통 경로 수 = distributionChannels.length
function getTotalChannelsLength(distributionChannels){
  return distributionChannels.length;
}
// 경로 당 평균 도매 횟수 = distributionChannels[0].length + ...[마지막].length / distributionChannels.length
function getAverageWholesale_countPerChannel(distributionChannels){
  let result = oneChannelLength = 0;
  let totalChannelSLength = distributionChannels.length;
  for(let i = 0; i < totalChannelSLength; i++){
    result = result + distributionChannels[i].length;
  }
  return (result/totalChannelSLength).toFixed(0);
}

/* 경로 당 개당 평균 도매 가격 = distributionChannels[]의 모든 도매가의 합 / 총 품목 갯수
  1. BigNumber unmarshalling방법
    BigNumber {s: 1, e: 0, c: Array(1)}
    console.log(result.c[0]);
  2. 0번 스택은 배열 인덱스 0 이런식이다.
  3. getTx()의 결과값으로 배열에 값만
    string, address, address, string, uint, uint, string순서로 담겨있다.
    txIndex, sellerAddr, buyerAddr, itemName, volume, totalPrice, date
    ["0xaabb", "0xb1cd96427c550b2cc670c592c4ef061468e28731", "0xf4d8e706cfb25c0decbbdd4d2e2cc10c66376a3f", "rice", BigNumber, BigNumber, "20170902"]
*/
function getAverageWholesale_pricePerChannel(distributionChannels){
  let result = new Array();
  let totalItems = totalPrice =  0;

  let totalChannelSLength = distributionChannels.length;
  for(let i = 0; i < totalChannelSLength; i++){
    for(let n = 0; n < distributionChannels[i].length; n++){
      totalItems += distributionChannels[i][n][4].c[0];
      totalPrice += distributionChannels[i][n][5].c[0];
    }
    result.push( (totalPrice/totalItems).toFixed(0) );
  }

  return result;
}

// 개당 평균 도매 가격 = 모든 도매가의 합 / 총 품목 갯수
function getAverageWholesale_price(distributionChannels){
  let totalItems = totalPrice =  0;

  let totalChannelSLength = distributionChannels.length;
  for(let i = 0; i < totalChannelSLength; i++){
    for(let n = 0; n < distributionChannels[i].length; n++){
      totalItems += distributionChannels[i][n][4].c[0];
      totalPrice += distributionChannels[i][n][5].c[0];
    }
  }

  return (totalPrice/totalItems).toFixed(0);
}

export const unmarshalledDistributionChannelsData = (distributionChannels) => {
  let result = new Object();
  // avgPrices_perChannel 이 Array()인점 주의하기.
  result.totalChannelsLength = getTotalChannelsLength(distributionChannels);
  result.avgCounts_perChannel = getAverageWholesale_countPerChannel(distributionChannels);
  result.avgPrices_perChannel = getAverageWholesale_pricePerChannel(distributionChannels);
  result.avgPrices = getAverageWholesale_price(distributionChannels);

  return result;
};
