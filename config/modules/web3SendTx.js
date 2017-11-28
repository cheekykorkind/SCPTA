import { default as Web3 } from 'web3';

// IPaddress, fromAddress, fromAddressPass
export const unlockMyAccount = (obj) => {
  const web3a = new Web3(new Web3.providers.HttpProvider(obj.IPaddress));
  return new Promise ((resolve, reject) => {
    web3a.personal.unlockAccount(obj.fromAddress, obj.fromAddressPass, 20, (error, result) => {
      if (!error) {
        console.log('tx hash : '+result);
        resolve(result);  //  unlock이 잘되면 true 반환한다.
      } else {
        console.log(error);
        reject(error);
      }
    });
  });
};

// IPaddress, txAmount, fromAddress, toAddress
// obj.txAmount = web3a.toWei('0.0002', 'ether'); //  약 0.3달러
export const sendMyTx = (obj) => {
  const web3a = new Web3(new Web3.providers.HttpProvider(obj.IPaddress));
  let txAmount = web3a.toWei(obj.txAmount, 'ether');
  return new Promise ((resolve, reject) => {
    web3a.eth.sendTransaction({
      from: obj.fromAddress,
      to: obj.toAddress,
      value: txAmount,
    }, (error, result) => {
      if (!error) { //  unlock 성공
        console.log(result);
        resolve(result);  //  tx hash 반환
      } else {
        console.log(error);
        reject(error);
      }
    });
  });
};

// abi, bytecode, fromAddress, param1, IPaddress
export const makeSmartContract = (obj) => { //  condi가 true면 unlock성공
  const web3a = new Web3(new Web3.providers.HttpProvider(obj.IPaddress));
  return new Promise ((resolve, reject) => {
    let contractInstance = web3a.eth.contract(obj.abi);
    let sendContractInstance = contractInstance.new(
      obj.param1,
      {
        from: obj.fromAddress,
        data: obj.bytecode,
        gas: '4300000'
      }, (error, contract) => {
        console.log(error, contract);
        if(!error){
          console.log(contract);
          resolve(contract);
        }else{
          console.log(error);
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


export const getGasLimit = (obj) => {
  const web3a = new Web3(new Web3.providers.HttpProvider(obj.IPaddress));
  return new Promise ((resolve, reject) => {
      web3a.eth.getBlock('latest', (error, result) => {
        if(!error){
          console.log(result.gasLimit);
          resolve(result.gasLimit);
        }else{
          console.log(error);
          reject(error);
        }
      });
  });
};

export const getGasPrice = (obj) => {
  const web3a = new Web3(new Web3.providers.HttpProvider(obj.IPaddress));
  return new Promise ((resolve, error) => {
    web3a.eth.getGasPrice((error, result) => {
      if(!error){
        console.log(result.toString());
        resolve(result.toString());
      }else{
        console.log(error);
        error(error);
      }
    });
  });
};

export const getBalance = (obj) => {
  const web3a = new Web3(new Web3.providers.HttpProvider(obj.IPaddress));
  return new Promise ((resolve, error) => {
    web3a.eth.getBalance(obj.selectedAccount, (error, result) => {
      if(!error){
        console.log(web3a.fromWei(result, 'ether').toString());
        resolve(web3a.fromWei(result, 'ether').toString());
      }else{
        console.log(error);
        error(error);
      }
    });
  });
}
