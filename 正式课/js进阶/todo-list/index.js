const ul = document.querySelector('ul');
const text = document.querySelector('text');

function handleEnter(e) {
  if (e.key === 'Enter' && this.value) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.addEventListener('click', function () {
      console.log('click');
      // const _li = this.closest('li');
      // _li.remove();

      // 也可以直接这样删除
      li.remove();
    });
    li.innerText = this.value;
    li.appendChild(button);
    button.innerText = '删除';
    ul.appendChild(li);
    this.value = '';
  }
}

document.querySelector('#text').addEventListener('keydown', handleEnter);
