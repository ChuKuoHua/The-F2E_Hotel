export default function getCheckDate(sDate1, sDate2) {
  console.log(sDate1, sDate2);
  
  let oDate1 = new Date(sDate1);
  let oDate2 = new Date(sDate2);
  let iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); // 把相差的毫秒數轉換為天數
  return iDays;
}