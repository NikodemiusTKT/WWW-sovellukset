<?php
function addUser($db,$user) {
    $sql = "INSERT INTO users(phone_number) VALUES (?);";
    $statement = $db->prepare($sql);
    $statement->execute([$user]);
    return $db->lastInsertId();
}
function getUserId($db,$phone) {
}
?>