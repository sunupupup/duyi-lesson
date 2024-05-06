// 下面代码的输出结果是什么
const pro1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

const pro2 = pro1.then((data) => {
  console.log(data);
  return data + 1;
});
//如果改成下面的， 只有catch，没有then，那么之前任务的data会往下传递，最后输出是   Promise { 1 } Promise { 1 } Promise { undefined }
const _pro2 = pro1.catch((data) => {
  console.log(data);
  return data + 1;
});

const pro3 = pro2.then((data) => {
  console.log(data);
  // 没有返回值，即 undefined
});

console.log(pro1, pro2, pro3);
// output:
// 因为第一个promise没执行完，处于pending，后续都是pending
// Promise { <pending> } Promise { <pending> } Promise { <pending> }

setTimeout(() => {
  console.log(pro1, pro2, pro3);
}, 2000);
// output:
// Promise { 1 } Promise { 2 } Promise { undefined }
