import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';

function Game () {
    
      const [board, setBoard] = useState(Array(9).fill(null));
      const [isXNext, setIsXNext] = useState(true);
      const API_BASE_URL = 'https://tictactoe-nhhk7z81c-jerry-joy-ismaels-projects.vercel.app';
    
      useEffect(() => {
        fetchBoard();
      }, []);
    
      const fetchBoard = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/board`);
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
    
          if (squares[index] || calculateWinner(squares)) {
            return;
          }
    
          const response = await fetch(`${API_BASE_URL}/api/move`, {
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
          const response = await fetch(`${API_BASE_URL}/api/restart`, {
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
        // Your calculateWinner function
      };
    
      const winner = calculateWinner(board);
      const status = winner
        ? winner === 'Draw'
          ? "It's a Draw!"
          : `Winner: ${winner}`
        : `Player Turn: ${isXNext ? 'X' : 'O'}`;
    
      return (
        <div className='container'>
          <div className='status'>{status}</div>
          <div className='board'>
            {board.map((value, index) => (
              <button key={index} className='square' onClick={() => makeMove(index)}>
                {value}
              </button>
            ))}
          </div>
          <button className='restart-button' onClick={handleRestart}>
            Restart
          </button>
        </div>
      );
    };
 

export default Game;
