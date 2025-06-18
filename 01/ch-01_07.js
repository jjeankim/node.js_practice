try {
  const arr = new Array(-1);
} catch (error) {
  console.error(error);
} finally {
  console.log("예외가 발생해도 이 작업은 반드시 필요");
}

try {
  const err = new Error("나만의 에러");
  err.name = "내 에러";
  err.message = "내 에러가 완성되었습니다.";
  throw err;
} catch (error) {
  console.log(error.name, error.message);
}

