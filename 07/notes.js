const express = require("express");
const models = require("./models");
const { Op } = require("sequelize");
const {
  createNote,
  getAllNotes,
  getTagNotes,
  updateNote,
  deleteNote,
} = require("./controllers/notes");

const app = express();

app.use(express.json());

app.post("/notes", createNote);

app.get("/notes", getAllNotes);

app.get("/notes/:tag", getTagNotes);

app.put("/notes/:id", updateNote);

app.delete("/notes/:id", deleteNote);

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
