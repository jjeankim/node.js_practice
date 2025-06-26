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

// 404처리
app.use((req, res) => {
  res
    .status(404)
    .json({ message: "요청한 리소스는 찾을 수 없용.", status: "Fail" });
});

// 500에러
app.use((error, req, res, next) => {
  console.log(error.stack());
  res
    .status(500)
    .json({ message: `server error : ${error.stack}`, status: "Error" });
});

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
