<?php
require_once('db.php');
$taskQuery = $db->prepare("SELECT task FROM MEMOLIST;");
$taskQuery->execute();
$tasks = $taskQuery->rowcount() ? $taskQuery : [];
?>
