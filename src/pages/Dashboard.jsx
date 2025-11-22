import React, { useState, useEffect } from "react";
import Board from "../components/Board";
import RoundSummary from "../components/RoundSummary";
import axios from "axios";

const API ="https://tictocbackend.onrender.com/api/auth";

const computeWinner = (squares) => {
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
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }
  if (squares.every(Boolean)) return "draw";
  return null;
};

export default function Dashboard({ user, onAuthChange }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [roundResult, setRoundResult] = useState(null);
  const [points, setPoints] = useState({ X: 0, O: 0 });

  useEffect(() => {
    const result = computeWinner(board);
    if (result && !winner) {
      setWinner(result);

      const newPoints = { ...points };
      if (result === "draw") {
        newPoints.X += 0;
        newPoints.O += 0;
      } else if (result === "X") {
        newPoints.X += 1;
      } else {
        newPoints.O += 1;
      }
      setPoints(newPoints);

      setRoundResult({ result, points: newPoints[result] });

      if (user) {
        axios
          .post(
            `${API}/user/points`,
            { player: result, points: newPoints[result] },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("tictac_token")}`,
              },
            }
          )
          .then((res) => {
            if (res.data.user) {
              onAuthChange(res.data.user, localStorage.getItem("tictac_token"));
            }
          })
          .catch((err) => {
            console.error("Error updating points:", err);
          });
      }

      setRoundsPlayed(roundsPlayed + 1);
      // if (roundsPlayed >= 5) {
      //   setRoundResult(null);
      //   return;
      // }
    }
  }, [board]);

  useEffect(() => {
    if (roundsPlayed > 5) {
      setRoundResult(null);
      setPoints({ X: 0, O: 0 });
      setRoundsPlayed(0);
    }
    
  }, [roundsPlayed]);

  const handlePlay = (i) => {
    if (winner || board[i]) return;
    const next = board.slice();
    next[i] = xIsNext ? "X" : "O";
    setBoard(next);
    setXIsNext(!xIsNext);
  };

  const resetBoard = () => {
    if (roundsPlayed == 5) {
      setPoints({ X: 0, O: 0 });
      setRoundsPlayed(0);
    }
    setBoard(Array(9).fill(null));
    setWinner(null);
    setRoundResult(null);
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-300 p-6 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold">Play</div>
            <div className="text-sm text-gray-600">
              Round: {roundsPlayed} / 5
            </div>
          </div>

          <Board board={board} onPlay={handlePlay} />

          <div className="mt-4 flex items-center gap-3">
            <div>
              Next Player : <strong>{xIsNext ? "X" : "O"}</strong>
            </div>
            <button
              onClick={resetBoard}
              className="ml-auto px-3 py-1 border rounded bg-red-500 text-white"
            >
              Reset
            </button>
          </div>

          {roundResult && (
            <RoundSummary
              result={roundResult.result}
              points={roundResult.points}
            />
          )}
        </div>

        <div className="bg-blue-300 p-6 rounded shadow">
          <div className="text-lg font-semibold mb-2">Players & Score</div>
         

          <div className="flex flex-col gap-2">
            <div className="p-3 rounded border flex justify-between items-center">
              <div>
                <div className="text-sm">Player X</div>
                <div className="font-medium">{points.X}</div>
              </div>
              <div className="text-right">—</div>
            </div>

            <div className="p-3 rounded border flex justify-between items-center">
              <div>
                <div className="text-sm">Player O</div>
                <div className="font-medium">{points.O}</div>
              </div>
              <div className="text-right">—</div>
            </div>

            {roundsPlayed == 5 && (
              <div className="mt-4 p-3 bg-white rounded text-center font-bold text-green-800">
                {points.X > points.O
                  ? "🏆 Final Winner: Player X"
                  : points.O > points.X
                  ? "🏆 Final Winner: Player O"
                  : "🤝 Match Draw!"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
