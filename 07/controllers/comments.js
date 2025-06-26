const models = require("../models");
const { Op } = require("sequelize");

exports.createComment = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  const post = await models.Post.findByPk(postId);

  if (!post)
    return res.status(404).json({ message: "포스트가 존재하지 않습니다." });

  const comment = await models.Comment.create({
    content,
    postId,
    userId: 1,
  });
  res.status(201).json({ message: "댓글 등록 성공", data: comment });
}

exports.getAllComments = async (req, res) => {
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
}

exports.updateComment = async (req, res) => {
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
}

exports.deleteComment = async (req, res) => {
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
}

