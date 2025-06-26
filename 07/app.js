const express = require("express");
const models = require("./models");
const noteRouter = require("./routes/notesRoute");
const postRouter = require("./routes/postRoute");
const todoRouter = require("./routes/todoRoute");
const commentRouter = require("./routes/commentsRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/notes", noteRouter);
app.use("/posts", postRouter);
app.use("/todos", todoRouter);
app.use("/posts/:postId/comments", commentRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("db connects!");
    })
    .catch(() => {
      console.log("db error");
    });
});
