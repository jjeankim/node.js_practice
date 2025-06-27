const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1]; //header에 있는
  }
  if (!token) return res.status(401).json({ message: "not authorized!" });

  jwt.verify(token, "access_token", (err, user) => {
    if (err) return res.status(401).json({ message: "not authorized!" });
    req.user = user;
    next();
  });
};

module.exports = authenticate;