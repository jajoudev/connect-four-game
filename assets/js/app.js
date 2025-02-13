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

console.log($gameBoard);
console.log($gameCirclesCells);

let currentPlayer = "red";
let gameBoard = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
];

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
  $gameCirclesCells.forEach(($resetCells) => {
    $resetCells.innerHTML = "";
  });
}

resetGameGrid();

$restart.addEventListener('click', () => {
  resetGameGrid()
})

function checkWin() {
  console.log(gameBoard)

  // Première type de victoire
  if (gameBoard[5][0] === gameBoard[4][0] && gameBoard[4][0] === gameBoard[3][0] && gameBoard[3][0] === gameBoard[2][0]) {
    // console.log("Victoire")
  }

  console.log(gameBoard[5][0]) // r
  console.log(gameBoard[4][0]) // r
  console.log(gameBoard[3][0]) // r
  console.log(gameBoard[2][0]) // r

  // Deuxième type
  console.log(gameBoard[5][1]) // y
  console.log(gameBoard[4][1]) // r
  console.log(gameBoard[3][1]) // r
  console.log(gameBoard[2][1]) // r
  console.log(gameBoard[1][1]) // r

  // Troisième type
  console.log(gameBoard[5][2]) // y
  console.log(gameBoard[4][2]) // y
  console.log(gameBoard[3][2]) // r
  console.log(gameBoard[2][2]) // r
  console.log(gameBoard[1][2]) // r
  console.log(gameBoard[0][2]) // r
}


$gameCirclesCells.forEach(($gameCell) => {
  $gameCell.addEventListener("click", () => {
    const dataX = $gameCell.getAttribute("data-x");

    for (let i = 5; i >= 0; i--) {
      if (gameBoard[i][dataX] === "") {
        console.log("C'est vide");
        gameBoard[i][dataX] = currentPlayer; 

        if (currentPlayer === "red") {
          const selectedGameCell = document.querySelector(`.game-cell[data-y="${i}"][data-x="${dataX}"]`)
          selectedGameCell.innerHTML = redPlayer
          currentPlayer = "yellow";
        } else {
          const selectedGameCell = document.querySelector(`.game-cell[data-y="${i}"][data-x="${dataX}"]`)
          selectedGameCell.innerHTML = yellowPlayer

          currentPlayer = "red";
        }

        return;
      } else {
        console.log("Ce n'est pas vide");
      }
    }
  });
});