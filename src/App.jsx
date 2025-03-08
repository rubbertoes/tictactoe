import { useState, useEffect } from 'react'
import { formatDistanceToNow  } from 'date-fns';
import './App.css'

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
    //[ [], [],...,[] ]
    // with each smaller array representing the board where index = #moves 
  const [currentMove, setCurrentMove] = useState(0);
    //int counter of #moves
  const xIsNext = currentMove % 2 === 0;
    //boolean evaluates true when X is the next player; on odd moves 
  const currentSquares = history[currentMove];
    //container for current board to render
  const [winner, setWinner] = useState(null);
    //char is null until a winner is declared as either 'X' or 'O'
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState('');



  //function to update state and cascades children component behavior 
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    !xIsNext;
    console.log(currentMove);
  }

  //function let player jump to previous move made 
  function jumpTo(historicalMove) {
    setCurrentMove(historicalMove);
  }

  //function resets the board
  function reset() {
    setCurrentMove(0);
    setHistory([Array(9).fill(null)]);
    setWinner(null);
  }

  //function handles creating react <li> buttons that take user to previous move
  const moves = history.map((squares, move) => {
    //skip rendering first component
    if (move === 0) {
      return null;
    }
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  //function checks for change in winner state anytime a turn is made
  useEffect(() => {
    const result = calculateWinner(currentSquares);
    if (result) {
      setWinner(result);
      console.log(result);
    }
  }, [history]);

  //function changes startTime state when currentMove state updates the first time in a game 
  //NOTE NO CONSOLE LOG
  useEffect (()=>{
    if(currentMove === 1 && !startTime){
      setStartTime(new Date());
      console.log(startTime);
    }
  }, [currentMove]);

  //function ends time when game winner state is changed from null 
  //NOTE somtimes CONSOLE LOG
  useEffect( ()=> {
    if(winner && startTime){
      setElapsedTime(formatDistanceToNow(startTime, { includeSeconds: true }));
      console.log(elapsedTime);
    }
  }, [winner]);

  //function resets timer when the game is reset
  useEffect(() => {
    if (winner === null) {
      setStartTime(null);
      setElapsedTime('');
    }
  }, [winner]);

  //function creates undo feature 



  //NOTE: remove the ability to jump to previous moves unless you are in "review mode"

  return (
    <>
      <div className='game'>
        <div className='gameControls'>
          <button onClick={() => reset()}>Reset</button>
          <button>Save</button>
          <button>Retrive</button>
        </div>
        <div className='gameBoard'>
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className='gameInfo'>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}

//Challenge: try to passdown winner state instead of making another call!
function Board({ xIsNext, squares, onPlay }) {
  //display status
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = winner + " is the winner!"
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    //Don't allow square clicks to change symbol
    //Don't allow clicks once there is a winner 
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  return (
    <>
      <div className='status'>
        {status}
      </div>
      <div className='boardRow'>
        <Square symbol={squares[0]} onSquareClick={() => handleClick(0)}></Square>
        <Square symbol={squares[1]} onSquareClick={() => handleClick(1)}></Square>
        <Square symbol={squares[2]} onSquareClick={() => handleClick(2)}></Square>
      </div>
      <div className='boardRow'>
        <Square symbol={squares[3]} onSquareClick={() => handleClick(3)}></Square>
        <Square symbol={squares[4]} onSquareClick={() => handleClick(4)}></Square>
        <Square symbol={squares[5]} onSquareClick={() => handleClick(5)}></Square>
      </div>
      <div className='boardRow'>
        <Square symbol={squares[6]} onSquareClick={() => handleClick(6)}></Square>
        <Square symbol={squares[7]} onSquareClick={() => handleClick(7)}></Square>
        <Square symbol={squares[8]} onSquareClick={() => handleClick(8)}></Square>
      </div>
    </>
  );
}

function Square({ symbol, onSquareClick }) {

  return (
    <button
      // try implmenting disabled={} -John 
      onClick={onSquareClick}
    >
      {symbol}
    </button>
  );
}

//Helper function that checks if there is a current winner 
function calculateWinner(squares) {
  const winningLines = [
    [0, 1, 2], //hoizontal lines
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],  //vertical lines
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],  //diagonal lines
    [2, 4, 6]
  ]
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (squares[a] && squares[a] == squares[b] && squares[b] == squares[c] && squares[a] == squares[c]) {
      return squares[a];
    }
  }
  return null;
}


//Use date-fns for time keeping 