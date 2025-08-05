const board = document.getElementById("board");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = Array(9).fill("");
let gameActive = true;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

function createBoard() {
  board.innerHTML = "";
  gameBoard.forEach((_, i) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  });
}

function handleCellClick(e) {
  const index = e.target.getAttribute("data-index");

  if (gameBoard[index] !== "" || !gameActive) return;

  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    status.textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (gameBoard.every(cell => cell !== "")) {
    status.textContent = "It's a Draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    );
  });
}

function resetGame() {
  gameBoard = Array(9).fill("");
  gameActive = true;
  currentPlayer = "X";
  status.textContent = "Player X's turn";
  createBoard();
}

resetButton.addEventListener("click", resetGame);

createBoard();
