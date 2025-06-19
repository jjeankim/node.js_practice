// 1.Express 모듈 가져오기
const express = require("express");

// 2.Express 애플리케이션 설정
const app = express();

// 3.Port 설정
const PORT = 3000;

// 4.라우팅 설정
app.get("/",(req,res) => {
  res.send('Hello world')
})

app.get('/hello',(req,res) => {
  res.send('hello 경로로 들어왔습니다.')
  console.log('hello 경로로 들어왔습니다.');
})

app.get('/world',(req,res) => {
  res.send('안녕 /world 주소에 접근하였습니다.')
})




app.listen(3000, () => {
  console.log(`서버가 http://localhost:${PORT} 실행 중 입니다.`);
});
