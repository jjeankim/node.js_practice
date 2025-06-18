// let date = new Date()

// console.log(date)

// if (date.getHours() < 12) console.log(`오전입니다 : ${date.getHours()}`);
// else if (date.getHours() >= 12) console.log(`오후입니다 : ${date.getHours()}`);

// let date = new Date();

// let hours = date.getHours();

// if (hours < 11) console.log("아침 먹을 시간 입니다");
// else {
//   if (hours < 15) console.log("점심 먹을 시간 입니다");
//   else console.log("저녁 먹을 시간 입니다");
// }

// const temp = 24;

// if (temp >= 30) console.log("더운 날씨 입니다");
// else if (temp >= 20) console.log("따듯한 날씨 입니다");
// else if (temp >= 10) console.log("선선한 날씨 입니다");
// else console.log("추운 날씨 입니다");

// let day = new Date().getDay();

// console.log(day);

// switch (day) {
//   case 1:
//     console.log("월요일");
//     break;
//   case 2:
//     console.log("화요일");
//     break;
//   case 3:
//     console.log("수요일");
//     break;
//   case 4:
//     console.log("목요일");
//     break;
//   case 5:
//     console.log("금요일");
//     break;
//   case 6:
//     console.log("토요일");
//     break;
//   case 0:
//     console.log("일요일");
//     break;
//   default:
//     console.log("알수 없는 요일");
// }


const name = ""
const displayName = name || '익명';

console.log(`환영합니다 ${name}님`);


// null 병합 연산자
const userInput = null;
const defautValue = '기본값';
const result = userInput ?? defautValue;
console.log(`결과 : ${result}`);

//조건부 실행
const isLoggedIn = false;
isLoggedIn && console.log('로그인 되었습니다');


