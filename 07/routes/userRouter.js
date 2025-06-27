const express = require("express");
const userController = require("../controllers/users");
const userRouter = express.Router();

userRouter
  .route("/")
  .post(userController.createUser)
  .get(userController.getAllUsers);

userRouter
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

  module.exports = userRouter;