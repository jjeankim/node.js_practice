const express = require("express");
const postController = require("../controllers/posts");
const postRouter = express.Router();
const { uploadSingle, uploadMultiple } = require("../middleware/upload");
const authenticate = require("../middleware/auth");

postRouter
  .route("/")
  .post(authenticate,uploadMultiple, postController.createPost)
  .get(postController.getAllPosts);

postRouter
  .route("/:id")
  .get(postController.getPost)
  .put(postController.updatePost)
  .patch(postController.updateViewCont)
  .delete(postController.deletePost);

module.exports = postRouter;
