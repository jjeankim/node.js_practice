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
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);

  const book = books.find((book) => book.id === id);
  if (book) res.json(book);
  else {
    res.status(404).json({ message: "Cannot find given id" });
  }
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, author } = req.body;
  const book = books.find((book) => book.id === id);

  if (!book) res.status(404).json({ message: "Cannat find given id" });

  book.title = title;
  book.author = author;
  res.json(book);
});

app.patch("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);

  if (!book) es.status(404).json({ message: "Cannot find given id" });
  
  Object.keys(req.body).forEach((key) => {
    book[key] = req.body[key];
  });

  res.json(book);
});

app.delete("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = books.findIndex((book) => book.id === id);

  if (idx >= 0) {
    books.splice(idx, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: "Cannot find given id" });
  }
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost${PORT}에서 실행중`);
});
