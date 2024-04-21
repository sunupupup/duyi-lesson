// 遍历对象 user， 将其每一个属性变为 getter 和 setter， 保持读写功能不变
// 读取属性时，输出：正在读取xxx属性，值为xxx
// 给属性赋值时，输出：正在设置xxx属性，新的值为xxx
const user = {
  name: 'monica',
  age: 17,
  sex: 'female',
};

Object.entries(user).forEach(([k, v]) => {
  Object.defineProperty(user, k, {
    get: function () {
      console.log('正在读取' + k + '值为' + v);
      return v;
    },
    set: function (newV) {
      console.log('正在设置' + k + '值为' + newV);
      v = newV;
    },
  });
});

console.log(user.name);
console.log(user.age);
console.log(user.sex);

user.name = 'ant';
user.age = 27;
user.sex = '男';

console.log(user.name);
console.log(user.age);
console.log(user.sex);
