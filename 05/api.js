const express = require("express");
const moment = require("moment");
const Database = require("better-sqlite3");
const path = require("path");

//DB setting
const db_name = path.join(__dirname, "post.db");
const db = new Database(db_name);

// express
const app = express();
const PORT = 3000;
app.use(express.json());

// 1.post.db 게시판 전용 테이블을 생성
const create_sql = `
  create table if not exists posts (
    id integer primary key autoincrement,
    title varchar(255),
    content text,
    author varchar(100),
    createdAt datetime default current_timestamp,
    count integer default 0
    )`;

db.exec(create_sql);

app.get("/posts", (req, res) => {
  let sql = `
    select * from posts order by createdAt desc
  `;
  const posts = db.prepare(sql).all();
  res.status(200).json(posts);
});

app.get("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  let sql = `
   select * from posts where id = ?
  `;
  const post = db.prepare(sql).get(id);

  if (!post) res.status(404).json({ message: "Cannot find given id" });
  res.json(post);
});

app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;
  let sql = `
  insert into posts(title, content, author)
  values( ?, ?, ?)
  `;
  db.prepare(sql).run(title, content, author);
  res.status(201).json({ message: "ok" });
});

app.put("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;
  let sql = `
   update posts set title = ?, content = ? where id = ?
  `;
  db.prepare(sql).run(title, content, id);
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  let sql = `
  delete from posts where id = ?
  `;
  const post = db.prepare(sql).run(id);

  if (post.changes === 0)
    res.status(404).json({ message: "Cannot find given id" });

  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log("Server started!");
});
