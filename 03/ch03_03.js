const moment = require('moment');

const nowDate = moment();
console.log(nowDate.format('YYYY-MM-DD-HH:mm:ss'));
console.log(nowDate.format('YYYY년 MM월 DD일'));
console.log(nowDate.format('YYYY년 MM월 DD일 HH시 mm분 ss초'));

console.log(nowDate.format('YYYY/MM/DD'));

// 과거 날짜 포맷팅
const dateMoment = moment('2024-11-05') 
console.log(dateMoment.format('YYYY/MM/DD'));


const nextDays = nowDate.add(7,'months')
console.log(nextDays.format('MM/DD'));

// TimeDiff
const startDate = moment()
const endDate = moment('2025-08-20')
const diffDate = endDate.diff(startDate, 'days')
console.log(diffDate);


const tenDaysLater = startDate.add(100, 'days')
console.log(tenDaysLater.format('YYYY년 MM월 DD일'));

const dateDiff = moment('2025-09-20').diff(moment("2024-03-15"), 'months')
console.log(dateDiff);

const chrismas = moment('2025-12-25').diff(startDate,'days')
console.log(chrismas);
