<?php
require 'vendor/autoload.php';
use Abraham\TwitterOAuth\TwitterOAuth;

function twitterOauthCallback() {
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
        $_SESSION['access_token'] = $acctkn['oauth_token'];
        $_SESSION['access_token_secret'] = $acctkn['oauth_token_secret'];
    } else {
        include("./oauth-error.html");
        exit();
    }
}
