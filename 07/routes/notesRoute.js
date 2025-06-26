const express = require("express");
const noteRouter = express.Router();
const noteController = require("../controllers/notes");

noteRouter
  .route("/")
  .post(noteController.createNote)
  .get(noteController.getAllNotes);

noteRouter
  .route("/:id")
  .put(noteController.updateNote)
  .delete(noteController.deleteNote);

module.exports = noteRouter;
