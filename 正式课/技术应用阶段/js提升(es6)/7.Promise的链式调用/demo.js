const sendMsg = (name) => {
  return new Promise((resolve, reject) => {
    console.log('表白：' + name);
    if (name === 'girl3') {
      resolve();
    } else {
      reject();
    }
  });
};

sendMsg('girl1')
  .catch(() => {
    return sendMsg('girl2');
  })
  .catch(() => {
    return sendMsg('girl3');
  })
  .catch(() => {
    return sendMsg('girl4');
  })
  .then(() => {
    console.log('表白成功');
  })
  .catch(() => {
    console.log('表白失败');
  });
