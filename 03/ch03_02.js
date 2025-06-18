// npm i winston

const winston = require("winston");

const logger = winston.createLogger({
  level: "info", // 로깅 레벨(info 이상의 로깅 레벨 출력)
  format: winston.format.simple(), //text 형식
  transports: [
    new winston.transports.Console(), // 콘솔에 출력
    new winston.transports.File({
      // 파일에도 기록
      filename: "app.log",
    }),
  ],
});

console.log("---로그 레벨---");
console.log("로그 레벨: erro > warn > info > dedug > verbose");

logger.info("정보 - 일반적인 정보메세지를 출력할 때는 info를 쓰세요");
logger.error("에러 - 에러가 발생했을 때 사용하세요");
logger.warn("경고 - 주의가 필요한 메세지 일때만 쓰세요");
logger.debug("디버그 - 개발 중에만 사용하세요");

const simpleLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      // log 포맷
      return `${timestamp} [${level}] : ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

simpleLogger.info("타임스템프가 포함된 로그");

module.exports = {
  logger,simpleLogger
};
