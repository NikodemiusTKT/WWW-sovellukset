/*************************************************
 ** course   : CT30A3202 WWW-sovellukset         **
 ** author   : Teemu Tanninen                    **
 ** id       : 508505                            **
 ** date     : 01.10.17                          **
 ** exercise : week 3 - 3-5                      **
 *************************************************/

// Two dimensional array structure for holding the tic-tac-toe games

var board = [['','',''], ['','',''], ['','','']];
var rowInd;

var player1;
var player2;
const mark1 = "X";
const mark2 = "O";

var winner;

const cols = document.querySelectorAll('.col');


$(document).ready(function() {
    changeMessage("Antakaa pelaajille nimet");
    $( "#dialog" ).dialog({
        autoOpen: true,
        resizable: false,
        modal: true,
        buttons: {
            crUser: {
                class: 'dButton',
                text: 'Nimeä pelaaja',
                click: addUser
            }
        },
        beforeClose: function(event, ui) {
            if (player1 && player2) {
                return true;
            }
            else { 
                updateDialogText("Et voi sulkea tätä dialogia ennen kuin annat nimet molemmille pelaajille.");
                return false;
            }
        }
    });
 
});

function openDialog() {
    player1 = ""; 
    player2 = "";
    updateDialogText("Anna pelaajalle 1 nimi.");
    $("#dialog").dialog("open");
}
function updateDialogText(message) {
    $("#dialog-text").text(message).addClass("ui-state-hightlight");
    setTimeout(function() {
        $("#dialog-text").removeClass("ui-state-hightlight", 1500);
    }, 500);
}

function addUser() {
    var valid = true;
    $("#name").removeClass("ui-state-error");
    valid = valid && checkNameLength(1,8);
    valid = valid && checkNameCharacters(/^([a-z])+$/i);
    if (valid) {
        if (!player1) {
            player1 = $("#name").val();
            updateDialogText("Anna pelaajalle 2 nimi.");
            $("#player1").text(`${mark1} - ${player1}`);
        }
        else  {
            player2 = $("#name").val();
            $("#dialog").dialog("close");
            $("#player2").text(`${mark2} - ${player2}`);
            startGame();
        }
    }
    $("#name").val("");
    return valid;
}

function checkNameLength(min, max) {
    var nameLength = $("#name").val().length;
    var valid = true;
    if (nameLength < min) {
        updateDialogText(`Nimen on oltava vähintään ${min} merkin pituinen.`);
        valid = false;
    } else if (nameLength > max) {
        updateDialogText(`Nimen on oltava korkeintaan ${max} merkkiä pitkä.`);
        valid = false;
    }
    if (!valid) 
        $("#name").addClass("ui-state-error");
    return valid;
}
function checkNameCharacters(pattern) {
    var name = $("#name");
    if (!pattern.test(name.val())) {
        updateDialogText("Nimessä saa olla vain isoja ja pieniä kirjaimia.");
        name.addClass("ui-state-error");
        return false;
    }
    return true;

}

function checkWinner(grid) {
  // check for horizontal win
  for (var i = 0; i < 3; i++) {
    if (grid[i][0] !== 0 && grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) {
      return 1;
    }
  }
  // check for vertical win
  for (var j = 0; j < 3; j++) {
    if (grid[0][j] !== 0 && grid[0][j] === grid[1][j] && grid[0][j] === grid[2][j]) {
      return 1;
    }
  }
  // check for diagonal top-left-bottom-right
  if (grid[0][0] !== 0 && grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]) {
    return 1;
  }
  // check for diagonal bottom-left-top-right
  if (grid[2][0] !== 0 && grid[2][0] === grid[1][1] && grid[2][0] === grid[0][2]) {
    return 1;
  }
  return 0;
}

function checkTie(grid) {
  for (i=0; i < 3; i++) {
    for (j=0; j < 3; j++) {
      if (grid[i][j] === 0)
        return false;
    }
  }
  return true;
}



function startGame() {
  turn = player1;
  winner = null;
  board = [[0,0,0], [0,0,0], [0,0,0]];
  document.querySelector('.prompt').style.display = "none";
  for (var i=0; i < cols.length; i++) {
    cols[i].innerText = '';
    cols[i].addEventListener('click', clickCol, false);
  }
    changeMessage(`Pelaaja ${turn} aloittaa.`);
}

function clickCol(col) {
  let element = document.getElementById(col.target.id);
  if (winner == null) {
    if (element.innerText === "") {
      board[element.dataset.r][element.dataset.c] = turn;
      draw = turn === player1 ? mark1 : mark2;
      element.innerText = draw; 
      turnSwitch();
      return 1;
    }
  }
  return -1;
}
function changeMessage(msg) {
  document.getElementById("viesti").innerText = msg;
}

function showPrompt(situation) {
  document.querySelector(".prompt").style.display = "block";
  document.querySelector(".prompt .text").innerText = situation;
}

function turnSwitch() {
  if (checkWinner(board) === 1) {
    winner = turn;
    changeMessage(`Pelaaja ${winner} voitti, joten ei enää uusia siirtoja!`);
    showPrompt(`Pelaaja ${winner} voitti`);
  } else if (checkTie(board) == true) { 
    changeMessage(`Tasapeli, joten ei enää uusia siirtoja!`);
    showPrompt(`Tasapeli!`);
  }
  else {
    turn = turn === player2 ? player1: player2;
    changeMessage(`Pelaajan ${turn} vuoro seuraavaksi`);
  }
}
