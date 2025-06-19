const express = require("express");
const moment = require("moment");
const app = express();

app.use(express.json());

const memos = [
  {
    id: 1,
    title: "회의록",
    content: "6월 18일 회의에서 프로젝트 일정 논의함",
    createdAt: moment().format('YYYY-MM-DD'),
  },
  {
    id: 2,
    title: "할 일 목록",
    content: "1. 보고서 작성, 2. 코드 리뷰, 3. 팀 회의",
    createdAt: moment().format('YYYY-MM-DD'),
  },
  {
    id: 3,
    title: "아이디어 노트",
    content: "챗봇 기능에 음성 입력 추가하면 좋을 듯",
    createdAt: moment().format('YYYY-MM-DD'),
  },
];

// 1. 목록 가져오기
app.get("/memos", (req, res) => {
  res.json(memos);
});

// 2. 해당 id memo 가져오기
app.get("/memos/:id", (req, res) => {
  const id = Number(req.params.id);
  const memo = memos.find((memo) => memo.id === id);

  if (memo) res.json(memo);
  else res.status(404).json({ message: "Cannot find given id" });
});

// 3. 메모쓰기
app.post("/memos", (req, res) => {
  const { title, content } = req.body;

  const newMemo = {
    id: memos.length + 1,
    title,
    content,
    createdAt: moment().format("YYYY-MM-DD"),
  };

  memos.push(newMemo);
  res.status(201).json(newMemo);
});

// 4. 메모 수정
app.put("/memos/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;
  const memo = memos.find((memo) => memo.id === id);
  if (!memo) res.status(404).json({ message: "Cannot find given id" });
  memo.title = title;
  memo.content = content;
  memo.createdAt = moment().format("YYYY-MM-DD");

  res.json(memo);
});

// patch
app.patch("/memos/:id", (req, res) => {
  const id = Number(req.params.id);
  const memo = memos.find((memo) => memo.id === id);
  if (memo) {
    Object.keys(req.body).forEach((key) => {
      memo[key] = req.body[key];
    });
    res.json(memo);
  } else res.status(404).json({ message: "Cannot find given id" });
});

app.delete("/memos/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = memos.findIndex((memo) => memo.id === id);

  if (idx >= 0) {
    memos.splice(idx, 1);
    res.sendStatus(204);
  } else res.status(404).json({ message: "Cannot find given id" });
});

app.listen(3000, () => {
  console.log("Server Started!");
});
