const { Sequelize, Model, DataTypes, Op } = require("sequelize");
// db 연결
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
});

// 모델 생성
const Post = sequelize.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
    author: DataTypes.STRING,
  },
  { tableName: "posts" }
);

// 프로미스 반환하기 때문에 async 사용
(async () => {
  await sequelize.sync({ force: true });
  const post1 = await Post.create({
    title: "오늘은 비가 온답니다.",
    content: "퇴근 시간부터 온대요.",
    author: "찌니빵",
  });

  console.log(`post1 created => ${JSON.stringify(post1)}`);
  
  const post2 = await Post.create({
    title: "오늘 저녁 메뉴는?",
    content: "건강 식단 ㅜㅜ",
    author: "빵찌니",
  })
})();
