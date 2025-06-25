const express = require("express");
const models = require("./models");
const { Op } = require("sequelize");

const app = express();
app.use(express.json());

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

app.delete("/posts/:id",async(req,res) => {
  const {id} = req.params;
  await models.User.destroy({
    where:{
      id,
    }
  })
  
})
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
