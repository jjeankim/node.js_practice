const multer = require("multer");
const path = require("path");
const express = require("express");

const app = express();

const uploadDir = "public/uploads";
app.use("/downloads", express.static(path.join(__dirname, uploadDir)));

const storage = multer.diskStorage({
  destination: `./${uploadDir}`,
  filename: function (req, file, cb) {
    cb(
      null, //error
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage, limits: {
  fieldSize: 5 * 1024 * 1024,
} });

const uploadSingle = upload.single("file");
const uploadMultiple = upload.array("files", 5);

module.exports = {
  uploadSingle,
  uploadMultiple,
};
