const isLogged = Cookies.get('is_login');
export default function isLogin() {
  return isLogged;
}
const loginButton = $('#login');
loginButton.attr('href', './server.php');
if (isLogin()) {
  loginButton.hide();
  $('.old-tweet-login').hide();
  const logoutButton = $('<button id="logout-button" class="btn btn-link">ログアウト</button>');
  logoutButton.click(() => {
    Cookies.remove('is_login', { path: '' });
    Cookies.remove('PHPSESSID', { path: '/' });
    location.reload();
  });
  $('#navbars').append($('<p class="d-inline my-2 my-lg-0"></p>').append(logoutButton));
}
loginButton.click(() => {
  gtag('event', 'login');
});
