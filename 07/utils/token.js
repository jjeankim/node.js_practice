const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.name,
      email: user.email, // 페이로드 (유저 정보)
    },
    "access_token",      // 서명 키
    {
      expiresIn: "30d",  // 유효기간
    }
  );
};

module.exports = generateAccessToken;