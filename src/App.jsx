import React, { useState } from 'react';
import Board from './components/Board.jsx';
import Header from './components/Header.jsx';
import Registration from './components/Registration.jsx'; 
import Login from './components/Login.jsx';

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const App = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [view, setView] = useState('game'); 
  const [scores, setScores] = useState({ X: 0, O: 0 });

 
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    console.log("Logged in:", userData);
    setUser(userData);       
    setView('game');        
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const handleClick = (i) => {
    if (winner || current.squares[i]) return;

    const newSquares = current.squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';

    const newHistory = history.slice(0, stepNumber + 1);
    setHistory(newHistory.concat([{ squares: newSquares }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);

    const newWinner = calculateWinner(newSquares);
    if (newWinner) {
      setScores(prevScores => ({
        ...prevScores,
        [newWinner]: prevScores[newWinner] + 1
      }));
    }
  };

  const handleAuthClick = (newView) => {
    setView(newView);
  };

  let status;
  if (winner) {
    status = `Winner: Player ${winner}`;
  } else if (stepNumber === 9) {
    status = 'Draw!';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  let mainContent;
  if (view === 'register') {
    mainContent = <Registration />;
  } else if (view === 'login') {
    // ⭐ FIX: we pass the callback here
    mainContent = <Login onLoginSuccess={handleLoginSuccess} />;
  } else {
    mainContent = (
      <>
        {user && <h3>👤 Logged in as: {user.username}</h3>}   {/* Show user if logged in */}
        
        <div className="game-info">
          <div className="scores">
            <h2>🏆 Candidate Scores </h2>
            <p>Player X: {scores.X} | Player O: {scores.O}</p>
          </div>
          <div className="status">{status}</div>
        </div>
        <div className="game-board">
          <Board squares={current.squares} onClick={handleClick} />
        </div>
      </>
    );
  }

  return (
    <div className="game">
      <Header onAuthClick={handleAuthClick} />
      <hr/>
      {mainContent}
    </div>
  );
};

export default App;
