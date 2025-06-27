const express = require("express");
const swqggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const models = require("./models");
const noteRouter = require("./routes/notesRoute");
const postRouter = require("./routes/postRoute");
const todoRouter = require("./routes/todoRoute");
const commentRouter = require("./routes/commentsRoute");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const { logging, logger } = require("./middleware/logger");

const app = express();

app.use(logging);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));
app.use("/api-docs", swqggerUi.serve, swqggerUi.setup(swaggerDocument));

app.use("/notes", noteRouter);
app.use("/posts", postRouter);
app.use("/todos", todoRouter);
app.use("/posts/:postId/comments", commentRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

// 404처리
app.use((req, res) => {
  res
    .status(404)
    .json({ message: "요청한 리소스는 찾을 수 없용.", status: "Fail" });
});

// 500에러
app.use((error, req, res, next) => {
  console.log(error.stack);
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
