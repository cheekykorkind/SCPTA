
function plusZero(num, numLength){
  let zero = '';
  num = num.toString();

  if (num.length < numLength) {
    for (i = 0; i < numLength - num.length; i++){
      zero += '0';
    }
  }
  return zero + num;
}

export const getTxDate = () => {
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth()+1;
  let day = d.getDate();
  let result = plusZero(year,4)+plusZero(month,2)+plusZero(day,2);
  return result;
};
