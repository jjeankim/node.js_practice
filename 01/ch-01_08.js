// const fetchData = (callback) => {
//   setTimeout(() => {
//     const data = "서버에서 받은 데이터";
//     callback(data);
//   }, 1000);
// };

// const handleData = (data) => {
//   console.log("콜백에서 받은 데이터", data);
// };

// // fetchData(handleData)

// const fetchPromise = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const success = true; //작업 성공 여부
//       if (success) resolve();
//       else reject();
//     }, 1000);
//   });
// };

const greet = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("안녕하세요");
      resolve("성공");
    }, 2000);
  });
};

greet().then((message) => {
  console.log(message);
});


