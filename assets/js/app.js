const $gameCirclesCells = document.querySelectorAll(".game-circle");
const $gameBoard = document.querySelector(".game-board");
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

console.log(redPlayer);
console.log(yellowPlayer);

function resetGameGrid() {
  $gameCirclesCells.forEach(($resetCircles) => {
    $resetCircles.innerHTML = "";
  });
}

resetGameGrid();

document.addEventListener("DOMContentLoaded", () => {

  console.log("Game circles after DOM load:", $gameCirclesCells.length);

  $gameCirclesCells.forEach(($gameCell) => {
    $gameCell.addEventListener("click", () => {
      console.log($gameCell);
      console.log($gameIconPlayer);
    });
  });
});
