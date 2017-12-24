<?php
require 'consts.php';

$developEnvironment = DEVELOP_ENVIRONMENT;

$allowed_origin = 'https://hibikine.me/';
if ($developEnvironment) {
    $allowed_origin = 'http://192.168.99.100';
}
echo $_SERVER['HTTP_ORIGIN'];
//if ($_SERVER['HTTP_ORIGIN'] == $allowed_origin) {
    session_start();

	$ch = curl_init($_GET['url']);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	$file = curl_exec($ch);
	$info = curl_getinfo($ch);
	curl_close($ch);
	header("Access-Control-Allow-Origin: $allowed_origin");
	header("Content-Type: " . $info['content_type'] . ";");
	//echo $info['content_type'];
	//var_dump($info);
	echo $file;
//}
	//echo 'hoge';
    /*
	if ($info['content_type'] === 'image/png') {
		echo ($file);
		
	}else if($info['content_type'] === 'image/jpeg') {
		echo ($file);
		
	}
} else {
    $response = array('error' => '');
}
*/