<?php
include_once('db_config.php');

$dns = 'mysql:host='.DB_HOST.';dbname='.DB_NAME;
$db = new PDO($dns, DB_USER, DB_PASS, $settings)
OR die('Yhteydenotto tietokantaan epäonnistui ' . mysqli_connect_error());

?>