const express = require("express");
const commentRouter = express.Router({mergeParams:true});
const commentControllers = require("../controllers/comments");

commentRouter
  .route("/")
  .post(commentControllers.createComment)
  .get(commentControllers.getAllComments);

  commentRouter
  .route("/:id")
  .put(commentControllers.updateComment)
  .delete(commentControllers.deleteComment);

  module.exports = commentRouter;