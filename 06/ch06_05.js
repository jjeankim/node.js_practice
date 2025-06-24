const { Sequelize, Model, DataTypes, Op } = require("sequelize");
// db 연결
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "user.db",
});

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 5],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 20],
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 200,
      },
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    tableName: "users",
  }
);

(async () => {
  await sequelize.sync({ force: true });
  const user1 = await User.create({
    username: "무직타이거",
    email: "muziktiger@email.com",
    password: "muziktiger",
    age: 100,
  });

  const user2 = await User.create({
    username: "kirby",
    email: "kirby@email.com",
    password: "kirby",
    age: 200,
  });
  const user3 = await User.create({
    username: "짱구",
    email: "jjangu@email.com",
    password: "jjangu",
    age: 5,
  });

  const user4 = await User.create({
    username: "훈이",
    email: "hooni@email.com",
    password: "hooni",
    age: 5,
  });

  const user5 = await User.create({
    username: "유리",
    email: "yuri@email.com",
    password: "yuri",
    age: 5,
  });

  const users1 = await User.findAll({
    where: {
      email: {
        [Op.like]: "%email%",
      },
    },
  });
  console.log(users1.map((u) => u.email));

  const users2 = await User.findAll({
    where: {
      username: {
        [Op.in]: ["유리", "짱구"],
      },
    },
  });

  console.log(users2.map((u) => u.username));

  const users3 = await User.findAll({
    where: {
      age: {
        [Op.lt]: 10,
      },
    },
  });

  console.log(users3.map(u => u.username));
})();
