<?php
session_start();
include_once('db.php');
if (isset($_SESSION['username']) && isset($_SESSION['uid'])) {

    $query = "SELECT * FROM MEMOLIST WHERE uid = :uid";
    $stmt = $db->prepare($query);
    $stmt->execute(array(':uid' => $_SESSION['uid']));
    $tasks = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        array_push($tasks, array('taskid' => $row['task_id'], 'task' => $row['task'], 'datetime' => $row['datetime'], 'uid' => $row['uid']));
    }
    echo json_encode(array("tasks" => $tasks));
}
?>

