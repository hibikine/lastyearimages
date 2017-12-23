<?php
require 'vendor/autoload.php';
use Abraham\TwitterOAuth\TwitterOAuth;

class Twitter {
    public function __construct($consumerKey, $consumerSecret, $accessToken, $accessTokenSecret)
    {
        $this->connect = new TwitterOAuth($consumerKey, $consumerSecret, $accessToken, $accessTokenSecret);
        if (is_null($this->connect)) {
           throw Exception('cannot login twitter');
        }
    }

    public function getUserStatuses()
    {
        $query = [
            'count' => 200,
            'exclude_replies' => false,
            'include_rts' => false,
        ];
        //return $this->connect->get('statuses/user_timeline', $query);
        return $this->getAll('statuses/user_timeline', $query);
    }

/**
     * 再帰的に、ダウンロードできなくなるまでgetを行う。
     * @param $user_token
     * @param $user_secret
     * @param $path
     * @param $parameters
     * @return array
     */
    private function getAll($path, $parameters) {
        $data = [];
        do {
            $gotten_data = $this->connect->get($path, $parameters);
            if (count($gotten_data) === 0) {
                break;
            }
            $data = array_merge($data, $gotten_data);
            $parameters['max_id'] = end($data)->id - 1;
        } while(count($gotten_data) !== 0);
        return $data;
    }
}
