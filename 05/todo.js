const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");

const db_name = path.join(__dirname, "todo.db");
const db = new Database(db_name);

const app = express();
const PORT = 3000;
app.use(express.json());

const create_sql = `
  create table if not exists todos (
    id integer primary key autoincrement,
    task varchar(255),
    description text,
    completed boolean default 0,
    createdAt datetime default current_timestamp,
    updatedAt datetime default current_timestamp,
    priority integer default 1
)`;

db.exec(create_sql);

app.post("/todos", (req, res) => {
  const { task, description } = req.body;
  const sql = `
   insert into todos(task, description) 
   values( ?, ?)
  `;
  db.prepare(sql).run(task, description);
  res.status(201).json({
    success: true,
    message: "Todo 생성 성공",
  });
});

app.get("/todos", (req, res) => {
  const sql = `
  select * from todos
  `;
  const todos = db.prepare(sql).all();
  res.status(200).json({
    success: true,
    message: "Todos 조회 성공",
    data: todos,
  });
});

app.get("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const sql = `
  select * from todos where id = ?
  `;
  const todo = db.prepare(sql).get(id);

  if (!todo) return res.status(404).json({ message: "Cannot find given id" });
  res.status(200).json({
    success: true,
    message: "Todos 조회 성공",
    data: todo,
  });
});

app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const { task, description, completed, priority } = req.body;
  const sql = `
  update todos set task = ?, description = ?, completed = ? , priority = ?,
  updatedAt = current_timestamp where id = ?
  `;
  const todo = db.prepare(sql).run(task, description, completed, priority, id);

  if (todo.changes === 0)
    return res.status(404).json({ message: "Cannot find given id" });
  res.status(201).json({
    success: true,
    message: "Todo 수정 성공",
  });
});

app.patch("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const keys = Object.keys(req.body);
  const allowedFields = ["task", "description", "completed", "priority"];

  const fields = [];
  const values = [];

  keys.forEach((key) => {
    if (allowedFields.includes(key)) {
      fields.push(`${key} = ?`);
      values.push(req.body[key]);
    }
  });

  if (fields.length === 0)
    return res.status(400).json({ message: "업데이트할 필드가 없습니다." });

  fields.push("updatedAt = current_timestamp");

  const sql = `
  update todos set ${fields.join(", ")} where id = ?
  `;

  values.push(id);

  const todo = db.prepare(sql).run(...values);

  if (todo.changes === 0)
    return res.status(404).json({ message: "해당 ID를 찾을 수 없습니다." });

  res.json({ message: "Todo가 성공적으로 업데이트 되었습니다." });
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const sql = `
   delete from todos where id = ?
  `;
  const todo = db.prepare(sql).run(id);
  if (todo.changes === 0)
    return res.sendStatus(404).json({ message: "Cannot find given id" });

  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log("Sever started!");
});
