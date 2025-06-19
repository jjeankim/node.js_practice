const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>첫 번 째 마이 홈피</title>
      </head>
      <body>
        <h1>첫 번째 익스프레스 홈</h1>
        <nav>
          <a href="/">홈</a>
          <a href="/about">소개</a>
          <a href="/contact">연락처</a>
        </nav>
        <p>익스프레스로 만든 간단한 홈페이지 입니다.</p>
      </body>
    </html>
    `);
});

app.get("/about", (req, res) => {
  res.send(`
    <h1>소개 페이지</h1>
    <p>이 홈페이지는 익스프레스 학습을 위해 만들었어요.</p>
    `);
});

app.get("/contact", (req, res) => {
  res.send(`
    <h1>연락처 페이지</h1>
    <p>이 홈페이지는 익스프레스 학습을 위해 만들었어요.</p>
    `);
});

app.listen(3000, () => {
  console.log("서버시작");
});

