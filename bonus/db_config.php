<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'messaging');
define('DB_USER', 'root');
define('DB_PASS', 'N9ametan7');
define('DB_CHAR', 'utf8');

$settings = array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => FALSE,
);
?>
