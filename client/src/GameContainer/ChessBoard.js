import Square from "./Square.js";
import { useState } from "react";

function ChessBoard({ labelToggle, turn, setTurn, setHistory, history, turnNum, setTurnNum, numberedHistory, setNumberedHistory }) {

  let gameObj = {
    "a1": "",
    "b1": "",
    "c1": "",
    "d1": "",
    "e1": "",
    "f1": "",
    "g1": "",
    "h1": "",
    "a2": "white-pawn",
    "b2": "white-pawn",
    "c2": "white-pawn",
    "d2": "white-pawn",
    "e2": "white-pawn",
    "f2": "white-pawn",
    "g2": "white-pawn",
    "h2": "white-pawn",
    "a3": "",
    "b3": "",
    "c3": "",
    "d3": "",
    "e3": "",
    "f3": "",
    "g3": "",
    "h3": "",
    "a4": "",
    "b4": "",
    "c4": "",
    "d4": "",
    "e4": "",
    "f4": "",
    "g4": "",
    "h4": "",
    "a5": "",
    "b5": "",
    "c5": "",
    "d5": "",
    "e5": "",
    "f5": "",
    "g5": "",
    "h5": "",
    "a6": "",
    "b6": "",
    "c6": "",
    "d6": "",
    "e6": "",
    "f6": "",
    "g6": "",
    "h6": "",
    "a7": "black-pawn",
    "b7": "black-pawn",
    "c7": "black-pawn",
    "d7": "black-pawn",
    "e7": "black-pawn",
    "f7": "black-pawn",
    "g7": "black-pawn",
    "h7": "black-pawn",
    "a8": "",
    "b8": "",
    "c8": "",
    "d8": "",
    "e8": "",
    "f8": "",
    "g8": "",
    "h8": ""
  }

  const [clickHolder, setClickHolder] = useState([])
  const [game, setGame] = useState(gameObj)

  function moveLateral(start, distance) {
    let x_value = start.split('')[0];
    let y_value = start[1]
    // console.log("x_value: " + x_value)
    let x_index = x_value.charCodeAt(0);
    // console.log("x_index: " + x_index)

    let x_index_end = x_index + distance
    let x_value_end = String.fromCharCode(x_index_end)

    // console.log("x_value_end: " + x_value_end)

    let final = x_value_end + y_value

    // console.log("lateral return: " + final)

    return final

  }
  // moveLateral("c4", -2)

  function moveVertical(start, distance) {
    let x_value = start.split('')[0];
    let y_value = parseInt(start[1])
    let y_value_end = y_value + distance

    // console.log("y_value_end: " + y_value_end)

    let final = x_value + y_value_end

    // console.log("veritcal return: " + final)

    return final

  }
  // moveVertical("c4", 1)

  function moveDiagonal(start, distance, x, y) {
    let lateralTransform = moveLateral(start, distance * x);
    let verticalTransoform = moveVertical(lateralTransform, distance * y);
    // console.log("Diagonal: " + verticalTransoform)
    return verticalTransoform;
  }
  // moveDiagonal("c4", 4, 1, 1)

  function isValidMove(piece, start, end) {
    let validMoves = [];
    if (piece === 'white-pawn' && turn === 'white') {
      if (game[moveVertical(start, 1)] === "") {
        if (parseInt(start[1]) == 2 && game[moveVertical(start, 2)] === "") {
          validMoves.push(moveVertical(start, 2))
        }
        validMoves.push(moveVertical(start, 1))
        console.log(validMoves)
      }
    }
    if (piece === 'black-pawn' && turn === 'black') {
      if (game[moveVertical(start, -1)] === "") {
        if (parseInt(start[1]) == 7 && game[moveVertical(start, -2)] === "") {
          validMoves.push(moveVertical(start, -2))
        }
        validMoves.push(moveVertical(start, -1))
        console.log(validMoves)
      }
    }
    return validMoves.includes(end)
  }

  function isValidAttack(piece, start, end) {
    if (piece === 'white-pawn' && turn === 'white') {
      if (game[end] === 'black-pawn') {
        if (end === moveDiagonal(start, 1, 1, 1) || end == moveDiagonal(start, 1, -1, 1)) {
          return true
        }
      }
      else if (game[moveVertical(end, -1)] === 'black-pawn') {
        if (end === moveDiagonal(start, 1, 1, 1) || end == moveDiagonal(start, 1, -1, 1)) {
          if (history[history.length - 1] === `${moveVertical(end, 1)}:${moveVertical(end, -1)}`) {
            console.log('en passant')
            game[moveVertical(end, -1)] = "";
            return true
          }
        }
      }
    }
    if (piece === 'black-pawn' && turn === 'black') {
      if (game[end] === 'white-pawn') {
        if (end === moveDiagonal(start, 1, 1, -1) || end == moveDiagonal(start, 1, -1, -1)) {
          return true
        }
      }
      else if (game[moveVertical(end, 1)] === 'white-pawn') {
        if (end === moveDiagonal(start, 1, 1, -1) || end == moveDiagonal(start, 1, -1, -1)) {
          if (history[history.length - 1] === `${moveVertical(end, -1)}:${moveVertical(end, 1)}`) {
            console.log('en passant')
            game[moveVertical(end, 1)] = "";
            return true
          }
        }
      }
    }
  }

  function clickHandler(e) {
    let id = e.target.id
    console.log(id)
    
    if (clickHolder.length > 0) {
      if (id === clickHolder[0]) {
        console.log('deselected')
        setClickHolder([])

      }
      else {
        setClickHolder([...clickHolder, id])
        let firstClick = clickHolder[0]
        let secondClick = id

        let piece = game[firstClick]

        if (isValidMove(piece, firstClick, secondClick) || isValidAttack(piece, firstClick, secondClick)) {
          console.log('valid move')
          let newGame = {...game}
          newGame[firstClick] = ""
          newGame[secondClick] = piece
          setHistory([...history, `${firstClick}:${secondClick}`])
          setGame(newGame)
          if (turn === 'black') {
            setTurnNum(turnNum + 1)
            setNumberedHistory([...numberedHistory, `${firstClick}:${secondClick} `])
          }
          else {
            setNumberedHistory([...numberedHistory, `${turnNum}. ${firstClick}:${secondClick} `])
          }
          setTurn(turn == 'white' ? 'black' : 'white')
          
        }
        setClickHolder([])
        console.log(history)
      }


      // console.log("here")
    }
    else if (game[id].slice(0, 5) === turn && clickHolder.length == 0) {
      console.log(gameObj[id])
      setClickHolder([id])
      
    }
  }

  // console.log(clickHolder)



  let grid = [];
  let toggle = false;

  // for (let i = 0; i < 8; i++) {
  //   grid.push(<Row toggle={toggle} key={i} y={8 - i} />)
  //   toggle = !toggle;
  // }


  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let color = toggle ? "black-square" : "white-square";

      grid.push(<Square game={game} color={color} code_x={j + 97} y={8 - i} key={`${i}${j}`} labelToggle={labelToggle} clickHolder={clickHolder} clickHandler={clickHandler}/>)

      if (j !== 7) {
        toggle = !toggle;
      }
      else {
        // grid.push(<br/>)
      }
    }
  }

  return (
    <div className="chess-board">
      {grid}
    </div>
  );
}

export default ChessBoard;