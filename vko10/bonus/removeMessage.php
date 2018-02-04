<?php
require_once('db.php')
    if (isset(_POST['message_id'])) {
        $conn = db::getInstance();
        $message_id = _POST['message_id'];
        $sql = "DELETE FROM messages WHERE id = :message_id";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':message_id',$message_id);
            $stmt->execute();
        } catch(PDOException $e)
            echo 'Message removal from database failed:'.$e->getMessage();
    }
?>




