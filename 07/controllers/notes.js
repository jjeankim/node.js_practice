const models = require("../models");
const { Op } = require("sequelize");

const createNote = async (req, res) => {
  const { title, content, tag } = req.body;
  const post = await models.Note.create({
    title,
    content,
    tag,
  });
  if (!post)
    return res.status(400).json({ message: "노트 생성을 실패했습니다." });
  res.status(201).json({ message: "노트 생성을 성공했습니다.", data: post });
};

const getAllNotes = async (req, res) => {
  const { tag } = req.query;
  const where = tag ? { tag: { [Op.like]: `%${tag}%` } } : {};
  const notes = await models.Note.findAll({ where });
  if (!notes)
    return res.status(400).json({ message: "노트 목록 가져오기 실패!" });
  res.status(200).json({ message: "노트 목록 가져오기 성공!", data: notes });
};

// exports.getTagNote = async (req, res) => {
//   const { tag } = req;
//   const notes = await models.Note.findAll({
//     where: {
//       tag: {
//         [Op.like]: `%${tag}%`,
//       },
//     },
//   });
//   if (!notes || notes.length === 0)
//     return res.status(400).json({ message: "해당 노트를 찾을 수 없어요." });
//   res.status(200).json({ message: "해당 id 노트 조회 성공!", data: notes });
// };

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, tag } = req.body;

  const note = await models.Note.findByPk(id);
  if (!note)
    return res.status(400).json({ message: "해당 노트를 찾을 수 없어요." });

  await note.update({
    title,
    content,
    tag,
  });

  res
    .status(200)
    .json({ message: "해당 노트 수정에 성공했습니다.", data: note });
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  const result = await models.Note.destroy({
    where: {
      id,
    },
  });
  if (result > 0) return res.sendStatus(204);
  else
    return res.status(400).json({ message: "해당 노트 삭제에 실패했습니다." });
};

module.exports = {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
};
