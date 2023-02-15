let data;
let dictionary;
let currentWord;

// word access
window.onload = async function () {
  var currentWord = {word: ''};
  fetchWords();
  
  createSquares();
  function createSquares() {
      const gameBoard = document.getElementById("board")
      for (let index = 0; index < 16; index++) {
          let square = document.createElement("div")
          square.classList.add("square");
          square.setAttribute("id", index+1);
          gameBoard.appendChild(square);
      }
  }
  async function fetchWords() {
    const button = document.getElementById("dog");
    button.innerText = "Loading...";
    button.disabled = true;
  const res = await fetch("https://api.masoudkf.com/v1/wordle", {
      headers: {
      "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
      },
  });
    const data = await res.json();
    dictionary = data.dictionary;
    button.innerText = "Start Over";
    button.disabled = false;
    loader();
  }

  function loader(){
    currentWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    currentWord.word = currentWord.word.toUpperCase();
    const wordElement = document.getElementById("word");
    wordElement.textContent = currentWord.word;
    const wordElement2 = document.getElementById("word2");
    wordElement2.textContent = currentWord.word;
  }

// Colour and worlde playablility
let i = 1;
let squaresFilled = 0;
let currentRow = 0;
const winScreen = document.querySelector(".win-screen");
const loseScreen = document.querySelector(".lose-screen");
let square = document.querySelector(`.square[id='${1}']`);
square.style.border = "2px solid rgb(110, 61, 8)";
document.addEventListener("keyup", function(event) {
  let square = document.querySelector(`.square[id='${i}']`);
  if (event.key === "Enter") {
    if (squaresFilled === 4) {
      if (currentRow < 3) {
        let squareNext = document.querySelector(`.square[id='${i}']`);
        squareNext.style.border = "2px solid rgb(110, 61, 8)";
      }
      if (currentRow < 3){
        let lastSquare1 = document.querySelector(`.square[id='${4}']`);
        let lastSquare2 = document.querySelector(`.square[id='${8}']`);
        let lastSquare3 = document.querySelector(`.square[id='${12}']`);
        lastSquare1.style.border = "2px solid rgb(158, 158, 158)";
        lastSquare2.style.border = "2px solid rgb(158, 158, 158)";
        lastSquare3.style.border = "2px solid rgb(158, 158, 158)";

      }
      for (var k = 0; k < squaresFilled; k++) {
          let square = document.querySelector(`.square[id='${k + 1 + (currentRow * 4)}']`);
          if (square.textContent === currentWord.word[k]) {
            square.classList.add("green-back");}
          else if (currentWord.word.indexOf(square.textContent) !== -1) {
              square.classList.add("yellow-back");}
          else {
            square.classList.add("grey-back");}
        }
        let square1 = document.querySelector(`.square[id='${1 + (currentRow * 4)}']`);
        let square2 = document.querySelector(`.square[id='${2 + (currentRow * 4)}']`);
        let square3 = document.querySelector(`.square[id='${3 + (currentRow * 4)}']`);
        let square4 = document.querySelector(`.square[id='${4 + (currentRow * 4)}']`);
        if (square1.textContent + square2.textContent + square3.textContent + square4.textContent === currentWord.word) {
            let lastSquare4 = document.querySelector(`.square[id='${16}']`);
            lastSquare4.style.border = "2px solid rgb(158, 158, 158)";
            hintarea.style.display = "none";
            hintText.textContent = "";
            document.getElementById("board").style.display = "none";
            document.getElementById("board-container").style.display = "none";
            document.getElementById("button").style.display = "none";
            winScreen.classList.add("win-active");
        }
        if (currentRow == 3 && square1.textContent + square2.textContent + square3.textContent + square4.textContent !== currentWord.word) {
            let lastSquare4 = document.querySelector(`.square[id='${16}']`);
            lastSquare4.style.border = "2px solid rgb(158, 158, 158)";
            hintarea.style.display = "none";
            hintText.textContent = "";
            loseScreen.classList.add("lose-active");
            return;
        }
        currentRow++;
        squaresFilled = 0;
    }
    else if (squaresFilled < 4){
      window.alert("first complete the word");
      return;
    }}
    else if (event.key === "Backspace" && squaresFilled > 0) {
    if (i > 1) {
        i--;
        squaresFilled--;
        let square = document.querySelector(`.square[id='${i}']`);
        square.textContent = "";
        square.classList.remove("green-back");
        square.classList.remove("yellow-back");
        square.classList.remove("grey-back");
        if (squaresFilled < 4){
          squareNext = document.querySelector(`.square[id='${i+1}']`);
          squareNext.style.border = "2px solid rgb(158, 158, 158)";
          squareBack = document.querySelector(`.square[id='${i}']`);
          squareBack.style.border = "2px solid rgb(110, 61, 8)";
        }
    }
  }
  else if (square && squaresFilled < 4 && event.key.match(/^[0-9a-z]+$/)) {
    square.textContent = event.key.toUpperCase();
    i++;
    squaresFilled++;
    if (squaresFilled < 4){
      square.style.border = "2px solid rgb(158, 158, 158)";
      squareNext = document.querySelector(`.square[id='${i}']`);
      squareNext.style.border = "2px solid rgb(110, 61, 8)";
      }
  }
}
);

// Key Display
const keyDisplay = document.getElementById("keyboard");
keyDisplay.style.display = "none";
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter"|| event.key === "Backspace" || squaresFilled < 4 && event.key.match(/^[0-9a-z]+$/)) {
      keyDisplay.style.display = "flex";
      if (event.key === "Enter") {
          keyDisplay.innerHTML = "&#8617;";}
      else if (event.key === "Backspace") {
          keyDisplay.innerHTML = "&#8592;";}
      else {
          keyDisplay.innerHTML = event.key.toUpperCase();}
      setTimeout(function () {
          keyDisplay.style.display = "none";
      }, 1000);
  }
});

