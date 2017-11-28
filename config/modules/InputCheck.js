/*
  사용자 입력이 올바른지 검사하는 모듈이다.
*/
export const inputCheck = (strType, str) => {
  if(strType === 'address'){
    if(str.length === 42){
      return true;
    }else{
      alert('잘못된 주소를 입력하셨습니다.');
      return false;
    }
  }else if(strType === 'remittance'){
    let re = new RegExp(/^[0-9]+$/);
    if(re.test(str)){
      return true;
    }else{
      alert('송금액을 잘못 입력하셨습니다.');
      return false;
    }
  }else if(strType === 'sumOfItem'){
    let re = new RegExp(/^[0-9]+$/);
    if(re.test(str)){
      return true;
    }else{
      alert('수량을 잘못 입력하셨습니다.');
      return false;
    }
  }else if(strType === 'itemName'){
    let _str = str.toLowerCase();
    if(_str === 'rice' || _str === 'glutinous_rice' || _str === 'soybean' || _str === 'potato'
     || _str === 'beansprouts' || _str === 'adzuki_beans' || _str === 'mung_beans'
     || _str === 'buckwheat' || _str === 'sweet_potato' || _str === 'chestnut'){
       return true;
    }else{
      alert('품목명을 잘못 입력하셨습니다.');
      return false;
    }
  }

};
