<?php
include_once('db.php');
session_start();
if (isset($_POST['loguser']) && isset($_POST['logpassword'])) {
    $results = array();
    $query = "SELECT * FROM USERS WHERE username = :username";
    $stmt = $db->prepare($query);
    $username = $_POST['loguser'];
    $password = $_POST['logpassword'];
    $stmt->execute(array(':username' => $username));
    if($stmt->rowCount() == 0) {
         echo json_encode(array('success' => false, 'message' => 'Käyttäjänimellä ei löytynyt yhtään käyttäjää, luo uusi käyttäjätunnus tai kokeile toista käyttäjänimeä'));
    } else {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if (password_verify($password,$user['pwhash'])) {
            $_SESSION['username'] = $username;
            $_SESSION['uid'] = $user['uid'];
            echo json_encode(array('success' => true, 'location' => "memos_back.php"));
        } else {
            echo json_encode(array('success' => false, 'message' => "Käyttäjän salasana oli väärin, yritä uudelleen"));
        }
    }
}
?>
