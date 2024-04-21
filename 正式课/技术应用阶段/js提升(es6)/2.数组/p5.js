// 得到一个随机数组成的数组，数组长度为10，随机数的范围在0-1之间
// 结果类似于：[0.262, 0.167, 0.841, ...]

const arr = new Array(10).fill(0).map(() => Math.random().toFixed(3));
console.log(arr);

// 得到一个随机数组成的数组，数组长度为10，随机数的范围在10-100之间
// 结果类似于：[35, 66, 45, ...]
const arr2 = new Array(10)
  .fill(0)
  .map(() => Math.floor(Math.random() * 90 + 10));
console.log(arr2);

// 判断某个字符串s是否为 .jpg、.png、.bmp、.gif 中的一个
const s = '.jpg';
const ret = ['.jpg', '.png', '.bmp', '.gif'].includes(s);
console.log(ret);
