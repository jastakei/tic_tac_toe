import { useState } from "react";

function calculateWinner(squares) {
  //winning indices
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
  //if all x's or o's in these indices report win
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
function Square({ value, onSquareClick }) {
  return (
    //when click square call onSquareClick in Board which calls handleClick in Board
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  //takes in index of square
  function handleClick(i) {
    //if its filled do nothing
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    //gets copy of squares array
    const nextSquares = squares.slice();
    //if xIsNext = true then put x in square else put o
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    //call onplay in game with updated play
    onPlay(nextSquares);
  }
  //if theres a winnerdisplay it if not say who has the next turn
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    //calls the Square component to create the squares and puts the squares array values in them
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
//main function (highest level)
export default function Game() {
  //save history
  const [history, setHistory] = useState([Array(9).fill(null)]);
  //save which move we are at
  const [currentMove, setCurrentMove] = useState(0);
  //determine if its x or o based on current move
  const xIsNext = currentMove % 2 === 0;
  //the current board is in the index of history
  const currentSquares = history[currentMove];
  //console.log(currentSquares);

  function handlePlay(nextSquares) {
    //creats a new array that contains all of the items in history + nextSquares
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    //will be in history
    setHistory(nextHistory);
    //will be new current move
    setCurrentMove(nextHistory.length - 1);
  }
  //sets the current move to the move of the button that we pushed
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  //squares goes through each element of history and goes through index of history
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to move start";
    }
    //make a list item button with which move it is displayed
    //and if clicked call jumpto with that move
    return (
      //list item needs a key
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    //calls Board component and onplay constantly
    //display all moves as a list
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

