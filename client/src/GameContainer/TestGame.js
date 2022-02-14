import { useState, useEffect } from "react"
import GameChecker from "./GameChecker"
import { Redirect } from "react-router-dom";


function TestGame({ user, setUser, game, setGame, setReloadRatingToggle }){

  // const [gameStatus, setGameStatus] = useState("game is running")
  // const [game, setGame] = useState({turn: "none", players: [{user: {username: 'n/a'}}, {user: {username: 'n/a'}}]})
  
  // console.log(game)
  // if (!game) {
  //   reloadGame()
  //   console.log('first set')

  // }

  const [redirect, setRedirect] = useState(false);

  


  function resetGame(){
    
    let patch = {
      turn: 'player1',
      history: "",
      counter: 10,
      status: "in progress"
    }

    fetch(`/games/${game.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patch)
    }).then((res) => res.json())
    .then(newGame => {
      console.log(newGame)
      // setGameStatus("game is running")
      reloadGame()
    })
  }

  function reloadGame(){
    fetch(`/games/${game.id}`)
    .then(resp => {
      if (resp.ok) {
        resp.json()
        .then(game => {
          // console.log(game)
          setGame(game) // setGame from server
        })
      }
      else {
        console.log('fetch error')
      }
    })
  }

  function quickPatch(info){
    fetch(`/games/${game.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info)
    }).then((res) => res.json())
    .then(j => console.log(j))
  }

  // console.log(game)

  let userTurn = "no one"
  let userNotice = "there is no user logged in"
  const nextTurn = game.turn === 'player1' ? 'player2' : 'player1';


  function endTurn() {
    if (userTurn == user.username) {
      // setGame({...game, turn: 'player2', history: game.history + userTurn[0], counter: game.counter - 1})
      quickPatch({turn: nextTurn, history: game.history + userTurn[0], counter: game.counter - 1})
      reloadGame()
    }
  }

  function simTurn() {
    if (game.turn === 'player2') {
      // setGame({...game, turn: 'player1', history: game.history + userTurn[0], counter: game.counter - 1})
      quickPatch({turn: 'player1', history: game.history + userTurn[0], counter: game.counter - 1})
      reloadGame()
    }
  }

  function endGame() {
    // setGameStatus('game is over')
    quickPatch({status: "ended"})
  }

  // calculateRatings("draw")

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

    // if (user.username === game.players[0].user.username) {
    //   setUser({...user, elo_rating: newRatingA})
    //   console.log("setUser from player1 with newRatingA")

    // }
    // else if (user.username === game.players[1].user.username) {
    //   setUser({...user, elo_rating: newRatingB})
    //   console.log("setUser from player2 with newRatingA")

    // }
    // else {
    //   console.log('setUser new elo rating error!')
    // }

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

  function generateResult() {
    let results = ["draw", `${game.players[0].user.username} won`, `${game.players[1].user.username} won`]
    let result = results[Math.floor(Math.random() * (results.length))]
    // let result = results[2]

    console.log(result)
    quickPatch({status: result})
    calculateRatings(result)
  }

  function returnToLobby() {
    if (game.status == "in progress" && game.players.length == 2) {
      quickPatch({status: `${user.username} resigned`})
    }
    else if (game.players.length < 2) {
      quickPatch({status: 'voided'})
    }
    setReloadRatingToggle(true)

    setRedirect(true)
  }
  
  if (game.status === 'in progress') {
    userTurn = game.turn === 'player1' ? game.players[0].user.username : game.players[1].user.username
  }

  if ( game.status != 'ended' && game.counter < 1) {
    console.log('gameState < 1')
    endGame()
  }
  
  if (user) {
    userNotice = user.username + " is logged in"
  }

  return (
    <div id={`test-game-container-${user && userTurn == user.username ? "blue" : "red"}`}>
        <div id='test-game-internal'>
          <div id="test-user-notice">{userNotice}</div>
          <div id="test-game-title">Game#{game.id}</div>
          {/* <button onClick={gameStart}>Start Game</button> */}
          <div id="test-game-status">{game.status}</div>
          <div id="test-game-turn">{userTurn}'s turn</div>

          <button className="test-button" onClick={endTurn}>End Turn</button>
          {/* <button onClick={simTurn}>Sim Turn</button> */}

          {/* <button className="test-button" onClick={endGame}>End Game</button> */}
          <div id="test-game-state">history: {game.history}</div>
          <button className="test-button" onClick={resetGame}>Reset Game</button>
          <button className="test-button" onClick={generateResult}>Generate Result</button>
          <button className="test-button" onClick={returnToLobby}>Return to Lobby</button>

          {user && userTurn != user.username && game.status != 'ended' ? <GameChecker game={game} setGame={setGame} reloadGame={reloadGame}/> : null}
          {/* {gameStatus == 'waiting for other' ? <GameChecker game={game} setGame={setGame} reloadGame={reloadGame}/> : null} */}
          {redirect? <Redirect to="/lobby"/> : null}
        </div>
    </div>
        );

};

export default TestGame;
