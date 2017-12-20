<?php
require 'vendor/autoload.php';
use Abraham\TwitterOAuth\TwitterOAuth;
require_once 'consts.php';

session_start();
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
    $usrcon = new TwitterOAuth(
        CONSUMER_KEY,
        CONSUMER_SECRET,
        $acctkn['oauth_token'],
        $acctkn['oauth_token_secret']
    );
    $user_info = $usrcon->get('account/verify_credentials');
    $name = $user_info->name;
	//$_SESSION['image'] = '';
	if ($medid->error)
	{
		
		return 1;
	}
    $medid = $usrcon->upload("media/upload", ["media" => $_SESSION['image']]);
    $params = [
    'status' => $name . "のお絵かき1年録！ " . $_SESSION['tweet-text'] . " #お絵かき1年録ジェネレーター https://hibikine.me/oekaki/",
    'media_ids' => $medid->media_id_string,
    ];
    $result = $usrcon->post('statuses/update', $params);
    include("./posted.html");
} else {
    include("./oauth-error.html");
}