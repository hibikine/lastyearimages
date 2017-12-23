<?php
require 'vendor/autoload.php';
use Abraham\TwitterOAuth\TwitterOAuth;
require 'Twitter.php';
require_once 'consts.php';

session_start();

if (array_key_exists('oauth_token', $_SESSION)) {
    if($_SESSION['oauth_token'] === $_GET['oauth_token'] and $_GET['oauth_verifier']) {
        $con = new TwitterOAuth(
            CONSUMER_KEY,
            CONSUMER_SECRET,
            $_SESSION['oauth_token'],
            $_SESSION['oauth_token_secret']
        );
        $acctkn = $con->oauth(
            'oauth/access_token', [
                'oauth_verifier' => $_GET['oauth_verifier'],
                'oauth_token' => $_GET['oauth_token']
            ]
        );

        $twitter = new Twitter(CONSUMER_KEY,
                               CONSUMER_SECRET,
                               $acctkn['oauth_token'],
                               $acctkn['oauth_token_secret']);
        var_dump($twitter->getUserStatuses());
    }
} else {
    $con = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);

    $reqtkn = $con->oauth("oauth/request_token", [
        "oauth_callback" => "http://localhost:8000/twittertest.php"
    ]);
    $_SESSION['oauth_token'] = $reqtkn['oauth_token'];
    $_SESSION['oauth_token_secret'] = $reqtkn['oauth_token_secret'];
    $url = $con->url("oauth/authorize", [
        "oauth_token" => $reqtkn['oauth_token']]);
    header('Location: ' . $url);
}


