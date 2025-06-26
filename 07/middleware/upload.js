const multer = require("multer");
const path = require("path");

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

const upload = multer({ storage });

const uploadSingle = upload.single('file');

module.exports = {
  uploadSingle,
}