const models = require("../models");

const createPost = async (req, res) => {
  const { title, content } = req.body;
  // let filename = req.file ? req.file.filename : null;

  // filename = `/downloads/${filename}`;

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
  let attachments = [];

  // if (req.file) {
  //   attachments.push({
  //     filename: req.file.filename,
  //     originalname: req.file.originalname,
  //     path: req.file.path,
  //     size: req.file.size,
  //     mimetype: req.file.mimetype,
  //   });
  // } else if (req.files && req.files.length > 0) {
  //   attachments = req.files.map((file) => ({
  //     filename: file.filename,
  //     orginalname: file.orginalname,
  //     path: file.path,
  //     size: file.size,
  //     mimetype: file.mimetype,
  //   }));
  // }
  if (req.files && res.files.length > 0) {
    attachments = req.files.map((file) => ({
      filename: file.filename,
      originalname: file.originalname,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
    }));
  }

  const post = await models.Post.create({
    title,
    content,
    // filename,
    attachments,
    authorId: user.id,
  });

  res.status(201).json({ message: "게시글 작성이 성공했습니다.", data: post });
};

const getAllPosts = async (req, res) => {
  const posts = await models.Post.findAll();
  if (!posts) return res.status(404).json({ message: "게시글 목록 조회 실패" });
  res.status(200).json({ message: "게시글 목록 조회 성공!", data: posts });
};

const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await models.Post.findByPk(id);
  if (!post) return res.status(400).json({ message: "해당 게시글 조회 실패!" });
  res.status(200).json({ message: "해당 게시글 조회 성공!", data: post });
};

const updatePost = async (req, res) => {
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

// 첨부파일 수정

const updateViewCont = async (req, res) => {
  const { id } = req.params;
  const post = await models.Post.findByPk(id);
  if (!post)
    return res.status(404).json({ message: "해당 게시글을 찾을 수 없어요." });
  const updatedPost = await post.update({
    viewCount: post.viewCount + 1,
  });
  res.status(200).json({ message: "ok", data: updatedPost });
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const result = await models.Post.destroy({
    where: {
      id,
    },
  });
  if (result > 0) return res.sendStatus(204);
  else res.status(400).json({ message: "해당 게시글 삭제에 실패했습니다." });
};

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  updateViewCont,
  deletePost,
};
