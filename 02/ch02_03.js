const http = require("http");

// req : request, res : response
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
  res.end("안녕하세요. 저의 첫 번째 웹 서버에 오셨습니다.");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log("서버가 http://localhost:300 에서 실행 중입니다.");
});

