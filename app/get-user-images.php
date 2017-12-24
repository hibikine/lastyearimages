<?php
require_once 'Twitter.php';
require_once 'consts.php';

session_start();

if (!array_key_exists('user_tweets', $_SESSION)) {
    if (!array_key_exists('access_token', $_SESSION)) {
        header("Content-Type: text/javascript; charset=utf-8");
        echo '{"error": "true"}';
        exit();
    }
    $twitter = new Twitter(CONSUMER_KEY,
                           CONSUMER_SECRET,
                           $_SESSION['access_token'],
                           $_SESSION['access_token_secret']);
    $_SESSION['user_tweets'] = array_filter(array_map(function($tweet) {
        return [
            'created_at' => $tweet->created_at,
            'media' => $tweet->entities->media,
        ];
    }, $twitter->getUserStatuses()));

}
header("Content-Type: text/javascript; charset=utf-8");
echo json_encode($_SESSION['user_tweets']);
