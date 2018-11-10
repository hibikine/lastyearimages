<?php
$file = file_get_contents("https://pbs.twimg.com" . $_SERVER['PATH_INFO']);
$file_info = new finfo(FILEINFO_MIME_TYPE);
$mime_type = $file_info->buffer($file);
header("Content-type: " . $mime_type);
echo $file;
