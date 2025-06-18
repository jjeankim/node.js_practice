// const arr = [5, 23, "hello", true, "world", -9];

// console.log(arr);
// console.log(arr[1]);

// for (let i = 0; i < arr.length; i++) {
//   console.log(arr[i]);
// }

// let i = 0;
// while (i < arr.length) {
//   console.log(arr[i]);
//   i++
// }

// for (item of arr) {
//   console.log(item);
// }

// const arr = [1, 2, '멈춰', 3,4, true, false]

// for(el of arr) {
//   if (el === '멈춰') break;
//   console.log(el)
// }

const arr2 = [5, 10, 15, 20, 25];

for (el of arr2) {
  if (el >= 20) break;
  console.log(el);
}

console.log("------");

const arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (el of arr3) {
  if (el % 2 === 1) continue;
  console.log(el);
}

console.log("------");

for (let i = 1; i <= 10; i++) {
  if (i % 3 === 0) continue;
  console.log(i);
}

console.log("------");

const arr4 = ["사과", 1, "바나나", 2, "포도", false];

for (el of arr4) {
  if (typeof el !== "string") continue;
  console.log(el);
}


