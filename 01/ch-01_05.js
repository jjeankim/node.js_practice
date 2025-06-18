// function add1 (x,y) {
//   return x + y
// }

// console.log(add1(1,2))

// const add2 = function(x,y) {
//   return x + y;
// }

// console.log(add2(2,3));

// const add3 = (x, y) => x + y

// console.log(add3(3,4));

// const ten = (cb) => {
//   for(let i = 0; i < 10; i++) {
//     cb()
//   }
// }

// ten(() => console.log('call function'))

setTimeout(() => console.log("1초 뒤 호출"), 1000);

const timer = setInterval(() => console.log("1초 마다 실행"), 1000);

clearInterval(timer)