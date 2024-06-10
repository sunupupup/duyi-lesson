// 延迟运行某个函数

function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

delay(1000).then(() => {
  console.log('延迟运行');
});
