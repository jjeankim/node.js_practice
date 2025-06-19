const validator = require("validator");

const email = "test@email.com"
const email2 = 'test!email.com'

console.log(`이메일 검증 ${email} 은 ${validator.isEmail(email)}`);
console.log(`이메일 검증 ${email2} 은 ${validator.isEmail(email2)}`);

// url 검증
const url = 'https://naver.com'
console.log(`URL 검증 ${url} 은 ${validator.isURL(url)}`);

// ip 검증
const ip = '3.35.152.150'
console.log(`IP 검증 ${ip}는 ${validator.isIP(ip)} `);

// 전화번호 검증
const phone = '010-1234-5678'
console.log(`전화번호 검증 ${phone}는 ${validator.isMobilePhone(phone,'ko-KR')}`);

// 날짜 검증
const date1 = '2025-08-20'
console.log(`날짜 검증 ${date1}은 ${validator.isDate(date1)}`);

// 숫자 검증
const num1 = '12345'
console.log(`숫자 검증 ${num1}은 ${validator.isNumeric(num1)}`);


// 비밀번호 검증
const passowrd = '12341234!Pp'
console.log(`비밀번호 검증 ${passowrd}은 ${validator.isStrongPassword(passowrd, {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1
})}`);
