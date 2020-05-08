var highlightBlue = "#091491";
var yellow = "#ffe730";
var red = "#dd1c1a";
var turn = "R";

// DOM Selections
var circles = $(".circle");

// Event Listeners

// Reset button
$("button").click(buttonReload);

circles.click(clicked);

// Creating the board
var board = boardCreator();

// functions

function boardCreator(){
  /**
    * Creates a board to represent the state of the game.
    * Gives easy access to each circle's DOM, index and color
  */

  var board = [];
  for (var i = 0; i < 6; i++) {
    var rows = []
    for (var j = 0; j < 7; j++){
      rows.push(
        {
          element: circles.eq(i*7+j),
          index: [i, j],
          color: "W"
        });
    }
    board.push(rows);
  }
  return board;
}

function findPos($circleElement) {
  /**
    * Uses the board to find position of the $circleElement passed to the function
  */

  for (var row of board) {
    for (var col of row) {
      if (col.element.get(0) === $circleElement.get(0)) {
        return col.index;
      }
    }
  }
}

function circleDecider($circleElement){
  /**
    * Checks the column of the clicked circle and returns the first White or Empty circle which can be filled.
  */

  position = findPos($circleElement);

  var row = position[0];
  var col = position[1];

  var circleReqIndex = "";

  for (var i = 5; i >= 0; i--) {
    if (board[i][col].color === "W") {
      circleReqIndex = board[i][col].index;
      return circleReqIndex;
    }
  }
  return "Column is Full";
}

function checkWinner(turn, row, col){
  /**
    * Uses color to compare winner.
    * This function should be called after every turn to check if a move resulted in a winning condition.
    * Uses row, column and diagonal checks to detect winning.
    * Row and Diagonal checkers have for loops for reasons discussed in the readme
  */

  var checkColorString = turn + turn + turn + turn;

  // row wise

  for (var i = 0; i < 4; i ++){

    var rowResultFront = checkRow(checkColorString, row, col + i);
    var rowResultBack = checkRow(checkColorString, row, col - i);

    if (rowResultFront.val){
      return rowResultFront.cells;
    } else if (rowResultBack.val) {
      return rowResultBack.cells;
    }
  }

  // col wise

  colResult = checkColumn(checkColorString, row, col);

  if (colResult.val) {
    return colResult.cells;
  }

  // diagonally

  for (var i = 0; i < 4; i++){

    var diagonalResultSE = checkDiagonal(checkColorString, row + i , col + i);
    var diagonalResultSW = checkDiagonal(checkColorString, row + i, col - i);
    var diagonalResultNE = checkDiagonal(checkColorString, row - i, col + i);
    var diagonalResultNW = checkDiagonal(checkColorString, row - i, col - i);

    if (diagonalResultSE.val){
      return diagonalResultSE.cells;
    } else if (diagonalResultSW.val) {
      return diagonalResultSW.cells;
    } else if (diagonalResultNE.val){
      return diagonalResultNE.cells;
    } else if (diagonalResultNW.val) {
      return diagonalResultNW.cells;
    }
  }
  return false;
}

function checkRow (checkColorString, row, col) {
  /**
    * Checks the given row for winning condition.
    * If four in a line matchup the context of those four cells is returned, along with a true in the form of an object.
    * Else false gets returned, in a similar object.
    * This function just checks 4 cells left and 4 cells right, to determine the winning condition
    * Which is why a for loop becomes necessary when calling this to satisfy all checks as discussed in the readme
  */

  if (col < 7) {
    var rowString = "";
    for (var obj of board[row].slice(col, col+4)) {
      rowString += obj.color;
    }

    if (checkColorString === rowString){
      var winnerCells = [];
      for (var obj of board[row].slice(col, col+4)) {
        winnerCells.push(obj.element)
      }
      return {val: true, cells: winnerCells}
    }

  }
  if (col > -1) {

    var rowString = "";

    for (var obj of board[row].slice(col-3, col+1)) {
      rowString += obj.color;
    }

    if (checkColorString === rowString){

      var winnerCells = [];

      for (var obj of board[row].slice(col-3, col+1)) {
        winnerCells.push(obj.element)
      }

      return {val: true, cells: winnerCells};
    }
  }

  return {val: false, cells: []};
}

