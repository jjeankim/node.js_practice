const express = require("express");
const moment = require("moment");
const Database = require("better-sqlite3");
const path = require("path");

const db_name = path.join(__dirname, "expense.db");
const db = new Database(db_name);

const app = express();
app.use(express.json());

const create_table = `
  create table if not exists expenses (
    id integer primary key autoincrement,
    title text not null,
    amount integer not null,
    date text default (date('now')) ,
    memo text default ''
    )
`;
db.exec(create_table);

const sendError = (res, status, message) => {
  return res.status(status).json({
    success: false,
    message,
  });
};

// 1. 가계부 입력 POST
app.post("/expenses", (req, res) => {
  try {
    const { title, amount, memo = "" } = req.body;
    const sql = `
    insert into expenses(title, amount, memo) 
    values( ?, ?, ?)`;

    db.prepare(sql).run(title, amount, memo);
    res.status(201).json({
      success: true,
      message: "가계부 생성 성공",
    });
  } catch (err) {
    sendError(res, 500, "가계부 생성 실패");
  }
});

// 2. 가계부 전체 목록 조회
app.get("/expenses", (req, res) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const totalCountRow = db.prepare('select count(*) as count from expenses').get();
    const totalCount = totalCountRow.count;

    const sql = `select * from expenses limit ? offset ?`;

    const expenses = db.prepare(sql).all(limit, offset);
    res.status(200).json({
      success: true,
      message: "가계부 조회 성공",
      totalCount : totalCount,
      totalPages: Math.ceil(totalCount / limit),
      data: expenses,
    });
  } catch (err) {
    sendError(res, 500, "가계부 전체 조회 실패");
  }
});

// 3. 가계부 목록 조회 (날짜)) /2025-06-23
app.get("/expenses/:date", (req, res) => {
  try {
    const date = req.params.date;
    const sql = `select * from expenses where date = ?`;
    const expenses = db.prepare(sql).all(date);
    if (expenses.length === 0) {
      return res
        .status(404)
        .json({ message: "해당 날짜의 가계부 항목기 없습니다." });
    }

    res.status(200).json({
      success: true,
      message: "가계부 조회 성공",
      data: expenses,
    });
  } catch (err) {
    sendError(res, 500, "가계부 조회 실패");
  }
});

// 4. 가계부 수정 /:id
app.put("/expenses/:id", (req, res) => {
  try {
    const id = req.params.id;
    const { title, amount, memo = "" } = req.body;
    const sql = `
    update expenses 
    set title = ?, amount = ?, date = date('now'), memo = ? 
    where id = ? `;

    const result = db.prepare(sql).run(title, amount, memo, id);
    if (result.changes === 0) {
      return sendError(res, 404, "수정할 항목을 찾을 수 없습니다.");
    }
    res.status(200).json({
      success: true,
      message: "가계부 수정 성공",
    });
  } catch (err) {
    sendError(res, 500, "가계부 수정 실패");
  }
});

// 5. 가계부 삭제 /:id
app.delete("/expenses/:id", (req, res) => {
  try {
    const id = req.params.id;
    const sql = `delete from expenses where id = ? `;
    const result = db.prepare(sql).run(id);

    if (result.changes === 0) {
      return sendError(res, 404, "삭제할 항목을 찾을 수 없습니다.");
    }
    res.status(204);
  } catch (err) {
    sendError(res, 500, "가계부 삭제 실패");
  }
});

app.listen(3000, () => {
  console.log("Server started!");
});
