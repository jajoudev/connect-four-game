const $mainMenu = document.querySelector('.main-menu')
const $gameButton = document.querySelectorAll('.game-button')
const $gameRulesButton = document.querySelector('.game-rules-button')
const $gameRules = document.querySelector('.game-rules-wrapper')
const $validateRules = document.querySelector('.icon-check')
const $gameCirclesCells = document.querySelectorAll(".game-cell");
const $gameBoard = document.querySelector(".game-board");
const $gameBoardContainer = document.querySelector('.game-board-wrapper')
const $menu = document.querySelector(".menu")
const $restart = document.querySelector('.restart')
const $gameIconPlayer = document.querySelector(".icon-player");

// Timer
const $timerPlayer = document.querySelector('.timer-player-container')
console.log($timerPlayer)
const $timerBackground = document.querySelector('.background-player')
const $timerTitle = document.querySelector('.turn-player')
const $timer = document.querySelector('.timer')
console.log($timerBackground)

const yellowPlayer = `
<svg width="70px" height="75px" viewBox="0 0 70 75" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>counter-yellow-large</title>
    <defs>
        <circle id="path-1" cx="35" cy="35" r="32"></circle>
        <filter x="-3.9%" y="-3.9%" width="107.8%" height="107.8%" filterUnits="objectBoundingBox" id="filter-2">
            <feOffset dx="0" dy="5" in="SourceAlpha" result="shadowOffsetInner1"></feOffset>
            <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1"></feColorMatrix>
        </filter>
    </defs>
    <g id="Designs" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="counter-yellow-large">
            <circle id="Oval-Copy-35" fill="#000000" cx="35" cy="35" r="35"></circle>
            <circle id="Oval-Copy-36" fill="#000000" cx="35" cy="40" r="35"></circle>
            <g id="Oval-Copy-35">
                <use fill="#FFCE67" fill-rule="evenodd" xlink:href="#path-1"></use>
                <use fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1"></use>
            </g>
        </g>
    </g>
</svg>`;

const redPlayer = `
<svg width="70px" height="75px" viewBox="0 0 70 75" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>counter-red-large</title>
    <defs>
        <circle id="path-1" cx="35" cy="35" r="32"></circle>
        <filter x="-3.9%" y="-3.9%" width="107.8%" height="107.8%" filterUnits="objectBoundingBox" id="filter-2">
            <feOffset dx="0" dy="5" in="SourceAlpha" result="shadowOffsetInner1"></feOffset>
            <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1"></feColorMatrix>
        </filter>
    </defs>
    <g id="Designs" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="counter-red-large">
            <circle id="Oval-Copy-41" fill="#000000" cx="35" cy="35" r="35"></circle>
            <circle id="Oval-Copy-42" fill="#000000" cx="35" cy="40" r="35"></circle>
            <g id="Oval-Copy-43">
                <use fill="#FD6687" fill-rule="evenodd" xlink:href="#path-1"></use>
                <use fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1"></use>
            </g>
        </g>
    </g>
</svg>`;

const timerCpuBgc = "./assets/images/turn-background-yellow.svg"
const timerPlayerBgc = "./assets/images/turn-background-red.svg"

console.log($gameBoard);
console.log($gameCirclesCells);

let currentPlayer = "red";
let timer;
let gameBoard = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
];

$gameButton.forEach(($gameButtons) => {
  $gameButtons.addEventListener('click', () => {
    $mainMenu.classList.add('hidden')
    $gameBoardContainer.classList.remove('hidden')
  })
})

$gameRulesButton.addEventListener('click', () => {
  $mainMenu.classList.add('hidden')
  $gameRules.classList.remove('hidden')

  $validateRules.addEventListener('click', () => {
    $mainMenu.classList.remove('hidden')
    $gameRules.classList.add('hidden')
  })
})

$menu.addEventListener('click', () => {
  $mainMenu.classList.remove('hidden')
  $gameBoardContainer.classList.add('hidden')
})

