var doms = {
  video: document.querySelector('video'),

  progress: {
    range: document.querySelector('#progress'),
    current: document.querySelector('#current'),
    total: document.querySelector('#total'),
  },

  rate: document.querySelector('#rate'),

  volume: {
    range: document.querySelector('#volume input'),
    text: document.querySelector('#volume span'),
  },
  buttons: {
    btnPlay: document.querySelector('#btnPlay'),
    save: document.querySelector('#save'),
    load: document.querySelector('#load'),
  },
  controls: document.querySelectorAll('.controls'),
};

var rateBtns = doms.rate.querySelectorAll('button');

//首先要考虑初始化
// 考虑视频加载完成之后显示所有控件
doms.video.onloadeddata = init;

function init() {
  setProgress();
  setRate();
  setVolume();
  // 初始化控件的显示
  for (let index = 0; index < doms.controls.length; index++) {
    const element = doms.controls[index];
    element.style.display = 'block';
  }

  //初始化current和total、音量等，所有控件的状态
}

/**
 * 根据当前视频进度，设置进度条状态
 */
function setProgress() {
  //1. 设置文本
  doms.progress.current.innerText = formatTime(doms.video.currentTime);
  doms.progress.total.innerText = formatTime(doms.video.duration);

  //2. 设置进度条
  doms.progress.range.value = Math.floor(
    (doms.video.currentTime / doms.video.duration) * 100
  );
}

/**
 * seconds to hour:minute:second
 */
function formatTime(sec) {
  sec = Math.floor(sec);
  function _format(n) {
    return n < 10 ? '0' + n : n;
  }
  var hours = Math.floor(sec / 3600);
  var minutes = Math.floor((sec % 3600) / 60);
  var seconds = sec - hours * 3600 - minutes * 60;
  return `${_format(hours)}:${_format(minutes)}:${_format(seconds)}`;
}

/**
 * 设置播放速率的状态
 */
function setRate() {
  doms.video.playbackRate;
  for (var i = 0; i < rateBtns.length; i++) {
    var btn = rateBtns[i];
    btn.classList.remove('active');
    if (btn.dataset.rate === doms.video.playbackRate.toString()) {
      btn.classList.add('active');
    }
  }
}

/**
 * 设置音量
 */
function setVolume() {
  var volumeValue = Math.floor(doms.video.volume * 100);
  if (doms.video.muted) {
    volumeValue = 0;
  }
  doms.volume.range.value = volumeValue;
  doms.volume.text.innerText = volumeValue + '%';
}

/***************  交互部分 *****************/
doms.buttons.btnPlay.onclick = function () {
  console.log(doms.video.paused);
  if (doms.video.paused) {
    doms.video.play();
  } else {
    doms.video.pause();
  }
};

doms.progress.range.oninput = function () {
  // console.log(this.value);
  doms.video.currentTime = Math.floor((doms.video.duration * this.value) / 100);
  setProgress();
};

doms.video.ontimeupdate = function () {
  setProgress();
};

for (var i = 0; i < rateBtns.length; i++) {
  var btn = rateBtns[i];
  btn.onclick = function () {
    doms.video.playbackRate = +this.dataset.rate;
    setRate();
  };
}

doms.volume.range.oninput = function () {
  doms.video.volume = this.value / 100;
  setVolume();
};

doms.buttons.save.onclick = function () {
  var obj = {
    currentTime: doms.video.currentTime,
    volume: doms.video.volume,
    rate: doms.video.playbackRate,
  };
  localStorage.setItem('videoStatus', JSON.stringify(obj));
  alert('保存设置成功!');
};
doms.buttons.load.onclick = function () {
  const videoStatus = JSON.parse(localStorage.getItem('videoStatus'));
  console.log(videoStatus);
  doms.video.volume = videoStatus.volume;
  doms.video.playbackRate = videoStatus.rate;
  doms.video.currentTime = videoStatus.currentTime;
  setVolume();
  setRate();
  setProgress();

  doms.video.play();
};
