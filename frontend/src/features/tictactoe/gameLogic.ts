// Game logic utilities for Tic-Tac-Toe matching the Python implementation

export type CellValue = number | 'O' | 'X';
export type Board = CellValue[][];
export type GameStatus = 'playing' | 'human-won' | 'computer-won' | 'tie';

// Initialize board with numbers 1-9 and 'X' in the center
export function initializeBoard(): Board {
  const board: Board = [];
  for (let j = 0; j < 3; j++) {
    const row: CellValue[] = [];
    for (let i = 0; i < 3; i++) {
      row.push(3 * j + i + 1);
    }
    board.push(row);
  }
  // Set first 'X' in the middle
  board[1][1] = 'X';
  return board;
}

// Make a list of free fields
export function makeListOfFreeFields(board: Board): [number, number][] {
  const free: [number, number][] = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] !== 'O' && board[row][col] !== 'X') {
        free.push([row, col]);
      }
    }
  }
  return free;
}

// Check for victory
export function victoryFor(board: Board, sgn: 'O' | 'X'): 'you' | 'me' | null {
  const who = sgn === 'X' ? 'me' : 'you';
  
  let cross1 = true;
  let cross2 = true;
  
  for (let rc = 0; rc < 3; rc++) {
    // Check row rc
    if (board[rc][0] === sgn && board[rc][1] === sgn && board[rc][2] === sgn) {
      return who;
    }
    // Check column rc
    if (board[0][rc] === sgn && board[1][rc] === sgn && board[2][rc] === sgn) {
      return who;
    }
    // Check 1st diagonal
    if (board[rc][rc] !== sgn) {
      cross1 = false;
    }
    // Check 2nd diagonal
    if (board[2 - rc][2 - rc] !== sgn) {
      cross2 = false;
    }
  }
  
  if (cross1 || cross2) {
    return who;
  }
  
  return null;
}

// Get game status
export function getGameStatus(board: Board): GameStatus {
  const humanWin = victoryFor(board, 'O');
  const computerWin = victoryFor(board, 'X');
  
  if (humanWin === 'you') {
    return 'human-won';
  }
  if (computerWin === 'me') {
    return 'computer-won';
  }
  
  const free = makeListOfFreeFields(board);
  if (free.length === 0) {
    return 'tie';
  }
  
  return 'playing';
}

// Apply human move
export function applyHumanMove(board: Board, cellNumber: number): Board {
  const move = cellNumber - 1;
  const row = Math.floor(move / 3);
  const col = move % 3;
  
  const newBoard = board.map(r => [...r]);
  newBoard[row][col] = 'O';
  return newBoard;
}

// Make computer move (random)
export function makeComputerMove(board: Board): Board {
  const free = makeListOfFreeFields(board);
  if (free.length === 0) {
    return board;
  }
  
  const randomIndex = Math.floor(Math.random() * free.length);
  const [row, col] = free[randomIndex];
  
  const newBoard = board.map(r => [...r]);
  newBoard[row][col] = 'X';
  return newBoard;
}

// Check if a cell is free
export function isCellFree(board: Board, cellNumber: number): boolean {
  const move = cellNumber - 1;
  const row = Math.floor(move / 3);
  const col = move % 3;
  const sign = board[row][col];
  return sign !== 'O' && sign !== 'X';
}
