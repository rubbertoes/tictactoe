import { useState } from 'react'
import './App.css'

export default function Game() {
  const[history, setHistory] = useState( [Array(9).fill(null)] );
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    !xIsNext;
  }

  function jumpTo(historicalMove) {
    setCurrentMove(historicalMove)
  }

  //function handles creating react <li> buttons that take user to previous move
  const moves = history.map((squares, move) => {
    let description;
    if(move > 0){
      description = "Go to move #" + move;
    }
    return(
      <li key={move}>
        <button onClick={ () => jumpTo(move) }>{description}</button>
      </li>
    );
  });

  return (
    <>
      <div className='game'>
        <div className='gameControls'>
          <button onClick={ () => jumpTo(0) }>Reset</button>
        </div>
        <div className='gameBoard'>
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        </div>
        <div className='gameInfo'>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}

function Board({ xIsNext, squares, onPlay }) {

  //display status
  const winner = calculateWinner(squares);
  let status; 
  if(winner){
    status = winner + " is the winner!"
  } else{ 
    status = "Next player: " + (xIsNext ? "X" : "O"); 
  }

  function handleClick(i){
    //Don't allow square clicks to change symbol
    //Don't allow clicks once there is a winner 
    if(squares[i] || calculateWinner(squares)){
      return;
    }

     const nextSquares = squares.slice();
     if(xIsNext){
      nextSquares[i] ='X';
     } else{
      nextSquares[i] = 'O';
     }
     onPlay(nextSquares);
  }

  return(
    <>
      <div className='status'>
        {status}
      </div>
      <div className='boardRow'>
        <Square symbol={squares[0]} onSquareClick={() =>  handleClick(0)}></Square>
        <Square symbol={squares[1]} onSquareClick={() =>  handleClick(1)}></Square>
        <Square symbol={squares[2]} onSquareClick={() =>  handleClick(2)}></Square>
      </div>
      <div className='boardRow'>
        <Square symbol={squares[3]} onSquareClick={() =>  handleClick(3)}></Square>
        <Square symbol={squares[4]} onSquareClick={() =>  handleClick(4)}></Square>
        <Square symbol={squares[5]} onSquareClick={() =>  handleClick(5)}></Square>
      </div>
      <div className='boardRow'>
        <Square symbol={squares[6]} onSquareClick={() =>  handleClick(6)}></Square>
        <Square symbol={squares[7]} onSquareClick={() =>  handleClick(7)}></Square>
        <Square symbol={squares[8]} onSquareClick={() =>  handleClick(8)}></Square>
      </div>
    </>
  );
}

function Square( {symbol, onSquareClick} ) {

  return(
    <button
      onClick={onSquareClick}
    >
      {symbol}
    </button>
  );
}

//Helper function that checks if there is a current winner 
function calculateWinner(squares) {
  const winningLines = [
    [0,1,2], //hoizontal lines
    [3,4,5],
    [6,7,8],
    [0,3,6],  //vertical lines
    [1,4,7],
    [2,5,8],
    [0,4,8],  //diagonal lines
    [2,4,6]
  ]
  for(let i = 0; i < winningLines.length; i++){
    const[a,b,c] = winningLines[i];
    if(squares[a] && squares[a] == squares[b] && squares[b] == squares[c] && squares[a] == squares[c]){
      return squares[a];
    } 
  }
  return null;
}


