const express = require("express");

const app = express();
const PORT = 3000;
app.use(express.json());

const books = [
  {
    id: 1,
    title: "모던 자바스크립트 입문",
    author: "홍길동",
  },
  {
    id: 2,
    title: "리액트를 다루는 기술",
    author: "김코딩",
  },
  {
    id: 3,
    title: "파이썬 알고리즘 인터뷰",
    author: "박해커",
  },
  {
    id: 4,
    title: "자바의 정석",
    author: "남궁성",
  },
  {
    id: 5,
    title: "데이터베이스 시스템",
    author: "최DB",
  },
];

app.get("/books", (req, res) => {
  res.send(books);
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost${PORT}에서 실행중`);
});

