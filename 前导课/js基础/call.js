// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }
// /*
// let obj1 = {};
// Person.call(obj1, 'ant2', 22);
// console.log(obj1);

// function test() {
//   console.log('test');
// }

// test();
// test.call();
// */

// ////////////////////////////////
// function Student(name, age, grade) {
//   Person.call(this, name, age);
//   this.grade = grade;
// }
// const s1 = new Student('ant', 28, 100);
// console.log(s1);

//链式调用
var obj = {
  fn1: function () {
    console.log('fn1');
    return this;
  },
  fn2: function () {
    console.log('fn2');
    return this;
  },
};

obj.fn1().fn2();

// 深度克隆
function deepClone(origin, target) {
  var target = target || {},
    toStr = Object.prototype.toString,
    arrStr = '[object Array]';

  for (var prop in origin) {
    if (!origin.hasOwnProperty(prop)) {
      continue;
    }
    //判断是不是引用类型
    if (origin[prop] !== null && typeof origin[prop] === 'object') {
      //简单判断下是数组还是对象
      if (toStr.call(origin[prop] === arrStr)) {
        //是个数组
        target[prop] = [];
      } else {
        target[prop] = {};
      }
      deepClone(origin[prop], target[prop]);
    } else {
      target[prop] = origin[prop];
    }
  }
}

let a = [1, 2, 3, 4, 5, 6, 7, 8];
a.sort((a, b) => {
  return Math.random() - 0.5;
});

var obj = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
  push: Array.prototype.push,
};
