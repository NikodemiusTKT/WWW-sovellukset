<?php
ob_start();
include_once('db.php');
session_start();
if (!isset($_SESSION['username'])) {
    header("location: index.php");
}
?>
<!DOCTYPE HTML>

<html>
<head>
    <meta http-equiv="content-type" charset=utf-8" name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="memos_style.css" type="text/css" media="all" />

    <title>Muistilista</title>

</head>
<body>
    <div id="wrap" >
        <div id="content" >
    <h1>Muistilista <button type="submit" class="logout-button">Kirjaudu ulos</button></h1>
    <div class="info">
        <p>Lisää alkio listaan kirjoittamalla alkio tekstikenttään ja klikkaamalla lisää painiketta tai painamalla näppäimistön enter näppäintä</br></br>
        Alkion poisto tapahtuu klikkaamalla poista painiketta.
</p>
    </div>
    <form id="input-area" method="POST">
            <input type="text" name="newtask" id="field" class="input" autocomplete="off">
            <input type="submit" name="submit" class="add-button" value="Lisää">
    </form>
    <div class="list">
        <ul>
            <li>
            </li>
        </ul>
<p id="info"></p>

    </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script src="memos_script.js" charset="utf-8"></script>


</body>
</html>
