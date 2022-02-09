import { useState, useEffect } from "react"

function TestGame({ user }){

  const [gameStatus, setGameStatus] = useState("game has not started")
  const [game, setGame] = useState({
    player1: {username: "jantje"},
    player2: {username: "franci"},
    currentTurn: true,
    gameIsWon: false,
    gameHistory: "",
    gameState: 10
  })

  let userTurn = "no one"
  let userNotice = "there is no user logged in"

  function gameStart() {
    setGameStatus("game is running")
  }

  function endTurn() {
    if (game.currentTurn) {
      setGame({...game, currentTurn: !game.currentTurn, gameHistory: game.gameHistory + userTurn[0], gameState: game.gameState - 1})
    }
  }

  function simTurn() {
    if (!game.currentTurn) {
      setGame({...game, currentTurn: !game.currentTurn, gameHistory: game.gameHistory + userTurn[0], gameState: game.gameState - 1})
    }
  }

  function gameEnd() {
    setGameStatus('game is over')
  }
  
  if (gameStatus === 'game is running') {
    userTurn = game.currentTurn ? game.player1.username : game.player2.username
  }

  if ( gameStatus != 'game is over' && game.gameState === 0) {
    console.log('gameState < 1')
    setGameStatus('game is over')
  }
  
  

  if (user) {
    userNotice = user.username + " is logged in"
  }

  return (
            <div id="test-game-container">
                <div id="test-user-notice">{userNotice}</div>
                <button onClick={gameStart}>Start Game</button>
                <div id="test-game-status">{gameStatus}</div>
                <button onClick={endTurn}>End Turn</button>
                <button onClick={simTurn}>Sim Turn</button>

                <div id="test-game-turn">{userTurn}'s turn</div>
                <button onClick={gameEnd}>End Game</button>
                <div id="test-game-state">{game.gameHistory} history</div>
                

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