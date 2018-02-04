<?php
require('db.php');
include_once('db_config.php');
require('functions.php');
if (isset($_POST['phone'])) {
    $result = array();

    // Connect to memcached to check if user has any messages
    $mem  = new Memcached();
    $mem->addServer('127.0.0.1',11211);


    // Memcached key "user::app::phone_number"
    $key = DB_USER.'::Snapped::'.$_POST['phone'];

    $mem_val = $mem->get($key);
    $result['mem'] = $mem_val;

    if ($mem_val != 0) {
        $mem->set($key,1,60*30);
    } else if ($mem_val == 0) {

        $userQuery = file_get_contents('./sql/getUserId.sql', TRUE);
        $msgQuery = file_get_contents('./sql/getmessages.sql', TRUE);

        // Get receiver user id from users table using given phone number
        $userStmt = $db->prepare($userQuery);
        $userStmt->execute([$_POST['phone']]);
        $userId = $userStmt->fetchColumn();

        // check if user with given phone number all ready exists and create new user
        // if necessary

        if ($userStmt->rowCount() === 0) {
            $userId = addUser($db,$_POST['phone']);
        }

        // get message data from messages table using the user id
        $stmt = $db->prepare($msgQuery);
        $stmt->execute([$userId]);

        // get current message count 
        $row_count = $stmt->rowCount();

        // if no new messages found put value 1 to memcached to indicate no new messages
        if ($row_count === 0) {
            $mem->set($key,1,60*30);
        }
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // return messaga data and message count as json object
        $result['data'] = $row;
        $result['count'] = $row_count;

        // Remove fetched message row from the database
        $removal = "DELETE FROM messages WHERE id = ?;";
        $rm_stmt = $db->prepare($removal);
        $rm_stmt->execute([$row['messages_id']]);

        echo json_encode($result);
    }
}

?>

