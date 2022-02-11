import { useState, useEffect } from "react"
import GameChecker from "./GameChecker"

function Game({ user, gameId }){


  const [currentGame, setCurrentGame] = useState({})
  const [opponent, setOpponent] = useState()

 if (!opponent) {
    fetch(`/games/${gameId}`)
      .then(resp => {
        if (resp.ok) {
          resp.json()
          .then(game => {
            console.log(game)
            console.log(game.players[0].user.username)
            if (game.players[0].user.id === user.id) {
              setOpponent(game.players[1].user)
            }
            else {
              setOpponent(game.players[0].user)
            }
          })
        }
        else {
          console.log('fetch error')
        }
      })
    }



  return (
    <div>user {user ? user.username : "no user"} gameid {gameId}
      <div>your opponent is {opponent ? opponent.username : "no one yet"}</div>
      {opponent ? null : <GameChecker game={gameId}/>}
    </div>
    
  );

};

export default Game;
