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

app.get("/todos", (req, res) => {});

app.get("/todos/:id", (req, res) => {});

app.put("/todos/:id", (req, res) => {});

app.delete("/todos/:id", (req, res) => {});

app.listen(PORT, () => {
  console.log("Sever Started!");
  models.sequelize
    .sync({ force: true })
    .then(() => {
      console.log("db connected!");
    })
    .catch(() => {
      console.log("db error");
    });
});