// Start Over
const startOverButton = document.getElementById("button");
const winRestartButton = document.querySelector(".restart")
startOverButton.addEventListener("click", resetGame);
winRestartButton.addEventListener("click", resetGame);

function resetGame(event) {
  startOverButton.blur();
       startOverButton.addEventListener("keydown", function(event) {
           if (event.key === "Enter") {
             event.preventDefault();
             startOverButton.blur(); 
           }
         });

  if (event.target.tagName === "BUTTON") {
    winScreen.classList.remove("win-active");
    loseScreen.classList.remove("lose-active");

  const squares = document.querySelectorAll(".square");
  squares.forEach(square => {
    square.style.border = "2px solid rgb(158, 158, 158)";
    square.textContent = "";
    square.classList.remove("green-back");
    square.classList.remove("yellow-back");
    square.classList.remove("grey-back");
    const hintarea = document.querySelector(".hint-screen")
    hintarea.style.display = "none";
    document.getElementById("board").style.display = "grid";
    startOverButton.style.display = "flex";
  });
  document.getElementById("board-container").style.display = "flex";
  let square = document.querySelector(`.square[id='${1}']`);
  square.style.border = "2px solid rgb(110, 61, 8)";
  i = 1;
  squaresFilled = 0;
  currentRow = 0;
  loader();
}};

// How to Play
const playInfo = document.getElementById("how-to-play");
const boardContainer = document.querySelector("#board-container");
playInfo.style.display = "none";
const info = document.getElementById("info");
const mq = window.matchMedia("(min-width: 650px)");
window.addEventListener("resize", function() {
if (!mq.matches) {
  playInfo.style.display = "none";
  playInfo.classList.remove("show");
  boardContainer.style.width = "100%";
  startOverButton.style.width = "100%";
}
});
info.addEventListener("click", function() {
if (playInfo.style.display === "block") {
  playInfo.style.display = "none";}
else {
  playInfo.style.display = "block";}
if (mq.matches) {
  if (playInfo.classList.contains("show")) {
    playInfo.classList.remove("show");
    boardContainer.style.width = "100%";
    startOverButton.style.width = "100%";
    winScreen.style.width = "100%";
  } else {
    playInfo.classList.add("show");
    boardContainer.style.width = "60%";
    startOverButton.style.width = "60%";
    winScreen.style.width = "60%";
  }
}
});

// Hint
const hintarea = document.querySelector(".hint-screen")
const hintText = document.getElementById("hint-text");
hintarea.style.display = "none";
const hintbtn = document.getElementById("hint");
hintbtn.addEventListener("click", function() {
  if (hintarea.style.display === "flex") {
      hintarea.style.display = "none";}
  else {
      hintarea.style.display = "flex";
      hintText.textContent = currentWord.hint;}
});
};

// Dark Mode
const darkMode = document.querySelector("#color-change");
const body = document.querySelector("body");
darkMode.addEventListener("click", function() {
if (body.classList.contains("dark-mode")) {
  body.classList.remove("dark-mode");
} else {
  body.classList.add("dark-mode");}
});
