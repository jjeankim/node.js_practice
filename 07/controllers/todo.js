const models = require("../models")

exports.createTodo = async (req, res) => {
  const { task, description } = req.body;
  const todo = await models.Todo.create({
    task,
    description,
  });
  res.status(201).json({ message: "ok", data: todo });
}

exports.getAllTodos = async (req, res) => {
  const todos = await models.Todo.findAll();
  res.status(200).json({ message: "ok", data: todos });
}

exports.getTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await models.Todo.findByPk(id);
  if (!todo)
    return res.status(400).json({ message: "할 일을 찾을 수 없어요." });
  res.status(200).json({ message: "ok", data: todo });
}

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await models.Todo.findByPk(id);

  if (!todo) {
    return res.status(404).json({ message: "할 일이 없어" });
  }

  const { task, description, completed, priority } = req.body;
  await todo.update({ task, description, completed, priority });

  res.status(200).json({ message: "ok", data: todo });
}

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  const result = await models.Todo.destroy({
    where: {
      id,
    },
  });
  if (result > 0) return res.sendStatus(204); // 삭제한 row의 수
  else return res.status(404).json({ message: "할 일이 없습니다." });
}