function checkColumn (checkColorString, row, col) {
  /**
    * Checks the given column for winning condition.
    * If four in a line matchup the context of those four cells is returned, along with a true in the form of an object.
    * Else false gets returned, in a similar object.
    * This function just checks 4 cells top and 4 cells bottom, to determine the winning condition
    * However for loop is not necessary for calling this as discussed in the readme
  */

  if (row + 3 < 6) {
    var colString = "";
    for (var i = 0; i < 4; i++) {
      colString += board[row+i][col].color;
    }

    if (checkColorString === colString){

      var winnerCells = [];

      for (var i = 0; i < 4; i++) {
        winnerCells.push(board[row+i][col].element);
      }

    return {val: true, cells: winnerCells}
    }

  }

  if (row - 3 > -1) {

    var colString = "";

    for (var i = 0; i < 4; i++) {
      colString += board[row-i][col].color;
    }

    if (checkColorString === colString){

      var winnerCells = [];

      for (var i = 0; i < 4; i++) {
        winnerCells.push(board[row-i][col].element);
      }

      return {val: true, cells: winnerCells}
    }
  }

  return {val: false, cells: []}
}

function checkDiagonal (checkColorString, row, col) {
  /**
    * Checks the given row, col for winning condition.
    * If four in a line matchup the context of those four cells is returned, along with a true in the form of an object.
    * Else false gets returned, in a similar object.
    * This function just checks 4 cells diagonally in all four possible ways, to determine the winning condition
    * Which is why a for loop becomes necessary when calling this to satisfy all checks as discussed in the readme
  */

  // Curbs out of range values
  if (row < 6 && row > -1 && col < 7 && col > -1) {

    // This checks for SE diagonal
    if (row + 3 < 6 && col + 3 < 7) {

      var diagonalString = "";

      for(var i = 0; i < 4; i++) {
        diagonalString += board[row+i][col+i].color;
      }

      if (checkColorString === diagonalString) {

        var winnerCells = [];

        for (var i = 0; i < 4; i++) {
          winnerCells.push(board[row+i][col+i].element);
        }
        return {val: true, cells: winnerCells}
      }
    }

    // This checks for SW degree diagonal
    if (row + 3 < 6 && col - 3 > -1) {

      var diagonalString = "";

      for(var i = 0; i < 4; i++){
        diagonalString += board[row+i][col-i].color;
      }

      if (checkColorString === diagonalString) {

        var winnerCells = [];

        for (var i = 0; i < 4; i++){
          winnerCells.push(board[row+i][col-i].element);
        }
        return {val: true, cells: winnerCells}
      }
    }

    // This checks for NE degree diagonal
    if (row - 3 > -1 && col + 3 < 7) {

      var diagonalString = "";

      for(var i = 0; i < 4; i++) {
        diagonalString += board[row-i][col+i].color;
      }

      if (checkColorString === diagonalString) {

        var winnerCells = [];

        for (var i = 0; i < 4; i++){
          winnerCells.push(board[row-i][col+i].element);
        }
        return {val: true, cells: winnerCells};
      }
    }

    // This checks for NW degree diagonal
    if (row - 3 > -1 && col - 3 > -1) {

      var diagonalString = "";

      for(var i = 0; i < 4; i++){
        diagonalString += board[row-i][col-i].color;
      }

      if (checkColorString === diagonalString){
        var winnerCells = [];

        for (var i = 0; i < 4; i++){
          winnerCells.push(board[row-i][col-i].element);
        }

        return {val: true, cells: winnerCells};
      }
    }
  }
  return {val: false, cells: []};
}

function clicked(){

  // Index of circle to be filled
  circleReqIndex = circleDecider($(this));

  // logic for turn and color
  if(circleReqIndex !== "Column is Full") {

    var row = circleReqIndex[0];
    var col = circleReqIndex[1];

    if (turn === "R") {

      board[row][col].element.css("backgroundColor", red);
      board[row][col].color = "R";
      var winnerCells = checkWinner(turn, row, col);
      turn = "Y";
      $("span").css("backgroundColor", yellow);

    } else if (turn === "Y") {

      board[row][col].element.css("backgroundColor", yellow);
      board[row][col].color = "Y";
      var winnerCells = checkWinner(turn, row, col);
      turn = "R";
      $("span").css("backgroundColor", red);

    }
  }

  board[row][col].element.off("click");

  // Winning logic

  if(winnerCells){

    for (var winner of winnerCells){

      winner.css("borderColor", highlightBlue);
      winner.css("borderWidth", "3px");
      circles.off("click");

      if (turn === "Y"){
        $("span").css("backgroundColor", red);
      } else if (turn === "R"){
        $("span").css("backgroundColor", yellow);
      }

      var htmlStr = $("h3").html().replace("Your Turn", "Has Won!");
      $("h3").html(htmlStr);
      $("button").css({
        "borderColor": highlightBlue,
        "borderWidth": "4px"
      });
    }
  }
}

function buttonReload() {
  location.reload();
}
