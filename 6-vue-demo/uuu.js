const user = {
  name: '孙家伟',
  age: 26,
};

function showName() {
  const dom = document.querySelector('#name');
  console.log('name change');
  dom.textContent = `姓名: ${user.name}`;
}
function showAge() {
  const dom = document.querySelector('#age');
  console.log('age change');
  dom.textContent = `年龄: ${user.age}`;
}

function observe(obj) {
  for (const key in obj) {
    let innerValue = obj[key];
    const fnsArr = new Set(); //防止有重复注册，一个函数里面调用两次某个属性
    Object.defineProperty(obj, key, {
      get: function () {
        //可以记录哪个函数在用自己， "依赖收集"
        if (window.__func) {
          fnsArr.add(window.__func);
        }
        return innerValue;
      },
      set: function (value) {
        innerValue = value;
        //自动调用该属性依赖的函数？？
        //依赖：某个方法在运行期间用到了这个属性，或者这个上面的get方法
        //"派发更新"
        fnsArr.forEach((fn) => fn()); //执行每个依赖
      },
    });
  }
}

observe(user);

//该怎么知道是哪个函数在调用呢？？利用全局对象
function autorun(fn) {
  window.__func = fn;
  fn();
  window.__func = null;
}

autorun(showAge);
autorun(showName);

//数据响应式,并不是简单的数据变化引起页面变动
//而是数据变化，会自动运行某些函数
