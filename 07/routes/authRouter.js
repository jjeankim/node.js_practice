const express = require("express");
const authController = require("../controllers/auth");
const { validateRegister } = require("../middleware/validation");

const authRouter = express.Router();

authRouter
  .post("/register", validateRegister, authController.register)
  .post("/login", authController.login);

module.exports = authRouter;
