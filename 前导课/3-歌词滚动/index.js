const dom = {
  audio: document.querySelector('audio'),
  ul: document.querySelector('ul'),
  container: document.querySelector('.container'),
};
const lrcArr = [];

function praseLrc() {
  const lines = lrc.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const str = lines[i];
    const splitStr = str.split(']');
    lrcArr.push({
      time: praseTime(splitStr[0].slice(1)),
      words: splitStr[1],
    });
  }
}

/**
 * @description 把时间解析为数字 秒
 */
function praseTime(timeStr) {
  const [min, sec] = timeStr.split(':');
  return +min * 60 + +sec;
}

/**
 * @description 计算在当前情况下，播放器的时间进度，应该显示的歌词下标
 */
function findIndex() {
  const curTime = dom.audio.currentTime; //记录了播放到哪
  for (let i = 0; i < lrcArr.length; i++) {
    if (curTime < lrcArr[i].time) {
      return i - 1;
    }
  }
  // 播放到最后一句
  return lrcArr.length - 1;
}

function createLrcElements() {
  //循环歌词数组，创建列表
  const frag = document.createDocumentFragment();
  for (let i = 0; i < lrcArr.length; i++) {
    const ele = document.createElement('li');
    ele.textContent = lrcArr[i].words;
    frag.appendChild(ele);
  }
  dom.ul.appendChild(frag);
}

praseLrc();
createLrcElements();

const containerHeight = dom.container.clientHeight;
// const liHeight = 30;
const liHeight = dom.ul.children[0].clientHeight;
const maxOffset = dom.ul.clientHeight - containerHeight;
/**
 * @description 设置ul的偏移量
 */
function setOffset() {
  const index = findIndex();
  let offset = liHeight * index + liHeight / 2 - containerHeight / 2;
  if (offset < 0) {
    offset = 0;
  }
  if (offset > maxOffset) {
    offset = maxOffset;
  }
  //去掉之前的active样式
  const activeLi = document.querySelector('.active');
  activeLi?.classList.remove('active');

  dom.ul.style.transform = 'translateY(-' + offset + 'px)';
  const li = dom.ul.children[index];
  if (li) li.classList.add('active');
  console.log(offset);
}

dom.audio.addEventListener('timeupdate', setOffset);
