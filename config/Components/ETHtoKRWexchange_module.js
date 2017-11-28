const ETHtoKRWexchange_module = () => {
  return fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=KRW', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((response) => {
    if(response.status === 200){  //  response는 status같은 정보가 있다.
      return response.json(); //  .json()을 써줘야 return 받은 값이 JSON으로 보인다.
    }else{  //  응답이 비정상적이면 에러를 발생시킨다.
      throw new Error(response.status);
    }
  }).then((responseJSON) => {
    // let exchangeETHtoKRW = '1 ' + responseJSON[0].symbol + ' = ' + responseJSON[0].price_krw + ' KRW';
    return responseJSON[0].price_krw;
  }).catch((error) => {
    return error;
  });
};

module.exports = ETHtoKRWexchange_module;
