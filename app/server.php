<?php
require "vendor/autoload.php";

use Abraham\TwitterOAuth\TwitterOAuth;
require 'consts.php';

$developEnvironment = DEVELOP_ENVIRONMENT;

session_start();

$oauthRoot = 'https://hibikine.me';
if ($developEnvironment) {
    $oauthRoot = 'http://192.168.99.100';
}
$oauthCallback = $oauthRoot . "/oekaki/callback.php";

if (array_key_exists('canvas', $_POST)) {
    $canvas = $_POST["canvas"];
    $canvas = preg_replace("/data:[^,]+,/i","",$canvas);
    $canvas = base64_decode($canvas);
    $new_file_name=date("Ymd-His")."-".ceil(microtime(true)).".jpg";
    $_SESSION['image'] = $new_file_name;
    $fp = fopen($new_file_name,'w');
    fwrite($fp,$canvas);
    fclose($fp);

    if (array_key_exists('name', $_POST)) {
        $_SESSION['name'] = $_POST['name'];
    }
    if (array_key_exists('tweet-text', $_POST)) {
        $_SESSION['tweet-text'] = $_POST['tweet-text'];
    }
} else {
    $oauthCallback = $oauthRoot . "/oekaki/get-user-images-callback.php";
}

$con = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);

$reqtkn = $con->oauth("oauth/request_token", [
    "oauth_callback" => $oauthCallback,
]);
$_SESSION['oauth_token'] = $reqtkn['oauth_token'];
$_SESSION['oauth_token_secret'] = $reqtkn['oauth_token_secret'];
$url = $con->url(
    "oauth/authorize",
    ["oauth_token" => $reqtkn['oauth_token']]
);

header('Location: ' . $url);
