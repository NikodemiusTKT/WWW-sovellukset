<?php
require_once 'db.php';
if (isset($_POST['task'])) {
    $task = trim($_POST['task']);
    if (!empty($task)) {
        $addQuery = $db->prepare("INSERT INTO MEMOLIST (task,datetime) VALUES (:task, NOW());");
        $addQuery.execute(['task' => $task]);
    }
}

header('Location: index.phtml');
?>
