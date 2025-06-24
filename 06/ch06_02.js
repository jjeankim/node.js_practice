const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const path = require("path");

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
    },
    birthdate: {
      type: DataTypes.DATE,
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
    email: "muzik@email.com",
    password: "muzik",
    birthdate: new Date("2025-06-25"),
  });

  const user2 = await User.create({
    username: "춘식이",
    email: "chunsik@email.com",
    password: "chunsik",
    birthdate: new Date("2025-06-25"),
  });

  const user3 = await User.create({
    username: "커비",
    email: "kirby@email.com",
    password: "kirby",
    birthdate: new Date("2025-06-25"),
  });

  const users = await User.findAll()
  console.log(`users => ${JSON.stringify(users)}`);
  
  const userId2 = await User.findByPk(2)
  console.log(`userId2 => ${JSON.stringify(userId2)}`);

  await User.update(
    {
      email: "jjeankim@email.com"
    },
    {
      where: {
        id: 2,
      }
    }
  )
  const changeId = await User.findByPk(2);
  console.log(`changeId => ${JSON.stringify(changeId)}`);
  

  await User.destroy({
    where: {
      id: 2,
    }
  })
  const deleteUser = await User.findByPk(2);
  console.log(`deleteUser => ${JSON.stringify(deleteUser)}`);
   
  
})();
