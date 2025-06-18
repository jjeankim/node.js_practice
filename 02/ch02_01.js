// commonjs
const fs = require("fs");

// 파일 쓰기
// fs.writeFileSync('test.txt', 'hello world')
// console.log('파일 쓰기 완료');

// fs.writeFileSync('text.txt', '안녕하세요. 반갑습니다. 제 이름은 김진입니다.')
// console.log('파일 쓰기 완료');

// 파일 읽기
// const data = fs.readFileSync('test.txt','utf-8');
// console.log(data);

// console.log(fs.readFileSync('text.txt','utf-8'))

// const stats1 = fs.statSync('test.txt')
// console.log(stats1);

// fs.writeFile("async-test.txt", "Async Hello World", (err) => {
//   if (err) console.log(err);
//   console.log("비동기 파일 쓰기 완료");
// });

// fs.writeFile("async-hello.text", "비동기 파일 쓰기 테스트", (err) => {
//   if (err) console.log(err);
//   console.log("비동기 파일 쓰기 연습 완료");
// });

// fs.readFile("async-test.txt", "utf-8", (err, data) => {
//   if (err) console.log("읽기 에러", err);
//   console.log("비동기 파일 읽기", data);
// });

const fsPromise = require("fs").promises;

// const fileOp = async () => {
//   try {
//     await fsPromise.writeFile('promise-test.txt','promise hello world')
//     const data = await fsPromise.readFile('promise-test.txt','utf-8')
//     console.log('파일 읽기',data);

//   } catch (error) {
//     console.log(error)
//   }
// }

// fileOp();

const fileOp2 = async () => {
  try {
    await fsPromise.writeFile("test.txt", "테스트입니다.");
    const data = await fsPromise.readFile("test.txt", "utf-8");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

fileOp2();
