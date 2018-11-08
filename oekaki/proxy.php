<?php
$file = file_get_contents("https://pbs.twimg.com/" . substr($_SERVER['PATH_INFO']));
$file_info = new finfo(FILEINFO_MIME_TYPE);
$mime_type = $file_info->buffer($file_info);
header("Content-type: " . $mime_type);
echo $file;
