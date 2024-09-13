'use client';
import { useState, useEffect } from 'react';

// Function to check if it's safe to place a number
const isSafe = (board, row, col, num) => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }

  return true;
};

const solveSudoku = (board) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === '') {
        for (let num = 1; num <= 9; num++) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) return true;
            board[row][col] = '';
          }
        }
        return false;
      }
    }
  }
  return true;
};

const generateSudokuBoard = () => {
  const board = Array.from({ length: 9 }, () => Array(9).fill(''));
  solveSudoku(board);
  return board;
};

const createSudokuPuzzle = (board, clues = 40) => {
  const puzzle = board.map((row) => [...row]);
  let removed = 81 - clues;
  while (removed > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== '') {
      puzzle[row][col] = '';
      removed--;
    }
  }
  return puzzle;
};

const SudokuBoard = () => {
  const [solutionBoard, setSolutionBoard] = useState([]);
  const [puzzleBoard, setPuzzleBoard] = useState([]);
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const solution = generateSudokuBoard();
    setSolutionBoard(solution);
    setPuzzleBoard(createSudokuPuzzle(solution));
  }, []);

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} min ${seconds} sec`;
  };

  const handleInputChange = (value, rowIndex, colIndex) => {
    const newBoard = [...puzzleBoard];
    if (newBoard[rowIndex][colIndex] === '') {
      newBoard[rowIndex][colIndex] = value;
      setPuzzleBoard(newBoard);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-background text-white">
      <div className="flex justify-between items-center w-1/2 py-4">
        <div className="text-2xl">{formatTime()}</div>
        <button
          className="bg-button text-white px-4 py-2 rounded-full"
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>

      <div className="grid grid-cols-9 gap-1 bg-board rounded-lg p-4 shadow-lg">
        {puzzleBoard.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text" // To remove arrows
              value={value}
              onChange={(e) =>
                handleInputChange(e.target.value, rowIndex, colIndex)
              }
              disabled={value !== ''}
              className={`w-10 h-10 md:w-14 md:h-14 text-center border rounded-lg bg-white border-lightblue
                ${value !== '' ? 'text-black' : 'text-pink-500'}
                ${
                  value === ''
                    ? 'focus:outline-none focus:ring-2 focus:ring-blue-400'
                    : ''
                }`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SudokuBoard;
