<?php
require_once('db.php');
session_start();
session_unset();
?>
<!doctype html>
<html lang="en">
  <head>
    <title>Muistilista kirjautuminen</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jquery.bootstrapvalidator/0.5.2/css/bootstrapValidator.min.css"/>
    <link rel="stylesheet" href="login.css" type="text/css" media="all" />
  </head>
  <body>
    
      <div class="container">
          <div class="row">

              <div class="col-4 mx-auto">
                  <div class="panel panel-login p-3">
                      <div class="panel-heading">
                          <ul class="nav nav-pills nav-justified mb-3" id="pills-tab" role="tablist">
                              <li class="nav-item">
                                  <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Kirjaudu</a>
                              </li>
                              <li class="nav-item">
                                  <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Luo tunnus</a>
                              </li>
                          </ul>
                      </div>
                      <div class="panel-body">
                          <div class="tab-content" id="pills-tabContent">
                              <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">.
                                  <form id="login" method="POST" data-ajax="false">
                                      <h1 class="text-white text-center">Kirjautuminen</h1>
                                      <div class="form-group">
                                          <label for="user" class="text-white">Käyttäjänimi</label>
                                          <input type="text" class="form-control" id="loguser" aria-describedby="loguser" placeholder="Anna käyttäjänimi" name="loguser">
                                      </div>
                                      <div class="form-group">
                                          <label for="logpassword" class="text-white">Salasana</label>
                                          <input type="password" class="form-control" id="logpassword" placeholder="Anna salasana" name="logpassword">
                                      </div>
                                      <button type="submit" class="btn btn-lg btn-login btn-block">Kirjaudu sisään</button>
                                  </form>
                              </div>
                              <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                  <form id="register" method="POST">
                                      <h1 class="text-white text-center m-0">Tunnuksen luonti</h1>
                                      <div class="form-group">
                                          <label for="reguser" class="text-white">Käyttäjänimi</label>
                                          <input type="text" class="form-control" id="reguser" aria-describedby="reguser" placeholder="Enter email" name="reguser">
                                      </div>
                                      <div class="form-group">
                                          <label for="regpassword" class="text-white">Salasana</label>
                                          <input type="password" class="form-control" id="regpassword" placeholder="Salasana" name="regpassword" required>
                                          <small id="passhelp" class="form-text text-muted">Salasanassa on oltava vähintään 8 merkkiä ja sisällettävä sekä numeroita että kirjaimia.</small>
                                      </div>
                                      <div class="form-group">
                                          <label for="confpasss" class="text-white">Salasanan varmistus</label>
                                          <input type="password" class="form-control" placeholder="Salasana" name="confpass">
                                      </div>
                                      <button type="submit" class="btn btn-lg btn-login btn-block">Luo uusi tunnus</button>
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.js" charset="utf-8"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/additional-methods.js"></script>
        <script src="login_script.js" charset="utf-8"></script>
  </body>

</html>
