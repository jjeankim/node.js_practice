const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "todo.db",
});

const Todo = sequelize.define(
  "Todo",
  {
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    tableName: "todos",
  }
);

(async () => {
  await sequelize.sync({ force: true });

  // task 생성
  const task1 = await Todo.create({
    task: "투두 테이블 만들기",
    description: "2번 작업중",
  });

  const task2 = await Todo.create({
    task: "점심 맜있게 먹기",
  });

  // task 전체 조회
  const allTodo = await Todo.findAll();
  console.log(`allTodo => ${JSON.stringify(allTodo)}`);

  // task id=2인 항목 조회
  const findId2 = await Todo.findByPk(2);
  console.log(`findId2 => ${JSON.stringify(findId2)}`);

  // task id =2 completed 변경
  await Todo.update(
    { completed: true },
    {
      where: {
        id: 2,
      },
    }
  );
  const updatedId2 = await Todo.findByPk(2);
  console.log(`updated2 => ${JSON.stringify(updatedId2)}`);

  await Todo.destroy({
    where: {
      id: 2,
    },
  });

  const deleteId2 = await Todo.findByPk(2);
  console.log(`deleteId2 => ${JSON.stringify(deleteId2)}`);
})();
