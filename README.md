# お絵かき1年録ジェネレーター

https://hibikine.me/oekaki/

1年間のお絵かきを1枚の画像にまとめてTwitterに投稿するアプリ

`docker run -d -p 80:80 -v ~/src/lastyearimages/oekaki:/var/www/html/oekaki --name lastyearimages php:7.0-apache`

# コーディング規約
- `session_start()`は呼び出し元の先頭でのみ呼ぶこと。
