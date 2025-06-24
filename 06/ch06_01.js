const { Sequelize, Model, DataTypes, Op } = require("sequelize");
// db 연결
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "post.db",
});

// 모델 생성
const Post = sequelize.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: DataTypes.STRING,
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
  });

  // post 전부 가져오기
  const posts = await Post.findAll();
  console.log(`post findAll => ${JSON.stringify(posts)}`);

  // post id로 하나 가져오기
  const post = await Post.findByPk(1);
  console.log(`post findByPK => ${JSON.stringify(post)}`);

  // post 조건대로 가져오기
  const post12 = await Post.findOne({
    where: {
      author: "찌니빵",
    },
  });
  console.log(`post12 => ${JSON.stringify(post12)}`);

  // 수정하기
  await Post.update(
    {
      title: "이번주는 ORM을 공부하는 주 입니다.",
    },
    {
      where: {
        id: 1,
      },
    }
  );
  const post13 = await Post.findByPk(1);
  console.log(`post13 => ${JSON.stringify(post13)}`);

  // 삭제하기
  await Post.destroy({
    where: {
      id: 1,
    },
  });

  const post14 = await Post.findByPk(1);
  console.log(`post14 => ${JSON.stringify(post14)}`);
})();

