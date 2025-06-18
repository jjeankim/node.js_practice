const path = require("path");
const fs = require("fs");

// const fullPath = path.join(__dirname, 'files','test.txt')
// console.log(`전체경로 : ${fullPath}`);

// const fullPath2 = path.join(__dirname,'file','task','jobs','01.txt')
// console.log(fullPath2);

// const pathParts = path.parse(fullPath)
// console.log(pathParts);

// const pathParts2 = path.parse(fullPath2)
// console.log(pathParts2);

// const ext = path.extname('test.txt')
// console.log(ext);

const dirPath = path.join(__dirname, "new-dir");
console.log(dirPath);

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
} // 경로가 있으면 true, 없으면 false

const dirPath2 = path.join(__dirname, "tasks");
console.log(dirPath2);

if (!fs.existsSync(dirPath2)) {
  fs.mkdirSync(dirPath2);
}

const dirPath3 = path.join(__dirname, 'tasks', 'jobs')
if(!fs.existsSync(dirPath3)) fs.mkdirSync(dirPath3)


const filePath = path.join(__dirname, 'test.txt')
console.log(filePath);
fs.writeFileSync(filePath,'디렉토리 생성 후 파일 생성')


const dirPath4 = path.join(__dirname,'main','src','code')
console.log(dirPath4);

if(!fs.existsSync(dirPath4)) fs.mkdirSync(dirPath4,{recursive:true})

const filePath2 = path.join(dirPath4,'javascript.txt')
console.log(filePath2);
fs.writeFileSync(filePath2,'자바스크립트 파일 생성')

const newDirPath = path.join(__dirname,"rename-dir")
fs.renameSync(dirPath,newDirPath)

fs.rmdirSync(newDirPath)