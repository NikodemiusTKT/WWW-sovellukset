<?php
    include_once("db.php");
    $sql = "SELECT * FROM USERS WHERE username = :username";
    $stmt = $db->prepare($sql);
    $username = $_POST['reguser'];
    $password = $_POST['regpassword'];
    $stmt->execute(array(':username' => $username));
    if ($stmt->rowCount() > 0) {
        echo "Samanniminen käyttäjä on jo olemassa, anna eri käyttäjänimi ja yritä uudelleen";
    } else {
        $insertion = "INSERT INTO USERS(username,pwhash) VALUES (?,?)";
        $pwhash = password_hash($password,PASSWORD_BCRYPT);
        $stmt = $db->prepare($insertion);
        $stmt->execute(array($username, $pwhash));
    }

        

?>
