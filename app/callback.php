<?php
require 'vendor/autoload.php';
use Abraham\TwitterOAuth\TwitterOAuth;
require_once 'consts.php';
require_once 'twitter-callback.php';

session_start();

twitterOauthCallback();

$usrcon = new TwitterOAuth(
    CONSUMER_KEY,
    CONSUMER_SECRET,
    $_SESSION['access_token'],
    $_SESSION['access_token_secret']
);
$usrcon->setTimeouts(15, 15);
$user_info = $usrcon->get('account/verify_credentials');
$name = $user_info->name;
//$_SESSION['image'] = '';
$medid = $usrcon->upload("media/upload", ["media" => $_SESSION['image']]);
unlink($_SESSION['image']);
if ($medid->error)
{
    return 1;
}
if (key_exists('name', $_SESSION)) {
    if ($_SESSION['name'] !== '') {
    $name = $_SESSION['name'];
    }
}
$tweet_text = '';
if ($_SESSION['tweet-text'] !== ''){
    $tweet_text = $_SESSION['tweet-text'] . '\n';
}

$params = [
'status' => $name . "のお絵かき1年録！\n" . $_SESSION['tweet-text'] . "\n#お絵かき1年録ジェネレーター https://hibikine.me/oekaki/",
'media_ids' => $medid->media_id_string,
];
$result = $usrcon->post('statuses/update', $params);
include("./posted.html");
