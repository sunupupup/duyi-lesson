function sendMsg(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve('success ' + name);
      } else {
        reject('fail ' + name);
      }
    }, 2000);
  });
}

sendMsg('ant').then(
  (data) => {
    console.log(data);
  },
  (reason) => {
    console.log(reason);
  }
);
