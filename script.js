"use strict";

// Initialize game variables
let player1 = 0;
let player2 = 0;
let count = 0;

// Event listener for the roll dice button
document.querySelector(".btn").addEventListener("click", function () {
  let value = Math.floor(Math.random() * 6) + 1;
  count++;
  if (count > 0) {
    document.querySelector(".logo").style.display = "none";
  }
  rollDice(value);

  //odd count player 1 turn
  if (count % 2 !== 0) {
    activePlayer("player-1");
    if (value === 1 && count !== 5) {
      player2 += 5;
      player1 -= 5;
    } else {
      player1 += value;
    }
    checkWinner();
    updateScore();
  } else {
    activePlayer("player-2");
    if (value === 1 && count !== 1) {
      player1 += 5;
      player2 -= 5;
    } else {
      player2 += value;
    }
    checkWinner();
    updateScore();
  }

  if (value === 6) {
    count++;
  }
});

// Function to roll the dice and update the display
function rollDice(value) {
  reset();
  switch (value) {
    case 6:
      hideDot("dot-5");
      break;
    case 5:
      hideDot("dot-4");
      hideDot("dot-6");
      break;
    case 4:
      hideDot("dot-4");
      hideDot("dot-5");
      hideDot("dot-6");
      break;
    case 3:
      hideDot("dot-1");
      hideDot("dot-4");
      hideDot("dot-6");
      hideDot("dot-9");
      break;
    case 2:
      hideDot("dot-1");
      hideDot("dot-4");
      hideDot("dot-5");
      hideDot("dot-6");
      hideDot("dot-9");
      break;
    case 1:
      hideDot("dot-1");
      hideDot("dot-4");
      hideDot("dot-3");
      hideDot("dot-7");
      hideDot("dot-6");
      hideDot("dot-9");
      break;
    default:
  }
}

// Reset the dice to show all dots
function reset() {
  const list = document.querySelectorAll(".dot");
  list.forEach((element) => {
    element.classList.remove("hidden");
  });
}

// Hide specific dots on the dice
function hideDot(className) {
  document.querySelector(`.${className}`).classList.add("hidden");
}

// Function to switch the active player
function activePlayer(className) {
  const players = document.querySelectorAll(".player");

  players.forEach((player) => {
    player.classList.remove("active-player");
  });

  document.querySelector(`.${className}`).classList.add("active-player");
}

//Check who had reached 30 points
function checkWinner() {
  if (player1 >= 30) {
    winner(1);
  } else if (player2 >= 30) {
    winner(2);
  }
}

//Update the score text
function updateScore() {
  document.querySelector(".player-1-score").textContent = player1;
  document.querySelector(".player-2-score").textContent = player2;
}


function winner(player) {
  document.querySelector(".btn").style.display = "none";

  let dots = document.querySelectorAll(".dot");
  dots.forEach((element) => {
    element.classList.add("hidden");
  });

  document.querySelector(".winner").classList.remove("display-none");
  document.querySelector(
    ".text"
  ).textContent = `Player ${player} is the winner...`;
}

// Event listener to close the rule card and start the game
let closeRuleCard = document.querySelectorAll(".close");
closeRuleCard.forEach((element) => {
  element.addEventListener("click", function () {
    document.querySelector(".rule-card").style.display = "none";
    document.querySelector(".game").style.display = "block";
  });
});
