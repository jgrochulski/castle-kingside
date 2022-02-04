import Row from "./Row.js";
import Square from "./Square.js";

import { useState } from "react";


function ChessBoard({ labelToggle }) {

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
  const [holderFull, setHolderFull] = useState(false)
  const [game, setGame] = useState(gameObj)

  function moveLateral(start, distance) {
    let x_value = start.split('')[0];
    let y_value = start[1]
    // console.log("x_value: " + x_value)
    let x_index = x_value.charCodeAt(0);
    // console.log("x_index: " + x_index)

    let x_index_end = x_index + distance
    let x_value_end = String.fromCharCode(x_index_end)

    console.log("x_value_end: " + x_value_end)

    let final = x_value_end + y_value

    console.log("lateral return: " + final)

    return final

  }

  moveLateral("c4", -2)


  function moveVertical(start, distance) {
    let x_value = start.split('')[0];
    let y_value = parseInt(start[1])
    let y_value_end = y_value + distance

    console.log("y_value_end: " + y_value_end)

    let final = x_value + y_value_end

    console.log("veritcal return: " + final)

    return final

  }

  moveVertical("c4", 1)

  function moveDiagonal(start, distance, x, y) {
    let lateralTransform = moveLateral(start, distance * x);
    let verticalTransoform = moveVertical(lateralTransform, distance * y);
    console.log("Diagonal: " + verticalTransoform)
    return verticalTransoform;
  }

  moveDiagonal("c4", 4, 1, 1)

  function validMove(piece, attack, start) {
    let position = start.split('')
    // console.log(position)
    // let pawnStandard = st
    // let pawnFirst
    // let pawnAttack
    if (piece === 'white-pawn' || piece === 'black-pawn') {
      if (attack) {

      }
    }
  }

  validMove("white-pawn", false, "a2")

  

  function clickHandler(e) {
    let id = e.target.id
    console.log(id)
    if (holderFull) {
      setClickHolder([])
      setHolderFull(false)
      console.log("here")
    }
    else if (clickHolder.length > 0) {
      setHolderFull(true)
      setClickHolder([...clickHolder, id])
      // setGame({...game, "d2": "", "d4": "white-pawn"})
      let firstClick = clickHolder[0]
      let secondClick = id

      let piece = game[firstClick]
      // console.log("fristCLick: " + firstClick)
      // console.log("secondClick: " + secondClick)
      // console.log("piece: " + piece)


      let newGame = {...game}
      newGame[firstClick] = ""
      newGame[secondClick] = piece

      setGame(newGame)


      // console.log("here")
    }
    else if (game[id] && clickHolder.length == 0) {
      console.log(gameObj[id])
      setClickHolder([id])
    }
  }

  console.log(clickHolder)
  console.log(holderFull)
  // console.log()



  let grid = [];
  let toggle = false;

  // for (let i = 0; i < 8; i++) {
  //   grid.push(<Row toggle={toggle} key={i} y={8 - i} />)
  //   toggle = !toggle;
  // }


  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let color = toggle ? "black-square" : "white-square";

      grid.push(<Square game={game} color={color} code_x={j + 97} y={8 - i} key={`${i}${j}`} labelToggle={labelToggle} clickHandler={clickHandler}/>)

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