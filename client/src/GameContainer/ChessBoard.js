import Square from "./Square.js";
import { useState, useEffect } from "react";

function ChessBoard({ user, game, setGame, labelToggle, userTurn }) {


  const [clickHolder, setClickHolder] = useState([])
  // const [history, setHistory] = useState(game.history ? game.history.split(",") : [])


  const grid = generateGrid()
  let history = game.history ? game.history.split(", ") : []

  // for (const cell in game.state){
  //   if (cell == 'a1')
  // }
  if (game.status == "in progress") {
    checkGameIsOver()
  }

  function checkGameIsOver() {
    if (
      game.state.a1 == "black-pawn" ||
      game.state.b1 == "black-pawn" ||
      game.state.c1 == "black-pawn" ||
      game.state.d1 == "black-pawn" ||
      game.state.e1 == "black-pawn" ||
      game.state.f1 == "black-pawn" ||
      game.state.g1 == "black-pawn" ||
      game.state.h1 == "black-pawn"
    ) {
      endGame("player2")
    }
    if (
      game.state.a8 == "white-pawn" ||
      game.state.b8 == "white-pawn" ||
      game.state.c8 == "white-pawn" ||
      game.state.d8 == "white-pawn" ||
      game.state.e8 == "white-pawn" ||
      game.state.f8 == "white-pawn" ||
      game.state.g8 == "white-pawn" ||
      game.state.h8 == "white-pawn"
    ) {
      endGame("player1")
    }
  }

  


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
      if (game.state[moveVertical(start, 1)] === "") {
        if (parseInt(start[1]) == 2 && game.state[moveVertical(start, 2)] === "") {
          validMoves.push(moveVertical(start, 2))
        }
        validMoves.push(moveVertical(start, 1))
        // console.log(validMoves)
      }
    }
    if (piece === 'black-pawn' && game.turn === 'player2') {
      if (game.state[moveVertical(start, -1)] === "") {
        if (parseInt(start[1]) == 7 && game.state[moveVertical(start, -2)] === "") {
          validMoves.push(moveVertical(start, -2))
        }
        validMoves.push(moveVertical(start, -1))
        // console.log(validMoves)
      }
    }
    return validMoves.includes(end)
  }
  function isValidAttack(piece, start, end) {
    if (piece === 'white-pawn' && game.turn === 'player1') {
      if (game.state[end] === 'black-pawn') {
        if (end === moveDiagonal(start, 1, 1, 1) || end == moveDiagonal(start, 1, -1, 1)) {
          return true
        }
      }
      else if (game.state[moveVertical(end, -1)] === 'black-pawn') {
        if (end === moveDiagonal(start, 1, 1, 1) || end == moveDiagonal(start, 1, -1, 1)) {
          console.log(history[history.length - 1])
          if (history[history.length - 1] === `${moveVertical(end, 1)}:${moveVertical(end, -1)}`) {
            console.log('en passant')
            game.state[moveVertical(end, -1)] = "";
            return true
          }
        }
      }
    }
    if (piece === 'black-pawn' && game.turn === 'player2') {
      if (game.state[end] === 'white-pawn') {
        if (end === moveDiagonal(start, 1, 1, -1) || end == moveDiagonal(start, 1, -1, -1)) {
          return true
        }
      }
      else if (game.state[moveVertical(end, 1)] === 'white-pawn') {
        if (end === moveDiagonal(start, 1, 1, -1) || end == moveDiagonal(start, 1, -1, -1)) {
          if (history[history.length - 1] === `${moveVertical(end, -1)}:${moveVertical(end, 1)}`) {
            console.log('en passant')
            game.state[moveVertical(end, 1)] = "";
            return true
          }
        }
      }
    }
  }
  function endTurn(newGame) {
    const nextTurn = game.turn === "player1" ? "player2" : "player1"
    console.log(history)
    updateGame({state: JSON.stringify(newGame), turn: nextTurn, history: history.join(", "), counter: game.counter + 1})
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
          const formatGame = {...game, state: JSON.parse(game.state)}
          console.log(formatGame)
          setGame(formatGame)
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
    if (user.username === userTurn) {
      if (clickHolder.length > 0) { // if this is the second click...
        if (id === clickHolder[0]) {
          console.log('deselected') // deselect if double click
          setClickHolder([])

        }
        else {
          setClickHolder([...clickHolder, id]) // otherwise add second click to holder
          let firstClick = clickHolder[0]
          let secondClick = id

          let piece = game.state[firstClick]

          if (isValidMove(piece, firstClick, secondClick) || isValidAttack(piece, firstClick, secondClick)) {
            console.log('valid move')
            let newGame = {...game.state}
            newGame[firstClick] = ""
            newGame[secondClick] = piece
            history.push(`${firstClick}:${secondClick}`)
            endTurn(newGame)
          }
          setClickHolder([])
        }
      }
      else if (((game.state[id].slice(0, 5) === "white" && game.turn === "player1") || (game.state[id].slice(0, 5) === "black" && game.turn === "player2")) && clickHolder.length == 0) {
        setClickHolder([id])
        
      }
    }
    else {
      console.log("wait your turn")
    }
  }
  function generateGrid() {

    let grid = [];
    let toggle = false;

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let color = toggle ? "black-square" : "white-square";

        grid.push(<Square game={game.state} color={color} code_x={j + 97} y={8 - i} key={`${i}${j}`} labelToggle={labelToggle} clickHolder={clickHolder} clickHandler={clickHandler}/>)

        if (j !== 7) {
          toggle = !toggle;
        }
        else {
        }
      }
    }
    return grid
  }
  function calculateRatings(result) {

    let playerA = game.players[0].user
    let playerB = game.players[1].user
    console.log(playerA)
    console.log(playerB)
    let ratingA = Number(playerA.elo_rating)
    let ratingB = Number(playerB.elo_rating)
    console.log(ratingA)

    let expectedScoreA = 1 / (1 + 10 ** ((ratingB - ratingA)/400))
    let expectedScoreB = 1 / (1 + 10 ** ((ratingA - ratingB)/400))
    
    console.log(expectedScoreA)

    let K = 20;
    let scoreA
    let scoreB

    if (result === 'draw') {
      scoreA = 0.5;
      scoreB = 0.5;
      console.log("score is 0.5 0.5")

    }
    else if (result === `${game.players[0].user.username} won`) {
      scoreA = 1.0;
      scoreB = 0.0;
      console.log("score is 1.0 0.0")

    }
    else {
      scoreA = 0.0;
      scoreB = 1.0;
      console.log("score is 0.0 1.0")
    }

    let newRatingA = ratingA + (K * (scoreA - expectedScoreA))
    let newRatingB = ratingB + (K * (scoreB - expectedScoreB))

    console.log(newRatingA)
    console.log(newRatingB)

    updateRatings(newRatingA, newRatingB)
  }
  function updateRatings(newRatingA, newRatingB) {

    let patchA = {
      elo_rating: newRatingA
    }

    let patchB = {
      elo_rating: newRatingB
    }
    
    fetch(`/users/${game.players[0].user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patchA)
    }).then((res) => res.json())
    .then(j => console.log(j))

    fetch(`/users/${game.players[1].user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patchB)
    }).then((res) => res.json())
    .then(j => console.log(j))
  }

  function endGame(winner) {
    console.log(winner)
    const result = winner === "player1" ? game.players[0].user.username + " won" : game.players[1].user.username + " won"
    console.log(result)
    updateGame({status: result})
    calculateRatings(result)
  }

  console.log(game.status)

  return (
    <div className={user.username == userTurn && game.status != "pending" ? "chess-board-blue" : "chess-board-grey"}>
      {user.username != userTurn ? <div id="chess-whiteout"></div> : null}
      {game.status === "pending" ? <div id="chess-whiteout-waiting"><div id="whiteout-text">waiting for other player to join...</div></div> : null}
      {game.status.slice(-3) === "won" ? <div id="chess-whiteout-waiting"><div id="whiteout-text">game over</div></div> : null}
      
      {grid}
      {/* <button className="test-button" onClick={reloadGame}>reload game</button> */}

    </div>

  );
}

export default ChessBoard;