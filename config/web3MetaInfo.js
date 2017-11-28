/*
 * web3.js에서 필요로 하는 정보를 한곳에 모아서 관리하기 위해 생성하였다.
 * 스마트 컨트랙트를 새로 생성하면 업데이트 해야하는곳은 아래와 같다.
 * 1. smartContractAddress
 * 2. abi
 */
export const Web3VO = {
   'myHouseIP': 'IP',
   'cslabWiFiIP': 'IP',
   'slaveIP': 'IP',
   'cnuWiFi': 'IP',
   'cslabGRRIP': 'IP',
   'IPaddress': 'IP',
   'fromAddress': '',
   'fromAddressPass': 'passPhrase',
   'selectedAccount': 'Account', //  web3SendTx의 getBalance함수에 쓰인다.
   'smartContractAddress': 'Address', //  스마트 컨트랙트 생성자가 built_in으로 여기 입력한다.
   'abi': JSON.parse(`abi`
  )
 };
