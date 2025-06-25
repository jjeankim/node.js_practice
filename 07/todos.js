const express = require("express");
const models = require("./models");
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/todos", async (req, res) => {
  const { task, description } = req.body;
  const todo = await models.Todo.create({
    task,
    description,
  });
  res.status(201).json({ message: "ok", data: todo });
});

app.get("/todos", async (req, res) => {
  const todos = await models.Todo.findAll();
  res.status(200).json({ message: "ok", data: todos });
});

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await models.Todo.findByPk(id);
  if (!todo)
    return res.status(400).json({ message: "할 일을 찾을 수 없어요." });
  res.status(200).json({ message: "ok", data: todo });
});

// app.put("/todos/:id", async (req, res) => {
//   const { id } = req.params;
//   const { task, description, completed, priority } = req.body;
//   const todo = await models.Todo.findByPk(id);

//   if (todo) {
//     if (task) todo.task = task;
//     if (description) todo.description = description;
//     if (completed) todo.completed = completed;
//     if (priority) todo.priority = priority;
//     await todo.save();
//     res.status(200).json({ message: "ok", data: todo });
//   } else return res.status(404).json({ message: "할 일이 없어" });
// });

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await models.Todo.findByPk(id);

  if (!todo) {
    return res.status(404).json({ message: "할 일이 없어" });
  }

  const { task, description, completed, priority } = req.body;
  await todo.update({ task, description, completed, priority });

  res.status(200).json({ message: "ok", data: todo });
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const result = await models.Todo.destroy({
    where: {
      id,
    },
  });
  if (result > 0) return res.sendStatus(204); // 삭제한 row의 수
  else return res.status(404).json({ message: "할 일이 없습니다." });
});

app.listen(PORT, () => {
  console.log("Sever Started!");
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("db connected!");
    })
    .catch(() => {
      console.log("db error");
    });
});
