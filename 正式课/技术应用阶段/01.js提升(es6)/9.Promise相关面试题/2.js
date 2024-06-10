setTimeout(() => {
  console.log(1); //进入宏队列
});

const promise = new Promise((resolve, reject) => {
  console.log(2);
  resolve();
});

promise.then(() => {
  console.log(3);  // 进入wei
});

console.log(4);

// 输出 2 4 3 1
