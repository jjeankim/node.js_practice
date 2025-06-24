const { Sequelize, Model, DataTypes, Op } = require("sequelize");
// db 연결
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "post.db",
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

const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: DataTypes.STRING,
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

const Comment = sequelize.define(
  "Comment",
  {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "comments", timestamps: true }
);

//foreign key 설정
User.hasMany(Post, { foreignKey: "authorId" }); // 1(user):N(post), foreign key이름 달아주기
Post.belongsTo(User, { foreignKey: "authorId" }); // N(post):1(user), foreign key이름 달아주기

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

(async () => {
  await sequelize.sync({ force: true });
  // 1.사용자 정보
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

  //게시글 정보
  const post1 = await Post.create({
    title: "무직타이거의 하루는?",
    content: "오늘 하루 어땠나요?",
    authorId: user2.id,
  });

  const post2 = await Post.create({
    title: "저메추",
    content: "점심은 돈까스 덮밥이었습니다.",
    authorId: user2.id,
  });

  const posts = await Post.findAll({
    include: {
      model: User,
    },
  });
  console.log(`posts => ${JSON.stringify(posts)}`);

  const users = await User.findByPk(2, {
    include: {
      model: Post,
    },
  });
  console.log(`users => ${JSON.stringify(users)}`);

  const comment1 = await Comment.create({
    comment: "저녁은 식단으로 하세요",
    userId: user1.id, 
    postId: post2.id,
  });

  const getposts = await Post.findAll({
    include: [
      {
        model: Comment,
        include: [User],
      },
      {
        model: User,
      },
    ],
  });

})();
