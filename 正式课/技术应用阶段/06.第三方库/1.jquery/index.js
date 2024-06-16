$(function () {
  axios.get('cart').then((res) => {
    const products = res.data.data;
    // 根据api的结果生成dom
    console.log(products);
    const html = products.map((p) => {
      return `
              <div class="item">
          <div class="check">
            <input type="checkbox" class="checkItem" />
          </div>
          <div class="info">
            <img
              src="${p.productUrl}"
              alt=""
            />
            <a href="">
              ${p.productName}
            </a>
          </div>
          <div class="price"><em>￥${p.unitPrice.toFixed(2)}</em></div>
          <div class="num">
            <a href="" class="decr">-</a>
            <input type="text" value="${p.count}" class="txt" />
            <a href="" class="incr">+</a>
          </div>
          <div class="sum"><em>￥${(p.unitPrice * p.count).toFixed(
            2
          )}</em></div>
          <div class="del">
            <a href="">删除</a>
          </div>
        </div>
`;
    });

    $('.list').html(html);

    $('.checkAll').change(function () {
      // 更改其他所有选择框的选中状态

      // 虽然 $('.checkAll') 是 jQuery对象，但是
      // 事件处理函数内部的this是dom对象
      const checked = this.checked;

      $(':checkbox').not(this).prop('checked', checked);
      // 多选了一个dom元素
      // $(':checkbox.checkItem').prop('checked', checked);
      // $('.checkAll').prop('checked', checked);

      setTotal();
    });

    $('.checkItem').change(function () {
      setTotal();
    });

    //设置购物车总金额
    function setTotal() {
      const checkedItems = $(':checked.checkItem');
      let priceSum = 0;
      for (item of checkedItems) {
        //￥199.00
        priceSum += +$(item)
          .parents('.item')
          .find('.sum em')
          .text()
          .replace('￥', '');
      }

      const num = checkedItems.length;
      $('.footer .right .nums em').text(num);
      $('.footer .right .sums em').text(`￥${priceSum}`);
    }

    // 改变数量
    $('.incr').click(function (e) {
      e.preventDefault();
      // 找到这个元素之前的input的元素
      const dom = $(this).prev();
      const newVal = +dom.val() + 1;
      changeNumber(newVal, dom);
      // 阻止a元素点击刷新页面  也可以直接return false
    });
    $('.decr').click(function (e) {
      e.preventDefault();
      const dom = $(this).next();
      const newVal = +dom.val() - 1;
      changeNumber(newVal, dom);
    });

    function changeNumber(newValue, dom) {
      if (newValue < 1) {
        return;
      }
      dom.val(newValue);
      const singlePrice = +dom
        .parents('.item')
        .find('.price em')
        .text()
        .replace('￥', '');
      dom
        .parents('.item')
        .find('.sum em')
        .text(`￥${(singlePrice * newValue).toFixed(2)}`);

      setTotal();
    }

    $('.del a').click(function () {
      $(this).parents('.item').remove();
      setTotal();
      return false;
    });

    $('.delChecked').click(function (e) {
      e.preventDefault();
      $(':checked:not(.checkAll)').parents('.item').remove();
      setTotal();
    });

    $('.clearAll').click(function (e) {
      e.preventDefault();
      $('.item').remove();
      setTotal();
    });
  });
});
