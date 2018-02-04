<?php
session_start();
require_once 'db.php';
if (isset($_POST['task'])) {
    $task = trim($_POST['task']);
    if (!empty($task)) {
        $addQuery = $db->prepare("INSERT INTO MEMOLIST (task,uid) VALUES (:task, :uid)");
        $addQuery->execute(['task' => $task, 'uid' => $_SESSION['uid']]);
    }
}

