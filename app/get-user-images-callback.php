<?php
require_once 'twitter-callback.php';
session_start();

twitterOauthCallback();
setcookie("is_login", true);
header('Location: /oekaki/');
