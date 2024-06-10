// 下面的任务最终状态是什么，相关的数据或失败原因是什么，最终输出什么

const p1 = new Promise((resolve, reject) => {
  console.log('任务开始');
  resolve(1); // 状态和数据全都稳定下来了
  reject(2); //会运行，但是无效，更改数据，更改状态，统统无效
  resolve(3);
  console.log('任务结束');
});
//输出1
p1.then((d) => {
  console.log(d);
});

const p2 = new Promise((resolve, reject) => {
  console.log('任务开始');
  resolve(1);
  resolve(2);
  console.log('任务结束');
});
//输出1
p2.then((d) => {
  console.log(d);
});
