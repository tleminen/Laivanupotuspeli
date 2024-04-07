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
  const [currentPlayer, setCurrentPlayer] = useState("player");
  const [playerShipsPlaced, setPlayerShipsPlaced] = useState(false);
  const [remainingShips, setRemainingShips] = useState(5);
  const [playerTurn, setPlayerTurn] = useState(true);

  const handleCellClick = (row, col) => {
    if (currentPlayer === "player" && playerTurn) {
      if (
        !playerShipsPlaced &&
        remainingShips > 0 &&
        playerBoard[row][col] !== 1
      ) {
        const updatedBoard = [...playerBoard];
        updatedBoard[row][col] = 1; // Player's ships are represented by 1
        setPlayerBoard(updatedBoard);
        setRemainingShips(remainingShips - 1);
      } else if (playerShipsPlaced && computerBoard[row][col] === 1) {
        const updatedBoard = [...computerBoard];
        updatedBoard[row][col] = -1; // Player hit opponent's ship
        setComputerBoard(updatedBoard);
        checkWinCondition(updatedBoard, "player");
        setPlayerTurn(false); // End player's turn
      } else if (playerShipsPlaced && computerBoard[row][col] === 0) {
        const updatedBoard = [...computerBoard];
        updatedBoard[row][col] = -1; // Player missed
        setComputerBoard(updatedBoard);
        setPlayerTurn(false); // End player's turn
      }
    }
  };

  const handleDonePlacingShips = () => {
    if (remainingShips === 0) {
      setPlayerShipsPlaced(true);
      setCurrentPlayer("computer");
      // Now it's the computer's turn to place ships
      const computerBoardWithShips = placeShipsRandomly();
      setComputerBoard(computerBoardWithShips);
    } else {
      alert("You must place all 5 ships before continuing!");
    }
  };

  const placeShipsRandomly = () => {
    const board = initializeBoard();
    for (let i = 0; i < 3; i++) {
      let row, col;
      do {
        row = getRandomInt(BOARD_ROWS);
        col = getRandomInt(BOARD_COLS);
      } while (board[row][col] !== 0);
      board[row][col] = 1;
    }
    return board;
  };

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const checkWinCondition = (board, player) => {
    const flattenedBoard = board.flat();
    if (!flattenedBoard.includes(1)) {
      alert(`Player ${player} wins!`);
    }
  };

  return (
    <div className="game-container">
      <div className="board">
        {currentPlayer === "player" &&
          playerBoard.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                color={cell === 1 ? "green" : "blue"}
              />
            ))
          )}
        {currentPlayer === "computer" &&
          computerBoard.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                color={cell === -1 ? "red" : "orange"}
              />
            ))
          )}
      </div>
      {!playerShipsPlaced && (
        <button onClick={handleDonePlacingShips}>Done placing ships</button>
      )}
    </div>
  );
};

export default BattleshipGame;
