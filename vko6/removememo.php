<?php

require_once './db.php';
if (isset($_GET['taskid'])) {
    $task_id = _GET['taskid'];
    $removeQuery = $db->prepare("DELETE FROM MEMOTABLE WHERE task_id = :task_id;");
    $removeQuery->execure(['task_id' => $task_id]);
}
header('Location: index.phtml');
