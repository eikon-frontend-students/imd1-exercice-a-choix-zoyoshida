const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "1";
let grid = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // lignes
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // colonnes
  [0, 4, 8],
  [2, 4, 6], // diagonales
];

function checkWinner() {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
      return grid[a];
    }
  }
  if (!grid.includes(null)) return "Tie";
  return null;
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (grid[index] || checkWinner()) return;

  grid[index] = currentPlayer;
  e.target.classList.add("taken");
  e.target.classList.add("taken-" + currentPlayer);

  const winner = checkWinner();
  if (!statusText) return;
  if (winner) {
    statusText.textContent =
      winner === "Tie" ? "It's a tie !" : `Player ${winner} wins !`;
  } else {
    currentPlayer = currentPlayer === "1" ? "2" : "1";
    statusText.textContent = `Player ${currentPlayer} turn`;
  }
}

function resetGame() {
  grid = Array(9).fill(null);
  currentPlayer = "1";
  if (!statusText) return;
  statusText.textContent = "Player 1 starts !";
  board.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
    cell.classList.remove("taken-1");
    cell.classList.remove("taken-2");
  });
}

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  }
}

resetBtn.addEventListener("click", resetGame);

createBoard();
