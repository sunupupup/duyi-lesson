// 下面代码的输出结果是什么

new Promise((resolve, reject) => {
  resolve(1);
})
  .then((res) => {
    console.log(res);
    return 2;
  })
  .catch((err) => {
    return 3;
  })
  .then((res) => {
    // 上面没有处理then 的情况，那么状态就和上上个任务一致 fulfilled 2
    console.log(res);
  });
// output: 
// 1 2
