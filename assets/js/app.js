// Main menu
const $menu = document.querySelector(".menu")
const $restart = document.querySelector('.restart')
const $mainMenu = document.querySelector('.main-menu')
const $gameButton = document.querySelectorAll('.game-button')
const $gameRulesButton = document.querySelector('.game-rules-button')
const $gameRules = document.querySelector('.game-rules-wrapper')
const $validateRules = document.querySelector('.icon-check')

// Le jeu
const $gameCirclesCells = document.querySelectorAll(".game-cell");
const $gameBoard = document.querySelector(".game-board");
const $gameBoardContainer = document.querySelector('.game-board-wrapper')
const $gameIconPlayer = document.querySelector(".icon-player");
const $gamePoints = document.querySelectorAll('.points')
const $winnerComponent = document.querySelector('.win-player-wrapper')
console.log($winnerComponent)
const $winner = document.querySelector('.winner');
const $playAgain = document.querySelector('.winner-play-again')

console.log($gamePoints)
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

// Timer
const $timerPlayer = document.querySelector('.timer-player-container')
const $timerBackground = document.querySelector('.background-player')
const $timerTitle = document.querySelector('.turn-player')
const $timer = document.querySelector('.timer')
const timerCpuBgc = "./assets/images/turn-background-yellow.svg"
const timerPlayerBgc = "./assets/images/turn-background-red.svg"

// Pause Menu
const $pauseMenuOverlay = document.querySelector('.pause-menu-overlay')
const $continueGame = document.querySelector('.continue-game')
const $restartGame = document.querySelector('.restart-game')
const $quitGame = document.querySelector('.quit-game')

let timer = 0;
let currentPlayer = "red";
let win = false;

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
// Je reset tout mon gamebaord avec timer
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
  // Parcours toutes les cases du tableau pour les conditions de victoire
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      let player = gameBoard[row][col];
      if (player === "") continue;  // Ignore les cases vides

      // Vérifie si 4 jetons sont alignés horizontalement
      if (col + 3 < 7 &&
        player === gameBoard[row][col + 1] &&
        player === gameBoard[row][col + 2] &&
        player === gameBoard[row][col + 3]) {
        win = true;
        return player;  // Retourne le joueur gagnant (rouge ou jaune)

      }

      // Vérifie si 4 jetons sont alignés verticalement
      if (row + 3 < 6 &&
        player === gameBoard[row + 1][col] &&
        player === gameBoard[row + 2][col] &&
        player === gameBoard[row + 3][col]) {
        win = true;
        return player;

      }

      // Vérifie si 4 jetons sont alignés en diagonale descendante
      if (row + 3 < 6 && col + 3 < 7 &&
        player === gameBoard[row + 1][col + 1] &&
        player === gameBoard[row + 2][col + 2] &&
        player === gameBoard[row + 3][col + 3]) {
        win = true;
        return player;

      }

      // Vérifie si 4 jetons sont alignés en diagonale montante
      if (row - 3 >= 0 && col + 3 < 7 &&
        player === gameBoard[row - 1][col + 1] &&
        player === gameBoard[row - 2][col + 2] &&
        player === gameBoard[row - 3][col + 3]) {
        win = true;
        return player;

      }
    }
  }
  return null;
}

// Fonction pour commencer le timer
function startTimer() {
  let timeLeft = 30;
  $timer.textContent = `${timeLeft}`;

  // Je dis que mon timer fasse un décompte de 30 à 0s
  timer = setInterval(() => {
    timeLeft--;
    $timer.textContent = `${timeLeft}`;
    // Si le timer est strictement inférieur ou égal à 0 je change de joueur et j'efface mon timer pour qu'il redevient à 0 
    if (timeLeft <= 0) {
      clearInterval(timer)
      switchPlayer()
    }
    // Je met un décompte de 30s
  }, 1000)
}

// Fonction pour change de joueur
function switchPlayer() {
  if (currentPlayer === "red") {
    currentPlayer = "yellow";
    $timerBackground.src = timerCpuBgc;
    $timerTitle.textContent = "CPU's Turn";
  } else {
    $timerBackground.src = timerPlayerBgc;
    $timerTitle.textContent = "Your Turn";
    currentPlayer = "red";
  }
  startTimer();
}

// Fonction de tout mes p'tits cercles dans mon gameboard
$gameCirclesCells.forEach(($gameCell) => {
  $gameCell.addEventListener("click", () => {
    const dataX = $gameCell.getAttribute("data-x");
    if (win) {
      return;
    }

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

        const winner = checkWin()

        // Affiche l'élément si on veut recommencer à jouer ou non
        if (winner) {
          $timerPlayer.classList.add("hidden")
          $winnerComponent.classList.remove("hidden")

          $playAgain.addEventListener('click', () => {
            resetGameGrid()
            $winnerComponent.classList.add('hidden')
            $timerPlayer.classList.remove('hidden')
            win = false
          })

          learInterval(timer);
          $winner.textContent = winner
          // J'incrémente de 1 à chaque win (si c'est le jaune ou le rouge)
          if (winner === "red") {
            $gamePoints[0].textContent = parseInt($gamePoints[0].textContent) + 1
          } else {
            $gamePoints[1].textContent = parseInt($gamePoints[1].textContent) + 1
          }
        }
        return;
      } else {
        console.log("Ce n'est pas vide");
      }
    }
  });
});

startTimer();

// Mon menu pause
document.addEventListener('keyup', (e) => {
  if (e.key === "Escape") {
    $pauseMenuOverlay.classList.toggle('hidden')
  }

  $continueGame.addEventListener('click', () => {
    $pauseMenuOverlay.classList.add('hidden')
  })

  $restartGame.addEventListener('click', () => {
    $gamePoints.forEach(($resetPoint) => {
      $resetPoint.textContent = "0";
    })
    $pauseMenuOverlay.classList.add('hidden')
    resetGameGrid()
  })

  $quitGame.addEventListener('click', () => {
    $pauseMenuOverlay.classList.add('hidden')
    $gameBoardContainer.classList.add('hidden')
    $mainMenu.classList.remove('hidden')

    $gamePoints.forEach(($resetPoint) => {
      $resetPoint.textContent = "0";
    })
    resetGameGrid();
  })

}) 