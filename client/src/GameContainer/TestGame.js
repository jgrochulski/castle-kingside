import { useState, useEffect } from "react"
import GameChecker from "./GameChecker"
function TestGame({ user }){

  const [gameStatus, setGameStatus] = useState("game is running")
  const [game, setGame] = useState({})

  if (!game.player1) {
    reloadGame()
    console.log('first set')
  }

  let patch = {
    turn: 'player1',
    history: "",
    counter: 10
  }


  function testPatch(){
    fetch("/games/53", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patch)
    }).then((res) => res.json())
    .then(j => console.log(j))
  }

  function reloadGame(){
    fetch('/games/53')
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
    fetch("/games/53", {
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



  // function gameStart() {
  //   setGameStatus("game is running")
  // }

  function endTurn() {
    if (game[game.turn] == user.username) {
      // setGame({...game, turn: 'player2', history: game.history + userTurn[0], counter: game.counter - 1})
      quickPatch({turn: nextTurn, history: game.history + userTurn[0], counter: game.counter - 1})
      reloadGame()
    }
  }

  // function simTurn() {
  //   if (game.turn === 'player2') {
  //     // setGame({...game, turn: 'player1', history: game.history + userTurn[0], counter: game.counter - 1})
  //     quickPatch({turn: 'player1', history: game.history + userTurn[0], counter: game.counter - 1})
  //     reloadGame()
  //   }
  // }

  function gameEnd() {
    setGameStatus('game is over')
  }
  
  if (gameStatus === 'game is running') {
    userTurn = game.turn === 'player1' ? game.player1 : game.player2
  }

  if ( gameStatus != 'game is over' && game.counter < 1) {
    console.log('gameState < 1')
    setGameStatus('game is over')
  }
  
  if (user) {
    userNotice = user.username + " is logged in"
  }

  return (
    <div id="test-game-container">
        <div id="test-user-notice">{userNotice}</div>
        {/* <button onClick={gameStart}>Start Game</button> */}
        <div id="test-game-status">{gameStatus}</div>
        <button onClick={endTurn}>End Turn</button>
        {/* <button onClick={simTurn}>Sim Turn</button> */}

        <div id="test-game-turn">{userTurn}'s turn</div>
        <button onClick={gameEnd}>End Game</button>
        <div id="test-game-state">{game.history}history</div>
        <button onClick={testPatch}>Test Patch</button>
        {user && game[game.turn] != user.username && gameStatus != 'game is over' ? <GameChecker game={game} setGame={setGame} reloadGame={reloadGame}/> : null}
    </div>
        );

};

export default TestGame;






  //   let user1 = {
  //     username: "janek"
  //   }
    
  //   let user2 = {
  //     username: "franci"
  //   }
  
  //   let user = user1;
  
  //   let gameSeed = {
  //     player1: user,
  //     player2: user2,
  //     currentTurn: true,
  //     gameIsWon: false,
  //     gameState: 10
  //   }
  
  //   const [game, setGame] = useState(gameSeed)
  
  //   let notice = "there is no user"
  //   let turn = "there is no game started"
  //   let currentTurnPlayer = "nobody"
    
  //   notice = "the user is " + user.username
  
  //   currentTurnPlayer = game.currentTurn ? game.player1 : game.player2
  //   turn = "it is " + currentTurnPlayer.username + "'s turn"
  
  
  // function handleTurn() {
  //   console.log("next turn")
  //   setGame({...game, currentTurn: !game.currentTurn, gameState: game.gameState - 1})
  // }
  
  
  //     return (
  //         <div id="test-game-container">
  //             <div id="test-notice">{notice}</div>
  //             <div id="test-turn-indicator">{turn}</div>
              
  //             {game.gameState < 1 ? <div id="test-game-over">GAME OVER</div> 
  //             : <button id="test-button" onClick={handleTurn}>end turn</button>}
  //         </div>
  //     );