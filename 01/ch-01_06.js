let personInfo = {
  name: "kim",
  age: 40,
  address: "gyengi-do",
  hobby: ["baking"],
};

console.log(Object.keys(personInfo));
console.log(Object.values(personInfo));

class CarInfo {
  constructor(brand, color, model) {
    this.brand = brand;
    this.color = color;
    this.model = model;
  }
  drive() {
    console.log(`모델 ${this.model}가 달리는 중`);
  }
  stop() {
    console.log(`모델 ${this.model}가 멈췄습니다.`);
  }
}

class ElectricCarInfo extends CarInfo {
  constructor(brand, color, model, battery) {
    super(brand, color, model);
    this.battery = battery;
  }
  charge() {
    console.log(`모델 ${this.model}가 충전 중`);
  }
 
}

const myCar = new CarInfo("kia", "black", "Ray");
console.log(myCar);

const myElecRay = new ElectricCarInfo("kia", "red", "elecRay","lithium");
console.log(myElecRay);

console.log(myElecRay.charge())
console.log(myElecRay.stop())`1`