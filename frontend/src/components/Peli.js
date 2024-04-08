import React, { useState } from "react";

const BOARD_ROWS = 4;
const BOARD_COLS = 5;

const initializeBoard = () => {
  const board = [];
  for (let i = 0; i < BOARD_ROWS; i++) {
    board.push(Array(BOARD_COLS).fill(0));
  }
  return board;
};

const Ship = () => {
  return <div className="ship" />;
};

const Cell = ({ value, onClick, color }) => {
  let content = "";
  if (value === 0) {
    content = "\u00A0"; // Non-breaking space
  } else if (value === -1) {
    content = "\u25A1"; // Empty square
  } else if (value === 1) {
    content = <Ship />;
  }
  return (
    <div className="cell" onClick={onClick} style={{ backgroundColor: color }}>
      {content}
    </div>
  );
};

const BattleshipGame = () => {
  const [playerBoard, setPlayerBoard] = useState(initializeBoard());
  const [computerBoard, setComputerBoard] = useState(initializeBoard());
  const [remainingPlayerShips, setRemainingPlayerShips] = useState(5);
  const [playerTurn, setPlayerTurn] = useState(true);

  const handlePlayerCellClick = (row, col) => {
    if (remainingPlayerShips > 0 && playerBoard[row][col] !== 1) {
      const updatedBoard = [...playerBoard];
      updatedBoard[row][col] = 1; // Player's ships are represented by 1
      setPlayerBoard(updatedBoard);
      setRemainingPlayerShips(remainingPlayerShips - 1);
    }
  };

  const handleComputerCellClick = () => {
    // Implement computer's turn here (random cell selection)
  };

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  return (
    <div className="game-container">
      <div className="board">
        <div className="player-board">
          {playerBoard.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                onClick={() => handlePlayerCellClick(rowIndex, colIndex)}
                color={cell === 1 ? "green" : cell === -1 ? "red" : "blue"}
              />
            ))
          )}
        </div>
        <div className="computer-board">
          {computerBoard.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                onClick={() => handleComputerCellClick(rowIndex, colIndex)}
                color={cell === -1 ? "red" : cell === 1 ? "green" : "orange"}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BattleshipGame;
