// // 구조분해할당
// const fruits = ["사과", "수박", "바나나", "오렌지"];

// const [first, second] = fruits;

// console.log(first);
// console.log(second);

// const students = {
//   name: "이름",
//   age: 20,
//   grade: "B",
// };

// const { name } = students;
// console.log(name);

// const printStudentInfo = (
//   {name, age, grade = 'B'}
// ) => {
//   console.log('학생정보');
//   console.log(`- 이름 : ${name}`);
//   console.log(`- 나이 : ${age}`);
//   console.log(`- 성적 : ${grade}`);

// }

// printStudentInfo(students)

const book = {
  title: "자바스크립트 최고",
  author: "작가",
  publisher: "출판사",
};

const { title, author, publisher } = book;
console.log(title, author, publisher);

const user = {
  id: 1,
  info: {
    name: "홍길동",
    address: {
      city: "서울",
      street: "강남대로",
    },
  },
};

const {
  id,
  info: {
    name: userName,
    address: { city: cityName, street },
  },
} = user;

console.log(cityName);


const colors = ['red', 'blue', 'yellow','green','purple'];

const [first, second, ...others] = colors

console.log(first);
console.log(second);
console.log(others);



const user1 = {name: '소지섭', age: 45, email: 'so@email.com'}
const user2 = {name: '전종서', age: 30}

const formatUserInfo = ({name, age, email="없음"}) => {
 return `이름은 ${name}, 나이는 ${age}, 이메일은 ${email}`
 
}

console.log(formatUserInfo(user1));
console.log(formatUserInfo(user2));

