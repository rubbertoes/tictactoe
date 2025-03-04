import { useState } from 'react'
import './App.css'

export default function Game() {
  

  return (
    <>
      <div className='game'>
        <div className='gameBoard'>
            <Board />
        </div>
        <div className='gameInfo'>
        
        </div>
      </div>
    </>
  );
}

function Board() {

  let [squares, setSquares] = useState(Array(9).fill(null));
  let [xIsNext, setXIsNext] = useState(true);

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
     setSquares(nextSquares);
     setXIsNext(!xIsNext);
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
    if(squares[a] == squares[b] && squares[b] == squares[c] && squares[a] == squares[c]){
      return squares[a];
    } 
  }
  return null;
}


