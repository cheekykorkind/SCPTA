import { default as Web3 } from 'web3';
import { Web3VO } from '../web3MetaInfo';
import {
  unlockMyAccount,
  getContractInstance,
  myGetDistributionChannelStackIndex,
  myGetDistributionChannelStack,
} from './web3GetDistributionChannels';


/* react native에서 함수 부르는 방식에 맞추다보니 이렇게 됬다.
  objParam에 있어야 할것들
  obj.retailTraderAddress = "0xd5ff82c1ec6f6f834ec5b3ce9a039fa6fe86f40d";
  obj.itemName = "rice";
*/

export const getDistributionChannelsData = (objParam) => {
  let obj = new Object();
  obj.IPaddress = Web3VO.slaveIP;
  obj.abi = Web3VO.abi;
  obj.smartContractAddress = Web3VO.smartContractAddress;
  obj.fromAddress = Web3VO.fromAddress;
  obj.fromAddressPass = Web3VO.fromAddressPass;

  obj.retailTraderAddress = objParam.retailTraderAddress;
  obj.itemName = objParam.itemName;
  const web3a = new Web3(new Web3.providers.HttpProvider(obj));

  const distributionChannels = [];
  return unlockMyAccount(obj) // 프로미스 체인 자체를 return 안하면 undefined 된다. 주의
  .then(() => {
    return new Promise((resolve, reject) => {
      //  스마트 컨트랙트에 mapping에 저장된 모든 배열을 개수를 얻어온다.
      getContractInstance(obj).getMappingLength((error, result) => {
        if(!error){
          let maxLength = result.c[0];
          resolve(maxLength);
        }else{
          reject(error);
        }
      });
    });
  })
  .then((loopCounter) => {
    /* loopCounter에 총 유통경로 개수와 소매업자 account와
     소비자가 찾고자하는 품목명과 일치하는 유통경로의 위치를
     찾는다.
    */
    let DistributionChannelStackIndexParams = new Object();
    DistributionChannelStackIndexParams._retailTraderAddress = obj.retailTraderAddress;
    DistributionChannelStackIndexParams._itemName = obj.itemName;
    DistributionChannelStackIndexParams._mappingCounter = loopCounter;
    DistributionChannelStackIndexParams._obj = obj;
    let dcsi_result = myGetDistributionChannelStackIndex(DistributionChannelStackIndexParams);
    return dcsi_result;
  })
  .then((results) => {
    let stackInfo = [];
    for(let i = 0; i < results.length; i++){
      if(results[i][0]===true){
        stackInfo.push(results[i]);
      }
    }
    // 검색된 유통경로 위치를 바탕으로 실제 거래정보를 얻어온다.
    let dcs_result = myGetDistributionChannelStack(stackInfo, obj);
    return dcs_result;  //  예상값 : [{0,tx결과값}, ...]
  })
  .then((txs) => {
    // txs에는 1차원 배열로 거래들이 유통경로와 관련없이 저장되어 있다.
    // 이를 유통경로 별로 정리한다.
    let stacksCounter = txs[0]._stacksCounter; //  Tx가 존재하는 stack 총 갯수

    for(let i = 0; i < stacksCounter; i++){
      distributionChannels[i] = new Array();
      for(let n = 0; n < txs.length; n++){
        if(txs[n]._stackIndex === i){  //  stack을 구분해서 Tx를 저장하기 위함이다.
          distributionChannels[i].push(txs[n]._tx); //  예상값 : {"0xaavv, "0x9377493..."}
        }
      }
    }
    return distributionChannels;
  })
  .catch((errors) => {
    throw new Error(errors);
  });
};
