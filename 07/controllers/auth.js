const models = require("../models");
const bcrypt = require("bcryptjs");
const generateAccessToken = require("../utils/token");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await models.User.create({
    email,
    name,
    password: hashedPassword,
  });

  res.status(201).json({ message: "ok", data: user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await models.User.findOne({
    where: {
      email,
    },
  });
  if (!user)
    return res.status(400).json({ message: "Invalid email and password1" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(400).json({ message: "Invalid email and password2" });

  const accessToken = generateAccessToken(user);
  res.json({ message: "ok", accessToken });
};

module.exports = {
  register,
  login,
};
