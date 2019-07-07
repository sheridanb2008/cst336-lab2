// VARIABLES
var selectedWord = "";
var selectedHint = "";
var board = [];
var remainingGuesses = 6;
var hintFlag = false;
var words = [{
    word: "snake",
    hint: "Its a reptile"
  },
  {
    word: "monkey",
    hint: "Its a mammal"
  },
  {
    word: "beetle",
    hint: "It's a insect"
  }
];

// Creating an array of available letters
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
  'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
  'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];


// Listerers
window.onload = startGame();

// FUNCTIONS
function startGame() {
  pickWord();
  initBoard();
  updateBoard();
  //hintSetup();
  createLetters();
}
// Fill the board with underscores
function initBoard() {
  for (var letter in selectedWord) {
    board.push("_");
  }
}
// Pick Random word
function pickWord() {
  var randomInt = Math.floor(Math.random() * words.length);
  selectedWord = words[randomInt].word.toUpperCase();
  selectedHint = words[randomInt].hint;
}
// Update the letter on the board
function updateBoard() {
  $("#word").empty();
  for (var i = 0; i < board.length; i++) {
    $("#word").append(board[i] + " ");
    //for (var letter of board) {
    //  document.getElementById("word").innerHTML += letter + " ";
  }
  if(hintFlag == true){
    $("#word").append("<br/>");
    $("#word").append("<span class='hint'>Hint: " + selectedHint + "</span>");
  }
    $("#word").append("<h3>Chances Remaining: " + remainingGuesses + "</h3>");
}

$(".hintBtn").click(function() {
  $("#showHint").hide();
  hintFlag = true;
  $("#hintShowBtn").hide()
  remainingGuesses-=1;
  updateMan();
  updateBoard();
  if (remainingGuesses <= 0) {
    endGame(false);
  }
})

function createLetters() {
  for (var letter of alphabet) {
    $("#letters").append("<button class='letter btn btn-success' id='" + letter + "'>" + letter + "</button>");
  }
}
$(".letter").click(function() {
  checkLetter($(this).attr("id"));
  disableButton($(this));
})

// Checks to see if the selected letter exists in the selectedWord
function checkLetter(letter) {
  var positions = new Array();

  // Put all the positions the letter  exits in the selectedWord
  for (var i = 0; i < selectedWord.length; i++) {
    console.log(selectedWord)
    if (letter == selectedWord[i]) {
      positions.push(i);
    }
  }

  if (positions.length > 0) {
    updateWord(positions, letter);

    // Check to see if this is a winning guess
    if (!board.includes('_')) {
      endGame(true);
    }
  } else {
    remainingGuesses -= 1;
    updateMan();
    updateBoard();
  }
  if (remainingGuesses <= 0) {
    endGame(false);
  }
}
// update the current word then calls for a board update
function updateWord(positions, letter) {
  for (var pos of positions) {
    board[pos] = letter;
  }

  updateBoard();
}
// Disables te button and changes the style to tell the user it's disabled
function disableButton(btn) {
  btn.prop("disabled", true);
  btn.attr("class", "btn btn-danger")
}

function updateMan() {
  $("#hangImg").attr("src", "img/stick_" + (6 - remainingGuesses) + ".png");
}

function endGame(win) {
  $("#letters").hide();

  if (win) {
    $('#won').show();
  } else {
    $('#lost').show();
  }
}
$(".replayBtn").on("click", function() {
  location.reload();
});


// console.log(words[0]);