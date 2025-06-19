// .env 파일을 로드함
require("dotenv").config();

console.log(`서버포트는 ${process.env.PORT || 5432}`);
console.log(`서버포트는 ${process.env.DB_NAME}`);
console.log(`서버포트는 ${process.env.PORT}`);

console.log(process.env);


const isDevelopment = process.env.NODE_ENV === 'develpment'
if (isDevelopment) console.log(`개발환경에서의 로직 처리`);
else console.log(`운영환경에서의 로직 처리`);

