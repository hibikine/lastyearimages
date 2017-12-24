import $ from 'jquery';

const isLogged = Cookies.get('is_login');
export default function isLogin() {
  return isLogged;
}
const loginButton = $('#login');
loginButton.attr('href', './server.php');
if (isLogin()) {
  loginButton.hide();
  $('.old-tweet-login').hide();
}
