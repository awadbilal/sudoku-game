'use client';
import { useState, useEffect } from 'react';

// Generate a basic empty board
const generateEmptyBoard = () =>
  Array.from({ length: 9 }, () => Array(9).fill(''));

const SudokuBoard = () => {
  const [puzzleBoard, setPuzzleBoard] = useState(generateEmptyBoard());

  useEffect(() => {
    // Log to ensure component is mounted and initial state is set
    console.log('Initial puzzleBoard:', puzzleBoard);
  }, []);

  const handleInputChange = (event, rowIndex, colIndex) => {
    const value = event.target.value;
    if (/^[1-9]?$/.test(value)) {
      // Allow only digits 1-9 or empty string
      console.log(
        `Updating cell (${rowIndex}, ${colIndex}) to value: ${value}`
      );
      setPuzzleBoard((prevBoard) =>
        prevBoard.map((row, rIdx) =>
          row.map((cell, cIdx) =>
            rIdx === rowIndex && cIdx === colIndex ? value : cell
          )
        )
      );
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-background text-white">
      <div className="grid grid-cols-9 gap-0 bg-board rounded-lg p-4 shadow-lg">
        {puzzleBoard.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              value={value}
              onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
              className="w-10 h-10 md:w-14 md:h-14 text-center border rounded-lg bg-red-400 border-lightblue"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SudokuBoard;