function resetGameGrid() {
  gameBoard = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ];

  $gameCirclesCells.forEach(($resetCells) => {
    $resetCells.innerHTML = "";  
  });

  currentPlayer = "red";

  $timer.textContent = "30";
  clearInterval(timer); 
  startTimer(); 

  $timerBackground.src = timerPlayerBgc;
  $timerTitle.textContent = "Your Turn"; 
}


$restart.addEventListener('click', () => {
  resetGameGrid()
})

function checkWin() {
  // Parcours toutes les cases du tableau pour vérifier les conditions de victoire
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      let player = gameBoard[row][col];
      if (player === "") continue;  // Ignore les cases vides

      // Vérifier la ligne (horizontal) : vérifie si 4 jetons sont alignés horizontalement
      if (col + 3 < 7 && 
        player === gameBoard[row][col + 1] &&
        player === gameBoard[row][col + 2] &&
        player === gameBoard[row][col + 3]) {
        return player;  // Retourne le joueur gagnant (rouge ou jaune)
      }

      // Vérifier la colonne (vertical) : vérifie si 4 jetons sont alignés verticalement
      if (row + 3 < 6 &&
        player === gameBoard[row + 1][col] &&
        player === gameBoard[row + 2][col] &&
        player === gameBoard[row + 3][col]) {
        return player;
      }

      // Vérifier la diagonale descendante : vérifie si 4 jetons sont alignés en diagonale descendante
      if (row + 3 < 6 && col + 3 < 7 &&
        player === gameBoard[row + 1][col + 1] &&
        player === gameBoard[row + 2][col + 2] &&
        player === gameBoard[row + 3][col + 3]) {
        return player;
      }

      // Vérifier la diagonale montante : vérifie si 4 jetons sont alignés en diagonale montante
      if (row - 3 >= 0 && col + 3 < 7 &&
        player === gameBoard[row - 1][col + 1] &&
        player === gameBoard[row - 2][col + 2] &&
        player === gameBoard[row - 3][col + 3]) {
        return player;
      }
    }
  }

  return null; 
}


function startTimer() {
  let timeLeft = 30;
  $timer.textContent = `${timeLeft}`;

  timer = setInterval(() => {
    timeLeft--;
    $timer.textContent = `${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer)
      switchPlayer()
    }
  }, 1000)
}

function switchPlayer() {
  currentPlayer = "yellow";
  $timerBackground.src = timerCpuBgc;
  $timerTitle.textContent = "CPU's Turn";

  $timerBackground.src = timerPlayerBgc;
  $timerTitle.textContent = "Your Turn";
  currentPlayer = "red";
  startTimer();
}

$gameCirclesCells.forEach(($gameCell) => {
  $gameCell.addEventListener("click", () => {
    const dataX = $gameCell.getAttribute("data-x");

    for (let i = 5; i >= 0; i--) {
      if (gameBoard[i][dataX] === "") {
        gameBoard[i][dataX] = currentPlayer;

        const selectedGameCell = document.querySelector(`.game-cell[data-y="${i}"][data-x="${dataX}"]`);

        if (currentPlayer === "red") {
          selectedGameCell.innerHTML = redPlayer;
          currentPlayer = "yellow";
          $timerBackground.src = timerCpuBgc;
          $timerTitle.textContent = "CPU's Turn";
        } else {
          selectedGameCell.innerHTML = yellowPlayer;
          $timerBackground.src = timerPlayerBgc;
          $timerTitle.textContent = "Your Turn";
          currentPlayer = "red";
        }

        clearInterval(timer);
        startTimer();

        const winner = checkWin();
        if (winner) {
          alert(`${winner.charAt(0).toUpperCase() + winner.slice(1)} wins!`);
          resetGameGrid();
          return;
        }

        return;
      } else {
        console.log("Ce n'est pas vide");
      }
    }
  });
});


startTimer();