/*************************************************
 ** course   : CT30A3202 WWW-sovellukset         **
 ** author   : Teemu Tanninen                    **
 ** id       : 508505                            **
 ** date     : 24.09.17                          **
 ** exercise : week 2 - 4/5                      **
 *************************************************/

// Two dimensional array structure for holding the tic-tac-toe games

var board = [['','',''], ['','',''], ['','','']];
var rowInd;

const player1 = 1;
const player2 = 2;
const mark1 = "X";
const mark2 = "O";

var winner;

const cols = document.querySelectorAll('.col');

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
    for (var i = 0, l = arr.length; i < l; i++) {
        var v = arr[i];
    }
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
  changeMessage("Pelaaja 1 aloittaa");
  board = [[0,0,0], [0,0,0], [0,0,0]];
  document.querySelector('.prompt').style.display = "none";
  for (var i=0; i < cols.length; i++) {
    cols[i].innerText = '';
    cols[i].addEventListener('click', clickCol, false);
  }
}

function clickCol(col) {
  let element = document.getElementById(col.target.id);
  if (winner == null) {
      col.target.cellIndex;
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
    changeMessage(`Tasapeli, joten ei enää siirtoja!`);
    showPrompt(`Tasapeli!`);
  }
  else {
    turn = turn === player2 ? player1: player2;
    changeMessage(`Pelaajan ${turn} vuoro seuraavaksi`);
  }
}
