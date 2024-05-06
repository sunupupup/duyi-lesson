// 下面代码的输出结果是什么

const pro1 = new Promise((resolve, reject) => {
  resolve(1);
})
  .then((res) => {
    console.log(res);
    return new Error('2');
  })
  .catch((err) => {
    throw err;
    return 3;
  })
  .then((res) => {
    console.log(res);
    return 3;
  });

/*
pro1 rejected  Error(1)
pro2 fulfilled Error(2)
pro3 fulfilled Error(2)
pro4 fulfilled 3
*/
// 最后输出    1   Error:2

setTimeout(() => {
  console.log(pro1);  //Promise { 3 }
}, 2000);
