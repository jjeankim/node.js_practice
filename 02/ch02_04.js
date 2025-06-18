const users = [
  { id: 1, name: "Alice", age: 25, score: 88 },
  { id: 2, name: "Bob", age: 30, score: 76 },
  { id: 3, name: "Charlie", age: 22, score: 91 },
  { id: 4, name: "Diana", age: 28, score: 85 },
  { id: 5, name: "Ethan", age: 35, score: 67 },
  { id: 6, name: "Fiona", age: 27, score: 93 },
  { id: 7, name: "George", age: 24, score: 72 },
  { id: 8, name: "Hannah", age: 31, score: 81 },
  { id: 9, name: "Ian", age: 29, score: 79 },
  { id: 10, name: "Jane", age: 26, score: 90 },
];

// const yb = users.filter(user => user.age <= 30)
// console.log(yb);

const lowScoreUsers = users.filter((user) => user.score < 80);
console.log(lowScoreUsers);

const userNames = users.map((user) => user.name);
console.log(userNames);

const printIdAndName = users.map((user) => `${user.id} : ${user.name}`);
console.log(printIdAndName);

const highScoreUsers = users
  .filter((user) => user.score >= 80)
  .map((user) => `${user.id} : ${user.name}`);
console.log(highScoreUsers);

// reduce
const avgScore =
  users.reduce((sum, user) => sum + user.score, 0) / users.length;
console.log(avgScore);

const totalScore = users
  .filter((user) => user.age > 25)
  .reduce((sum, user) => sum + user.score, 0);
console.log(totalScore);

const sortedByAge = [...users].sort((a,b) => a.age - b.age)
console.log(sortedByAge);

const sort = users.toSorted((a,b) =>  a.age - b.age)

console.log(sort);
