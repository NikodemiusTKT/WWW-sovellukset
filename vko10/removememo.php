<?php
session_start();
require_once 'db.php';
if (isset($_POST['task_id']) && isset($_SESSION['uid'])) {
    $task_id = $_POST['task_id'];
    $uid = $_SESSION['uid'];
    $removal = "DELETE FROM MEMOLIST WHERE task_id = :task_id AND uid = :uid";
    $removeQuery = $db->prepare($removal);
    $removeQuery->execute(array(':task_id' => $task_id, ':uid' => $uid));
}
?>
