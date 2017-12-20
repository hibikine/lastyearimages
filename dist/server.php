<?php
require "vendor/autoload.php";

use Abraham\TwitterOAuth\TwitterOAuth;
require 'consts.php';

session_start();
$canvas = $_POST["canvas"];
$canvas = preg_replace("/data:[^,]+,/i","",$canvas);
$canvas = base64_decode($canvas);
$image = imagecreatefromstring($canvas);
$con = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);

$new_file_name=date("Ymd-His")."-".ceil(microtime(true)).".png";
$fp = fopen($new_file_name,'w');
fwrite($fp,$canvas);
fclose($fp);

$_SESSION['tweet-text'] = $_POST['tweet-text'];
$reqtkn = $con->oauth("oauth/request_token", [
    "oauth_callback" => "http://localhost:8000/callback.php"
]);
$_SESSION['oauth_token'] = $reqtkn['oauth_token'];
$_SESSION['oauth_token_secret'] = $reqtkn['oauth_token_secret'];
$url = $con->url("oauth/authorize", [
"oauth_token" => $reqtkn['oauth_token']]);
header('Location: ' . $url);
