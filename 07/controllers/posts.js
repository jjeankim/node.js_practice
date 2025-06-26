const models = require("../models");

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  let fileName = req.file ? req.file.filename : null;

  fileName = `/downloads/${fileName}`;

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
    fileName,
    authorId: user.id,
  });

  res.status(201).json({ message: "게시글 작성이 성공했습니다.", data: post });
};

exports.getAllPosts = async (req, res) => {
  const posts = await models.Post.findAll();
  if (!posts) return res.status(404).json({ message: "게시글 목록 조회 실패" });
  res.status(200).json({ message: "게시글 목록 조회 성공!", data: posts });
};

exports.getPost = async (req, res) => {
  const { id } = req.params;
  const post = await models.Post.findByPk(id);
  if (!post) return res.status(400).json({ message: "해당 게시글 조회 실패!" });
  res.status(200).json({ message: "해당 게시글 조회 성공!", data: post });
};

exports.updatePost = async (req, res) => {
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
};

exports.updateViewCont = async (req, res) => {
  const { id } = req.params;
  const post = await models.Post.findByPk(id);
  if (!post)
    return res.status(404).json({ message: "해당 게시글을 찾을 수 없어요." });
  const updatedPost = await post.update({
    viewCount: post.viewCount + 1,
  });
  res.status(200).json({ message: "ok", data: updatedPost });
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const result = await models.Post.destroy({
    where: {
      id,
    },
  });
  if (result > 0) return res.sendStatus(204);
  else res.status(400).json({ message: "해당 게시글 삭제에 실패했습니다." });
};

