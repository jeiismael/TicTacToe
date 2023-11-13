// TicTacToe.js
import React, { useState, useEffect } from 'react';
import Board from './Board';
import Restart from './Restart';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  useEffect(() => {
    // Fetch the initial game board from the backend when the component mounts
    fetchBoard();
  }, []);

  const fetchBoard = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/board`);
      const data = await response.json();
      setBoard(data.board);
      setIsXNext(data.isXNext);
    } catch (error) {
      console.error('Error fetching game board:', error);
    }
  };

  const makeMove = async (index) => {
    try {
      const squares = [...board];
  
      // Check if the square is already filled or there's a winner
      if (squares[index] || calculateWinner(squares)) {
        return;
      }
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/move`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index }),
      });
  
      const data = await response.json();
      setBoard(data.board);
      setIsXNext(data.isXNext);
    } catch (error) {
      console.error('Error making move:', error);
    }
  };

  const handleRestart = async () => {
    try {
      // Send a request to the backend to restart the game
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/restart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setBoard(data.board);
      setIsXNext(data.isXNext);
    } catch (error) {
      console.error('Error restarting the game:', error);
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
  
    // Check for a draw
    if (squares.every((square) => square !== null)) {
      return 'Draw';
    }
  
    return null;
  };
  

  const winner = calculateWinner(board);
  const status = winner ? (winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`) : `Player Turn: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className='container'>
      <div className="status">{status}</div>
      <Board squares={board} onClick={makeMove} />
      <Restart onClick={handleRestart} />
    </div>
  );
};

export default Game;
