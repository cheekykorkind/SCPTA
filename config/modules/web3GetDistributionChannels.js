import { default as Web3 } from 'web3';

// IPaddress, fromAddress, fromAddressPass
export const unlockMyAccount = (obj) => {
  const web3a = new Web3(new Web3.providers.HttpProvider(obj.IPaddress));
  return new Promise ((resolve, reject) => {
    web3a.personal.unlockAccount(obj.fromAddress, obj.fromAddressPass, 20, (error, result) => {
      if (!error) {
        // console.log(result);
        resolve(result);  //  unlock이 잘되면 true 반환한다. 디버깅 끝나면 result resolve에서 뺴기
      } else {
        // console.log(error);
        reject(error);
      }
    });
  });
};

// abi, bytecode, fromAddress, IPaddress
export const makeSmartContract = (obj) => { //  condi가 true면 unlock성공
  const web3a = new Web3(new Web3.providers.HttpProvider(obj.IPaddress));
  return new Promise ((resolve, reject) => {
    let contractInstance = web3a.eth.contract(obj.abi);
    let sendContractInstance = contractInstance.new(
      {
        from: obj.fromAddress,
        data: obj.bytecode,
        gas: '2100000'
      }, (error, contract) => {
        // console.log(error, contract);

        if(!error){
          // console.log(contract);
          if (typeof contract.address !== 'undefined'){
              resolve(contract);
          }
        }else{
          // console.log(error);
          reject(error);
        }
      }
    );
  });
};

// abi, smartContractAddress, IPaddress
export const getContractInstance = (obj) => {
  const web3a = new Web3(new Web3.providers.HttpProvider(obj.IPaddress));
    let myContract = web3a.eth.contract(obj.abi);
    let myContractInstance = myContract.at(obj.smartContractAddress);
    return myContractInstance;
}

// _retailTraderAddress, _itemName, _mappingCounter

export const myGetDistributionChannelStackIndex = (DistributionChannelStackIndexParams) => {
  let promises = [];
  let loopCounter = DistributionChannelStackIndexParams._mappingCounter;

  for(let i = 0; i < loopCounter; i++){
    let temp = new Promise((resolve, reject) => {
      getContractInstance(DistributionChannelStackIndexParams._obj).getDistributionChannelStackIndex(
      DistributionChannelStackIndexParams._retailTraderAddress,
      DistributionChannelStackIndexParams._itemName,
      i,
      (error, result) => {
        if(!error){
          resolve(result);
        }else{
          reject(error);
        }
      });
    });
    promises.push(temp);
  }
  return Promise.all(promises);
}

// true를 가진 stackInfo를 전부 받아와서 2중 for()를 하면 된다.
// getTx(stackInfo[i][1].c[0], stackInfo[i][2].c[0]);
// _stackIndex, _stackLength, 얘는 따로 obj
export const myGetDistributionChannelStack = (stackInfo, obj) => {
  let promises = [];
  let stacksCounter = stackInfo.length;

  for(let i = 0; i < stacksCounter; i++){
    let stackIndex = stackInfo[i][1].c[0];  //  mapping에서 stack의 위치
    let stackLength = stackInfo[i][2].c[0]; //  선택한 stack의 크기
    for(let n = 0; n < stackLength; n++){
      let temp = new Promise((resolve, reject) => {
        getContractInstance(obj).getTx(
        stackIndex,
        n,
        (error, result) => {
          if(!error){
            let txResult = {
                _stackIndex: i,
                _stacksCounter: stacksCounter,
                _tx: result
            };
            resolve(txResult);
          }else{
            reject(error);
          }
        });
      });
      promises.push(temp);
    }
  }
  return Promise.all(promises);
}
