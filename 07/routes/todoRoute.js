const express = require("express");
const todoController = require("../controllers/todo");
const todoRouter = express.Router();

todoRouter
  .route("/")
  .post(todoController.createTodo)
  .get(todoController.getAllTodos);

  todoRouter
  .route("/:id")
  .get(todoController.getTodo)
  .put(todoController.updateTodo)
  .delete(todoController.deleteTodo);

  module.exports = todoRouter;