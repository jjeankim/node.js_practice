const express = require("express");
const models = require("./models");
const { Op, where } = require("sequelize");

const app = express();
app.use(express.json());

// post
app.post("/posts", async (req, res) => {
  const { title, content } = req.body;

  let user = await models.User.findOne({
    where: {
      email: "a@test.com",
    },
  });

  if (!user) {
    user = await models.User.create({
      name: "무직타이거",
      email: "muziktiger@email.com",
      password: "muziktiger",
    });
  }
  const post = await models.Post.create({
    title,
    content,
    authorId: user.id,
  });

  res.status(201).json({ message: "게시글 작성이 성공했습니다.", data: post });
});

app.get("/posts", async (req, res) => {
  const posts = await models.Post.findAll();
  if (!posts) return res.status(404).json({ message: "게시글 목록 조회 실패" });
  res.status(200).json({ message: "게시글 목록 조회 성공!", data: posts });
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const post = await models.Post.findByPk(id);
  if (!post) return res.status(400).json({ message: "해당 게시글 조회 실패!" });
  res.status(200).json({ message: "해당 게시글 조회 성공!", data: post });
});

app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const post = await models.Post.findByPk(id);
  const { title, content } = req.body;

  if (!post)
    return res.status(404).json({ message: "해당 게시글을 찾을 수 없어요." });

  await post.update({
    title,
    content,
  });
  res.status(200).json({ message: "해당 게시글 수정 완료!", data: post });
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const result = await models.Post.destroy({
    where: {
      id,
    },
  });
  if (result > 0) return res.sendStatus(204);
  else res.status(400).json({ message: "해당 게시글 삭제에 실패했습니다." });
});

// comment
app.post("/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  const post = await models.Post.findByPk(postId);

  if (!post)
    return res.status(404).json({ message: "포스트가 존재하지 않습니다." });

  const comment = await models.Comment.create({
    content,
    postId,
    userId: 2,
  });
  res.status(201).json({ message: "댓글 등록 성공", data: comment });
});

app.get("/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const comments = await models.Comment.findAll({
    where: {
      postId,
    },
    include: [
      { model: models.User, as: "author", attributes: ["id", "name", "email"] },
    ],
    order: [["createdAt", "DESC"]], //최신순
  });
  if (!comments) res.status(404).json({ message: "댓글 가져오기 실패" });

  res.status(200).json({ message: "댓글 가져오기 성공!", data: comments });
});

app.put("/posts/:postId/comments/:id", async (req, res) => {
  const { id, postId } = req.params;
  const { content } = req.body;

  const comment = await models.Comment.findOne({
    where: {
      id,
      postId,
    },
  });
  if (!comment)
    return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
  await comment.update({
    content,
  });
  res.status(200).json({ message: "댓글 수정 성공!", data: comment });
});

app.delete("/posts/:postId/comments/:id", async (req, res) => {
  const { id, postId } = req.params;
  const deleteCount = await models.Comment.destroy({
    where: {
      id,
      postId,
    },
  });
  if (deleteCount === 0)
    return res.status(404).json({ message: "댓글 삭제에 실패했습니다." });
  res.sendStatus(204);
});

// user
// app.post("/users",async(req,res) => {
//   const {name, email, password,role} =
//   const user = await models.User.create({
//     name,
//   })
// })

app.listen(3000, async () => {
  await models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("db connectes!");
    })
    .catch(() => {
      console.log("db error");
    });
});
