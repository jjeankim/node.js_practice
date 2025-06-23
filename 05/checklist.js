const express = require("express");
const path = require("path");
const Database = require("better-sqlite3");
const { stat } = require("fs");

const db_name = path.join(__dirname, "checklist.db");
const db = new Database(db_name);

const app = express();
app.use(express.json());

const create_table = `
  create table if not exists checklist(
  id integer primary key autoincrement,
  category text not null,
  item text not null,
  amount integer default 0,
  isChecked boolean default 1,
  createdAt datetime default current_timestamp,
  updatedAt datetime default current_timestamp)

`;

db.exec(create_table);

app.post("/checklist", (req, res) => {
  const { category, item} = req.body;
  const sql = `
    insert into checklist (category, item) values (?, ?)
  ;`;
  const checklistItem = db.prepare(sql).run(category, item);
  const newChecklistItem = db
    .prepare(`select * from checklist where id = ?`)
    .get(checklistItem.lastInsertRowid);
  res.status(201).json({
    message: "체크리스트 아이템 생성 성공",
    data: newChecklistItem,
  });
});

app.get("/checklist", (req, res) => {
  const { category } = req.query;

  let sql = `
  select * from checklist`;
  let checklist;

  if (category) {
    sql += ` where category = ? order by createdAt desc`;
    checklist = db.prepare(sql).all(category);
  } else {
    sql += ` order by createdAt desc;`;
    checklist = db.prepare(sql).all();
  }
  res.status(200).json({ message: "체크리스트 조회 성공", data: checklist });
});

app.put("/checklist/:id", (req, res) => {
  const { id } = req.params;
  const { category, item, isChecked } = req.body;

  const exiting = db.prepare(`select * from checklist where id = ?`).get(id);
  if (!exiting)
    return res
      .status(404)
      .json({ message: "해당 체크리스트 항목을 찾을 수 없습니다." });

  const updatedCategory = category !== undefined ? category : exiting.category;
  const updatedItem = item !== undefined ? item : exiting.item;
  const updatedChecked =
    isChecked !== undefined ? isChecked : exiting.isChecked;

  const sql = `
    update checklist set category = ?, item = ?, isChecked = ?, updatedAt = datetime('now')
    where id = ?
  `;
  db.prepare(sql).run(updatedCategory, updatedItem, updatedChecked, id);

  const updated = db.prepare(`select * from checklist where id = ?`).get(id);

  res.status(200).json({
    message: "체크리스트 수정 성공",
    data: updated,
  });
});

app.delete("/checklist/:id", (req, res) => {
  const { id } = req.params;
  const sql = `
    delete from checklist where id = ?;`;

  const checklistItem = db.prepare(sql).run(id);

  if (checklistItem.changes === 0)
    return res.status(404).json({ message: "아이템을 찾을 수 없습니다." });

  res.sendStatus(204);
});

app.listen(3000, () => {
  console.log("Server started!");
});
