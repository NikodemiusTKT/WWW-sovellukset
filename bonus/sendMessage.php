<?php
require('db.php');
require_once('db_config.php');
require('functions.php');


$userQuery = "SELECT id FROM users WHERE phone_number = ?;";
$ins_sql = "INSERT INTO messages(message,time_to_show,sender_id,receiver_id) VALUES (?,?,?,?)";

// Get needed data from serialized forum array
$receiver = $_POST['receiver'];
$sender = $_POST['authNumber'];
$message = $_POST['message'];
$time_to_show = $_POST['showTime'];


// get receiver's id from users table
$userStmt = $db->prepare($userQuery);
$userStmt->execute([$receiver]);
$receiver_id = $userStmt->fetchColumn();
// Check if user who receives the message exists
if ($userStmt->rowCount() == 0) {
    $receiver_id = addUser($db,$receiver);
}
// Get sender_id from users table
$stmt = $db->prepare($userQuery);
$stmt->execute([$sender]);
$sender_id = $stmt->fetchColumn();

if ($stmt->rowCount == 0) {
    $sender_id = addUser($db,$sender);
}


// Insert new message into the messages table
$stmt = $db->prepare($ins_sql);
$stmt->execute([$message,$time_to_show,$sender_id,$receiver_id]);



$mem  = new Memcached();
$mem->addServer('127.0.0.1',11211);

// Memcached key "user::app::phone_number"
$key = DB_USER.'::Snapped::'.$_POST['receiver'];

$mem->set($key,0,60*30);
?>