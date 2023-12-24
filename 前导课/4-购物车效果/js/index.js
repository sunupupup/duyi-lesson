class UIGood {
  constructor(good) {
    this.data = good;
    this.choose = 0;
  }

  getTotalPrice() {
    return this.data.price * this.choose;
  }

  isChoose() {
    return this.choose > 0;
  }

  increase() {
    this.choose++;
  }

  decrease() {
    if (this.choose) {
      this.choose--;
    }
  }
}

//页面数据
class UIGoods {
  constructor() {
    this.uiGoods = goods.map((good) => {
      return new UIGood(good);
    });
    this.priceThreshold = 30; //30元起送
    this.sendPrice = 5; //5元配送费
  }

  //封装任何对ui有影响的方法、数据

  getTotalPrice() {
    return this.uiGoods.reduce((pre, cur) => {
      return pre + cur.getTotalPrice();
    }, 0);
  }

  increase(index) {
    this.uiGoods[index].increase();
  }

  decrease(index) {
    this.uiGoods[index].decrease();
  }

  //得到选择的总量
  getChooseNumber() {
    return this.uiGoods.reduce((pre, cur) => {
      return pre + cur.choose;
    }, 0);
  }

  //是否有商品，对ui也有影响
  hasGoodsInCar() {
    return this.getChooseNumber() > 0;
  }

  //满足起送标准
  hasMeetStartSend() {
    return this.getTotalPrice() >= this.priceThreshold;
  }

  isChoose(index) {
    return this.uiGoods[index].isChoose();
  }
}

//整个页面
class UI {
  constructor() {
    this.uiData = new UIGoods();
    this.doms = {
      goodsContainer: document.querySelector('.goods-list'),
      deliverPrice: document.querySelector('.footer-car-tip'),
      footerPay: document.querySelector('.footer-pay'),
      footerPaySpan: document.querySelector('.footer-pay span'),
      totalPrice: document.querySelector('.footer-car-total'),
      car: document.querySelector('.footer-car'),
    };
    this.createHTML();
    this.updateFooter();
    this.listenEvent();
    const carTarget = this.doms.car.getBoundingClientRect();
    //目标位置
    this.targetXY = {
      x: carTarget.left + carTarget.width / 2,
      y: carTarget.top + carTarget.height / 2,
    };
  }

  listenEvent() {
    this.doms.car.addEventListener('animationend', function () {
      //非箭头函数 注意this指向
      this.classList.remove('animate');
    });
  }

  createHTML() {
    //两种方式
    //1. 生成html字符串， 执行效率低，开发效率高
    //2. 一个一个创建元素  执行效率高，开发效率低
    let html = '';
    this.uiData.uiGoods.forEach((g, i) => {
      html += `<div class="goods-item">
      <img src="${g.data.pic}" alt="" class="goods-pic">
      <div class="goods-info">
        <h2 class="goods-title">${g.data.title}</h2>
        <p class="goods-desc">${g.data.desc}</p>
        <p class="goods-sell">
          <span>月售 ${g.data.sellNumber}</span>
          <span>好评率${g.data.favorRate}%</span>
        </p>
        <div class="goods-confirm">
          <p class="goods-price">
            <span class="goods-price-unit">￥</span>
            <span>${g.data.price}</span>
          </p>
          <div class="goods-btns">
            <i index="${i}" class="iconfont i-jianhao"></i>
            <span>${g.choose}</span>
            <i index="${i}" class="iconfont i-jiajianzujianjiahao"></i>
          </div>
        </div>
      </div>
    </div>`;
    });
    this.doms.goodsContainer.innerHTML = html;
  }

  increase(index) {
    this.uiData.increase(index);
    this.updateGoodItemStatus(index);
    this.updateFooter();
    this.jump(index);
  }

  decrease(index) {
    this.uiData.decrease(index);
    this.updateGoodItemStatus(index);
    this.updateFooter();
  }

  updateGoodItemStatus(index) {
    const item = this.doms.goodsContainer.children[index];
    if (this.uiData.isChoose(index)) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
    const span = item.querySelector('.goods-btns span');
    span.textContent = this.uiData.uiGoods[index].choose;
    this.updateFooter();
  }

  updateFooter() {
    const total = this.uiData.getTotalPrice();

    this.doms.deliverPrice.textContent = `配送费: ￥${this.uiData.sendPrice}`;

    //设置起送费
    if (this.uiData.hasMeetStartSend()) {
      this.doms.footerPay.classList.add('active');
    } else {
      this.doms.footerPay.classList.remove('active');
      const dist = Math.round(this.uiData.priceThreshold - total);
      this.doms.footerPaySpan.textContent = `还差￥${dist.toFixed(2)}元起送`;
    }
    //设置总价
    this, (this.doms.totalPrice.textContent = `${total.toFixed(2)}`);

    //设置购物车样式状态
    if (this.uiData.hasGoodsInCar()) {
      this.doms.car.classList.add('active');
      const tag = this.doms.car.querySelector('.footer-car-badge');
      tag.textContent = this.uiData.uiGoods.reduce((pre, cur) => {
        return pre + cur.choose;
      }, 0);
    }
  }

  addCarAnimate() {
    this.doms.car.classList.add('animate');
  }

  jump(index) {
    //起始位置
    const addIcon = this.doms.goodsContainer.children[index]
      .querySelector('.i-jiajianzujianjiahao')
      .getBoundingClientRect();
    const startXY = {
      x: addIcon.left,
      y: addIcon.top,
    };
    const div = document.createElement('div');
    div.className = 'add-to-car';
    const i = document.createElement('i');
    i.className = 'iconfont i-jiajianzujianjiahao';
    //设置初始位置
    div.style.transform = `translateX(${startXY.x}px)`;
    i.style.transform = `translateY(${startXY.y}px)`;
    div.appendChild(i);
    document.body.appendChild(div);
    //注意 js执行完 才会进行渲染，所以需要强行渲染
    //触发强行渲染: 读一个布局属性、html5中的 requestAnimationFrame
    div.clientTop;
    div.style.transform = `translateX(${this.targetXY.x}px)`;
    i.style.transform = `translateY(${this.targetXY.y}px)`;
    // window.requestAnimationFrame(() => {});
    //设置结束位置
    const that = this;
    div.addEventListener(
      'transitionend',
      function () {
        div.remove();
        that.addCarAnimate();
      },
      {
        once: true,
      }
    );
  }
}

const ui = new UI();

ui.doms.goodsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('i-jiajianzujianjiahao')) {
    const index = +e.target.getAttribute('index');
    ui.increase(index);
  } else if (e.target.classList.contains('i-jianhao')) {
    const index = +e.target.getAttribute('index');
    ui.decrease(index);
  }
});

window.addEventListener('keypress', function (e) {
  if (e.code === 'Equal') {
    ui.increase(0);
  } else if (e.code === 'Minus') {
    ui.decrease(0);
  }
});

// 这是es6之前的写法
// function UIGood(good) {
//   this.data = good;
//   this.choose = 0;
// }

// UIGood.prototype.getTotalPrice = function () {
//   return this.good.price * this.choose;
// };

// UIGood.prototype.isChoose = function () {
//   return this.choose > 0;
// };
