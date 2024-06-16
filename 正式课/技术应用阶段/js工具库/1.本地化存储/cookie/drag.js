var drag = {
  init: function (dom) {
    this.dom = dom;
    this.bindEvent();

    const newLeft = getCookie('left') || 100;
    const newTop = getCookie('top') || 100;
    this.dom.style.left = newLeft + 'px';
    this.dom.style.top = newTop + 'px';
  },
  bindEvent: function () {
    this.dom.onmousedown = this.mouseDown.bind(this);
  },

  mouseDown: function (e) {
    document.onmousemove = this.mouseMove.bind(this);
    document.onmouseup = this.mouseUp.bind(this);

    this.disX = e.clientX - this.dom.offsetLeft;
    this.disY = e.clientY - this.dom.offsetTop;
  },

  mouseMove: function (e) {
    this.newLeft = e.clientX - this.disX;
    this.newTop = e.clientY - this.disY;

    this.dom.style.left = this.newLeft + 'px';
    this.dom.style.top = this.newTop + 'px';
  },

  mouseUp: function () {
    document.onmousemove = null;
    document.onmouseup = null;

    // 鼠标抬起的时候，存一下最终的位置
    setCookie('left', this.newLeft, 60);
    setCookie('top', this.newTop, 60);
  },
};

drag.init(document.querySelector('#box'));
