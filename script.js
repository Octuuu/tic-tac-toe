const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const restartButton = document.getElementById('restart');

const board = Array(3).fill(null).map(() => Array(3).fill(null));
let currentPlayer = 'X';
let gameOver = false;

const renderBoard = () => {
  boardElement.innerHTML = ''; // Limpiar el tablero
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      if (cell) {
        cellElement.textContent = cell;
        cellElement.classList.add('taken');
      }
      cellElement.addEventListener('click', () => makeMove(rowIndex, colIndex));
      boardElement.appendChild(cellElement);
    });
  });
};

const checkWinner = () => {
  const lines = [
    ...board, // Filas
    [board[0][0], board[1][0], board[2][0]], // Columna 0
    [board[0][1], board[1][1], board[2][1]], // Columna 1
    [board[0][2], board[1][2], board[2][2]], // Columna 2
    [board[0][0], board[1][1], board[2][2]], // Diagonal principal
    [board[0][2], board[1][1], board[2][0]], // Diagonal secundaria
  ];

  for (const line of lines) {
    if (line.every(cell => cell === 'X')) return 'X';
    if (line.every(cell => cell === 'O')) return 'O';
  }

  if (board.flat().every(cell => cell)) return 'Draw'; // Empate

  return null;
};

const makeMove = (row, col) => {
  if (gameOver || board[row][col]) return; // Validar si el movimiento es permitido

  board[row][col] = currentPlayer; // Actualizar el tablero
  renderBoard(); // Volver a renderizar el tablero

  const winner = checkWinner(); // Verificar si hay un ganador
  if (winner) {
    gameOver = true;
    statusElement.textContent =
      winner === 'Draw' ? "¡Es un empate!" : `¡${winner} gana!`;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Cambiar de jugador
    statusElement.textContent = `Turno del jugador ${currentPlayer}`;
  }
};

const resetGame = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[i][j] = null; // Vaciar el tablero
    }
  }

  currentPlayer = 'X';
  gameOver = false;
  statusElement.textContent = `Turno del jugador ${currentPlayer}`;
  renderBoard(); // Renderizar el tablero vacío
};

// Agregar evento al botón de reinicio
restartButton.addEventListener('click', resetGame);

// Inicializar el juego
resetGame();


/*

const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const restartButton = document.getElementById('restart');

const board = Array(3).fill(null).map(() => Array(3).fill(null));
let currentPlayer = 'X';
let gameOver = false;

const renderBoard = () => {
  boardElement.innerHTML = '';
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      if (cell) {
        cellElement.textContent = cell;
        cellElement.classList.add('taken');
      }
      cellElement.addEventListener('click', () => makeMove(rowIndex, colIndex));
      boardElement.appendChild(cellElement);
    });
  });
};

const checkWinner = () => {
  // Check rows, columns, and diagonals
  const lines = [
    ...board, // Rows
    [board[0][0], board[1][0], board[2][0]], // Column 0
    [board[0][1], board[1][1], board[2][1]], // Column 1
    [board[0][2], board[1][2], board[2][2]], // Column 2
    [board[0][0], board[1][1], board[2][2]], // Diagonal
    [board[0][2], board[1][1], board[2][0]], // Anti-diagonal
  ];

  for (const line of lines) {
    if (line.every(cell => cell === 'X')) return 'X';
    if (line.every(cell => cell === 'O')) return 'O';
  }

  if (board.flat().every(cell => cell)) return 'Draw';

  return null;
};

const makeMove = (row, col) => {
  if (gameOver || board[row][col]) return;

  board[row][col] = currentPlayer;
  renderBoard();

  const winner = checkWinner();
  if (winner) {
    gameOver = true;
    statusElement.textContent = winner === 'Draw' ? "It's a draw!" : `${winner} wins!`;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
  }
};

const resetGame = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[i][j] = null;
    }
  }
  currentPlayer = 'X';
  gameOver = false;
  statusElement.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
};

restartButton.addEventListener('click', resetGame);

// Initialize game
resetGame();
*/