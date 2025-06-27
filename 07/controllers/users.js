const bcrpyt = require("bcryptjs")
const models = require("../models");

// 유저 생성, 회원가입
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrpyt.hash(password,10)
  const user = await models.User.create({
    name,
    email,
    password: hashedPassword,
  });
  res.status(201).json({ message: "회원가입 완료", data: user });
};

const getAllUsers = async (req, res) => {
  const users = await models.User.findAll();
  res.status(200).json({ message: "사용자 정보 가져오기 성공", data: users });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await models.User.findByPk(id);
  if (!user)
    return res.status(404).json({ message: "사용자 정보 가져오기 실패" });

  res.status(200).json({ message: "ok", data: user });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { password, name } = req.body;

  const user = await models.User.findByPk(id);
  if (user) {
    if (name) user.name = name;
    if (password) user.password = password;
    await user.save();
    res.status(200).json({ message: "ok", data: user });
  } else {
    res.status(404).json({ message: "user not found" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const result = await models.User.destroy({
    where: {
      id,
    },
  });

  if (result > 0) return res.sendStatus(204);
  res.status(404).json({ message: "user not found" });
};

const findByEmail = async (email) => {
  const user = await models.User.findOne({
    where: { email },
  });
  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  findByEmail,
};
