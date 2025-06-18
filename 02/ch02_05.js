const os = require("os");

console.log(`운영체체 : ${os.type()}`);

//platform
console.log(`플랫폼 : ${os.platform()}`);

// arch
console.log(`아키텍처 :${os.arch()}`);

// hostname
console.log(`호스트명 : ${os.hostname}`);

const cpus = os.cpus();
console.log(`cpu 코어수 : ${cpus.length}`);
console.log(`cpu 모델 : ${cpus[0].model}`);
console.log(`cpu 속도 : ${cpus[0].speed}`);

// 메모리 정보
const totalMemoryGB = os.totalmem() / 1024 / 1024 / 1024;
console.log(`총 메모리 : ${totalMemoryGB} GB`);

// 사용가능한 메모리 정보
const freeMemoryGB = os.freemem() / 1024 / 1024 / 1024;
console.log(`사용 가능한 메모리 : ${freeMemoryGB.toFixed(2)} GB`);

