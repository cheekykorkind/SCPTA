/*
 *  구매자가 거래 정보를 입력하는 UI에 대한 VO이다.
 *  관련정보는 송금일, 송금액, 품목명, 수량, 구매자 가상화폐 주소, 구매자 개인키이다.
 *
 */
export const DealRequirementVO = {
   'wireTransfer': '', //  송금일
   'remittance': 0,  //  송금액
   'itemName': '', //  품목명
   'sumOfItem': 0,  //  수량
   'sellerAddress': 's',
   'buyerAddress': 'c',  //  구매자 가상화폐 주소
   'buyerPassWord': 'd'  //  구매자 개인키
 };
