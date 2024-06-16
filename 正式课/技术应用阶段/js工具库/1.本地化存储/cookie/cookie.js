//设置cookie
function setCookie(key, value, date) {
  //expires
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + date);
  document.cookie = `${key}=${value};expires=${endDate}`;

  //max-age
  document.cookie = `${key}=${value};max-age=${date}`;
}

//删除cookie
function deleteCookie(key) {
  setCookie(key, '', 0);
}

//获取cookie
function getCookie(key) {
  const cookie = document.cookie.split('; ');
  for (const item of cookie) {
    const [k, v] = item.split('=');
    if (key === k) {
      return v;
    }
  }
  return null;
}
