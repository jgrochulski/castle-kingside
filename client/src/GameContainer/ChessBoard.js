import Square from "./Square.js";
import { useState, useEffect } from "react";

function ChessBoard({ user, game, setGame, labelToggle }) {


  const [clickHolder, setClickHolder] = useState([])
  const [gameState, setGameState] = useState(game.state)
  const [history, setHistory] = useState("a2:a4")
  // const [turn, setTurn] = useState("black")
  const [turnNum, setTurnNum] = useState(0)
  const [numberedHistory, setNumberedHistory] = useState("")

  const grid = generateGrid()


  // if (game.turn === "player1" && turn != "white") {
  //   setTurn("white")
  // }



  function moveLateral(start, distance) {
    let x_value = start.split('')[0];
    let y_value = start[1]
    let x_index = x_value.charCodeAt(0);
    let x_index_end = x_index + distance
    let x_value_end = String.fromCharCode(x_index_end)

    let final = x_value_end + y_value

    return final
  }
  function moveVertical(start, distance) {
    let x_value = start.split('')[0];
    let y_value = parseInt(start[1])
    let y_value_end = y_value + distance

    let final = x_value + y_value_end

    return final
  }
  function moveDiagonal(start, distance, x, y) {
    let lateralTransform = moveLateral(start, distance * x);
    let verticalTransoform = moveVertical(lateralTransform, distance * y);
    return verticalTransoform;
  }
  function isValidMove(piece, start, end) {
    let validMoves = [];
    if (piece === 'white-pawn' && game.turn === 'player1') {
      if (gameState[moveVertical(start, 1)] === "") {
        if (parseInt(start[1]) == 2 && gameState[moveVertical(start, 2)] === "") {
          validMoves.push(moveVertical(start, 2))
        }
        validMoves.push(moveVertical(start, 1))
        console.log(validMoves)
      }
    }
    if (piece === 'black-pawn' && game.turn === 'player2') {
      if (gameState[moveVertical(start, -1)] === "") {
        if (parseInt(start[1]) == 7 && gameState[moveVertical(start, -2)] === "") {
          validMoves.push(moveVertical(start, -2))
        }
        validMoves.push(moveVertical(start, -1))
        console.log(validMoves)
      }
    }
    return validMoves.includes(end)
  }
  function isValidAttack(piece, start, end) {
    if (piece === 'white-pawn' && game.turn === 'player1') {
      if (gameState[end] === 'black-pawn') {
        if (end === moveDiagonal(start, 1, 1, 1) || end == moveDiagonal(start, 1, -1, 1)) {
          return true
        }
      }
      else if (gameState[moveVertical(end, -1)] === 'black-pawn') {
        if (end === moveDiagonal(start, 1, 1, 1) || end == moveDiagonal(start, 1, -1, 1)) {
          if (history[history.length - 1] === `${moveVertical(end, 1)}:${moveVertical(end, -1)}`) {
            console.log('en passant')
            gameState[moveVertical(end, -1)] = "";
            return true
          }
        }
      }
    }
    if (piece === 'black-pawn' && game.turn === 'player2') {
      if (gameState[end] === 'white-pawn') {
        if (end === moveDiagonal(start, 1, 1, -1) || end == moveDiagonal(start, 1, -1, -1)) {
          return true
        }
      }
      else if (gameState[moveVertical(end, 1)] === 'white-pawn') {
        if (end === moveDiagonal(start, 1, 1, -1) || end == moveDiagonal(start, 1, -1, -1)) {
          if (history[history.length - 1] === `${moveVertical(end, -1)}:${moveVertical(end, 1)}`) {
            console.log('en passant')
            gameState[moveVertical(end, 1)] = "";
            return true
          }
        }
      }
    }
  }

  function endTurn(newGame) {
    const nextTurn = game.turn === "player1" ? "player2" : "player1"
    updateGame({state: JSON.stringify(newGame), turn: nextTurn, history: history, counter: game.counter + 1})
    reloadGame()
  }

  function updateGame(info){
    fetch(`/games/${game.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info)
    }).then((res) => res.json())
    .then(j => console.log(j))
  }

  function reloadGame(){  
    fetch(`/games/${game.id}`)
    .then(resp => {
      if (resp.ok) {
        resp.json()
        .then(game => {
          // console.log(game)
          const formatGame = {...game, state: JSON.parse(game.state)}
          console.log(formatGame)
          setGame(formatGame)
          setGameState(formatGame.state)
        })
      }
      else {
        console.log('fetch error')
      }
    })
  }



  function clickHandler(e) {
    let id = e.target.id
    console.log(id)
    
    if (clickHolder.length > 0) { // if this is the second click...
      if (id === clickHolder[0]) {
        console.log('deselected') // deselect if double click
        setClickHolder([])

      }
      else {
        setClickHolder([...clickHolder, id]) // otherwise add second click to holder
        let firstClick = clickHolder[0]
        let secondClick = id

        let piece = gameState[firstClick]

        if (isValidMove(piece, firstClick, secondClick) || isValidAttack(piece, firstClick, secondClick)) {
          console.log('valid move')
          let newGame = {...gameState}
          newGame[firstClick] = ""
          newGame[secondClick] = piece
          setHistory([...history, `${firstClick}:${secondClick}`])
          endTurn(newGame)
          // setGameState(newGame) -- can we get away without using this?
          if (game.turn === 'player2') {
            setTurnNum(turnNum + 1)
            setNumberedHistory([...numberedHistory, `${firstClick}:${secondClick} `])
          }
          else {
            setNumberedHistory([...numberedHistory, `${turnNum}. ${firstClick}:${secondClick} `])
          }
          // setTurn(turn == 'player1' ? 'player2' : 'player1')
          
        }
        setClickHolder([])
        console.log(history)
      }


      // console.log("here")
    }
    else if (((gameState[id].slice(0, 5) === "white" && game.turn === "player1") || (gameState[id].slice(0, 5) === "black" && game.turn === "player2")) && clickHolder.length == 0) {
      console.log(gameState[id])
      setClickHolder([id])
      
    }
  }


function generateGrid() {

    let grid = [];
    let toggle = false;

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let color = toggle ? "black-square" : "white-square";

        grid.push(<Square game={gameState} color={color} code_x={j + 97} y={8 - i} key={`${i}${j}`} labelToggle={labelToggle} clickHolder={clickHolder} clickHandler={clickHandler}/>)

        if (j !== 7) {
          toggle = !toggle;
        }
        else {
        }
      }
    }
    return grid
  }


  return (
    <div className="chess-board">
      {grid}
    </div>
  );
}

export default ChessBoard;