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

// app.use((req, res, next) => {
//   console.log("나만의 미들웨어");
//   next();
// });

// post.db 게시판 전용 테이블을 생성
const create_sql = `
  create table if not exists posts (
    id integer primary key autoincrement,
    title varchar(255),
    content text,
    author varchar(100),
    createdAt datetime default current_timestamp,
    count integer default 0
    );
    
    create table if not exists comments (
    id integer primary key autoincrement,
    content text,
    author text not null,
    createdAt datetime default current_timestamp,
    postId integer,
    foreign key(postId) references posts(id) on delete cascade
    );
    `;

db.exec(create_sql);

// 페이지네이션 : 목록 내려줄때 개수 정해서 내려줌
app.get("/posts", (req, res) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = 10;
  const offset = (page - 1) * limit;
  let sql = `
    select * from posts limit ? offset ?
  `;
  const posts = db.prepare(sql).all(limit, offset);
  const totalCount = db
    .prepare(`select count(*) as count from posts`)
    .get().count;
  const totalPages = Math.ceil(totalCount / limit);

  res.status(200).json({
    currentPage: page,
    totalPages: totalPages,
    totalCount: totalCount,
    limit: limit,
    hasMore: page < totalPages,
    data: posts,
  });
});

app.get("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const ac_sql = `update posts set count = count +1 where id = ?`;
  db.prepare(ac_sql).run(id);
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
  const result = db.prepare(sql).run(title, content, author);
  const newPost = db
    .prepare(`select * from posts where id = ?`)
    .get(result.lastInsertRowid);

  res.status(201).json({ message: "ok", data: newPost });
});

app.put("/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;
  let sql = `
   update posts set title = ?, content = ? where id = ?
  `;
  db.prepare(sql).run(title, content, id);

  const updatedPost = db.prepare(`select * from posts where id = ?`).get(id);
  if (!updatedPost)
    return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  res.status(201).json({ message: "ok", data: updatedPost });
  // res.redirect("/posts");
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

// comments
app.post("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const { content, author } = req.body;
  const post = db.prepare(`select id from posts where id = ?`).get(postId);
  if (!post)
    return res.status(404).json({ message: "게시글을 찾을 수 없어요" });
  const sql = `insert into comments(postId, content, author) values(?,?,?);`;
  const result = db.prepare(sql).run(postId, content, author);

  const newComment = db
    .prepare(`select * from comments where id = ?`)
    .get(result.lastInsertRowid);
  res.status(201).json({ message: "ok", data: newComment });
});

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const comments = db
    .prepare(`select * from comments where postId = ? order by id desc ;`)
    .all(postId);

  res.status(200).json({ message: "ok", data: comments });
});

app.delete("/posts/:commentId/comments", (req, res) => {
  const commentId = req.params.commentId;
  const result = db.prepare(`delete from comments where id = ?`).run(commentId);
  if (result.changes === 0)
    return res.status(404).json({ message: "해당 댓글을 찾을 수 없습니다." });

  res.sendStatus(204);
});

app.put("/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  const { author, content } = req.body;

  const comment = db
    .prepare(`select * from comments where postId = ? and id = ?`)
    .get(postId, commentId);
  if (!comment) return res.status(404).json({ message: "댓글이 없어요" });

  const newAuthor = author !== undefined ? author : comment.author;
  const newComment = content !== undefined ? content : comment.content;

  db.prepare(`update comments set author = ?, content = ? where id = ?`).run(
    newAuthor,
    newComment,
    commentId
  );

  const updatedComment = db
    .prepare(`select * from comments where id = ?`)
    .get(commentId);
  res.status(200).json({ message: "ok", data: updatedComment });
});

app.listen(PORT, () => {
  console.log("Server started!");
});
