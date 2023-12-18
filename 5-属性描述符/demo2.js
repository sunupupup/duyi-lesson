var obj = {};

let internalValue = undefined;
Object.defineProperty(obj, 'a', {
  //读取器  obj.a 就是执行get()
  get: function () {
    //这是错的，相当于调用了get() 造成了无限递归
    // return obj.a;
    console.log('get');
    return internalValue;
  },
  //设置器  obj.a = ? 就是执行set(?)
  set: function (value) {
    console.log('set');
    internalValue = value;
  },
});
obj.a = 3;
console.log(obj);

//想要利用set和get方法，必须设置一个外部变量

obj.a = 321;
console.log(obj.a);

//设置一个不可更改的固定值
Object.defineProperty(obj, 'b', {
  configurable: false,
  get: function () {
    return '固定值';
  },
  set: function (value) {
    throw new Error('b不能被赋值');
  },
});

console.log(obj.b);
// obj.b = '??'; //Error: b不能被赋值
// console.log(obj.b);

class UIGoods {
  constructor() {
    //保证是大于等于0的数字
    let internalChoose = 1;
    Object.defineProperty(this, 'choose', {
      configurable: false,
      get: function () {
        return internalChoose;
      },
      set: function (_choose) {
        if (typeof _choose !== 'number') {
          throw new Error('不是数字');
        }
        const tmp = parseInt(_choose, 10);
        if (tmp !== _choose) {
          throw new Error('不是整数');
        }
        if (_choose < 0) {
          throw new Error('不是正整数');
        }
        internalChoose = _choose;
      },
    });
    Object.defineProperty(this, 'totalPrice', {
      get: function () {
        return this.choose * 100;
      },
    });
    // Object.freeze(this); //不能添加属性了
    //如果想要更改属性
    Object.seal(this); //密封，只能修改，不能加
  }
  //es6中的语法糖
  get totalPrice2() {
    return this.choose * 100;
  }
}

const a = new UIGoods();
console.log(a.totalPrice);
console.log(a.totalPrice2);

//但是还能往原型上加
UIGoods.prototype.haha = 'hahahaha';
console.log(a.haha); //hahahaha
//要限制在原型上加东西
Object.freeze(UIGoods.prototype);
UIGoods.prototype.hehe = 'hehehe';
console.log(a.hehe); //undefined
